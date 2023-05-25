# Notas App

La Notas App es una aplicación de ejemplo desarrollada en React que permite crear, ver, editar y eliminar notas. Proporciona una interfaz simple para administrar tus notas con diferentes niveles de importancia.

## Características

- Creación de notas con título, descripción y tipo de importancia (High, Medium, Low).
- Listado de todas las notas creadas por los usuarios de la aplicación.
- Edición y eliminación de notas propias.
- Protección de las rutas de creación y listado de notas para usuarios autenticados.
- Integración con JSON Server para almacenar y recuperar las notas en una base de datos JSON.

## Requisitos

- Node.js
- npm o yarn

## Instalación

1. Clona este repositorio en tu máquina local.
2. Navega al directorio raíz del proyecto.
3. Instala las dependencias utilizando el comando `npm install` o `yarn install`.

## Configuración

1. Asegúrate de tener [JSON Server](https://github.com/typicode/json-server) instalado en tu máquina local.
2. Inicia JSON Server y apunta a un archivo JSON vacío utilizando el siguiente comando:

Asegúrate de que el archivo `db.json` esté en el directorio raíz del proyecto.

## Uso

1. Inicia la aplicación ejecutando el comando `npm start` o `yarn start`.
2. Abre tu navegador web y accede a `http://localhost:3000`.
3. La página de inicio muestra todas las notas disponibles.
4. Si no has iniciado sesión, solo podrás ver las notas, pero no podrás editarlas o eliminarlas.
5. Para iniciar sesión, haz clic en el botón "Iniciar sesión" en la parte superior derecha y utiliza las credenciales de usuario proporcionadas.
6. Después de iniciar sesión, podrás crear nuevas notas haciendo clic en el botón "+" en la esquina inferior derecha.
7. Para editar o eliminar una nota, asegúrate de ser el autor de la nota. Los botones de edición y eliminación estarán disponibles solo para tus propias notas.
8. ¡Disfruta de la gestión de tus notas!

## Contribución

Si deseas contribuir a este proyecto, puedes enviar un pull request. Agradecemos cualquier mejora o corrección de errores que puedas proporcionar.

## Licencia

Este proyecto fue desarrollado para una prueba tecnica de react y fue desarrollado por (mecp2992@gmail.com)
