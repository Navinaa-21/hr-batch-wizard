import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auditTrail } from "@/lib/mock-data";

export const Route = createFileRoute("/audit-trail")({
  head: () => ({
    meta: [
      { title: "Audit Trail — HR Order Management System" },
      {
        name: "description",
        content: "Chronological record of uploads, approvals, signatures and archival actions.",
      },
      { property: "og:title", content: "Audit Trail — HR Order Management System" },
      { property: "og:description", content: "Full activity log for HR order processing." },
    ],
  }),
  component: AuditTrailPage,
});

function AuditTrailPage() {
  return (
    <AppShell title="Audit Trail" description="Complete activity log across batches and orders">
      <Card className="border-border bg-card shadow-xs">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-semibold text-foreground">Timestamp</TableHead>
                  <TableHead className="font-semibold text-foreground">User</TableHead>
                  <TableHead className="font-semibold text-foreground">Action</TableHead>
                  <TableHead className="font-semibold text-foreground">Entity</TableHead>
                  <TableHead className="font-semibold text-foreground">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditTrail.map((a, i) => (
                  <TableRow key={i} className="hover:bg-muted/30">
                    <TableCell className="whitespace-nowrap font-medium text-muted-foreground">{a.time}</TableCell>
                    <TableCell className="font-semibold text-foreground">{a.user}</TableCell>
                    <TableCell className="font-medium text-primary">{a.action}</TableCell>
                    <TableCell className="font-medium text-foreground">{a.entity}</TableCell>
                    <TableCell className="text-muted-foreground">{a.details}</TableCell>
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
