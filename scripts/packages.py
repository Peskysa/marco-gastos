"""Verifica formatos y contenido de cada modalidad."""
from pathlib import Path
import sys,zipfile,tarfile,subprocess
ROOT=Path(__file__).resolve().parents[1]
PREFIX='Marco-Gastos'
def web():
    folder=ROOT/'dist/web'
    for name in ['index.html','styles.css','app.js','core.js','sw.js','manifest.webmanifest','LICENSE','NOTICE','THIRD_PARTY.md','MANUAL.md','assets/icon-512.png']:
        assert (folder/name).stat().st_size>0,name
    with zipfile.ZipFile(ROOT/'dist'/f'{PREFIX}-Web.zip','w',zipfile.ZIP_DEFLATED) as z:
        for p in folder.rglob('*'):
            if p.is_file():z.write(p,p.relative_to(folder))
    print('Web íntegra y empaquetada.')
def desktop():
    folder=ROOT/'dist/desktop'
    if sys.platform=='win32':
        for suffix in ['-Windows-Instalador.exe','-Portable.exe','-Web-Portable.exe']:
            p=folder/(PREFIX+suffix)
            with p.open('rb') as f:assert f.read(2)==b'MZ' and p.stat().st_size>1000000
    else:
        p=folder/(PREFIX+'-Linux-amd64.deb');listing=subprocess.check_output(['dpkg-deb','-c',str(p)],text=True)
        assert 'app.asar' in listing and 'marco-gastos' in listing
        with tarfile.open(folder/(PREFIX+'-Linux-Portable.tar.gz')) as z:assert any(n.endswith('/app.asar') for n in z.getnames())
    print('Paquetes de escritorio verificados.')
def android():
    with zipfile.ZipFile(ROOT/'dist'/f'{PREFIX}-Android.apk') as z:
        assert z.testzip() is None
        for name in ['assets/index.html','assets/core.js','assets/app.js','assets/LICENSE','classes.dex','AndroidManifest.xml']:assert name in z.namelist(),name
    print('APK con interfaz, lógica, recursos y licencias verificados.')
if __name__=='__main__':{'web':web,'desktop':desktop,'android':android}[sys.argv[1]]()
