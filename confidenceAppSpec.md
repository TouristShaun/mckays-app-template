**Comprehensive Application Specification with Full Goals Features & Bit-Assisted Decomposition**

The specification covers the application’s overview, UX design, data objects, actions, APIs, and the Bit’s ability to decompose goals on behalf of the user, along with tmux-integrated environment awareness.

---

## Overview

This application is a platform for individuals building meaningful solopreneur businesses. It features:

- **MeaningfulPath Bit (AI Persona):** Guides users at every stage, from exploring purpose to launching and growing their business.
- **Goal Management:** Users can define business goals, track progress, and create sub-goals to break down large tasks.
- **Bit-Assisted Decomposition:** The Bit can automatically generate sub-goals for complex objectives, leveraging GPT-based guidance and internal metaprompt actions.
- **Metaprompt Control System:** A back-end architecture allows the Bit to perform CRUD operations, run tmux commands (for environment monitoring), and log all actions for complete transparency.

**Tech Stack:** Next.js (App Router), Tailwind, Shadcn UI, Framer Motion, Postgres (Supabase), Drizzle ORM, Clerk (Auth), Stripe (Payments), Deployed on Vercel.

---

## UX Design

### Core Screens & Interactions

1. **Public Homepage**
   - **Content:** Introduces the MeaningfulPath Bit and its services.
   - **Interactions:** User selects their current stage:
     - "I’m Exploring My Purpose"
     - "I Have an Idea but Need Direction"
     - "I’m Ready to Grow My Business"
   - **Outcome:** GPT responds with guidance. User can then sign up/sign in to access the dashboard.

2. **Authenticated Dashboard**
   - **Content:** Personalized greeting, links to Goals and Resources.
   - **State Handling:** Loading (initial), Idle (data loaded).

3. **Goals Page**
   - **List View:** Displays user’s goals with title, description, status (not_started, in_progress, completed), and a progress indicator (based on sub-goals).
   - **Goal Detail View:** Shows sub-goals and offers a "Decompose with Bit" action button to request AI-driven breakdown.
   - **Create Goal Form:** User inputs title, description, and can (optionally) request initial sub-goal suggestions from the Bit.

4. **Resources Page**
   - **Content:** Curated guides, templates, and checklists.
   - **State Handling:** Loading, Display.

5. **Metaprompt/Developer View (Admin)**
   - **Content:** Lists metaprompt sessions, commands, and tmux logs.
   - **Use:** Admins or developers inspect the Bit’s actions, ensuring transparency and debugging.

### User Flows

**Onboarding Flow:**
1. User selects stage on homepage, sees GPT guidance.
2. User signs up via Clerk, lands in dashboard.

**Goal Creation & Decomposition Flow:**
1. User creates a goal: "Launch a marketing campaign."
2. Opens goal detail: sees "Decompose with Bit" button.
3. Click button -> Bit uses metaprompt action to generate sub-goals (e.g. "Define target audience", "Create landing page").
4. Sub-goals appear; user can mark them completed as they progress.

**Updating Progress:**
- User marks sub-goal as completed.
- System updates main goal’s progress (e.g., 1/4 sub-goals completed = 25% progress).

---

## Data Objects

**User**
- `id`, `email`, `name`

**Goal**
- `id`, `userId`, `title`, `description`, `status` (not_started, in_progress, completed), `createdAt`, `updatedAt`
- `progress` (derived): Calculated from completion ratio of sub-goals.

**SubGoal**
- `id`, `goalId`, `title`, `description`, `status`, `createdAt`, `updatedAt`
- `goalId` references `goals.id`.

**Resource**
- Static entries with `title`, `link`, `description`.

**Metaprompt Session**
- `id`, `userId`, `bitId`, `createdAt`, `updatedAt`
- Tracks a continuous conversation context for the Bit’s control actions.

**Metaprompt Command**
- `id`, `sessionId`, `commandType` (create/read/update/delete/tmux), `resource`, `commandContent`, `createdAt`
- Logs each command the Bit executes on behalf of user.

**Metaprompt Tmux Log**
- `id`, `sessionId`, `tmuxCommand`, `output`, `createdAt`
- Stores output from tmux commands for environment awareness.

---

## Actions

**User Actions (Frontend):**
- **Select Stage on Homepage:** User input triggers GPT guidance.
- **Create Goal:** Submit title/description -> `POST /api/goals`.
- **View & Update Goals:** `GET /api/goals`, `PATCH /api/goals/{id}`.
- **Create Sub-Goal:** `POST /api/sub-goals` linked to a parent goal.
- **Mark Goal/Sub-Goal Status:** `PATCH /api/goals/{id}` or `PATCH /api/sub-goals/{id}`.
- **Request Bit Decomposition:** `POST /api/goals/{id}/decompose`.

