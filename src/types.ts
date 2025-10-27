// src/types.ts

import { Database } from './db/database.types';

// 1. Users

/** Request body for registering a new user */
export type RegisterUserDto = {
  email: string;
  password: string;
  role: Database['public']['Enums']['user_role'];
  username: string;
};

/** Response after registering or fetching a user */
export type UserResponseDto = Pick<
  Database['public']['Tables']['users']['Row'],
  'id' | 'email' | 'role'
>;

/** Request body for user login */
export type LoginDto = {
  email: string;
  password: string;
};

/** Response body for successful login */
export type LoginResponseDto = {
  access_token: string;
  expires_in: number;
};

/** Request body for initiating password reset */
export type ForgotPasswordDto = {
  email: string;
};

/** Generic `{ message: string }` response */
export type MessageResponseDto = {
  message: string;
};

/** Request body for completing password reset */
export type ResetPasswordDto = {
  access_token: string;
  new_password: string;
};

/** Request body for changing password when authenticated */
export type ChangePasswordDto = {
  current_password: string;
  new_password: string;
};

// 2. Spaces

/** Query parameters for listing spaces */
export type GetSpacesQueryDto = {
  slug?: string;
  owner_id?: string;
  page?: number;
  limit?: number;
};

/** Generic pagination wrapper */
export type PaginatedResponseDto<T> = {
  data: T[];
  meta: {
    page: number;
    total: number;
  };
};

/** Minimal space representation */
export type SpaceDto = Pick<
  Database['public']['Tables']['spaces']['Row'],
  'id' | 'slug' | 'owner_id'
>;

/** Request body for creating a space */
export type CreateSpaceDto = Pick<
  Database['public']['Tables']['spaces']['Insert'],
  'slug' | 'description'
>;

/** Full space with its trips */
export type SpaceDetailDto = Database['public']['Tables']['spaces']['Row'] & {
  trips: TripDto[];
};

/** Request body for updating a space */
export type UpdateSpaceDto = Pick<
  Database['public']['Tables']['spaces']['Update'],
  'description'
>;

/** Request body for assigning a teacher to a space */
export type AssignTeacherToSpaceDto = Pick<
  Database['public']['Tables']['space_teachers']['Insert'],
  'teacher_id'
>;

// 3. Teacher & Student Assignment

/** Request body for adding students to a trip */
export type AddStudentsToTripDto = {
  student_ids: string[];
};

/** Request body for adding co-teachers to a trip */
export type AddTeachersToTripDto = {
  teacher_ids: string[];
};

// 4. Trips & Calendar

/** Query parameters for listing trips in a space */
export type GetTripsQueryDto = {
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
};

/** Minimal trip representation */
export type TripDto = Pick<
  Database['public']['Tables']['trips']['Row'],
  'id' | 'title' | 'start_date' | 'end_date' | 'description' | 'owner_id' | 'space_id'
>;

/** Request body for creating a trip */
export type CreateTripDto = Pick<
  Database['public']['Tables']['trips']['Insert'],
  'title' | 'start_date' | 'end_date' | 'description'
>;

/** Request body for updating trip metadata */
export type UpdateTripDto = Pick<
  Database['public']['Tables']['trips']['Update'],
  'title' | 'start_date' | 'end_date' | 'description'
>;

/** Full trip details with days, attendance, and headcounts */
export type TripDetailDto = TripDto & {
  days: TripDayDetailDto[];
  attendances: AttendanceListDto[];
  headcounts: HeadcountDto[];
};

// 5. Trip Days

/** Request body for adding a day to a trip */
export type CreateTripDayDto = Pick<
  Database['public']['Tables']['trip_days']['Insert'],
  'date' | 'title' | 'description'
>;

/** Minimal trip day representation */
export type TripDayDto = Pick<
  Database['public']['Tables']['trip_days']['Row'],
  'id' | 'date' | 'title' | 'description' | 'trip_id'
>;

/** Request body for updating a trip day */
export type UpdateTripDayDto = Pick<
  Database['public']['Tables']['trip_days']['Update'],
  'date' | 'title' | 'description'
>;

/** Trip day with its points */
export type TripDayDetailDto = TripDayDto & {
  points: TripPointDetailDto[];
};

// 6. Trip Points

/** Request body for adding a point to a trip day */
export type CreateTripPointDto = Pick<
  Database['public']['Tables']['trip_points']['Insert'],
  'time' | 'title' | 'description' | 'position'
>;

/** Minimal trip point representation */
export type TripPointDto = Pick<
  Database['public']['Tables']['trip_points']['Row'],
  'id' | 'time' | 'title' | 'description' | 'position' | 'trip_day_id'
>;

/** Request body for updating a trip point */
export type UpdateTripPointDto = Pick<
  Database['public']['Tables']['trip_points']['Update'],
  'time' | 'title' | 'description' | 'position'
>;

/** Trip point with its attractions */
export type TripPointDetailDto = TripPointDto & {
  attractions: AttractionDto[];
};

// 7. Attractions

/** Request body for adding an attraction */
export type CreateAttractionDto = Pick<
  Database['public']['Tables']['attractions']['Insert'],
  'title' | 'description' | 'cost' | 'duration' | 'hashtags'
>;

/** Minimal attraction representation */
export type AttractionDto = Pick<
  Database['public']['Tables']['attractions']['Row'],
  'id' | 'title' | 'description' | 'cost' | 'duration' | 'hashtags'
>;

/** Request body for updating an attraction */
export type UpdateAttractionDto = Pick<
  Database['public']['Tables']['attractions']['Update'],
  'title' | 'description' | 'cost' | 'duration' | 'hashtags'
>;

// 8. Attendance

/** Single attendance record */
export type AttendanceRecordDto = {
  student_id: string;
  present: boolean;
};

/** Request body for recording attendance on a trip day */
export type RecordAttendanceDto = {
  attendance: AttendanceRecordDto[];
};

/** Detailed attendance list entry */
export type AttendanceListDto = Pick<
  Database['public']['Tables']['attendance_lists']['Row'],
  'id' | 'attendance' | 'remarks' | 'teacher_id' | 'trip_day_id' | 'created_at'
> & {
  // Override raw JSON with typed record array
  attendance: AttendanceRecordDto[];
};

// 9. Headcounts

/** Request body for recording headcount */
export type RecordHeadcountDto = Pick<
  Database['public']['Tables']['headcounts']['Insert'],
  'count' | 'expected_count'
>;

/** Detailed headcount entry */
export type HeadcountDto = Pick<
  Database['public']['Tables']['headcounts']['Row'],
  'id' | 'count' | 'expected_count' | 'remarks' | 'teacher_id' | 'trip_day_id' | 'created_at'
>;