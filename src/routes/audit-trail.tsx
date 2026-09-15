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
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditTrail.map((a, i) => (
                  <TableRow key={i}>
                    <TableCell className="whitespace-nowrap text-muted-foreground">{a.time}</TableCell>
                    <TableCell className="font-medium">{a.user}</TableCell>
                    <TableCell>{a.action}</TableCell>
                    <TableCell className="text-muted-foreground">{a.entity}</TableCell>
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
