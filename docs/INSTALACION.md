# Instalación

Descarga desde las Releases públicas de Peskysa/marco-gastos. Compara el SHA-256 del archivo con SHA256SUMS.txt. No descargues ejecutables de terceros.

## Windows

Windows 10/11 x64. Ejecuta Marco-Gastos-Windows-Instalador.exe y elige la carpeta. No tiene firma comercial; Windows puede mostrar un aviso de editor desconocido. El portable Marco-Gastos-Portable.exe guarda su perfil en Marco-Gastos-Datos junto al ejecutable: usa una carpeta escribible y no lo ejecutes desde un ZIP. Haz copia JSON antes de mover el programa o desinstalar.

## Linux

DEB para distribuciones x64 compatibles: `sudo apt install ./Marco-Gastos-Linux-amd64.deb`. El TAR.GZ contiene el ejecutable marco-gastos: extrae todo y ejecútalo en una sesión gráfica, como usuario normal. Necesita GTK, NSS y dependencias gráficas de Electron; CI usa Ubuntu 22.04. No desactives el sandbox para eludir problemas del sistema.

## Web y Web Portable

Abre https://peskysa.github.io/marco-gastos/ en un navegador moderno. Tras una primera carga completa funciona sin conexión; el navegador debe permitir almacenamiento y service workers. El ZIP se sirve por HTTP local, no por doble clic en index.html: `python -m http.server 5197 --bind 127.0.0.1` desde la carpeta extraída.

Marco-Gastos-Web-Portable.exe incluye un servidor local de solo lectura y abre el navegador en http://127.0.0.1:5197/. Mantén abierta su ventana; no necesita Python instalado. Si ese puerto está ocupado, cierra únicamente la otra instancia que lo use. Sus datos pertenecen al perfil de ese navegador; exporta JSON para transferirlos.

## Android

Android 8 o posterior con Android System WebView actualizado. Instala Marco-Gastos-Android.apk permitiendo la instalación desde la fuente elegida si tu sistema lo requiere. APK firmado con identidad propia estable, sin Google Play ni prueba en teléfono físico. El selector de documentos permite guardar/restaurar copias; no se solicitan permisos de red ni de almacenamiento general. Guarda una copia antes de desinstalar.
