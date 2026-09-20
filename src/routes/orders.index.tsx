import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orders } from "@/lib/mock-data";

export const Route = createFileRoute("/orders/")({
  head: () => ({
    meta: [
      { title: "Orders — HR Order Management System" },
      {
        name: "description",
        content: "Search and filter all issued employee orders by type, status and financial year.",
      },
      { property: "og:title", content: "Orders — HR Order Management System" },
      { property: "og:description", content: "Searchable register of all employee orders." },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [fy, setFy] = useState("all");

  const rows = orders.filter((o) => {
    const text = [o.empId, o.employee, o.orderNumber, o.department].join(" ").toLowerCase();
    return (
      text.includes(q.toLowerCase()) &&
      (type === "all" || o.orderType === type) &&
      (status === "all" || o.status === status) &&
      (fy === "all" || o.financialYear === fy)
    );
  });

  return (
    <AppShell title="Orders" description="All generated employee orders">
      <Card className="border-border bg-card shadow-xs">
        <CardContent className="grid gap-3 p-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9 bg-background"
              placeholder="Search employee ID, name, order number, department"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Order Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Order Types</SelectItem>
              {["Increment", "Promotion", "Promotion + Increment", "Grade Change", "Salary Revision"].map(
                (t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {["Under Review", "Approved", "Returned", "Rejected", "Signed", "Archived"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={fy} onValueChange={setFy}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Financial Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Financial Years</SelectItem>
              <SelectItem value="FY 2026-27">FY 2026-27</SelectItem>
              <SelectItem value="FY 2025-26">FY 2025-26</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="mt-4 border-border bg-card shadow-xs">
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="font-semibold text-foreground">Order Number</TableHead>
                <TableHead className="font-semibold text-foreground">Employee</TableHead>
                <TableHead className="font-semibold text-foreground">Order Type</TableHead>
                <TableHead className="font-semibold text-foreground">Effective Date</TableHead>
                <TableHead className="font-semibold text-foreground">Version</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((o) => (
                <TableRow key={o.orderNumber} className="hover:bg-muted/30">
                  <TableCell className="font-bold">
                    <Link
                      to="/orders/$empId"
                      params={{ empId: o.empId }}
                      className="text-primary hover:underline font-bold"
                    >
                      {o.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-foreground">{o.employee}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.empId} &bull; {o.department}
                    </p>
                  </TableCell>
                  <TableCell className="font-medium">{o.orderType}</TableCell>
                  <TableCell>{o.effective}</TableCell>
                  <TableCell className="font-medium text-xs">{o.version}</TableCell>
                  <TableCell>
                    <StatusBadge status={o.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm" className="font-medium">
                      <Link to="/orders/$empId" params={{ empId: o.empId }}>
                        View Order
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                    No orders match the selected filters.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
