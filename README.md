# school-trip

[![Version](https://img.shields.io/badge/version-0.0.1-blue)](https://github.com/your-org/school-trip/releases) [![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

A smartphone-first web application for planning and monitoring school trips in real time. Teachers create and manage trips; Students view trip details; Principals oversee spaces and teachers.  

---

## Table of Contents

1. [Tech Stack](#tech-stack)  
2. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Running the App](#running-the-app)  
3. [Available Scripts](#available-scripts)  
4. [Project Scope](#project-scope)  
   - [In Scope (MVP)](#in-scope-mvp)  
   - [Out of Scope (MVP)](#out-of-scope-mvp)  
5. [Project Status](#project-status)  
6. [License](#license)  

---

## Tech Stack

- **Frontend**:  
  - Astro 5  
  - React 19  
  - TypeScript 5  
  - Tailwind 4  
  - Shadcn/ui  
- **Backend**:  
  - Supabase (PostgreSQL, Auth)  
- **CI/CD & Hosting**:  
  - GitHub Actions  
  - DigitalOcean (Docker)  
- **Optional AI Integration**:  
  - Openrouter.ai (for model orchestration)

---

## Getting Started

### Prerequisites

- Node.js v22.14.0 (see `.nvmrc`)  
- npm (bundled with Node.js)  
- A Supabase project with URL & anon/public key  
- (Optional) GitHub CLI for workflows  

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/school-trip.git
cd school-trip

# 2. Install dependencies
npm install

# 3. Configure environment
# Create a `.env` file at project root:
#   SUPABASE_URL=your-supabase-url
#   SUPABASE_ANON_KEY=your-anon-key

# 4. (Optional) Initialize Supabase locally or point to your hosted instance
```

### Running the App

```bash
# Start dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

In the project directory, you can run:

| Script       | Description                         |
| ------------ | ----------------------------------- |
| `npm run dev`      | Start Astro dev server           |
| `npm run build`    | Build for production             |
| `npm run preview`  | Preview production build locally |
| `npm run lint`     | Run ESLint checks                |
| `npm run lint:fix` | Run ESLint with auto-fix         |
| `npm run format`   | Format code with Prettier        |

---

## Project Scope

### In Scope (MVP)

- Principal-driven space & Teacher account creation  
- Teacher-driven Trip, Day, Point, Attraction & Artifact management  
- Student & unauthenticated views with proper access controls  
- Vertical timeline UI for trips & days  
- Name-based trip filtering  
- Account lifecycle: temporary passwords, forced change, email reset  
- Cascading deletion & GDPR-style data anonymization  

### Out of Scope (MVP)

- Student-initiated account creation/join requests  
- Alerts, chat, messaging features  
- Photo uploads & approval workflows  
- Private messaging between users  
- Offline support / PWA  
- AI-driven planning or content generation  

---

## Project Status

This project is in **MVP development**. Core features for Principals, Teachers, and Students are under active implementation; contributions and feedback are welcome.

---

## License

This project is licensed under the [MIT License](./LICENSE).  

---