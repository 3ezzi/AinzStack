export default function RouteLoading() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Monogram */}
        <div className="loading-logo flex size-10 items-center justify-center rounded-xl bg-foreground">
          <span className="text-[16px] font-bold tracking-tight text-background">
            A
          </span>
        </div>

        {/* Brand */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-heading text-[14px] font-semibold tracking-tight text-foreground">
            AinzStack
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Loading
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] w-16 overflow-hidden rounded-full bg-border">
          <div className="loading-bar h-full rounded-full bg-foreground" />
        </div>
      </div>
    </div>
  );
}
