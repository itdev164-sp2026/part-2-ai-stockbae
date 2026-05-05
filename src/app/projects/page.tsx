import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

type ProjectStatus = "active" | "completed" | "archived";

type Project = {
  id: string;
  title: string;
  description: string | null;
  status: ProjectStatus;
};

function getStatusBadgeClasses(status: string) {
  switch (status) {
    case "active":
      return "border-green-200 bg-green-50 text-green-700";
    case "completed":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "archived":
      return "border-gray-200 bg-gray-100 text-gray-700";
    default:
      return "border-border bg-muted text-muted-foreground";
  }
}

function formatStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default async function ProjectsPage() {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, description, status")
    .order("title", { ascending: true });

  const projects = (data ?? []) as Project[];

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
              Project Portfolio
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Projects</h1>
            <p className="max-w-3xl text-muted-foreground">
              Current and completed work pulled directly from Supabase.
            </p>
          </div>

          <Button asChild>
            <Link href="/projects/new">New Project</Link>
          </Button>
        </div>
      </section>

      {error ? (
        <Card>
          <CardHeader>
            <CardTitle>Unable to load projects</CardTitle>
            <CardDescription>
              We could not fetch records from Supabase right now. Please verify your table and
              environment variables.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : projects.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No projects found</CardTitle>
            <CardDescription>
              Add records to the projects table and they will appear here.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="h-full border-border/80 bg-card/70 shadow-sm">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClasses(project.status)}`}
                  >
                    {formatStatus(project.status)}
                  </span>
                </div>
                <CardDescription>
                  {project.description?.trim() || "No description provided yet."}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}
