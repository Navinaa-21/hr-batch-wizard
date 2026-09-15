import { createFileRoute, Link } from "@tanstack/react-router";
import { Layers, FileText, Clock, CheckCircle2, Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { batches } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — HR Order Management System" },
      {
        name: "description",
        content: "Overview of HR order batches, pending approvals and completed employee orders.",
      },
      { property: "og:title", content: "Dashboard — HR Order Management System" },
      { property: "og:description", content: "Overview of HR order batches and approvals." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell
      title="Dashboard"
      description="Overview of HR order processing"
      actions={
        <Button asChild>
          <Link to="/create-order">
            <Plus className="size-4" />
            Create New Batch
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Batches" value="12" icon={Layers} hint="Across FY 2026-27" />
        <StatCard label="Total Orders" value="3,248" icon={FileText} hint="Generated to date" />
        <StatCard label="Pending Approval" value="124" icon={Clock} hint="Awaiting reviewer action" />
        <StatCard label="Completed" value="2,980" icon={CheckCircle2} hint="Signed, sent and archived" />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Recent Batches</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch ID</TableHead>
                  <TableHead>Order Type</TableHead>
                  <TableHead className="text-right">Employees</TableHead>
                  <TableHead className="text-right">Valid</TableHead>
                  <TableHead className="text-right">Errors</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batches.map((b) => (
                  <TableRow key={b.id} className="cursor-pointer">
                    <TableCell className="font-medium">
                      <Link
                        to="/batches/$batchId"
                        params={{ batchId: b.id }}
                        className="text-primary hover:underline"
                      >
                        {b.id}
                      </Link>
                    </TableCell>
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
