# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I asked:**
> Look at the existing src/app/page.tsx and src/app/layout.tsx in this project.
Replace the current homepage content with a "Developer Profile" page for me.
It should include:
- My name: [Your Name]
- A short bio (1-2 sentences about being a web development student)
- A "Skills" section that displays at least 6 skills in a responsive
  Tailwind CSS grid (use cards with icons from lucide-react)

Keep the existing Header component and layout structure intact.
If you need to create new components, go ahead and create them in
the src/components/ folder.


**What happened:**
The agent seemed to understand what I needed right away. It edited the page.tsx file to add my name, bio, and skills section. It also checked for errors after making the changes.

### Prompt 2
**What I asked:**
The skills grid should use sm:grid-cols-2 lg:grid-cols-3 for responsive
breakpoints. Can you update that?

**What happened:**
Because the agent had already met this requirement after the previous prompt, it only checked the page.tsx file and verified that sm:grid-cols-2 lg:grid-cols-3 were being used. No changes were made.

### Reflection
It seems like a very powerful tool for productivity. It feels like with a larger more complex prompt the AI could start to make changes that are unintended or that you don't understand and would need future modification. At this point I think it is best for me to use clear and targeted prompts to make very directed changes instead of complex broad changes.


## Activity 2: Building the Dashboard Shell

### Prompt 1

**What I asked:**

Using the shadcn sidebar components that are now in my src/components/ui/ folder,
create a professional, collapsible dashboard layout. It should include:

1. A sidebar (src/components/app-sidebar.tsx) with navigation links for:
   - Overview (use the Home icon from lucide-react)
   - Projects (use the FolderOpen icon)
   - Settings (use the Settings icon)

2. A top navigation area with breadcrumbs showing the current page.

3. A main content area that wraps the existing page content.

4. Update src/app/layout.tsx to use the new SidebarProvider and sidebar layout.

Important: Preserve the Developer Profile content from Activity 1 in
src/app/page.tsx — it should appear in the main content area of the new layout.
Keep the dark mode toggle working.

**What happened:**

It added the sidebar component and dashboard shell, following all specifications.
It also updated layout.tsx to use the sidebar layout and SidebarProvider.

### Prompt 2

**What I asked:**

I am getting a runtime error `Tooltip` must be used within `TooltipProvider` referring
to line 24 in the tooltip.tsx file. 

**What happened:**

It fixed the issue first try by wrapping the dashboard layout tree with TooltipProvider
in the dashboard-shell.tsx file.

### Reflection

It didn't delete anything I wanted to preserve from activity 1, but it seems important to
instruct it which existing code should or shouldn't be changed. It did create a runtime error
on the first prompt which was unexpected, but also fixed it easily with a follow up prompt.





## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**

Using the Supabase client at src/lib/supabase.ts, create a new Server Component
at src/app/projects/page.tsx that:

1. Fetches all records from the "projects" table in Supabase
2. Displays them in a professional layout using shadcn/ui Card components
   (run `npx shadcn@latest add card` if needed)
3. Each card should show the project title, description, and a status badge
4. The status badge should be color-coded:
   - "active" = green
   - "completed" = blue
   - "archived" = gray

Use @workspace context to match the styling of our existing Dashboard.
This must be a React Server Component (async function, no "use client").
Do NOT use useEffect or useState for data fetching.

**What happened:**

The agent used async/await on the first try and I did not have to correct it. It added a shadcn Card component
in card.tsx and a new async server route at page.tsx. After completing this the agent validated its own work and
checked for the async function component and that is didnt use useEffect/useState data fetching.

### Prompt 2

**What I asked:**

The breadcrumb in src/app/layout.tsx always shows "Overview" because the page
name is hardcoded. Extract the breadcrumb into its own client component at
src/components/breadcrumb-nav.tsx that uses usePathname() from next/navigation
to display the correct page name. Map "/" to "Overview", "/projects" to
"Projects", and "/settings" to "Settings". Keep "ITDEV-164" as the first
breadcrumb segment. Then update layout.tsx to use the new component.


