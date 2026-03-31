import {
  Code2,
  Database,
  Figma,
  GitBranch,
  Globe,
  Layout,
  LucideIcon,
  Server,
} from "lucide-react";

type Skill = {
  name: string;
  description: string;
  icon: LucideIcon;
};

const skills: Skill[] = [
  {
    name: "TypeScript",
    description: "Building type-safe React and Next.js applications.",
    icon: Code2,
  },
  {
    name: "Next.js",
    description: "Developing full-stack features with the App Router.",
    icon: Globe,
  },
  {
    name: "Tailwind CSS",
    description: "Designing responsive, utility-first interfaces.",
    icon: Layout,
  },
  {
    name: "Backend APIs",
    description: "Implementing server-side logic and route handlers.",
    icon: Server,
  },
  {
    name: "Databases",
    description: "Working with relational data and query patterns.",
    icon: Database,
  },
  {
    name: "Git & GitHub",
    description: "Using version control for collaborative development.",
    icon: GitBranch,
  },
  {
    name: "UI Prototyping",
    description: "Translating mockups into polished components.",
    icon: Figma,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
          Developer Profile
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ethan Stockbauer
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          I am a web development student focused on building clean, practical
          full-stack applications. I enjoy learning modern tools like Next.js
          and Tailwind CSS while improving both UI and backend skills.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ name, description, icon: Icon }) => (
          <div
            key={name}
            className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <h3 className="font-semibold leading-none">{name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          ))}
        </div>
      </section>
    </div>
  );
}
