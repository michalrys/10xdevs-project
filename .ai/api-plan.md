# REST API Plan

## 1. Resources
- **users**: Manages user profiles and authentication metadata (`users` table).
- **spaces**: Represents organizational units for school trips inside the school, it could be for example school name (`spaces` table).
- **space_teachers**: Junction table linking teachers to spaces (`space_teachers` table).
- **trips**: Defines school trips within a space (`trips` table).
- **trip_days**: Represents individual days of a trip (`trip_days` table).
- **trip_points**: Schedule points/activities within a trip day (`trip_points` table).
- **attractions**: Attractions associated with trip points (`attractions` table).
- **trip_students**: Junction table linking students to trips (`trip_students` table).
- **trip_teachers**: Junction table linking teachers to trips (`trip_teachers` table).
- **attendance_lists**: Records student attendance for trip days (`attendance_lists` table).
- **headcounts**: Records headcount data for trip days (`headcounts` table).

## 2. Endpoints

### 2.1 Users
- **POST /api/users/register**
  - Register a new user (Principal, Teacher, or Student). The special user is user with role `admin` - dedicated for owner of the applciation.
  - Request:
    ```json
    {
      "email": "string",
      "password": "string",
      "role": "admin|principal|teacher|student",
      "username": "string" // must be unique
    }
    ```
  - Response 201:
    ```json
    { "id": "uuid", "email": "string", "role": "..." }
    ```
  - Errors: 400 (validation), 409 (email exists), 409 (username exists)

- **POST /api/users/login**
  - Authenticate user and return JWT.
  - Request:
    ```json
    { "email": "string", "password": "string" }
    ```
  - Response 200:
    ```json
    { "access_token": "jwt", "expires_in": 3600 }
    ```
  - Errors: 401 (invalid credentials)

- **POST /api/users/forgot-password**
  - Initiate password reset via email (Supabase handles email).
  - Request: `{ "email": "string" }`
  - Response 200: `{ "message": "Reset email sent" }`

- **POST /api/users/reset-password**
  - Complete password reset with token.
  - Request:
    ```json
    { "access_token": "string", "new_password": "string" }
    ```
  - Response 200: `{ "message": "Password updated" }`

- **PUT /api/users/me/password**
  - Change password when authenticated.
  - Request:
    ```json
    { "current_password": "string", "new_password": "string" }
    ```
  - Response 200: `{ "message": "Password changed" }`

### 2.2 Spaces
- **GET /api/spaces**
  - List spaces (filter by slug or owner_id).
  - Query: `?slug=string&owner_id=uuid&page=1&limit=20`
  - Response 200:
    ```json
    { "data": [ { "id":"...","slug":"...","owner_id":"..." } ], "meta": { "page":1,"total":100 } }
    ```

- **POST /api/spaces**
  - Create a new space (Principal only and he becomes the owner of that created space).
  - Request:
    ```json
    { "slug": "string", "description": "string" }
    ```
  - Response 201: `{ "id": "uuid", "slug": "..." }`

- **GET /api/spaces/{space_slug}**
  - each space have `slug` defined, so use it here
  - Retrieve space details and related trips.
  - Response 200: JSON space object with `trips` array.

- **PUT /api/spaces/{space_slug}**
  - each space have `slug` defined, so use it here
  - Update space (owner only).
  - Request:
    ```json
    { "description": "string" }
    ```

- **DELETE /api/spaces/{space_slug}**
  - each space have `slug` defined, so use it here
  - only space owner
  - Delete space and cascade.
  - Response 204: No content.

### 2.3 Teachers and Students Assignment
- **POST /api/spaces/{space_slug}/teachers**
  - Assign a teacher to a space.
  - Request: `{ "teacher_id": "uuid" }`

- **POST /api/trips/{trip_id}/students**
  - Add students to a trip.
  - Request: `{ "student_ids": ["uuid"] }`

- **POST /api/trips/{trip_id}/teachers**
  - Add co-teachers to a trip.
  - Request: `{ "teacher_ids": ["uuid"] }`

### 2.4 Trips and Calendar
- **GET /api/spaces/{space_slug}/trips**
  - List trips with filtering by date.
  - Query: `?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD&page=1&limit=20`
  - if no parameters are given then print all trips

- **POST /api/spaces/{space_slug}/trips**
  - Create a new trip (teachers and owners).
  - Request:
    ```json
    { "title":"string","start_date":"YYYY-MM-DD","end_date":"YYYY-MM-DD","description":"string" }
    ```

- **GET /api/trips/{trip_id}**
  - Get trip details including days, points, attractions, attandence and headcounts.

- **PUT /api/trips/{trip_id}**
  - Update trip metadata.

- **DELETE /api/trips/{trip_id}**
  - Delete trip and cascade related data.

### 2.5 Trip Days, Points, Attractions
- **POST /api/trips/{trip_id}/days**
  - Add a day to a trip.
  - Request: `{ "date":"YYYY-MM-DD","title":"string","description":"string" }`

- **PUT /api/trip_days/{day_id}**
  - Update trip day.

- **DELETE /api/trip_days/{day_id}**

- **POST /api/trip_days/{day_id}/points**
  - Add a point to a day.
  - Request: `{ "time":"HH:MM:SS","title":"string","description":"string","position":1 }`

- **POST /api/trip_points/{point_id}/attractions**
  - Add an attraction.
  - Request:
    ```json
    { "title":"string","description":"string","cost":0.00,"duration":"30 minutes","hashtags":["fun"] }
    ```

- Update/Delete endpoints exist for each.

### 2.6 Artifacts (Attendance & Headcount)
- **POST /api/trip_days/{day_id}/attendance**
  - Record attendance.
  - Only for Teacher.
  - Request: `{ "attendance": [ {"student_id":"uuid","present":true} ] }`

- **GET /api/trips/{trip_id}/attendances**
  - Get all attendances for given trip
  - Only for Teacher.

- **POST /api/trip_days/{day_id}/headcounts**
  - Record headcount.
  - Only for Teacher.
  - Request: `{ "count": number, "expected_count": number }`

- **GET /api/trips/{trip_id}/headcounts**
  - Get all headcounts for given trip.
  - Only for Teacher.

## 3. Authentication and Authorization
- **Mechanism:** JWT via Supabase Auth.
- **Roles:** Enforced via Row-Level Security (RLS) in database.
- **Access Control:** 
  - Public (anon) can `GET /api/spaces`, `GET /api/spaces/{space_slug}`, `GET /api/spaces/{space_slug}/trips`, `GET /api/trips/{trip_id}` for titles/descriptions.
  - Authenticated users must supply `Authorization: Bearer <token>` for protected endpoints.
  - Owners, teachers, and students scoped by RLS policies.

## 4. Validation and Business Logic
- **Dates:** `start_date <= end_date`; enforced server-side and via DB trigger.
- **Trip Day Date:** Must fall within trip range; validated via trigger.
- **Attendance JSON:** Must be array; validated by DB constraint.
- **Headcount:** `count >= 0`, `expected_count >= 0`; server checks and DB constraint.
- **Slug Uniqueness:** Checked at creation.
- **Cost & Duration:** Non-negative and valid interval.
- **Permissions:** Enforced by RLS policies and middleware.

Pagination, filtering, and sorting are standard for list endpoints.
Rate limiting can be applied globally (e.g. 100 requests/min per user).

*Assumptions:*
- Error handling returns standard Problem JSON format.
- All dates are ISO 8601.
- JWT expiry is managed by Supabase (3600s by default).
