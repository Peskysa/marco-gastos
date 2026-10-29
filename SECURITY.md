# Seguridad

No publiques copias personales, importes reales, claves ni documentos privados en incidencias. Si puedes reproducir un problema con datos ficticios, describe su alcance y pasos mínimos en una incidencia del repositorio; usa el canal privado de GitHub Security si está disponible para vulnerabilidades sensibles.

La versión 1.x recibe correcciones según disponibilidad. No se garantiza un plazo. La aplicación no cifra sus datos y no incorpora autenticación. El aislamiento del usuario depende del sistema y del perfil del navegador.

La interfaz usa una política de contenido que restringe scripts al mismo origen y presenta los conceptos como texto. Las copias se validan antes de sustituir datos. Electron desactiva Node.js en la página, activa aislamiento y sandbox, deniega permisos y limita navegación externa. Android carga recursos locales, no solicita INTERNET ni permisos generales de almacenamiento, y usa los selectores del sistema. Actualiza el navegador/WebView y protege el dispositivo.
