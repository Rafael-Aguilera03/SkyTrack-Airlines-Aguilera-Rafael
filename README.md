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

- Frontend:

React + Vite (framework)

Axios (consumo de API REST)

React Router (navegación y rutas protegidas)

Context API (gestión de autenticación y roles)

CSS (estilos y diseño responsivo)

- Testing (Backend / Frontend)

Jest (framework de testing para pruebas unitarias)

Vitest + Testing Library (pruebas unitarias y E2E)

# Backend: Instalación y ejecución #

- Clonar repositorio

    git clone <url-del-repo>

- Instalar dependencias

    cd backend
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

    PUT /aviones/:id → Editar datos incluyendo estado del avión

- Tripulación:

    POST /tripulacion → Crear tripulante

    PUT /tripulacion/:id → Editar datos

    PUT /vuelos/:id/tripulacion → Asignar/quitar tripulación

# Frontend: Instalación y ejecución #

- Instalar dependencias

    cd frontend
    npm install

- Ejecutar servidor

    npm run dev

- se levanta en:

    http://localhost:5173

# Testing #

El proyecto incluye dos tipos de pruebas:
El backend utiliza Jest para validar la lógica de vuelos, mientras que el frontend usa Vitest para simular el flujo de login, listado y filtro

- Backend (Unitarias):

    Filtrado por estado: devuelve solo vuelos activos con el estado solicitado.

    Filtrado por origen: devuelve solo vuelos activos con el origen solicitado.

    Exclusión de vuelos dados de baja: asegura que no se incluyan vuelos con activo: false.


- Frontend (E2E parcial):

Se implementó hasta el paso 3 de las consignas para priorizar estabilidad, ya que el flujo completo requería más tiempo de depuración.

    Login con credenciales simuladas.

    Visualización del listado de vuelos.

    Filtrado por estado (ejemplo: “programado”).

# Ejecución de Tests #

- Backend (Unitarias):

    cd backend

    npm install   # si aún no instalaste dependencias #

    npm run test

- Frontend (E2E):

    cd frontend

    npm install   # si aún no instalaste dependencias

    npm run test
