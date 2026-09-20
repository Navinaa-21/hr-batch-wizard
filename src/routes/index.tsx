import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
          <img
            src="/sakthi-auto-logo.png"
            alt="Sakthi Auto Logo"
            className="h-16 w-auto object-contain mb-4"
          />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Sakthi Auto Component Ltd.
          </h1>
          <p className="mt-1 text-sm text-muted-foreground font-medium">
            HR Order Management System
          </p>
        </div>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/dashboard" });
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">Email / Employee ID</Label>
                <Input id="email" placeholder="hr.user@sakthiauto.com" defaultValue="hr.user@sakthiauto.com" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                <Input id="password" type="password" defaultValue="prototype" className="bg-background" />
              </div>
              <Button asChild type="submit" className="w-full font-semibold shadow-none">
                <Link to="/dashboard">Sign In to HR Portal</Link>
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Sakthi Auto Internal System &bull; Authorised Personnel Only
        </p>
      </div>
    </div>
  );
}
