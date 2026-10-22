import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ToolMeta } from '@/lib/tool';
export function ToolLayout({
  meta,
  actions,
  children,
}: {
  meta: ToolMeta;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-[1500px] px-5 py-8 md:px-10 md:py-10">
      <div className="text-muted-foreground mb-6 flex items-center gap-2 text-xs font-medium tracking-wide">
        <span>WORKSPACE</span>
        <ArrowUpRight className="size-3" />
        <span className="uppercase">{meta.category}</span>
      </div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {meta.name}
            </h1>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Local
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl text-sm leading-6">
            {meta.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">{actions}</div>
      </div>
      {children}
      <div className="text-muted-foreground mt-7 flex items-center gap-2 text-xs">
        <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
        Your data stays here. No uploads, accounts, or tracking.
      </div>
    </section>
  );
}
