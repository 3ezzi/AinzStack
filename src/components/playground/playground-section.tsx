'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

function DraggableCard({
  children,
  className,
  rotate = 0,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <motion.div
      drag
      dragElastic={0.15}
      dragMomentum={false}
      whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
      whileHover={{ scale: 1.02 }}
      initial={{ rotate }}
      className={`cursor-grab select-none ${className ?? ''}`}
    >
      {children}
    </motion.div>
  );
}

export function PlaygroundSection() {
  const constraintRef = useRef<HTMLDivElement>(null);

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        className="text-center"
      >
        <h2 className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
          Interactive Playground
        </h2>
        <p className="mt-2 text-[13px] text-muted-foreground sm:text-sm">
          Drag and play with our components. Every element is customized,
          compact, and production-ready.
        </p>
      </motion.div>

      {/* Mobile: scrollable grid | Desktop: absolute-positioned sandbox */}
      <motion.div
        ref={constraintRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="relative mt-8 overflow-hidden rounded-xl border border-border/60 bg-secondary/20 sm:mt-10"
      >
        {/* Mobile grid layout */}
        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 md:hidden">
          <DraggableCard>
            <Card className="w-full">
              <CardContent className="space-y-2">
                <h4 className="text-xs font-semibold">Compact Card</h4>
                <p className="text-[11px] text-muted-foreground">
                  Drag me around the playground
                </p>
                <Button size="xs">Action</Button>
              </CardContent>
            </Card>
          </DraggableCard>

          <DraggableCard>
            <div className="flex flex-col gap-2 rounded-lg border bg-background p-3">
              <Label className="text-[11px]">Email</Label>
              <Input placeholder="you@example.com" />
              <Button size="sm">Subscribe</Button>
            </div>
          </DraggableCard>

          <DraggableCard>
            <div className="flex flex-wrap gap-1.5 rounded-lg border bg-background p-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
            </div>
          </DraggableCard>

          <DraggableCard>
            <div className="flex flex-col gap-3 rounded-lg border bg-background p-3">
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <Label className="text-[11px]">Notifications</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch />
                <Label className="text-[11px]">Dark mode</Label>
              </div>
            </div>
          </DraggableCard>

          <DraggableCard>
            <div className="flex flex-wrap gap-1.5 rounded-lg border bg-background p-3">
              <Button size="xs" variant="default">
                Primary
              </Button>
              <Button size="xs" variant="outline">
                Outline
              </Button>
              <Button size="xs" variant="secondary">
                Secondary
              </Button>
              <Button size="xs" variant="ghost">
                Ghost
              </Button>
            </div>
          </DraggableCard>

          <DraggableCard>
            <div className="flex flex-col gap-2 rounded-lg border bg-background p-3">
              <div className="flex items-center gap-2">
                <Checkbox id="pg-m-1" defaultChecked />
                <Label htmlFor="pg-m-1" className="text-[11px]">
                  Authentication
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="pg-m-2" defaultChecked />
                <Label htmlFor="pg-m-2" className="text-[11px]">
                  Payments
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="pg-m-3" />
                <Label htmlFor="pg-m-3" className="text-[11px]">
                  Email
                </Label>
              </div>
            </div>
          </DraggableCard>
        </div>

        {/* Desktop absolute-positioned sandbox */}
        <div className="relative hidden h-[400px] p-6 md:block">
          <DraggableCard className="absolute left-[5%] top-[10%]">
            <Card className="w-48">
              <CardContent className="space-y-2">
                <h4 className="text-xs font-semibold">Compact Card</h4>
                <p className="text-[11px] text-muted-foreground">
                  Drag me around the playground
                </p>
                <Button size="xs">Action</Button>
              </CardContent>
            </Card>
          </DraggableCard>

          <DraggableCard className="absolute right-[10%] top-[8%]" rotate={-2}>
            <div className="flex flex-col gap-2 rounded-lg border bg-background p-3">
              <Label className="text-[11px]">Email</Label>
              <Input placeholder="you@example.com" className="w-40" />
              <Button size="sm">Subscribe</Button>
            </div>
          </DraggableCard>

          <DraggableCard className="absolute left-[15%] top-[55%]" rotate={1}>
            <div className="flex flex-wrap gap-1.5 rounded-lg border bg-background p-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
            </div>
          </DraggableCard>

          <DraggableCard className="absolute right-[8%] top-[50%]" rotate={-1}>
            <div className="flex flex-col gap-3 rounded-lg border bg-background p-3">
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <Label className="text-[11px]">Notifications</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch />
                <Label className="text-[11px]">Dark mode</Label>
              </div>
            </div>
          </DraggableCard>

          <DraggableCard className="absolute left-[40%] top-[30%]" rotate={2}>
            <div className="flex gap-1.5 rounded-lg border bg-background p-3">
              <Button size="xs" variant="default">
                Primary
              </Button>
              <Button size="xs" variant="outline">
                Outline
              </Button>
              <Button size="xs" variant="secondary">
                Secondary
              </Button>
              <Button size="xs" variant="ghost">
                Ghost
              </Button>
            </div>
          </DraggableCard>

          <DraggableCard className="absolute left-[45%] top-[70%]" rotate={-1}>
            <div className="flex flex-col gap-2 rounded-lg border bg-background p-3">
              <div className="flex items-center gap-2">
                <Checkbox id="pg-1" defaultChecked />
                <Label htmlFor="pg-1" className="text-[11px]">
                  Authentication
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="pg-2" defaultChecked />
                <Label htmlFor="pg-2" className="text-[11px]">
                  Payments
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="pg-3" />
                <Label htmlFor="pg-3" className="text-[11px]">
                  Email
                </Label>
              </div>
            </div>
          </DraggableCard>
        </div>
      </motion.div>
    </section>
  );
}
