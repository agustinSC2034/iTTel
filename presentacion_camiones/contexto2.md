Resumen Estructurado de Propuesta para IA (Creación de PowerPoint)
Título de la Presentación: Solución de Videovigilancia Móvil para la Flota de Recolección de Residuos del Gobierno de la Ciudad.

Subtítulo: Gestión, Auditoría y Seguridad en Tiempo Real.

1. El Desafío (El "Por Qué")
Objetivo: Monitorear en tiempo real la flota de camiones de basura.

Problema Principal: Se necesita auditar y verificar la operación, específicamente el "proceso de levantamiento de contenedores", para responder a reclamos ciudadanos y validar el servicio.

Necesidades Secundarias: Aumentar la seguridad, obtener evidencia irrefutable en incidentes de tránsito y gestionar la ubicación de la flota.

Entorno: Extremadamente hostil (vibración constante, uso rudo 24/7, polvo, agua). Las soluciones estándar (tarjetas SD, discos HDD) no son viables.

2. La Solución Propuesta (El "Qué")
Un ecosistema de videovigilancia móvil (MDVR) de grado industrial, compuesto por 3 partes:

Hardware Embarcado: Equipos robustos instalados en cada camión.

Red de Comunicación: Transmisión de datos en vivo (4G/GPS).

Software de Gestión Central: Plataforma en la central de monitoreo.

3. Componentes Clave (Hardware Detallado)
A. El Cerebro (MDVR):

Equipo: Hikvision DS-MP5604H-S/GW.

Función: Es un grabador de video móvil híbrido (acepta cámaras analógicas e IP) diseñado para vehículos.

Características Clave:

Módulos Integrados (/GW): Incluye 4G/LTE (para chip SIM) y GPS (para ubicación).

G-Sensor (Acelerómetro): Integrado. Detecta colisiones, frenadas bruscas y vuelcos.

Supercapacitores: Si el camión choca y pierde la batería, esto le da 10 segundos de energía al MDVR para cerrar y guardar el video del incidente (evita corrupción de datos).

B. El Almacenamiento (Crítico):

Equipo: SSD (Solid State Drive) de grado industrial (se compra por separado).

Por qué SSD: Es la única tecnología que soporta la vibración extrema de un camión. Los HDD (discos duros) y las tarjetas SD fallan.

Instalación: El MDVR tiene una bahía de 2.5" con amortiguación y cerradura (llave) para proteger el SSD y la evidencia.

C. Las Cámaras y Conectores (Crítico):

Cámaras: Modelos Hikvision Serie DS-2CS... (ej. DS-2CS54D7T-M).

Características: Antivandálicas (IK10) y herméticas (IP67, a prueba de agua y polvo).

Conectores: Conectores de Aviación M12 (roscados). Esto es vital. Los conectores BNC o RJ45 (de red) se sueltan con la vibración. Los M12 garantizan una conexión física permanente.

4. Cómo se Conecta (La Instalación)
A. Alimentación Eléctrica (Autónoma):

El MDVR se instala oculto en la cabina (debajo del asiento, tablero).

Se conecta al sistema eléctrico del camión usando 3 cables:

B+ (Directo a Batería): Para energía constante (modo stand-by).

GND (Tierra): Al chasis.

IGN (Ignición): Al cable de "contacto" de la llave del camión.

B. Lógica de Ignición (El "Cómo Funciona" para el Conductor):

El conductor no hace nada. El sistema es 100% automático.

Al girar la llave (Contacto): El cable IGN se activa, el MDVR "despierta" y empieza a grabar.

Al apagar el camión: El cable IGN se apaga, el MDVR detecta esto, sigue grabando un tiempo programado (ej. 15 min) y luego entra en modo stand-by de bajo consumo (no agota la batería).

C. Conexión de Sensores (La "Magia" de la Solución):

Se instala un sensor externo (ej. magnético) en el brazo hidráulico del camión (el que levanta los contenedores).

Este sensor se cablea a la Entrada de Alarma (I/O) del MDVR.

5. Cómo se Usa (La Operación Diaria)
A. El Software (Central de Monitoreo):

Plataforma: Hik-Central Professional (Software VMS licenciado, NO es la app gratuita Hik-Connect).

Función: Es la central de gestión de toda la flota.

B. Caso de Uso 1: Monitoreo en Vivo (Gestión de Flota)

Un operador abre Hik-Central.

Ve un mapa GIS (mapa real) con los íconos de todos los camiones moviéndose en tiempo real (gracias al GPS).

Puede hacer clic en cualquier camión para ver sus cámaras en vivo (usando la red 4G).

C. Caso de Uso 2: Auditoría (El Levantamiento de Contenedores)

El Problema: Un vecino llama: "El camión de las 10 AM rompió mi contenedor".

La Solución: El operador NO mira horas de video.

Cómo Funciona: Cada vez que el sensor del brazo hidráulico se activa (porque el brazo se usó), envía una señal a la Entrada de Alarma (I/O) del MDVR.

El MDVR crea una "marca" (TAG) automática en la grabación en ese segundo exacto.

La Búsqueda: El operador filtra la búsqueda en Hik-Central: "Mostrarme todos los eventos de 'Entrada de Alarma 1' para el Camión 5, entre las 9 y 11 AM".

El Resultado: La plataforma le muestra una lista de clips de 30 segundos, solo de los momentos exactos en que el brazo fue operado. La auditoría toma segundos.

D. Caso de Uso 3: Gestión de Incidentes (Seguridad)

El Incidente: Un camión tiene un accidente (colisión).

La Detección: El G-Sensor interno del MDVR detecta el impacto.

La Acción: El MDVR automáticamente "marca" ese video como un evento y lo protege contra borrado.

(Opcional) Puede configurarse para que suba automáticamente ese clip de 30 segundos a la central por 4G.