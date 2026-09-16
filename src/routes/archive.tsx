import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, FileText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orders, employees } from "@/lib/mock-data";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "Archive — HR Order Management System" },
      {
        name: "description",
        content: "Search archived employee order documents by employee, order number or financial year.",
      },
      { property: "og:title", content: "Archive — HR Order Management System" },
      { property: "og:description", content: "Document archive search for issued HR orders." },
    ],
  }),
  component: ArchivePage,
});

const archived = orders.map((o, i) => ({
  ...o,
  archivedDate: i % 2 === 0 ? "15 Sep 2026" : "12 Sep 2026",
}));

function ArchivePage() {
  const [q, setQ] = useState("");
  const [doc, setDoc] = useState<(typeof archived)[number] | null>(null);

  const rows = archived.filter((a) =>
    [a.employee, a.empId, a.orderNumber, a.department, a.orderType, a.financialYear]
      .join(" ")
      .toLowerCase()
      .includes(q.toLowerCase()),
  );

  const emp = employees.find((e) => e.empId === doc?.empId);

  return (
    <AppShell title="Archive" description="Document management system — issued order records">
      <Card>
        <CardContent className="p-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {["Employee ID", "Employee Name", "Department", "Order Type", "Financial Year", "Order Number"].map(
              (f) => (
                <div key={f} className="space-y-2">
                  <Label htmlFor={f}>{f}</Label>
                  <Input id={f} placeholder={`Search by ${f.toLowerCase()}`} onChange={(e) => setQ(e.target.value)} />
                </div>
              ),
            )}
          </div>
          <div className="mt-4">
            <Button>
              <Search className="size-4" />
              Search Archive
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Order Number</TableHead>
                <TableHead>Order Type</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Archived Date</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Document</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((a) => (
                <TableRow key={a.orderNumber}>
                  <TableCell>
                    <p className="font-medium text-foreground">{a.employee}</p>
                    <p className="text-xs text-muted-foreground">
                      {a.empId} • {a.department}
                    </p>
                  </TableCell>
                  <TableCell>{a.orderNumber}</TableCell>
                  <TableCell>{a.orderType}</TableCell>
                  <TableCell>{a.effective}</TableCell>
                  <TableCell className="text-muted-foreground">{a.archivedDate}</TableCell>
                  <TableCell>{a.version}</TableCell>
                  <TableCell>
                    <StatusBadge status={a.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => setDoc(a)}>
                      <FileText className="size-4" />
                      View Document
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={doc !== null} onOpenChange={(o) => !o && setDoc(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{doc?.orderNumber}</DialogTitle>
            <DialogDescription>Archived document — sample rendering only.</DialogDescription>
          </DialogHeader>
          <div className="rounded-md border border-border bg-card p-6 text-sm leading-relaxed">
            <p className="text-center font-semibold uppercase tracking-wide">Office Order</p>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              Ref: {doc?.orderNumber} • Effective {doc?.effective}
            </p>
            <p className="mt-5">
              This is to certify the {doc?.orderType.toLowerCase()} order issued to{" "}
              <span className="font-medium">{doc?.employee}</span> ({doc?.empId}),{" "}
              {emp?.designation ?? "Employee"}, {doc?.department}, with effect from {doc?.effective}.
            </p>
            <p className="mt-8 text-muted-foreground">
              Digitally signed • Authorised Signatory • {doc?.archivedDate}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
