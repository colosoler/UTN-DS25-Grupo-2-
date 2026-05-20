#!/bin/sh
# set -e detiene el script si cualquier comando falla
# si la migración falla, el contenedor no arranca
set -e

# Aplica las migraciones pendientes antes de arrancar la app
# Si ya fueron aplicadas, las saltea
npx prisma migrate deploy

# exec reemplaza el proceso del shell por Node, haciéndolo PID 1
# Esto permite que el contenedor reciba señales de shutdown correctamente
exec node dist/app.js
