#!/usr/bin/env node

/**
 * iTTel Image Optimization Script
 * Converts .jpg/.jpeg/.png to .webp using sharp
 * Generates report at scripts/image-optimization-report.json
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT_DIR, 'assets', 'images');
const REPORT_PATH = path.join(__dirname, 'image-optimization-report.json');

// Extensions to process
const PROCESSABLE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);
// Extensions to skip
const SKIP_EXTENSIONS = new Set(['.webp', '.svg', '.ico', '.gif', '.pdf', '.heapsnapshot']);
// Directories to skip
const SKIP_DIRS = new Set(['node_modules', '.git']);

// Logos/patterns that should NOT have references auto-replaced
const LOGO_PATTERNS = [
  'logo', 'Logo', 'LOGO', 'favicon', 'Favicon',
  'client-', 'clients/', 'telecom',
  'trenesLogos', 'Munimatanza', 'miniTandil', 'laralogo',
  'ittelNEGRO', 'argRed', 'bsasred', 'cabared'
];

function isLogo(filePath) {
  const lower = filePath.toLowerCase();
  return LOGO_PATTERNS.some(p => lower.includes(p.toLowerCase()));
}

function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!PROCESSABLE_EXTENSIONS.has(ext)) return null;

  const webpPath = filePath.replace(/\.(jpe?g|png)$/i, '.webp');
  const originalSize = getFileSize(filePath);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    const hasAlpha = metadata.hasAlpha || false;

    // Configure WebP conversion
    const webpOptions = hasAlpha
      ? { quality: 90, alphaQuality: 90, effort: 6 }
      : { quality: 82, effort: 6 };

    await image
      .webp(webpOptions)
      .toFile(webpPath);

    const webpSize = getFileSize(webpPath);
    const saving = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    const isSmaller = webpSize < originalSize;

    // If WebP is larger, delete it
    if (!isSmaller) {
      try { fs.unlinkSync(webpPath); } catch {}
    }

    return {
      original: filePath,
      webp: isSmaller ? webpPath : null,
      originalSize,
      webpSize: isSmaller ? webpSize : null,
      saving: isSmaller ? parseFloat(saving) : 0,
      hasAlpha,
      isLogo: isLogo(filePath),
      skipped: !isSmaller,
      skipReason: !isSmaller ? `WebP is ${Math.abs(saving)}% larger (${formatBytes(webpSize)} vs ${formatBytes(originalSize)})` : null
    };
  } catch (err) {
    // Clean up failed webp if exists
    try { fs.unlinkSync(webpPath); } catch {}
    return {
      original: filePath,
      webp: null,
      originalSize,
      webpSize: null,
      saving: 0,
      hasAlpha: false,
      isLogo: isLogo(filePath),
      skipped: true,
      skipReason: `Error: ${err.message}`
    };
  }
}

function walkDir(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      results.push(...walkDir(fullPath));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (SKIP_EXTENSIONS.has(ext)) continue;
      if (entry.name.startsWith('.')) continue;
      results.push(fullPath);
    }
  }

  return results;
}

async function main() {
  console.log('🔍 Scanning images in:', IMAGES_DIR);

  const files = walkDir(IMAGES_DIR);
  const processable = files.filter(f => PROCESSABLE_EXTENSIONS.has(path.extname(f).toLowerCase()));

  console.log(`📁 Found ${processable.length} processable images (.jpg/.jpeg/.png)\n`);

  const results = [];

  for (let i = 0; i < processable.length; i++) {
    const file = processable[i];
    const relative = path.relative(ROOT_DIR, file);
    process.stdout.write(`  [${i + 1}/${processable.length}] ${relative}... `);

    const result = await processImage(file);
    if (!result) continue;

    results.push(result);

    if (result.skipped) {
      console.log('⏭️ SKIPPED');
    } else {
      console.log(`✅ ${formatBytes(result.originalSize)} → ${formatBytes(result.webpSize)} (-${result.saving}%)${result.isLogo ? ' [LOGO - no auto-replace]' : ''}`);
    }
  }

  // Build report
  const converted = results.filter(r => !r.skipped);
  const skipped = results.filter(r => r.skipped);
  const logosForReview = converted.filter(r => r.isLogo);
  const nonLogoConverted = converted.filter(r => !r.isLogo);

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalWebp = converted.reduce((sum, r) => sum + (r.webpSize || 0), 0);
  const totalSaving = totalOriginal > 0 ? ((totalOriginal - totalWebp) / totalOriginal * 100).toFixed(1) : 0;

  const report = {
    summary: {
      totalScanned: processable.length,
      converted: converted.length,
      skipped: skipped.length,
      logosForManualReview: logosForReview.length,
      totalOriginalSize: totalOriginal,
      totalWebpSize: totalWebp,
      totalSavingPercent: parseFloat(totalSaving),
      totalSavedBytes: totalOriginal - totalWebp
    },
    converted: nonLogoConverted.map(r => ({
      original: path.relative(ROOT_DIR, r.original),
      webp: path.relative(ROOT_DIR, r.webp),
      originalSize: r.originalSize,
      webpSize: r.webpSize,
      savingPercent: r.saving,
      replaced: true,
      reason: null
    })),
    logosForReview: logosForReview.map(r => ({
      original: path.relative(ROOT_DIR, r.original),
      webp: path.relative(ROOT_DIR, r.webp),
      originalSize: r.originalSize,
      webpSize: r.webpSize,
      savingPercent: r.saving,
      replaced: false,
      reason: 'Logo/brand asset - manual review recommended'
    })),
    skipped: skipped.map(r => ({
      original: path.relative(ROOT_DIR, r.original),
      webp: null,
      originalSize: r.originalSize,
      webpSize: null,
      savingPercent: 0,
      replaced: false,
      reason: r.skipReason
    }))
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf-8');

  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION REPORT');
  console.log('='.repeat(60));
  console.log(`Total scanned:      ${report.summary.totalScanned}`);
  console.log(`Converted:          ${report.summary.converted}`);
  console.log(`Skipped:            ${report.summary.skipped}`);
  console.log(`Logos for review:   ${report.summary.logosForManualReview}`);
  console.log(`Original total:     ${formatBytes(report.summary.totalOriginalSize)}`);
  console.log(`WebP total:         ${formatBytes(report.summary.totalWebpSize)}`);
  console.log(`Total saving:       ${report.summary.totalSavingPercent}% (${formatBytes(report.summary.totalSavedBytes)})`);
  console.log(`\nReport saved to: ${path.relative(ROOT_DIR, REPORT_PATH)}`);
  console.log('='.repeat(60));
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
