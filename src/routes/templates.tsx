import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { templates } from "@/lib/mock-data";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — HR Order Management System" },
      {
        name: "description",
        content: "Manage order document templates for increment, promotion and grade change orders.",
      },
      { property: "og:title", content: "Templates — HR Order Management System" },
      { property: "og:description", content: "Order document template management." },
    ],
  }),
  component: TemplatesPage,
});

function TemplatesPage() {
  const [dialog, setDialog] = useState<{ mode: "create" | "edit" | "view"; name: string } | null>(
    null,
  );

  return (
    <AppShell
      title="Templates"
      description="Document templates used for order generation"
      actions={
        <Button onClick={() => setDialog({ mode: "create", name: "" })}>
          <Plus className="size-4" />
          Create Template
        </Button>
      }
    >
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template Name</TableHead>
                  <TableHead>Order Type</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((t) => (
                  <TableRow key={t.name}>
                    <TableCell className="font-medium">{t.name}</TableCell>
                    <TableCell>{t.type}</TableCell>
                    <TableCell>{t.version}</TableCell>
                    <TableCell className="text-muted-foreground">{t.updated}</TableCell>
                    <TableCell>
                      <StatusBadge status={t.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDialog({ mode: "view", name: t.name })}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDialog({ mode: "edit", name: t.name })}
                        >
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialog !== null} onOpenChange={(o) => !o && setDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialog?.mode === "create"
                ? "Create Template"
                : dialog?.mode === "edit"
                  ? `Edit ${dialog.name}`
                  : dialog?.name}
            </DialogTitle>
            <DialogDescription>
              Prototype dialog — template content is illustrative only.
            </DialogDescription>
          </DialogHeader>

          {dialog?.mode === "view" ? (
            <div className="rounded-md border border-border bg-muted/40 p-4 text-sm leading-relaxed text-foreground">
              <p className="font-semibold">OFFICE ORDER</p>
              <p className="mt-3">
                With reference to the annual appraisal exercise, the salary of{" "}
                <span className="font-medium">{"{Employee Name}"}</span> (
                {"{Employee ID}"}), {"{Designation}"}, {"{Department}"}, is revised to{" "}
                {"{Salary}"} with effect from {"{Effective Date}"}.
              </p>
              <p className="mt-3">All other terms and conditions of employment remain unchanged.</p>
              <p className="mt-6 text-muted-foreground">Authorised Signatory — {"{Signatory Name}"}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tname">Template Name</Label>
                <Input id="tname" defaultValue={dialog?.mode === "edit" ? dialog.name : ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tbody">Template Body</Label>
                <Textarea
                  id="tbody"
                  rows={5}
                  defaultValue="With reference to the appraisal exercise, the salary of {Employee Name} is revised to {Salary} with effect from {Effective Date}."
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialog(null)}>
              Close
            </Button>
            {dialog?.mode !== "view" ? <Button onClick={() => setDialog(null)}>Save</Button> : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
