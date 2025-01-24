# Project Setup

This repository contains two separate projects:

1. **Backend**: Built with Express.js, Prisma, JWT, and Node.js.
2. **Frontend**: Built with React, Tailwind CSS, and Next.js.

Follow the steps below to set up and run each project.

---

## Backend Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- [Prisma CLI](https://www.prisma.io/docs/getting-started/quickstart)

### Installation

1. Navigate to the backend folder:

   ```bash
   cd pato-todo-back
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start your MySQL server:

   - Ensure MySQL is running locally.
   - Use your MySQL Workbench or CLI to create a new database (e.g., `todo list`).

4. Set up the Prisma schema:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

### Running the Server

Start the backend server with:

```bash
npm start
```

The server will run on `http://localhost:3333` by default.

---

## Frontend Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/)

### Installation

1. Navigate to the frontend folder:

   ```bash
   cd pato-todo-front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the frontend development server with:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at `http://localhost:3000` by default.

