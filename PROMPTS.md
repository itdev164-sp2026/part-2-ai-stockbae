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