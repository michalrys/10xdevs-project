# API Endpoint Implementation Plan: POST /api/users/register

## 1. Endpoint Overview
Registers a new user (admin, principal, teacher or student).  
On success returns the created user’s `id`, `email`, and `role`.

## 2. Request Details
- **HTTP Method:** POST  
- **URL:** `/api/users/register`  
- **Request Body (JSON):**  
  ```json
  {
    "email": "string",
    "password": "string",
    "role": "admin|principal|teacher|student",
    "username": "string"
  }
  ```
- **Parameters:**  
  - **Required**:  
    - `email` (string, valid email format)  
    - `password` (string, meets complexity rules)  
    - `role` (one of `admin`, `principal`, `teacher`, `student`)  
    - `username` (string, unique)  
  - **Optional**: none

## 3. Used Types
- **DTOs**  
  - `RegisterUserDto` (from `src/types.ts`)  
  - `UserResponseDto` (from `src/types.ts`)  

- **Command Model**  
  - `RegisterUserCommand` — new class/value object encapsulating validated `email`, hashed `password`, `role`, `username`.

## 4. Response Details
- **201 Created**  
  ```json
  {
    "id": "uuid",
    "email": "string",
    "role": "admin|principal|teacher|student"
  }
  ```
- **400 Bad Request** — validation errors  
- **409 Conflict** — email or username already exists  
- **500 Internal Server Error** — unexpected failures

## 5. Data Flow
1. **Route Handler**  
   - Parse and validate incoming JSON against a Zod schema or manual checks.  
   - Map to `RegisterUserCommand`.  
2. **UserService.registerUser(command)**  
   - Check for existing `email` / `username` (via Supabase query).  
   - Hash password with bcrypt.  
   - Insert into `public.users` table using a **service-role** Supabase client (bypasses RLS).  
   - Return inserted row (id, email, role).  
3. **Route Handler** returns 201 with `UserResponseDto`.

## 6. Security Considerations
- **Password hashing**: Use bcrypt with at least 10 rounds.  
- **RLS**: Use service-role key for inserts to bypass RLS policies; do not use anon key.  
- **Input sanitization**: Enforced by Zod/manual validation.  
- **Rate limiting**: Apply globally or on this route to prevent brute-force.  
- **Error disclosure**: Return generic conflict messages; do not leak which field collided.

## 7. Error Handling
| Scenario                                  | Checkpoint                | Status Code | Response Body                   |
|-------------------------------------------|---------------------------|-------------|---------------------------------|
| Missing/invalid field(s)                  | Validation layer          | 400         | `{ message: "Validation error" }` |
| Email already in use                      | Pre-insert uniqueness check | 409       | `{ message: "Email already exists" }` |
| Username already in use                   | Pre-insert uniqueness check | 409       | `{ message: "Username already exists" }` |
| Database or hashing failure               | Try/Catch around service  | 500         | `{ message: "Internal server error" }` |

All errors should be logged (console or centralized logger) with stack traces for diagnostics.

## 8. Performance
- **DB round trips**:  
  - One `SELECT` to check `email`  
  - One `SELECT` to check `username`  
  - One `INSERT` to create user  
- Could combine uniqueness checks into a single transaction, but separate checks yield clearer error messages.  
- Caching not applicable for registration.  
- Password hashing is CPU-bound; limit concurrency or offload to worker if throughput is very high.

## 9. Implementation Steps
1. **Define Zod schema** (or manual) in `src/api/users/register.ts` for `RegisterUserDto`.  
2. **Create `RegisterUserCommand`** in `src/models/user.command.ts`.  
3. **Add `UserService`** in `src/services/user.service.ts` with method `registerUser()`:  
   - Inject a Supabase service-role client.  
   - Uniqueness checks, password hashing, insert.  
4. **Write route handler** at `src/pages/api/users/register.ts`:  
   - Pull in `App.Locals.supabase` or create a new service-role client from `import.meta.env.SUPABASE_SERVICE_KEY`.  
   - Validate request, call `UserService.registerUser()`, map to `UserResponseDto`, return 201.  
5. **Add environment variable** `SUPABASE_SERVICE_KEY` to `.env` and `env.d.ts`.  
6. **Update `tsconfig.json`** if needed to include new service/model files.  
7. **Write unit tests** for:  
   - Validation errors  
   - Duplicate email  
   - Duplicate username  
   - Successful creation  
8. **Document endpoint** in Swagger/OpenAPI spec if applicable.  
