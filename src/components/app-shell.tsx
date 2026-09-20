import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  FilePlus2,
  Layers,
  CheckSquare,
  FileText,
  Archive,
  LayoutTemplate,
  History,
  Settings,
  FileSignature,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/create-order", label: "Create Order", icon: FilePlus2 },
  { to: "/batches", label: "Batches", icon: Layers },
  { to: "/approvals", label: "Approval Queue", icon: CheckSquare },
  { to: "/orders", label: "Orders", icon: FileText },
  { to: "/archive", label: "Archive", icon: Archive },
  { to: "/templates", label: "Templates", icon: LayoutTemplate },
  { to: "/audit-trail", label: "Audit Trail", icon: History },
  { to: "/administration", label: "Administration", icon: Settings },
] as const;

export function AppShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-sidebar md:flex">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <img
            src="/sakthi-auto-logo.png"
            alt="Sakthi Auto Logo"
            className="h-9 w-auto object-contain"
          />
          <div className="leading-tight">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sakthi Auto
            </p>
            <p className="text-sm font-bold text-foreground">HR Portal</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
          {nav.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "border-l-4 border-primary bg-sidebar-accent text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                )}
              >
                <item.icon className={cn("size-4 shrink-0", active ? "text-primary" : "text-muted-foreground")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              SA
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">Sakthi Auto HR</p>
              <p className="text-xs text-muted-foreground">Role: HR Admin</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">{title}</h1>
              {description ? (
                <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
              ) : null}
            </div>
            {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
          </div>
          <nav className="flex items-center gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
            <img src="/sakthi-auto-logo.png" alt="Sakthi Auto Logo" className="mr-2 h-6 w-auto object-contain" />
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-muted"
                activeProps={{ className: "bg-primary/10 text-primary font-semibold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
