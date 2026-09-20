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

import { useState } from "react";
import { CheckSquare, CheckCircle2, CornerUpLeft, X } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

function ApprovalsPage() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selected.length === orders.length) {
      setSelected([]);
    } else {
      setSelected(orders.map((o) => o.orderNumber));
    }
  };

  const toggleSelectOne = (orderNum: string) => {
    if (selected.includes(orderNum)) {
      setSelected(selected.filter((id) => id !== orderNum));
    } else {
      setSelected([...selected, orderNum]);
    }
  };

  const handleBulkApprove = () => {
    toast.success(`Bulk Approved ${selected.length} orders successfully (Prototype Action)`);
    setSelected([]);
  };

  const handleBulkReturn = () => {
    toast.info(`Returned ${selected.length} orders for correction (Prototype Action)`);
    setSelected([]);
  };

  return (
    <AppShell
      title="Approval Queue"
      description="Orders awaiting review and sign-off — individual or bulk processing"
      actions={
        selected.length > 0 ? (
          <div className="flex items-center gap-2 bg-muted/60 p-1.5 rounded-lg border border-border">
            <span className="text-xs font-semibold px-2 text-foreground">
              {selected.length} selected
            </span>
            <Button size="sm" onClick={handleBulkApprove} className="h-8 gap-1.5 font-semibold">
              <CheckCircle2 className="size-3.5" />
              Bulk Approve
            </Button>
            <Button size="sm" variant="outline" onClick={handleBulkReturn} className="h-8 gap-1.5">
              <CornerUpLeft className="size-3.5" />
              Return
            </Button>
          </div>
        ) : null
      }
    >
      <Card className="border-border bg-card shadow-xs">
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-12 text-center">
                  <Checkbox
                    checked={selected.length === orders.length && orders.length > 0}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="font-semibold text-foreground">Order Number</TableHead>
                <TableHead className="font-semibold text-foreground">Employee</TableHead>
                <TableHead className="font-semibold text-foreground">Order Type</TableHead>
                <TableHead className="font-semibold text-foreground">Batch</TableHead>
                <TableHead className="font-semibold text-foreground">Submitted By</TableHead>
                <TableHead className="font-semibold text-foreground">Submitted Date</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="font-semibold text-foreground text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => {
                const isChecked = selected.includes(o.orderNumber);
                return (
                  <TableRow
                    key={o.orderNumber}
                    className={isChecked ? "bg-primary/5" : "hover:bg-muted/30"}
                  >
                    <TableCell className="text-center">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => toggleSelectOne(o.orderNumber)}
                        aria-label={`Select ${o.orderNumber}`}
                      />
                    </TableCell>
                    <TableCell className="font-bold">
                      <Link
                        to="/orders/$empId"
                        params={{ empId: o.empId }}
                        className="text-primary hover:underline"
                      >
                        {o.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{o.employee}</TableCell>
                    <TableCell>{o.orderType}</TableCell>
                    <TableCell className="text-muted-foreground">{o.batch}</TableCell>
                    <TableCell>{o.submittedBy}</TableCell>
                    <TableCell className="text-muted-foreground">{o.submittedDate}</TableCell>
                    <TableCell>
                      <StatusBadge status={o.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm" className="font-medium">
                        <Link to="/orders/$empId" params={{ empId: o.empId }}>
                          Review Order
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
