# Estado y límites de verificación

La Release solo se publica si pasan los trabajos de web, Windows, Linux y Android del workflow. El historial de Actions es la evidencia actual de cada ejecución; los informes se conservan como artefactos.

- Lógica: decimales exactos, límites, fechas, CRUD, meses, presupuestos, copias, protección CSV y filtros.
- Navegador: creación, edición, borrado, deshacer, presupuestos, copias válidas e inválidas, impresión, persistencia, móvil, ventanas y offline.
- Escritorio Windows/Linux: arranque del ejecutable empaquetado y datos entre reinicios; aislamiento del renderer.
- Portable Windows: arranque; Web Portable: servidor real de solo lectura y recursos.
- Android: compilación, contenido del APK y firma; sin prueba en teléfono físico ni publicación en Google Play.
- Publicación: nueve paquetes más SHA256SUMS.txt; comprobar acceso público, hashes y coincidencia de fuentes con el commit.

No equivale a una auditoría completa de seguridad ni a una prueba manual en todos los sistemas. Windows no tiene firma comercial. Las categorías son fijas, solo se admite EUR, no hay importación CSV ni sincronización ni conexión bancaria. 10.000 movimientos y 5 MB por copia. Se requiere navegador o Android System WebView moderno.
