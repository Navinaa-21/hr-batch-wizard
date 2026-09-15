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
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Order Type</TableHead>
                  <TableHead className="text-right">Employees</TableHead>
                  <TableHead className="text-right">Valid</TableHead>
                  <TableHead className="text-right">Errors</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batches.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">
                      <Link
                        to="/batches/$batchId"
                        params={{ batchId: b.id }}
                        className="text-primary hover:underline"
                      >
                        {b.id}
                      </Link>
                    </TableCell>
                    <TableCell>{b.title}</TableCell>
                    <TableCell>{b.orderType}</TableCell>
                    <TableCell className="text-right">{b.employees.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="text-right">{b.valid.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="text-right">{b.errors}</TableCell>
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
