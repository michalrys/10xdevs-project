# Product Requirements Document (PRD) - school-trip

## 1. Product Overview

The school-trip is a smartphone-first web application for planning and monitoring school trips in real time. The primary users are Teachers, who create and manage trips, and Students, who view trip details. Unauthenticated users (parents and classmates) can view general trip information without personal or detailed data.

## 2. User Problem

Trip planning on paper or scattered local media is hard to maintain, verify, and access, especially during travel. Teachers need a single accessible platform to create, update, and share trip plans, and to record real-time artifacts (attendance and headcount) while on the trip.

## 3. Functional Requirements

1. Roles and spaces
   - Principal can create spaces (unique slug, description), for example: https://school-trip/xiv-lo-krakow
   - Principal can create Teacher accounts and assign them to spaces
   - Principal can edit, modify, remove spaces and assignemnt Teachers to spaces, and Teachers
2. Accounts and authentication
   - Registration and loging for Principal
   - Teacher accounts created by Principal
   - Teacher account - temporary passwords set by Principal; forced password change on first login
   - Student accounts created by Teachers
   - Student account - temporary passwords set by Teacher; forced password change on first login
   - Password reset via email; minimum length 6 characters
3. Trip management
   - Teachers create trips with start/end dates, title, cost per student, description
   - Add, modify, remove Trip Days
   - Add, modify, delete Trip Points with day, time, title, costs, description, prerequisites, links, hashtag
   - Add, modify, delete Attractions with title, attendance requirements, costs, description, links, hashtag, duration
4. Artifacts dedicated for Teachers
   - Attendance List: interactive form, title, auto-filled checked by, student toggles, accept and timestamp
   - Student Headcount: interactive counter, expected count display, alert on mismatch, accept and timestamp
   - only Teacher can create it
5. Access control and visibility
   - Trip owner (creator) has full edit/delete rights; co-editors have edit rights
   - Students see extended details and artifacts after login
   - Unauthenticated users and Principals see only trip title, description, days, times, attraction titles and descriptions
6. Visualization and navigation
   - Vertical timeline view for trips and days, scroll to navigate forward in time
   - Filter trips by name or by date range
7. Data handling
   - Cascading deletion of trips removes related days, points, attractions, artifacts
   - Data anonymization after retention period (1 week after trip end): replace personal data while preserving relationships
8. Security and compliance
   - Encryption in transit and at rest
   - Role-based access control and row-level security

## 4. Product Boundaries

In scope for MVP:
- Principal-driven space and Teacher account creation
- Teacher-driven trip, day, point, attraction, and artifact management
- Student and unauthenticated views with access restrictions
- Vertical timeline UI and name filter
- Account lifecycle: temporary password, forced change, email reset
- Cascading deletion and GDPR-style anonymization

Out of scope for MVP:
- Student-initiated account creation or join requests
- Alerts, chat, and messaging features
- Photo uploads and approval workflows
- Private messaging between users
- Offline support or PWA
- AI-driven planning or content generation

## 5. User Stories

#### US-001
Title: Create a space
Description: As a Principal, I want to create a space with a unique slug and description so that trip plans are organized by school or class.
Acceptance Criteria:
- Given I am logged in as Principal, when I open the space creation form, then I see fields for slug and description.
- Given I submit valid slug and description, then the space is created and listed.
- Given I submit a duplicate slug, then I see an error message.

#### US-002
Title: Create a Teacher account
Description: As a Principal, I want to create a Teacher account and assign it to a space so that Teachers can manage trips.
Acceptance Criteria:
- Given I am on a space page, when I enter Teacher email, name, and assign to space, then account is created and invitation is sent.
- Given invalid input or duplicate email, then I see an error.

#### US-003
Title: Teacher secure login
Description: As a Teacher, I want to log in securely with email and password so that I can access my assigned spaces.
Acceptance Criteria:
- Given valid credentials, then I am redirected to my dashboard.
- Given invalid credentials, then I see an error message.
- Password must be at least 6 characters.

#### US-004
Title: Teacher change password
Description: As a Teacher, I want to change my password so that I can maintain account security.
Acceptance Criteria:
- Given I access account settings, when I enter current and new password, then password is updated.
- Given incorrect current password or new password too short, then I see an error.

#### US-005
Title: Create Student account
Description: As a Teacher, I want to create Student accounts with username, first name, last name, and temporary password so that Students can log in.
Acceptance Criteria:
- Given I provide unique username, names, and temp password, then Student account is created.
- Given duplicate username or invalid password, then I see an error.

#### US-006
Title: Reissue temporary password
Description: As a Teacher, I want to reissue a temporary password for a Student so that they can regain access.
Acceptance Criteria:
- Given I select a Student, when I click reissue password, then a new temp password is generated and notification is sent.

#### US-007
Title: Student secure login
Description: As a Student, I want to log in with the credentials provided so that I can view trip details.
Acceptance Criteria:
- Given valid credentials, then I am logged in and redirected to my trips.
- Given invalid credentials, then I see an error.

#### US-008
Title: Forced password change on first login
Description: As a Student, I want to be forced to change my temporary password on first login so that my account is secured.
Acceptance Criteria:
- Given I log in with temp password, then I am directed to change password before accessing trips.

