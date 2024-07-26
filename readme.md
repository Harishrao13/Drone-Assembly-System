# Drone Assembly System

A web-based MERN application to manage the assembly of drones, tracking components, organizing, and generating custom Drone IDs.

## Directory Structure

### Backend
- **backend/api/**
  - **controllers/** - Contains route controllers
  - **models/** - Contains Mongoose models
  - **middleware/** - Contains custom middleware

### Frontend
- **frontend/src/**
  - **components/** - Contains reusable components throughout the application
  - **hooks/** - `useUser` hook retrieves `userInfo` into pages
  - **pages/** - Contains all pages in the application
  - **types/** - Contains types of props for Type Safety
  - **store/** - Stores JWT Token in cache

## Installation and Setup

### Backend

 Add a `.env` file in `backend/` with variables - `MONGO_URI`, `JWT_SECRET`, `PORT`(optional)

 Run `npm start`

#### Frontend
Run `npm run dev` to start in development mode.

### Authentication
[React Auth Kit](https://authkit.arkadip.dev/) is used for authentication and a custom Context ( useUser ) is used for private routing and Authorization.

Two roles are present: 1. Admin 2. User stored as isAdmin bool in UserSchema.

`constants/navlinks` contains all the private routes accessible to admins.

### API Documentation
Each Drone is a `Product`, each `Product` has `Component` (Ex: Motor, Battery), each Component have different `Part` (Ex: Hobbywing X6Plus CW, EFT 610P Canopy).

`backend/routes/tasks.js` contain all the APIs and their methods.

`Product Tasks` are APIs concerned with the product registry where we store Drone configuration.

`Instance Tasks` are APIs concerned with the instances, adding, archiving and managing them.

### Backend Components
There are  three models 

1. `UserSchema` : Contains user details and role.
2. `ProductSchema` : Contains a `Product`(Drone) and it's components, parts.
3. `InstanceSchema`: Stores serial numbers of parts in a drone in a organised way.

#### Middleware `verifyToken.js`
It decodes the token after signing in to capture username and role for various actions throughout the application

## Frontend Pages

`layout.tsx` - Layout of all pages except `/auth/Login.tsx`. `components/shared` have components for making layout responsive

`Home` is the main page after logging in, `Sidebar` or `Navbar`are visible only to users with role admin.
### Product Registry
`addDrone`, `addComponent`, `addPart` are pages as part of Product Registry.

`DialogBox` component are used to take input and saved in products in database.
`ProductTable` component is used to show all existing parts in all the pages.

### Instances
`addInstance` - You can create a new Instance or continue a archived instance here to assemble it here.

`newInstance` - Main Instance Page to scan parts, discard, archive or submit the instance.
- *Instances are marked archived by default.*

`trackInstace` - Tracks the Drone where a component is assembled, and displays relevant information.

- The unique `droneId` is the Mongodb `_id` of the instance document.

### Private Routes

`dashboard` - Dashboard for admins for managing assembled or archived instances.

`New Product` - Pages for adding drone configuration

`Add Employee` - Admins can add members or admins here.

## Todo

- Add another role: superadmin to manage admins and members.
- Make a dashboard to manage members.
- Complete backend for addEmployee, reassign.
- Link instance to actions in the dashboard.
- Implement soft delete.
- Add an option to upload drone configuration via an Excel sheet.
- Add an option to maintain and monitor stock levels of parts.
- Add functionality to dashboard filters.