**What happened:**

My project already had a functioning breadcrumb from the last activity, but the logic was in
the shell component. The agent put the logic into breadcrumb-nav.tsx and used usePathname()
from next/navigation. It updated dashboard-shell.tsx to use the new component.

### Reflection

> How does fetching data on the server feel different from the useEffect
> pattern you used in Web Programming 1? What are the advantages you
> noticed? Did anything surprise you about how simple server-side
> data fetching is in the App Router?

Fetching data on the server is lot cleaner than the useEffect pattern. With useEffect, I had to render first, then fetch, manage loading/error state, and handle extra client-side logic. In the App Router, I can just use async/await directly in the page, so the data is ready when the page loads. There is less boilerplate and better initial page load behavior.




## Activity 4: AI-Driven Forms & Validation

### Prompt 1

**What I asked:**

Create a Zod validation schema in a new file src/lib/schemas.ts for a "Project"
with the following fields:

- title: string, minimum 3 characters, with a custom error message
  "Title must be at least 3 characters"
- description: string, minimum 10 characters, with a custom error message
  "Description must be at least 10 characters"
- status: enum with values "active", "completed", "archived"

Export the schema and also export the inferred TypeScript type using z.infer.

**What happened:**

The agent successfully created the schema and exported both the schema and the inferred type. The custom error messages looked descriptive and were used on both the minimum character fields.

### Prompt 2

**What I asked:**

Using the Zod schema from src/lib/schemas.ts, do the following:

1. Create a form component at src/components/project-form.tsx that:
   - Is a Client Component ("use client") because it uses react-hook-form hooks
   - Uses react-hook-form with the zodResolver from @hookform/resolvers for validation
   - Uses shadcn/ui Field, FieldLabel, and FieldError for field layout
   - Uses shadcn/ui Input for title, Textarea for description, and Select for status
   - Shows inline error messages under each field when validation fails
   - Has a "Create Project" submit button
   - Shows a sonner toast notification on successful submission

2. Create a Server Action at src/app/actions.ts that:
   - Has "use server" at the top of the file
   - Accepts the validated form data
   - Validates it again with the Zod schema (server-side validation)
   - Inserts the validated data into the Supabase "projects" table
   - Returns a success or error response

3. Create a new page at src/app/projects/new/page.tsx that renders
   the project form within the dashboard layout.

4. Add a "New Project" button to the existing projects page
   (src/app/projects/page.tsx) that links to /projects/new.

Use @workspace to match the existing project styling.


**What happened:**

The agent created the form successfully. The styling looks like it should and the zod schema was used for both client side and server side validation.


### Reflection

> How does the Schema-First approach with Zod change the way you think
> about forms? How does it help prevent "junk data" from entering the
> database? Compare this to how you handled form validation in
> previous courses.

This seems like a very clean and consistent way to do form data validation. It is also easy to modify the schema compared to modifying if-else checks scattered all over the place. Previously, if the validation logic at different layers is inconsistent or conflicts you could get partial pieces of data or other inconsistencies that get sent to the database. Having the same set of checks at every layer makes a lot more sense.




## Activity 5: Securing the App with Supabase Auth

### Prompt 1

**What I asked:**

Implement a complete email/password authentication flow for this Next.js 15
App Router project using @supabase/ssr. Here is what I need:

1. SUPABASE CLIENTS: Create server-side Supabase client utilities in
   src/lib/supabase/ that work correctly with Next.js cookies. I need
   separate clients for Server Components, Server Actions, and Middleware.

2. LOGIN PAGE: Create a page at src/app/(auth)/login/page.tsx with a
   shadcn/ui card-based login form. It should support both "Sign In"
   and "Sign Up" (toggle between them or use tabs). Handle the auth
   via Server Actions, not client-side fetch.

