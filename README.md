## SkyTrack Airlines ##

sistema diseñado para gestionar las operaciones esenciales de una aerolínea ficticia. Su propósito es centralizar y administrar la información de vuelos, aviones y tripulación, ofreciendo una API REST modular y segura que permite:

- Administradores: crear, editar y dar de baja lógica vuelos, gestionar aviones y tripulación,        mantener actualizada la información operativa y registrar, editar y crear nuevos operarios.

- Operadores: consultar vuelos, asignar o quitar tripulación y actualizar estados de vuelo.

El sistema asegura que los datos estén siempre disponibles y consistentes, aplicando validaciones y roles de acceso.

# Autor

Aguilera Rafael  
Examen Final – Programación III  
IES 9-023

# Tecnologías utilizadas #

- Backend: 

NestJS (framework principal)

Mongoose (ODM para MongoDB)

JWT (autenticación y roles)

TypeScript

# Backend: Instalación y ejecución #

- Clonar repositorio

    git clone <url-del-repo>

- Instalar dependencias

    cd skytrack-backend
    npm install

- Variables de entorno (.env)

    MONGO_URI=mongodb://localhost:27017/...
    JWT_SECRET=tu_clave

- Ejecutar servidor

    npm run start:dev


# roles #

Admin: CRUD completo de vuelos, aviones y tripulación. Puede dar de baja lógica (activo: false).

Operador: Puede listar vuelos activos, asignar y quitar tripulación, cambiar estado de vuelo.

# Endpoints principales #

- Vuelos: 

    POST /vuelos → Crear vuelo

    GET /vuelos → Listar vuelos activos

    GET /vuelos/:id → Consultar vuelo por ID

    PUT /vuelos/:id → Editar vuelo (origen, destino, estado, avión, activo)

    PUT /vuelos/:id con { "activo": false } → Baja lógica

- Aviones: 

    POST /aviones → Crear avión

    PUT /aviones/:id → Editar datos

    Estado

- Tripulación:

    POST /tripulacion → Crear tripulante

    PUT /tripulacion/:id → Editar datos

    PUT /vuelos/:id/tripulacion → Asignar/quitar tripulación