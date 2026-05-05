import { ProjectForm } from "@/components/project-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
          Project Portfolio
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">New Project</h1>
        <p className="max-w-3xl text-muted-foreground">
          Add a new project to your Supabase portfolio.
        </p>
      </section>

      <Card className="border-border/80 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Fill out the form below. All fields are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