3. MIDDLEWARE: Create a middleware.ts file at src/middleware.ts (next to
   the app directory — Next.js looks for middleware as a sibling of app)
   that:
   - Refreshes the user's auth session on every request
   - Protects the /projects routes — redirect unauthenticated users to /login
   - Allows unauthenticated access to /login
   - Uses supabase.auth.getUser() (NOT getSession()) for verification

4. SIGN OUT: Add a "Sign Out" button to the existing sidebar component
   (src/components/app-sidebar.tsx) that calls a Server Action to sign
   the user out and redirect to /login. The button must only render
   when an authenticated user is present — pass the user as a prop from
   the root layout (which will need to fetch it via the server Supabase
   client) and gate the Sign Out UI on that prop.

5. UPDATE DATA QUERIES: Modify the projects page and the create-project
   Server Action to use the authenticated Supabase client so that RLS
   policies filter data per user.

Use @workspace to understand the existing project structure. Do not remove
or break existing functionality — integrate auth around it.


**What happened:**

> (How many files did the Agent create or modify? Did it handle
> middleware, login page, sign out, and data scoping all in one pass?)

It modified 10 files and did everything I asked on the first pass. The login
page functions and the middleware protects routes and uses getUser() and not
getSession().


### Reflection

> How did the Agent handle the creation of middleware.ts? Did you have
> to manually add files to the Working Set for context? What surprised
> you about how many files needed to change to add authentication?
> How does middleware-based auth compare to checking login status
> inside each page component?

Middleware seems like a much better and more secure authentication method
because it is centralized instead of spreading authentication around on each
page individually. The number of files that changed was about what I expected,
maybe a couple more. I manually added files to context and the agent seemed to
do a really clean job.



## Activity 6: Deployment, Webhooks, & AI-Testing

### Prompt 1

**What I asked:**

I have a Next.js app with Supabase Auth. Using @workspace context to
understand the app structure, write an End-to-End (E2E) test file at
tests/auth.spec.ts using Playwright.

The tests should verify:

1. LOGIN PAGE VISIBLE: Navigate to /login and confirm the login form
   is visible (check for email input, password input, and submit button).

2. REDIRECT AFTER LOGIN: After a successful login with valid credentials,
   the user is redirected to the dashboard or projects page.

3. SIDEBAR NAVIGATION: After login, verify that the sidebar navigation
   links are visible: "Overview", "Projects", and "Settings".

Requirements:
- Use role-based locators (getByRole, getByLabel, getByText) instead of
  CSS selectors or test IDs. This makes tests more accessible and resilient
  to UI changes.
- Add clear test descriptions that explain what each test verifies.
- Handle the async nature of navigation and page loads with proper
  Playwright waiting strategies.
- Read test credentials from process.env.TEST_USER_EMAIL and
  process.env.TEST_USER_PASSWORD. Do not hardcode credentials. If those
  variables are not set, the credentialed tests should skip with a clear
  message rather than fail.

**What happened:**

> (Did the Agent use role-based locators? Did it understand the auth
> flow from your workspace context? Did the tests pass on the first run?)

### Prompt 2

**What I asked:**

This Playwright test is failing with the following error:
3 failed
    tests\auth.spec.ts:18:5 › Login page is visible with email, password, and submit controls ──────
    tests\auth.spec.ts:35:7 › Authenticated auth flow › Redirects to the dashboard after a successful login 
    tests\auth.spec.ts:40:7 › Authenticated auth flow › Shows the sidebar navigation links after login 

Look at the actual component code in @workspace and fix the test
to match the real UI. Use role-based locators.

**What happened:**

> (Describe the iterative process — how many rounds did it take
> to get the tests passing?)

### Reflection

> How does having an AI write and run tests change your confidence in
> "hitting the deploy button"? Did the Agent catch anything you would
> have missed? How does this compare to manually testing in the browser?

### Course Reflection

> Look back at your complete PROMPTS.md from Activity 1 to Activity 6.
> How has your prompting strategy evolved? What do you do differently
> now compared to your first prompt in Activity 1? What is the most
> important thing you learned about working with AI coding tools?
