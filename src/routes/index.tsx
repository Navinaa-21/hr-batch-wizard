import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign In — HR Order Management System" },
      {
        name: "description",
        content:
          "Sign in to the HR Order Management System to prepare, approve and archive employee orders in bulk.",
      },
      { property: "og:title", content: "Sign In — HR Order Management System" },
      {
        property: "og:description",
        content: "Internal HR portal for bulk employee order processing.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <FileSignature className="size-6" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            HR Order Management System
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Internal portal for employee order processing
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/dashboard" });
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email / Employee ID</Label>
                <Input id="email" placeholder="hr.user@company.com" defaultValue="hr.user@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" defaultValue="prototype" />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Prototype build — sample data only. Access is restricted to authorised HR personnel.
        </p>
      </div>
    </div>
  );
}
