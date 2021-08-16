# Proyecto Covid 19

Proyecto HTML, CSS (Bootstrap) y Javascript, utilizando librería CanvasJS para crear un gráfico y tabla de casos de Covid a nivel mundial y evolución de la pandemia en Chile.

Se utilizó JWT para validar el usuario en la base de datos, utilizando el servidor ya creado para este fin los archivos de soporte del desafío.

Para leer los datos se utilizó llamadas API con autenticación de usuario.

Se crearon dos hojas, una con la información mundial y una con la información sobre Chile. El token es persistente hasta que se cierra la sesión.

En la hoja mundial (index.html) se levanta un modal cuando se hace click en el botón de cada país. Este modal muestra un gráfico con los valores del país seleccionado. Aquí hay que mejorar el llamado a hacer el gráfico, puesto que se tienen dos funciones para crear el gráfico, una en el modal y otra en la hoja, pero debería hacerse una sola indicando el id del contenedro del gráfico. Por ahora no me ha funcionado.