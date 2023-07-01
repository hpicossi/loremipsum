# API REST NODE.JS

El desarrollo de la API REST se llevó a cabo siguiendo los siguientes pasos:

1. Se configuró el proyecto y se instalaron las dependencias necesarias utilizando npm.
2. Se creó un archivo de configuración para Sequelize y se configuró el motor de base de datos SQLite.
3. Se crearon los archivos de modelo para las entidades Librería, Libro y Usuario utilizando Sequelize para definir los esquemas de las tablas y sus relaciones.
4. Se configuró Passport y se implementó una estrategia de autenticación local para la autenticación de usuarios.
5. Se creó un archivo principal de la aplicación (app.js) donde se definieron las rutas y los controladores para cada una de las acciones solicitadas en los requisitos.
6. Se implementaron las rutas y los controladores para cada acción, utilizando los modelos y métodos proporcionados por Sequelize para realizar las operaciones CRUD en la base de datos.
7. Se configuraron las sesiones y se utilizó Passport para autenticar las solicitudes protegidas (marcadas con AUTH).
8. Se agregaron las validaciones necesarias en los controladores utilizando las funcionalidades de validación proporcionadas por Sequelize.

## Installation

Abrir la carpeta del proyecto y en ella correr los siguientes comando en una terminal.

```bash
npm init -y
npm install express sequelize sqlite3 passport passport-local bcrypt
npm install express-session --save

```

## Validación de entidades

La validación de las entidades se lleva a cabo utilizando las funcionalidades de validación proporcionadas por Sequelize. En los archivos de modelo (Library.js, Book.js y User.js), se especificaron las restricciones de validación para cada atributo (como allowNull, unique, etc.). Estas restricciones aseguran que los datos ingresados cumplan con ciertas reglas (como no ser nulos, ser únicos, tener un formato específico, etc.).

Cuando se realizan operaciones de creación o actualización de registros (por ejemplo, al crear una librería o modificar un libro), Sequelize verifica automáticamente que los datos cumplan con las restricciones de validación especificadas en los modelos. Si alguna validación falla, Sequelize lanzará una excepción y se devolverá un error al cliente.

La validación de las entidades proporciona una capa adicional de seguridad y garantiza que los datos ingresados cumplan con los requisitos definidos, evitando así la inserción de datos incorrectos o inconsistentes en la base de datos.

Es importante destacar que en el código de ejemplo proporcionado se han agregado validaciones básicas, pero es posible extenderlas y personalizarlas según las necesidades específicas del proyecto, agregando validaciones personalizadas, reglas de formato, etc.
