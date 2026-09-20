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
      title="Executive Dashboard"
      description="Sakthi Auto Component Ltd. &bull; Bulk HR Order Processing Summary"
      actions={
        <Button asChild className="font-semibold shadow-xs">
          <Link to="/create-order">
            <Plus className="size-4" />
            Create New Batch
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Batches" value="12" icon={Layers} hint="FY 2026-27" />
        <StatCard label="Total Orders" value="3,248" icon={FileText} hint="Generated to date" />
        <StatCard label="Pending Approval" value="124" icon={Clock} hint="Awaiting reviewer action" />
        <StatCard label="Completed Orders" value="2,980" icon={CheckCircle2} hint="Signed, sent & archived" />
      </div>

      <Card className="mt-6 border-border bg-card shadow-xs">
        <CardHeader className="border-b border-border bg-muted/30 px-6 py-4">
          <CardTitle className="text-base font-bold text-foreground">Recent Order Batches</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-semibold text-foreground">Batch ID</TableHead>
                  <TableHead className="font-semibold text-foreground">Order Type</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Employees</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Valid</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Errors</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground">Created Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batches.map((b) => (
                  <TableRow key={b.id} className="hover:bg-muted/30">
                    <TableCell className="font-semibold">
                      <Link
                        to="/batches/$batchId"
                        params={{ batchId: b.id }}
                        className="text-primary hover:underline font-bold"
                      >
                        {b.id}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{b.orderType}</TableCell>
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
