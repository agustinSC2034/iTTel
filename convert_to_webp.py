"""
Script para convertir imágenes JPG/JPEG/PNG a WebP
Optimiza las imágenes para web manteniendo buena calidad
"""

from PIL import Image
import os
from pathlib import Path

def convert_to_webp(source_path, output_path=None, quality=85):
    """
    Convierte una imagen a formato WebP
    
    Args:
        source_path: Ruta de la imagen original
        output_path: Ruta de salida (si es None, usa el mismo nombre con .webp)
        quality: Calidad de compresión (1-100, recomendado 80-90)
    """
    try:
        # Abrir imagen
        img = Image.open(source_path)
        
        # Si no hay ruta de salida, usar la misma con extensión .webp
        if output_path is None:
            output_path = str(Path(source_path).with_suffix('.webp'))
        
        # Convertir y guardar
        img.save(output_path, 'webp', quality=quality, method=6)
        
        # Calcular reducción de tamaño
        original_size = os.path.getsize(source_path) / 1024  # KB
        webp_size = os.path.getsize(output_path) / 1024  # KB
        reduction = ((original_size - webp_size) / original_size) * 100
        
        print(f"✅ {Path(source_path).name} -> {Path(output_path).name}")
        print(f"   Original: {original_size:.1f}KB | WebP: {webp_size:.1f}KB | Reducción: {reduction:.1f}%")
        
        return True
    except Exception as e:
        print(f"❌ Error convirtiendo {source_path}: {str(e)}")
        return False

def convert_folder(folder_path, quality=85, extensions=['.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG']):
    """
    Convierte todas las imágenes de una carpeta a WebP
    
    Args:
        folder_path: Carpeta con las imágenes
        quality: Calidad de compresión
        extensions: Lista de extensiones a convertir
    """
    folder = Path(folder_path)
    
    if not folder.exists():
        print(f"❌ La carpeta {folder_path} no existe")
        return
    
    print(f"\n🔄 Convirtiendo imágenes en: {folder_path}")
    print(f"📊 Calidad: {quality}%\n")
    
    converted = 0
    total_original = 0
    total_webp = 0
    
    for ext in extensions:
        for img_path in folder.glob(f"*{ext}"):
            if convert_to_webp(img_path, quality=quality):
                converted += 1
                total_original += os.path.getsize(img_path) / 1024
                webp_path = img_path.with_suffix('.webp')
                if webp_path.exists():
                    total_webp += os.path.getsize(webp_path) / 1024
            print()  # Línea en blanco entre archivos
    
    if converted > 0:
        total_reduction = ((total_original - total_webp) / total_original) * 100
        print(f"\n{'='*60}")
        print(f"✨ Conversión completada!")
        print(f"📁 Archivos convertidos: {converted}")
        print(f"💾 Tamaño original total: {total_original:.1f}KB")
        print(f"💾 Tamaño WebP total: {total_webp:.1f}KB")
        print(f"🎯 Reducción total: {total_reduction:.1f}% ({total_original - total_webp:.1f}KB ahorrados)")
        print(f"{'='*60}\n")
    else:
        print("⚠️ No se encontraron imágenes para convertir")

if __name__ == "__main__":
    # Configuración
    OBRAS_FOLDER = "assets/images/obras_en_campo"
    PROYECTOS_FOLDER = "assets/images/proyectos"
    CLIENTS_FOLDER = "assets/images/clients"
    QUALITY = 85  # Calidad recomendada: 80-90 para balance calidad/tamaño
    
    print("\n" + "="*60)
    print("🖼️  CONVERSOR DE IMÁGENES A WEBP")
    print("="*60)
    
    # Convertir carpeta de obras en campo
    if os.path.exists(OBRAS_FOLDER):
        convert_folder(OBRAS_FOLDER, quality=QUALITY)
    else:
        print(f"⚠️ Carpeta no encontrada: {OBRAS_FOLDER}")
    
    # Convertir carpeta de proyectos
    if os.path.exists(PROYECTOS_FOLDER):
        convert_folder(PROYECTOS_FOLDER, quality=QUALITY)
    else:
        print(f"⚠️ Carpeta no encontrada: {PROYECTOS_FOLDER}")
    
    # Convertir carpeta de clientes
    if os.path.exists(CLIENTS_FOLDER):
        convert_folder(CLIENTS_FOLDER, quality=QUALITY)
    else:
        print(f"⚠️ Carpeta no encontrada: {CLIENTS_FOLDER}")
    
    print("\n💡 SIGUIENTES PASOS:")
    print("1. Actualiza el HTML para usar las imágenes .webp")
    print("2. Mantén los archivos originales como fallback")
    print("3. Usa <picture> con <source type='image/webp'> para compatibilidad")
    print("\nEjemplo:")
    print("""
<picture>
    <source srcset="imagen.webp" type="image/webp">
    <img src="imagen.jpg" alt="...">
</picture>
    """)
