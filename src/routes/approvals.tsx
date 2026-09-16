import { createFileRoute, Link } from "@tanstack/react-router";
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
import { orders } from "@/lib/mock-data";

export const Route = createFileRoute("/approvals")({
  head: () => ({
    meta: [
      { title: "Approval Queue — HR Order Management System" },
      {
        name: "description",
        content: "Employee orders awaiting review, approval, return or rejection by HR reviewers.",
      },
      { property: "og:title", content: "Approval Queue — HR Order Management System" },
      { property: "og:description", content: "Orders pending HR review and approval." },
    ],
  }),
  component: ApprovalsPage,
});

function ApprovalsPage() {
  return (
    <AppShell title="Approval Queue" description="Orders awaiting review and sign-off">
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Number</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Order Type</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.orderNumber}>
                  <TableCell className="font-medium">
                    <Link
                      to="/orders/$empId"
                      params={{ empId: o.empId }}
                      className="text-primary hover:underline"
                    >
                      {o.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{o.employee}</TableCell>
                  <TableCell>{o.orderType}</TableCell>
                  <TableCell className="text-muted-foreground">{o.batch}</TableCell>
                  <TableCell>{o.submittedBy}</TableCell>
                  <TableCell className="text-muted-foreground">{o.submittedDate}</TableCell>
                  <TableCell>
                    <StatusBadge status={o.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link to="/orders/$empId" params={{ empId: o.empId }}>
                        Review
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
