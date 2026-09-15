import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { workflowStages } from "@/lib/mock-data";

export function WorkflowProgress({ current }: { current: number }) {
  return (
    <div className="flex flex-wrap items-center gap-y-3">
      {workflowStages.map((stage, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={stage} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex size-7 items-center justify-center rounded-full border text-xs font-semibold",
                  done && "border-transparent bg-success-soft text-[oklch(0.45_0.12_155)]",
                  active && "border-transparent bg-primary text-primary-foreground",
                  !done && !active && "border-border bg-card text-muted-foreground",
                )}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-sm",
                  active ? "font-semibold text-foreground" : "text-muted-foreground",
                )}
              >
                {stage}
              </span>
            </div>
            {i < workflowStages.length - 1 ? (
              <div className="mx-3 h-px w-8 bg-border" aria-hidden />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
