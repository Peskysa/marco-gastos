# Desarrollo

Node.js 24, pnpm 11.25.0; Python 3 para distribución. Instala con `pnpm install --frozen-lockfile`. `pnpm assets` genera PNG a partir del icono SVG original; `node scripts/third_party.cjs` conserva licencias. `pnpm test` ejecuta pruebas del dominio; `pnpm build:web` prepara dist/web; `pnpm exec playwright install chromium` y `pnpm test:browser` verifican la interfaz. `pnpm start` sirve en 127.0.0.1:5196.

src/core.js contiene lógica pura con validación estricta, cálculo en céntimos, copias y CSV. src/app.js presenta datos mediante textContent y guarda cada cambio validado antes de mostrar éxito. src/sw.js almacena recursos estáticos; los movimientos nunca se envían a un servidor. src/styles.css incluye vistas móvil e impresión.

desktop/main.cjs usa un origen gastos://app estable y un renderer aislado. tests/desktop.cjs comprueba el ejecutable empaquetado en dos sesiones. El perfil portable está junto al ejecutable. Android usa WebView con recursos de assets bajo https://gastos.local, puente de archivos restringido y selectores del sistema.

La etiqueta v1.0.1 dispara .github/workflows/release.yml: web, Windows, Linux, Android, publicación y Pages. El trabajo web prueba y entrega sus recursos a los demás. Los paquetes se verifican antes de crear una Release completa. El Source.zip se obtiene con git archive del mismo commit. La web compilada también incluye Source.zip. GitHub Actions conserva informes de navegador y escritorio.

La firma Android se crea una vez con scripts/configure_signing.py y se guarda en .signing excluido de Git, y como ANDROID_KEYSTORE y ANDROID_KEY_PASSWORD en secretos del repositorio. Requiere cryptography solo para configurar esa identidad. No regeneres la clave en actualizaciones. El entorno github-pages debe admitir etiquetas v*. No subas claves ni datos reales.
