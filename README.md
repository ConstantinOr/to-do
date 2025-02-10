# Project Overview

This project is designed for creating, deleting tasks, and changing task statuses for users.

## Technologies Used

- **Next.js** - React framework for server-side rendering and static site generation.
- **Next-Auth** - Used for user authentication.
- **Prisma** - ORM for database management.
- **next-auth/prisma-adapter** - Integration of Next-Auth with Prisma.
- **bcryptjs** - Used for encryption and hashing.
- **lucide-react** - Icon set for UI.
- **React** - Core React engine.
- **react-dom** - Manipulation of the DOM tree.
- **@emotion/react** - CSS-in-JS library for styling React components without separate CSS files.
- **@mui/icons-material** + **@emotion/styled** + **@mui/icons-material** - Material Design icons.

## Build and Run for Testing

To build and run the project for testing, use the following commands:

```sh
mpm i
```

```sh
next build
```

```sh
docker-compose build --no-cache
```

```sh
docker-compose up
```

After starting, access the application at:

[http://localhost:3000/](http://localhost:3000/)

To test the application, create a new user.

