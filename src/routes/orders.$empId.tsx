import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, CornerUpLeft, X, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { orders, employees } from "@/lib/mock-data";

export const Route = createFileRoute("/orders/$empId")({
  head: () => ({
    meta: [
      { title: "Order Details — HR Order Management System" },
      {
        name: "description",
        content: "Review a single employee order document, approval history and take approval action.",
      },
      { property: "og:title", content: "Order Details — HR Order Management System" },
      { property: "og:description", content: "Employee order document review and approval." },
    ],
  }),
  component: OrderDetailPage,
});

const history = [
  { user: "HR User", action: "Submitted", when: "15 Sep 2026 10:35", state: "done" },
  { user: "HR Reviewer", action: "Approved", when: "15 Sep 2026 11:10", state: "done" },
  { user: "Head HR", action: "Pending", when: "—", state: "pending" },
];

function OrderDetailPage() {
  const { empId } = useParams({ from: "/orders/$empId" });
  const order = orders.find((o) => o.empId === empId) ?? orders[0]!;
  const emp = employees.find((e) => e.empId === empId) ?? employees[0]!;
  const [mode, setMode] = useState<"return" | "reject" | null>(null);

  return (
    <AppShell
      title={order.orderNumber}
      description={`${order.orderType} order — ${order.employee}`}
      actions={
        <Button asChild variant="outline">
          <Link to="/approvals">
            <ArrowLeft className="size-4" />
            Back to queue
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Employee Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                ["Employee ID", emp.empId],
                ["Employee Name", emp.name],
                ["Department", emp.department],
                ["Designation", emp.designation],
                ["Grade", emp.grade],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium text-foreground">{v}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                ["Order Type", order.orderType],
                ["Order Number", order.orderNumber],
                ["Salary", emp.salary],
                ["Effective Date", order.effective],
                ["Created Date", order.submittedDate],
                ["Version", order.version],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium text-foreground">{v}</span>
                </div>
              ))}
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge status={order.status} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Approval History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {history.map((h) => (
                <div key={h.user} className="flex items-start gap-3">
                  <div
                    className={
                      h.state === "done"
                        ? "mt-0.5 flex size-7 items-center justify-center rounded-full bg-success-soft text-[oklch(0.45_0.12_155)]"
                        : "mt-0.5 flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground"
                    }
                  >
                    {h.state === "done" ? (
                      <CheckCircle2 className="size-4" />
                    ) : (
                      <Clock className="size-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {h.user} → {h.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{h.when}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Document Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mx-auto max-w-2xl rounded-md border border-border bg-card p-8 shadow-sm">
                <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">
                  Human Resources Department
                </p>
                <p className="mt-3 text-center text-lg font-semibold uppercase tracking-wide text-foreground">
                  Office Order
                </p>
                <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                  <span>Ref: {order.orderNumber}</span>
                  <span>Date: {order.submittedDate}</span>
                </div>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground">
                  <p>
                    With reference to the {order.orderType.toLowerCase()} exercise for{" "}
                    {order.financialYear}, the following is ordered in respect of{" "}
                    <span className="font-medium">{emp.name}</span> ({emp.empId}), {emp.designation},{" "}
                    {emp.department}.
                  </p>
                  <p>
                    The annual compensation is revised to{" "}
                    <span className="font-medium">{emp.salary}</span> with effect from{" "}
                    <span className="font-medium">{order.effective}</span>. The employee continues in
                    grade {emp.grade}.
                  </p>
                  <p>All other terms and conditions of employment remain unchanged.</p>
                </div>
                <div className="mt-12 text-sm">
                  <p className="font-medium text-foreground">Authorised Signatory</p>
                  <p className="text-xs text-muted-foreground">
                    Digital signature pending — applied after final approval
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button
                  onClick={() => {
                    setMode(null);
                    toast.success("Order approved (prototype action)");
                  }}
                >
                  <Check className="size-4" />
                  Approve
                </Button>
                <Button variant="outline" onClick={() => setMode("return")}>
                  <CornerUpLeft className="size-4" />
                  Return
                </Button>
                <Button variant="outline" onClick={() => setMode("reject")}>
                  <X className="size-4" />
                  Reject
                </Button>
              </div>

              {mode ? (
                <div className="mt-4 rounded-md border border-border p-4">
                  <p className="text-sm font-medium text-foreground">
                    Remarks for {mode === "return" ? "return" : "rejection"}
                  </p>
                  <Textarea
                    className="mt-2"
                    rows={3}
                    placeholder="Enter remarks for the submitter..."
                  />
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        toast.success(
                          mode === "return"
                            ? "Order returned to HR User (prototype action)"
                            : "Order rejected (prototype action)",
                        );
                        setMode(null);
                      }}
                    >
                      Submit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setMode(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
