# Manual de Marco Gastos

## Empezar

La aplicación comienza vacía. Pulsa Nuevo movimiento, elige Gasto o Ingreso, fecha, importe positivo, categoría y concepto opcional. Acepta coma o punto decimal, hasta dos decimales y sin separadores de miles. Se guardan céntimos enteros. Límite por importe: 9.999.999,99 €. Máximo 10.000 movimientos.

La fecha del movimiento determina el mes. Guardar un movimiento de otro mes lleva a ese mes. Usa el selector de mes o sus flechas para consultar el periodo. Los datos se guardan automáticamente; un error de almacenamiento se muestra sin dar el cambio por guardado.

## Resumen y presupuestos

Ingresos, gastos y balance incluyen todo el mes. El balance no es el saldo bancario; no se incluyen cuentas, transferencias, inversiones ni conexión bancaria. El gráfico compara gastos por categoría.

En Presupuestos pulsa Añadir, elige categoría y límite para el mes seleccionado. Pulsa su nombre para editarlo; 0 elimina el límite. Los presupuestos no se arrastran a meses posteriores. El exceso se muestra en texto y color; no bloquea movimientos. No hay presupuesto de ingresos ni previsiones automáticas.

## Movimientos

Busca por concepto o categoría sin distinguir mayúsculas ni tildes. Combina tipo y categoría. Los filtros solo afectan a la tabla. Editar abre el formulario; eliminar pide confirmación. Deshacer recupera el estado anterior al último cambio y se pierde al cerrar o al recibir cambios de otra ventana. Una edición abierta se cierra si otra ventana cambia los datos, evitando guardar un formulario obsoleto.

## Copias y CSV

Guardar copia JSON incluye todos los meses, presupuestos y la indicación de ejemplo. Restaurar valida la copia antes de pedir confirmación y sustituye todos los datos. La aplicación rechaza versiones desconocidas, fechas o importes inválidos, identificadores repetidos y archivos superiores a 5 MB. Conserva una copia previa. Si el almacenamiento contiene datos ilegibles, se bloquea la edición y permite descargar el original para recuperarlo.

CSV del mes exporta todos los movimientos del mes seleccionado, incluso los ocultos por filtros, con separador punto y coma, decimal coma y UTF-8 con BOM. Los conceptos que podrían interpretarse como fórmulas llevan un apóstrofo de protección. CSV es para consulta; solo JSON permite restaurar. Las copias no tienen contraseña ni cifrado.

## Impresión, ejemplo y dispositivos

Imprimir prepara resumen y movimientos del mes completo. En el navegador elige impresora o PDF; Android usa el sistema de impresión. No incluye gráficos ni presupuestos en el informe impreso.

Explorar con un ejemplo aparece disponible únicamente si no hay movimientos ni presupuestos. Carga datos ficticios y muestra un aviso permanente. Vaciar datos pide confirmación y elimina todos los meses y presupuestos, con posibilidad de deshacer mientras la sesión siga abierta.

La web funciona sin conexión tras su primera carga completa. Escritorio y Android ya incluyen los recursos. Cada navegador, perfil, origen y modalidad guarda datos separados. Usa JSON para transferirlos. En equipos compartidos cualquiera con acceso al perfil puede leerlos. No hay sincronización en la nube ni autenticación.