**Bit Actions (Backend via Metaprompt):**
- **Decompose Goal:** Takes a goalId, fetches details, prompts GPT for sub-goals, inserts them into `sub_goals`.
- **Record Command:** Insert command record in `metaprompt_commands`.
- **Run Tmux Command:** Execute shell command, store output in `metaprompt_tmux_logs`.
- **Create Metaprompt Session:** Insert into `metaprompt_sessions`.

---

## APIs

**Pseudo-DSL Specification:**
```yaml
- name: GET /api/generate-guidance
  description: Returns GPT guidance based on user stage
  request:
    query: { userInput: string }
  response:
    data: { guidance: string }

- name: POST /api/goals
  description: Create a new goal
  request:
    body: { userId: string, title: string, description: string }
  response:
    data: { isSuccess: boolean, goalId: string }

- name: GET /api/goals
  description: Retrieve user goals
  request:
    query: { userId: string }
  response:
    data: [ { id: string, title: string, description: string, status: string, progress: number } ]

- name: GET /api/goals/{id}
  description: Get details of a specific goal and its sub-goals
  request:
    params: { id: string }
  response:
    data: {
      id: string,
      title: string,
      description: string,
      status: string,
      progress: number,
      subGoals: [{ id: string, title: string, description: string, status: string }]
    }

- name: POST /api/sub-goals
  description: Create a new sub-goal under a goal
  request:
    body: { goalId: string, title: string, description: string }
  response:
    data: { isSuccess: boolean, subGoalId: string }

- name: PATCH /api/goals/{id}
  description: Update main goal status
  request:
    params: { id: string }
    body: { status: string }
  response:
    data: { isSuccess: boolean }

- name: PATCH /api/sub-goals/{id}
  description: Update sub-goal status
  request:
    params: { id: string }
    body: { status: string }
  response:
    data: { isSuccess: boolean }

- name: POST /api/goals/{id}/decompose
  description: Request the Bit to decompose a goal into sub-goals
  request:
    params: { id: string }
  response:
    data: { isSuccess: boolean, message: string }

- name: GET /api/resources
  description: Retrieve a list of curated resources
  response:
    data: [ { title: string, link: string, description: string } ]

- name: POST /api/metaprompt/session
  description: Create a metaprompt session
  request:
    body: { userId: string, bitId: string }
  response:
    data: { sessionId: string }

- name: POST /api/metaprompt/command
  description: Record a metaprompt command
  request:
    body: { sessionId: string, commandType: string, resource: string, commandContent: string }
  response:
    data: { isSuccess: boolean }

- name: POST /api/metaprompt/tmux
  description: Run a tmux command and log output
  request:
    body: { sessionId: string, tmuxCommand: string }
  response:
    data: { output: string }
```

---

## Bit Decomposition Flow Detail

When a user clicks "Decompose with Bit":

1. The front-end calls `POST /api/goals/{id}/decompose`.
2. Backend starts a metaprompt session if needed or uses an existing one.
3. Bit reads the goal info, prompts GPT: "Break this goal into actionable steps."
4. GPT returns suggestions.
5. Bit records a "create" command for `sub_goals`, then inserts the suggested sub-goals into the database.
6. Sub-goals appear on the UI, enabling the user to track completion step-by-step.

**Example DSL Snippet for Metaprompt Command:**
```
metaprompt_session:
  userId: "user-123"
  bitId: "meaningfulpath-bit"

command:
  type: "create"
  resource: "sub_goals"
  commandContent: {
    "action": "decompose_goal",
    "goalId": "goal-xyz",
    "suggestedSubGoals": [
      { "title": "Define target audience", "description": "Identify ideal customer" },
      { "title": "Create landing page", "description": "Design and publish page" }
    ]
  }
```

---

## Additional Considerations

- **Permissions & Auth:** Only the user who owns the goal can update it. The Bit acts on behalf of the user within a metaprompt session that checks `userId`.
- **Performance & Indexing:** 
  - Index `goalId` in `sub_goals`.
  - Index `userId` in `goals` and `metaprompt_sessions`.
- **Future Enhancements:** 
  - Notifications when certain progress thresholds are met.
  - Advanced analytics, Stripe integration for premium features.
  - More sophisticated Bit interactions, including scheduling and context retention across sessions.

---

**End of Comprehensive Spec**