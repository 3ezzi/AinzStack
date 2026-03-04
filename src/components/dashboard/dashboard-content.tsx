'use client';

import { motion } from 'framer-motion';
import {
  UsersIcon,
  CreditCardIcon,
  TrendingUpIcon,
  ActivityIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fadeUp, stagger } from '@/lib/motion';

const stats = [
  {
    label: 'Total Users',
    value: '1,284',
    change: '+12.5%',
    trend: 'up' as const,
    icon: UsersIcon,
  },
  {
    label: 'Revenue',
    value: '$8,420',
    change: '+8.2%',
    trend: 'up' as const,
    icon: CreditCardIcon,
  },
  {
    label: 'Growth',
    value: '24.3%',
    change: '+3.1%',
    trend: 'up' as const,
    icon: TrendingUpIcon,
  },
  {
    label: 'Active Now',
    value: '42',
    change: '-2.4%',
    trend: 'down' as const,
    icon: ActivityIcon,
  },
];

const recentActivity = [
  {
    user: 'Sarah Chen',
    action: 'upgraded to Pro plan',
    time: '2 min ago',
    type: 'success' as const,
  },
  {
    user: 'Alex Rivera',
    action: 'created a new project',
    time: '12 min ago',
    type: 'default' as const,
  },
  {
    user: 'Jordan Lee',
    action: 'submitted a support ticket',
    time: '34 min ago',
    type: 'default' as const,
  },
  {
    user: 'Maya Patel',
    action: 'connected Stripe integration',
    time: '1 hr ago',
    type: 'success' as const,
  },
  {
    user: 'Chris Wong',
    action: 'invited 3 team members',
    time: '2 hr ago',
    type: 'default' as const,
  },
];

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-[12px] text-muted-foreground">
            Welcome back. Here&apos;s an overview of your app.
          </p>
        </div>
        <Button size="sm" variant="outline" className="text-[12px]">
          Download Report
        </Button>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger()}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp}>
            <Card className="transition-colors duration-150 hover:border-foreground/10">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="size-3.5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1 flex items-center gap-1">
                  {stat.trend === 'up' ? (
                    <ArrowUpRightIcon className="size-3 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <ArrowDownRightIcon className="size-3 text-red-500 dark:text-red-400" />
                  )}
                  <span
                    className={`text-[11px] font-medium ${
                      stat.trend === 'up'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-500 dark:text-red-400'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Two-Column Layout */}
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Recent Activity */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest events from your team</CardDescription>
              </div>
              <Button variant="ghost" size="icon-sm" aria-label="More options">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {recentActivity.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-border/40 py-2.5 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-7 items-center justify-center rounded-full bg-muted text-[10px] font-semibold">
                        {activity.user
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="text-[12px] font-medium">
                          {activity.user}{' '}
                          <span className="font-normal text-muted-foreground">
                            {activity.action}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: 'Invite Team Member', badge: 'Team' },
                { label: 'Create API Key', badge: 'Dev' },
                { label: 'View Analytics', badge: 'Data' },
                { label: 'Manage Billing', badge: 'Account' },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex w-full items-center justify-between rounded-md border border-border/60 px-3 py-2 text-left transition-colors hover:bg-accent"
                >
                  <span className="text-[12px] font-medium">
                    {action.label}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    {action.badge}
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
