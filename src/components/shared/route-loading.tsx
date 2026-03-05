import Image from 'next/image';

export default function RouteLoading() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Monogram */}
        <Image
          src="/logo.png"
          alt="AinzStack Logo"
          width={40}
          height={40}
          className="rounded-xl"
          priority
        />

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
