import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { WorkflowProgress } from "@/components/workflow-progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { batches, employees, orders, emailStatuses, auditTrail } from "@/lib/mock-data";

export const Route = createFileRoute("/batches/$batchId")({
  head: () => ({
    meta: [
      { title: "Batch Details — HR Order Management System" },
      {
        name: "description",
        content:
          "Track a bulk order batch through validation, generation, approval, signature, email and archival.",
      },
      { property: "og:title", content: "Batch Details — HR Order Management System" },
      { property: "og:description", content: "End-to-end progress of a bulk HR order batch." },
    ],
  }),
  component: BatchDetailPage,
});

const stats = [
  ["Uploaded", "3,000"],
  ["Valid", "2,992"],
  ["Errors", "8"],
  ["Generated", "2,992"],
  ["Approved", "2,850"],
  ["Signed", "2,820"],
  ["Sent", "2,800"],
  ["Archived", "2,795"],
];

function BatchDetailPage() {
  const { batchId } = useParams({ from: "/batches/$batchId" });
  const batch = batches.find((b) => b.id === batchId) ?? batches[0]!;

  return (
    <AppShell
      title={batch.id}
      description={batch.title}
      actions={
        <Button asChild variant="outline">
          <Link to="/batches">All batches</Link>
        </Button>
      }
    >
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Current status</p>
              <div className="mt-1">
                <StatusBadge status={batch.status} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {batch.orderType} • Created {batch.created}
            </p>
          </div>
          <div className="mt-6 overflow-x-auto">
            <WorkflowProgress current={5} />
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
        {stats.map(([k, v]) => (
          <Card key={k}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{k}</p>
              <p className="mt-1 text-lg font-semibold text-foreground">{v}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="employees" className="mt-6">
        <TabsList>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="email">Email Status</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Showing 10 of 2,992 employees</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Effective Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((e) => (
                    <TableRow key={e.empId}>
                      <TableCell className="font-medium">{e.empId}</TableCell>
                      <TableCell>{e.name}</TableCell>
                      <TableCell>{e.department}</TableCell>
                      <TableCell>{e.designation}</TableCell>
                      <TableCell>{e.salary}</TableCell>
                      <TableCell>{e.effective}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="mt-4">
          <Card>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 6).map((o) => (
                    <TableRow key={o.orderNumber}>
                      <TableCell className="font-medium">{o.orderNumber}</TableCell>
                      <TableCell>{o.employee}</TableCell>
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
        </TabsContent>

        <TabsContent value="email" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                2,800 sent • 20 failed • 172 pending (sample rows shown)
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead className="text-right">Retry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailStatuses.map((e) => (
                    <TableRow key={e.email + e.employee}>
                      <TableCell className="font-medium">{e.employee}</TableCell>
                      <TableCell className="text-muted-foreground">{e.email}</TableCell>
                      <TableCell>
                        <StatusBadge status={e.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">{e.sent}</TableCell>
                      <TableCell className="text-right">
                        {e.status === "Failed" || e.status === "Retry Required" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.success(`Retry queued for ${e.employee}`)}
                          >
                            <RefreshCw className="size-4" />
                            Retry
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archive" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">2,795 documents archived to DMS</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Archived Date</TableHead>
                    <TableHead className="text-right">Document</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 5).map((o) => (
                    <TableRow key={o.orderNumber}>
                      <TableCell className="font-medium">{o.employee}</TableCell>
                      <TableCell>{o.orderNumber}</TableCell>
                      <TableCell>{o.version}</TableCell>
                      <TableCell className="text-muted-foreground">15 Sep 2026</TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="outline" size="sm">
                          <Link to="/archive">View Document</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <Card>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditTrail.map((a, i) => (
                    <TableRow key={i}>
                      <TableCell className="whitespace-nowrap text-muted-foreground">{a.time}</TableCell>
                      <TableCell className="font-medium">{a.user}</TableCell>
                      <TableCell>{a.action}</TableCell>
                      <TableCell className="text-muted-foreground">{a.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
