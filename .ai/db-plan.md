# Database Schema Plan

## 1. Tables

### users
This table is managed by Supabase Auth.
- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `auth_id` uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE
- `email` varchar(255) NOT NULL UNIQUE
- `password_hash` text NOT NULL
- `role` user_role NOT NULL
- `username` varchar(70) UNIQUE
- `must_change_password` boolean NOT NULL DEFAULT false
- `password_changed_at` timestamptz
- `created_at` timestamptz NOT NULL DEFAULT now()
- `updated_at` timestamptz NOT NULL DEFAULT now()
- `deleted_at` timestamptz
- `search_vector` tsvector

*Trigger: Automatically update the `deleted_at` column on record deleted.*

### spaces
- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `owner_id` uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
- `slug` varchar(100) NOT NULL UNIQUE
- `description` text NULLABLE
- `created_at` timestamptz NOT NULL DEFAULT now()
- `updated_at` timestamptz NOT NULL DEFAULT now()
- `deleted_at` timestamptz
- `search_vector` tsvector

*Trigger: Automatically update the `deleted_at` column on record deleted.*

### space_teachers
- `space_id` uuid NOT NULL REFERENCES spaces(id) ON DELETE CASCADE
- `teacher_id` uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
- PRIMARY KEY(`space_id`, `teacher_id`)

### trips
- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `space_id` uuid NOT NULL REFERENCES spaces(id) ON DELETE CASCADE
- `title` varchar(255) NOT NULL
- `description` text NULLABLE
- `start_date` date NOT NULL
- `end_date` date NOT NULL
- `created_at` timestamptz NOT NULL DEFAULT now()
- `updated_at` timestamptz NOT NULL DEFAULT now()
- `search_vector` tsvector
- CHECK (`start_date` <= `end_date`)

*Trigger: Automatically update the `deleted_at` column on record deleted.*

### trip_days
- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `trip_id` uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE
- `date` date NOT NULL
- `title` varchar(255) NOT NULL
- `description` text NULLABLE
- `created_at` timestamptz NOT NULL DEFAULT now()
- `updated_at` timestamptz NOT NULL DEFAULT now()
- `deleted_at` timestamptz
- UNIQUE(`trip_id`, `date`)
- CHECK (`date` BETWEEN (SELECT start_date FROM trips WHERE id = trip_id) AND (SELECT end_date FROM trips WHERE id = trip_id))

*Trigger: Automatically update the `deleted_at` column on record deleted.*

### trip_points
- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `trip_day_id` uuid NOT NULL REFERENCES trip_days(id) ON DELETE CASCADE
- `time` time NOT NULL
- `title` varchar(255) NOT NULL
- `description` text NULLABLE
- `position` integer
- `created_at` timestamptz NOT NULL DEFAULT now()
- `updated_at` timestamptz NOT NULL DEFAULT now()
- `deleted_at` timestamptz

*Trigger: Automatically update the `deleted_at` column on record deleted.*

### attractions
- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `trip_point_id` uuid NOT NULL REFERENCES trip_points(id) ON DELETE CASCADE
- `title` varchar(255) NOT NULL
- `description` text
- `cost` numeric(10,2)
- `duration` interval
- `hashtags` text[] NOT NULL DEFAULT '{}'
- `created_at` timestamptz NOT NULL DEFAULT now()
- `updated_at` timestamptz NOT NULL DEFAULT now()
- `deleted_at` timestamptz

*Trigger: Automatically update the `deleted_at` column on record deleted.*

### trip_students
- `trip_id` uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE
- `student_id` uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
- PRIMARY KEY(`trip_id`, `student_id`)

### trip_teachers
- `trip_id` uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE
- `teacher_id` uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
- PRIMARY KEY(`trip_id`, `teacher_id`)

### attendance_lists
- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `trip_day_id` uuid NOT NULL REFERENCES trip_days(id) ON DELETE CASCADE
- `teacher_id` uuid NOT NULL REFERENCES users(id)
- `attendance` jsonb NOT NULL
- `created_at` timestamptz NOT NULL DEFAULT now()
- `remarks` varchar(500)
- CHECK (jsonb_typeof(attendance) = 'array')

### headcounts
- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `trip_day_id` uuid NOT NULL REFERENCES trip_days(id) ON DELETE CASCADE
- `teacher_id` uuid NOT NULL REFERENCES users(id)
- `count` integer NOT NULL CHECK(count >= 0)
- `expected_count` integer NOT NULL CHECK(expected_count >= 0)
- `created_at` timestamptz NOT NULL DEFAULT now()
- `remarks` varchar(500)

## 1.1. Custom types:
### user_role
- TYPE user_role AS ENUM ('admin', 'principal', 'teacher', 'student');

## 2. Relationships

- One `users` to many `spaces` (owner)
- Many-to-many `spaces` ↔ `users` (teachers) via `space_teachers`
- One `spaces` to many `trips`
- One `trips` to many `trip_days`
- One `trip_days` to many `trip_points`
- One `trip_points` to many `attractions`
- Many-to-many `trips` ↔ `users` (students) via `trip_students`
- Many-to-many `trips` ↔ `users` (teachers) via `trip_teachers`
- One `trip_days` to many `attendance_lists`
- One `trip_days` to many `headcounts`

## 3. Indexes

- B-tree on all foreign key columns
- B-tree on `trip_points(trip_day_id, time)`
- GIN on `attractions(hashtags)`
- GIN on tsvector columns:
  - `users(search_vector)`, `spaces(search_vector)`, `trips(search_vector)`, `trip_days(search_vector)`, `trip_points(search_vector)`, `attractions(search_vector)`

## 4. PostgreSQL RLS (Row-Level Security) Policies

- Enable RLS on core tables

**users**
- SELECT/UPDATE only where `id = auth.uid()` or role = 'service'

**spaces**
- SELECT/INSERT/UPDATE/DELETE where:
  - `owner_id = auth.uid()` OR
  - exists in `space_teachers` OR
  - role = 'service'

**trips, trip_days, trip_points, attractions, attendance_lists, headcounts**
- Policies allowing access to users whose `auth.uid()` is linked via spaces/trips or service role

## 5. Additional Notes

- Full-text search vectors updated via trigger on insert/update
- JSONB schema validation for `attendance_lists` can be reinforced with triggers
- Soft deletes handled via `deleted_at` timestamp
- Audit columns managed via triggers or defaults
