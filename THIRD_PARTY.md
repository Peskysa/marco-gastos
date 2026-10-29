# Componentes de terceros

El código de interfaz y cálculo y los gráficos originales de Marco Gastos pertenecen a Marco Pescador y se distribuyen bajo AGPL-3.0-only.

| Componente | Uso | Licencia |
|---|---|---|
| Electron 44.7.0 | Escritorio, integra Chromium y Node.js | MIT y avisos de sus componentes |
| electron-builder 26.15.3 | Empaquetado; NSIS para el instalador | MIT, NSIS y componentes con sus propios avisos |
| Playwright 1.64.1 | Pruebas de navegador y escritorio | Apache-2.0 |
| sharp 0.34.5 | Iconos durante el desarrollo, libvips | Apache-2.0 y LGPL-2.1-or-later para libvips |
| Python, Tcl/Tk | Lanzador Web Portable | PSF y licencias Tcl/Tk |
| PyInstaller 6.22.3 | Empaquetado de Web Portable | GPL-2.0-or-later con excepción de distribución del bootloader |
| Gradle y Android Gradle Plugin | Compilación Android | Apache-2.0 |
| Android System WebView | Motor suministrado por el dispositivo | Sus licencias; no se incorpora al APK |

`licenses/` conserva avisos de las dependencias directas y de Chromium. `pnpm-lock.yaml` fija dependencias de construcción; no se empaqueta node_modules completo. Durante la compilación Windows, `scripts/runtime_notices.py` incorpora avisos de Python, Tcl/Tk y PyInstaller al lanzador y a la documentación de la Release. El escritorio conserva además los avisos incorporados por Electron y NSIS.

No se usan fuentes, iconos, servicios de analítica o librerías web remotos. No se atribuye a Marco la autoría de componentes de terceros. Las herramientas se usan separadamente o bajo licencias compatibles; la excepción de PyInstaller permite distribuir el lanzador con AGPL.
