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
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Login</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Permissions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUsers.map((u) => (
                    <TableRow key={u.login}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell className="text-muted-foreground">{u.login}</TableCell>
                      <TableCell>
                        <span className="inline-flex rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-primary">
                          {u.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1.5">
                          {u.permissions.map((p) => (
                            <span
                              key={p}
                              className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
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
              <Card key={r.role}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{r.role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{r.description}</p>
                  <p className="mt-3 text-sm font-medium text-foreground">{r.users} users assigned</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="mt-4">
          <Card>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permission</TableHead>
                    <TableHead className="text-center">HR User</TableHead>
                    <TableHead className="text-center">HR Reviewer</TableHead>
                    <TableHead className="text-center">HR Head</TableHead>
                    <TableHead className="text-center">Signatory</TableHead>
                    <TableHead className="text-center">Administrator</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissionMatrix.map((p) => (
                    <TableRow key={p.permission}>
                      <TableCell className="font-medium">{p.permission}</TableCell>
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
