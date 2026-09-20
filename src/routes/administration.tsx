import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminUsers, roles, permissionMatrix } from "@/lib/mock-data";

export const Route = createFileRoute("/administration")({
  head: () => ({
    meta: [
      { title: "Administration — HR Order Management System" },
      {
        name: "description",
        content: "Manage users, roles and permissions for the HR order workflow.",
      },
      { property: "og:title", content: "Administration — HR Order Management System" },
      { property: "og:description", content: "User, role and permission configuration." },
    ],
  }),
  component: AdministrationPage,
});

function Flag({ on }: { on: boolean }) {
  return on ? (
    <Check className="size-4 text-[oklch(0.5_0.13_155)]" />
  ) : (
    <X className="size-4 text-muted-foreground" />
  );
}

function AdministrationPage() {
  return (
    <AppShell title="Administration" description="Users, roles and permissions (display only)">
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <Card className="border-border bg-card shadow-xs">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="font-semibold text-foreground">Name</TableHead>
                    <TableHead className="font-semibold text-foreground">Login</TableHead>
                    <TableHead className="font-semibold text-foreground">Role</TableHead>
                    <TableHead className="font-semibold text-foreground">Permissions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUsers.map((u) => (
                    <TableRow key={u.login} className="hover:bg-muted/30">
                      <TableCell className="font-semibold text-foreground">{u.name}</TableCell>
                      <TableCell className="text-muted-foreground">{u.login}</TableCell>
                      <TableCell>
                        <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                          {u.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1.5">
                          {u.permissions.map((p) => (
                            <span
                              key={p}
                              className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground font-medium"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {roles.map((r) => (
              <Card key={r.role} className="border-border bg-card shadow-xs">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold text-foreground">{r.role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{r.description}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wider text-primary">{r.users} users assigned</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="mt-4">
          <Card className="border-border bg-card shadow-xs">
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="font-semibold text-foreground">Permission</TableHead>
                    <TableHead className="text-center font-semibold text-foreground">HR User</TableHead>
                    <TableHead className="text-center font-semibold text-foreground">HR Reviewer</TableHead>
                    <TableHead className="text-center font-semibold text-foreground">HR Head</TableHead>
                    <TableHead className="text-center font-semibold text-foreground">Signatory</TableHead>
                    <TableHead className="text-center font-semibold text-foreground">Administrator</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissionMatrix.map((p) => (
                    <TableRow key={p.permission} className="hover:bg-muted/30">
                      <TableCell className="font-semibold text-foreground">{p.permission}</TableCell>
                      {[p.hrUser, p.reviewer, p.head, p.signatory, p.admin].map((v, i) => (
                        <TableCell key={i}>
                          <div className="flex justify-center">
                            <Flag on={v} />
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
