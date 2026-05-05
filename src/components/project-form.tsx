"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

import { createProjectAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema, type Project } from "@/lib/schemas";

const statusOptions: Array<{ label: string; value: Project["status"] }> = [
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Archived", value: "archived" },
];

export function ProjectForm() {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "active",
    },
  });

  const onSubmit = async (values: Project) => {
    const result = await createProjectAction(values);

    if (!result.success) {
      toast.error("Could not create project", {
        description: result.error,
      });
      return;
    }

    toast.success("Project created successfully");
    reset({
      title: "",
      description: "",
      status: "active",
    });
    router.push("/projects");
    router.refresh();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input
          id="title"
          placeholder="Project title"
          aria-invalid={!!errors.title}
          {...register("title")}
        />
        <FieldError errors={[errors.title]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="description">Description</FieldLabel>
        <Textarea
          id="description"
          placeholder="Describe the project"
          rows={4}
          aria-invalid={!!errors.description}
          {...register("description")}
        />
        <FieldError errors={[errors.description]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="status">Status</FieldLabel>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="status" aria-invalid={!!errors.status} className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[errors.status]} />
            </>
          )}
        />
      </Field>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Project"}
      </Button>
    </form>
  );
}
