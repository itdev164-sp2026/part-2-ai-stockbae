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