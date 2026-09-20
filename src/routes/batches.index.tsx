import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { batches } from "@/lib/mock-data";

export const Route = createFileRoute("/batches/")({
  head: () => ({
    meta: [
      { title: "Batches — HR Order Management System" },
      {
        name: "description",
        content: "All employee order batches with upload, validation and generation counts.",
      },
      { property: "og:title", content: "Batches — HR Order Management System" },
      { property: "og:description", content: "All employee order batches and their status." },
    ],
  }),
  component: BatchesPage,
});

function BatchesPage() {
  return (
    <AppShell
      title="Batches"
      description="Bulk order batches across financial years"
      actions={
        <Button asChild>
          <Link to="/create-order">
            <Plus className="size-4" />
            Create New Batch
          </Link>
        </Button>
      }
    >
      <Card className="border-border bg-card shadow-xs">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-semibold text-foreground">Batch ID</TableHead>
                  <TableHead className="font-semibold text-foreground">Title</TableHead>
                  <TableHead className="font-semibold text-foreground">Order Type</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Employees</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Valid</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Errors</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batches.map((b) => (
                  <TableRow key={b.id} className="hover:bg-muted/30">
                    <TableCell className="font-bold">
                      <Link
                        to="/batches/$batchId"
                        params={{ batchId: b.id }}
                        className="text-primary hover:underline font-bold"
                      >
                        {b.id}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{b.title}</TableCell>
                    <TableCell>{b.orderType}</TableCell>
                    <TableCell className="text-right font-medium text-foreground">{b.employees.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="text-right font-medium text-[oklch(0.45_0.12_155)]">{b.valid.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="text-right font-medium text-destructive">{b.errors}</TableCell>
                    <TableCell>
                      <StatusBadge status={b.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{b.created}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
