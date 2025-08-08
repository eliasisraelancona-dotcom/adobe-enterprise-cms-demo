## Q&A Feature: Audience Questions Management

### Overview
The Q&A feature enables admins to capture audience questions during sessions, provide answers immediately or later, and track status (Open, Answered, Deferred). It leverages Keystone lists for instant Admin UI CRUD, with an optional triage page for convenience.

### Data Model
- List: `Question`
  - `question` (text, required)
  - `answer` (rich document)
  - `status` (enum: OPEN, ANSWERED, DEFERRED; default OPEN)
  - `askedBy` (relationship → `User`, optional)
  - `askedAt` (timestamp, default now)
  - `answeredAt` (timestamp, auto-set when status becomes ANSWERED)

Hook: When `status` transitions to `ANSWERED`, `answeredAt` is set automatically.

### Admin UI
- The `Question` list appears in the Admin UI with sensible columns and sort.
- Custom navigation adds a `Questions` link near `Tags` for quick access.
- Optional page at `/questions` renders a triage list with links to create/open records.

### Usage
1. Go to Admin UI → Questions.
2. Click "Create" to add a new question; fill in `question` now, `answer` later.
3. When answered, set `status = ANSWERED`; `answeredAt` auto-populates.

### Security
- Currently `allowAll` for demo speed. For production, wire to role permissions in `access.ts` (e.g., only Admins/Content Managers can create/update; others read-only).

### Extensibility Ideas
- Attach Questions to specific `Brand`, `Content`, or `Asset` for context.
- Add comment threads or assignments for follow-up owners.
- Notifications when status changes to ANSWERED.

