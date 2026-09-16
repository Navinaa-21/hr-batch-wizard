import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  Award,
  Layers,
  Wallet,
  MoreHorizontal,
  UploadCloud,
  AlertTriangle,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
import { cn } from "@/lib/utils";
import { employees, validationErrors } from "@/lib/mock-data";

export const Route = createFileRoute("/create-order")({
  head: () => ({
    meta: [
      { title: "Create Order — HR Order Management System" },
      {
        name: "description",
        content:
          "Step-by-step workflow to upload an employee Excel file, validate records and generate bulk HR orders.",
      },
      { property: "og:title", content: "Create Order — HR Order Management System" },
      {
        property: "og:description",
        content: "Upload, validate, preview and generate employee orders in bulk.",
      },
    ],
  }),
  component: CreateOrderPage,
});

const orderTypes = [
  { name: "Increment Order", icon: TrendingUp, desc: "Annual or ad-hoc salary increment" },
  { name: "Promotion Order", icon: Award, desc: "Change of designation and grade" },
  { name: "Promotion + Increment", icon: Layers, desc: "Combined promotion with revised pay" },
  { name: "Grade Change", icon: FileText, desc: "Grade restructure without promotion" },
  { name: "Salary Revision", icon: Wallet, desc: "Pay revision outside the appraisal cycle" },
  { name: "Other", icon: MoreHorizontal, desc: "Any other HR office order" },
];

const steps = ["Order Type", "Upload Excel", "Validation", "Preview", "Generate"];

function Stepper({ step }: { step: number }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-y-3">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex size-7 items-center justify-center rounded-full text-xs font-semibold",
                i < step && "bg-success-soft text-[oklch(0.45_0.12_155)]",
                i === step && "bg-primary text-primary-foreground",
                i > step && "border border-border bg-card text-muted-foreground",
              )}
            >
              {i < step ? <Check className="size-4" /> : i + 1}
            </div>
            <span
              className={cn(
                "text-sm",
                i === step ? "font-semibold text-foreground" : "text-muted-foreground",
              )}
            >
              {s}
            </span>
          </div>
          {i < steps.length - 1 ? <div className="mx-3 h-px w-8 bg-border" aria-hidden /> : null}
        </div>
      ))}
    </div>
  );
}

function CreateOrderPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [orderType, setOrderType] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [preview, setPreview] = useState<(typeof employees)[number] | null>(null);
  const [generating, setGenerating] = useState<"idle" | "running" | "done">("idle");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (generating !== "running") return;
    const id = setInterval(() => {
      setCount((c) => {
        const next = c + 142;
        if (next >= 2992) {
          clearInterval(id);
          setGenerating("done");
          return 2992;
        }
        return next;
      });
    }, 180);
    return () => clearInterval(id);
  }, [generating]);

  return (
    <AppShell title="Create Order" description="Bulk order preparation workflow">
      <Stepper step={step} />

      {step === 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {orderTypes.map((t) => {
              const selected = orderType === t.name;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setOrderType(t.name)}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border bg-card p-5 text-left transition-colors",
                    selected
                      ? "border-primary bg-primary-soft/40 ring-1 ring-primary"
                      : "border-border hover:border-primary/40",
                  )}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                    <t.icon className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{t.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
          {orderType ? (
            <div className="mt-6">
              <Button onClick={() => setStep(1)}>
                Continue <ArrowRight className="size-4" />
              </Button>
            </div>
          ) : null}
        </>
      ) : null}

      {step === 1 ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 px-6 py-14 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary">
                <UploadCloud className="size-7" />
              </div>
              <p className="mt-4 text-base font-medium text-foreground">
                Upload approved employee Excel file
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Drag and drop the file here, or browse from your computer
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                Supported format: .xlsx &nbsp;•&nbsp; Maximum file size: 10 MB
              </p>
              <Button className="mt-5" variant="outline" onClick={() => setUploaded(true)}>
                Browse File
              </Button>
            </div>

            {uploaded ? (
              <div className="mt-5 flex items-center gap-3 rounded-md border border-border bg-card p-4">
                <FileSpreadsheet className="size-5 text-[oklch(0.5_0.13_155)]" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Annual_Increment_2026.xlsx</p>
                  <p className="text-xs text-muted-foreground">2.4 MB • 3,000 rows detected</p>
                </div>
                <CheckCircle2 className="size-5 text-[oklch(0.5_0.13_155)]" />
              </div>
            ) : null}

            <div className="mt-6 flex gap-2">
              <Button variant="outline" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button disabled={!uploaded} onClick={() => setStep(2)}>
                Continue <ArrowRight className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 2 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Batch ID" value="APPRAISAL-2026-001" />
            <StatCard label="Uploaded Records" value="3,000" />
            <StatCard label="Valid Records" value="2,992" />
            <StatCard label="Records with Errors" value="8" />
          </div>

          <Card className="mt-4">
            <CardContent className="p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Validation completed</span>
                <span className="text-muted-foreground">99.7% records passed</span>
              </div>
              <Progress value={99.7} className="mt-3" />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 rounded-md bg-success-soft px-3 py-2 text-sm text-[oklch(0.42_0.12_155)]">
                  <CheckCircle2 className="size-4" /> 2,992 valid records ready for generation
                </div>
                <div className="flex items-center gap-2 rounded-md bg-[oklch(0.96_0.03_25)] px-3 py-2 text-sm text-destructive">
                  <AlertTriangle className="size-4" /> 8 records require correction
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Records with Errors</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Row</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {validationErrors.map((e) => (
                    <TableRow key={e.row} className="bg-[oklch(0.985_0.012_25)]">
                      <TableCell>{e.row}</TableCell>
                      <TableCell className="font-medium">{e.empId}</TableCell>
                      <TableCell>{e.name}</TableCell>
                      <TableCell className="text-destructive">{e.error}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="mt-6 flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={() => setStep(3)}>
              Continue with 2,992 valid records <ArrowRight className="size-4" />
            </Button>
          </div>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Preview — showing 10 of 2,992 valid records
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Effective Date</TableHead>
                    <TableHead className="text-right">Preview</TableHead>
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
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => setPreview(e)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="mt-6 flex gap-2">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button onClick={() => setStep(4)}>
              Continue <ArrowRight className="size-4" />
            </Button>
          </div>

          <Dialog open={preview !== null} onOpenChange={(o) => !o && setPreview(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Order Preview — {preview?.name}</DialogTitle>
                <DialogDescription>Draft document generated from the selected template.</DialogDescription>
              </DialogHeader>
              <div className="rounded-md border border-border bg-card p-6 text-sm leading-relaxed">
                <p className="text-center font-semibold uppercase tracking-wide">Office Order</p>
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  Ref: INC/2026/000XXX &nbsp;•&nbsp; Date: 15 Sep 2026
                </p>
                <p className="mt-5">
                  With reference to the annual appraisal exercise for FY 2026-27, the salary of{" "}
                  <span className="font-medium">{preview?.name}</span> ({preview?.empId}),{" "}
                  {preview?.designation}, {preview?.department}, is revised to{" "}
                  <span className="font-medium">{preview?.salary}</span> per annum with effect from{" "}
                  {preview?.effective}.
                </p>
                <p className="mt-3">
                  All other terms and conditions of employment remain unchanged.
                </p>
                <p className="mt-8 text-muted-foreground">Authorised Signatory</p>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : null}

      {step === 4 ? (
        <Card>
          <CardContent className="p-6">
            {generating === "idle" ? (
              <>
                <h2 className="text-lg font-semibold text-foreground">
                  Ready to generate 2,992 orders
                </h2>
                <dl className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    ["Order Type", orderType ?? "Increment Order"],
                    ["Batch ID", "APPRAISAL-2026-001"],
                    ["Valid Employees", "2,992"],
                    ["Template", "Increment Order Template v3.2"],
                    ["Effective Date", "01 Apr 2026"],
                    ["Financial Year", "FY 2026-27"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-md border border-border p-4">
                      <dt className="text-sm text-muted-foreground">{k}</dt>
                      <dd className="mt-1 font-medium text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button onClick={() => setGenerating("running")}>Generate Orders</Button>
                </div>
              </>
            ) : null}

            {generating === "running" ? (
              <div className="py-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Generating employee orders...
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {count.toLocaleString("en-IN")} / 2,992
                </p>
                <Progress value={(count / 2992) * 100} className="mt-4" />
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <StatCard label="Generated" value={count.toLocaleString("en-IN")} />
                  <StatCard label="Remaining" value={(2992 - count).toLocaleString("en-IN")} />
                  <StatCard label="Failed" value="0" />
                </div>
              </div>
            ) : null}

            {generating === "done" ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-success-soft text-[oklch(0.45_0.12_155)]">
                  <CheckCircle2 className="size-7" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-foreground">
                  2,992 orders generated successfully
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Batch APPRAISAL-2026-001 has moved to the review stage.
                </p>
                <Button
                  className="mt-6"
                  onClick={() =>
                    navigate({ to: "/batches/$batchId", params: { batchId: "APPRAISAL-2026-001" } })
                  }
                >
                  View Batch
                </Button>
                <Link to="/dashboard" className="mt-3 text-sm text-primary hover:underline">
                  Back to dashboard
                </Link>
              </div>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </AppShell>
  );
}
