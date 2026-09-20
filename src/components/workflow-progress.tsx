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
                  "flex size-7 items-center justify-center rounded-full border text-xs font-bold transition-all",
                  done && "border-transparent bg-success/15 text-success",
                  active && "border-transparent bg-primary text-primary-foreground shadow-xs ring-2 ring-primary/20",
                  !done && !active && "border-border bg-card text-muted-foreground",
                )}
              >
                {done ? <Check className="size-4 stroke-[2.5]" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-xs font-medium tracking-wide uppercase",
                  active ? "font-bold text-foreground" : done ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {stage}
              </span>
            </div>
            {i < workflowStages.length - 1 ? (
              <div className={cn("mx-3 h-0.5 w-6", done ? "bg-success/40" : "bg-border")} aria-hidden />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
