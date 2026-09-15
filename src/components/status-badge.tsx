import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  Processing: "bg-primary-soft text-primary",
  "Under Review": "bg-warning-soft text-[oklch(0.5_0.13_70)]",
  "Validation Failed": "bg-[oklch(0.96_0.03_25)] text-destructive",
  Completed: "bg-success-soft text-[oklch(0.45_0.12_155)]",
  Approved: "bg-success-soft text-[oklch(0.45_0.12_155)]",
  Signed: "bg-success-soft text-[oklch(0.45_0.12_155)]",
  Sent: "bg-success-soft text-[oklch(0.45_0.12_155)]",
  Active: "bg-success-soft text-[oklch(0.45_0.12_155)]",
  Archived: "bg-muted text-muted-foreground",
  Draft: "bg-muted text-muted-foreground",
  Pending: "bg-muted text-muted-foreground",
  Returned: "bg-warning-soft text-[oklch(0.5_0.13_70)]",
  "Retry Required": "bg-warning-soft text-[oklch(0.5_0.13_70)]",
  Rejected: "bg-[oklch(0.96_0.03_25)] text-destructive",
  Failed: "bg-[oklch(0.96_0.03_25)] text-destructive",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        map[status] ?? "bg-muted text-muted-foreground",
        className,
      )}
    >
      {status}
    </span>
  );
}