#### US-009
Title: Password reset via email
Description: As a Teacher or Student, I want to reset my password via email so that I can regain access if I forget it.
Acceptance Criteria:
- Given I request a reset, then I receive an email with a secure link.
- Given I follow link and enter new password, then my password is updated.

#### US-010
Title: Create a Trip
Description: As a Teacher, I want to create a Trip with dates, title, cost, description, and participant lists so that I can plan the itinerary.
Acceptance Criteria:
- Given valid trip details, then the Trip is created and appears in the timeline.
- Given missing or invalid fields, then I see validation errors.

#### US-011
Title: Add a Trip Day
Description: As a Teacher, I want to add a Day to a Trip so that I can structure the itinerary by date.
Acceptance Criteria:
- Given I select a trip, when I add a date, then the Day appears in the timeline under that trip.

#### US-012
Title: Remove a Trip Day
Description: As a Teacher, I want to remove a Day from a Trip so that I can correct planning errors.
Acceptance Criteria:
- Given I confirm deletion, then the Day and its child points and attractions are removed.

#### US-013
Title: Add a Trip Point
Description: As a Teacher, I want to add a Point to a Trip Day with time, title, cost, description, and prerequisites so that I can define activities.
Acceptance Criteria:
- Given valid point details, then the Point is created under the specified Day.
- Given invalid input, then I see errors.

#### US-014
Title: Edit or delete a Trip Point
Description: As a Teacher, I want to modify or remove a Trip Point so that I can update the plan.
Acceptance Criteria:
- Given I update fields and save, then changes are applied.
- Given I delete a point, then it is removed.

#### US-015
Title: Add an Attraction
Description: As a Teacher, I want to add an Attraction to a Trip Point with attendance rules, costs, description, links, hashtag, and duration.
Acceptance Criteria:
- Given valid attraction details, then the Attraction appears under its Point.
- Given missing required fields, then I see validation errors.

#### US-016
Title: Edit or delete an Attraction
Description: As a Teacher, I want to modify or remove an Attraction so that I can keep the plan accurate.
Acceptance Criteria:
- Given I update fields and save, then changes are applied.
- Given I delete an attraction, then it is removed.

#### US-017
Title: Add an Attendance List
Description: As a Teacher, I want to record student attendance for a Trip Day so that I can track who is present.
Acceptance Criteria:
- Given I open the form, then I see student toggles and accept button.
- Given I mark attendance and accept, then the record is saved with timestamp and my identity.

#### US-018
Title: Add a Student Headcount
Description: As a Teacher, I want to record a headcount for a Trip Day so that I can verify the number of students present.
Acceptance Criteria:
- Given I initiate headcount, then tapping increments counter and shows expected count.
- Given count mismatch, then an alert appears.
- Given I accept, then the record is saved with timestamp and my identity.

#### US-019
Title: Assign co-editor to Trip
Description: As a Trip owner, I want to assign another Teacher as co-editor so that they can help manage the Trip.
Acceptance Criteria:
- Given I select a Teacher and assign edit rights, then they can edit but not delete the Trip.

#### US-020
Title: Delete a Trip
Description: As the Trip owner, I want to delete a Trip so that I can remove outdated plans.
Acceptance Criteria:
- Given I confirm deletion, then the Trip and its Days, Points, Attractions, and Artifacts are removed.

#### US-021
Title: View extended trip details as Student
Description: As a logged-in Student, I want to view Trip details and Artifacts so that I can follow the plan.
Acceptance Criteria:
- Given I am logged in, then I see days, points, attractions, attendance lists, and headcounts.

#### US-022
Title: View public trip data as unauthenticated user
Description: As an unauthenticated user, I want to view basic Trip information so that I can see the itinerary without personal data.
Acceptance Criteria:
- Given I visit the public URL, then I see trip title, description, days with times, and attraction titles and descriptions.

#### US-023
Title: View trip timeline
Description: As any user, I want to see Trips and Days in a vertical timeline with date order so that I can navigate chronologically.
Acceptance Criteria:
- Given I open a space page, then Trips display as a vertical timeline with Days nested and ordered by date.

#### US-024
Title: Filter Trips by name
Description: As a user, I want to filter Trips by title so that I can find specific plans quickly.
Acceptance Criteria:
- Given I enter text in filter input, then the timeline updates to show only matching Trips.

#### US-025
Title: Data anonymization after retention period
Description: As a system, I want to anonymize personal data one week after Trip ends so that GDPR requirements are met.
Acceptance Criteria:
- Given a Trip ended one week ago, then Student and artifact personal fields are replaced with placeholders while relationships remain intact.

## 6. Success Metrics

- One completed 3-day Trip with at least one Attraction, Attendance List, and Headcount recorded.
- Count of plan elements per trip (Days, Points, Attractions, Artifacts) meets target workload.
- Percentage of Attendance Lists where recorded headcount matches expected student count exceeds 95%.
- Average time from Trip creation to ready itinerary under 30 minutes.
- Telemetry events captured for creation, edit, delete actions and login events in logs or admin panel.
