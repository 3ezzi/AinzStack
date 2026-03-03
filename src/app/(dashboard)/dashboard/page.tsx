'use client';

import { motion } from 'framer-motion';
import {
  UsersIcon,
  CreditCardIcon,
  TrendingUpIcon,
  ActivityIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const stats = [
  { label: 'Total Users', value: '1,284', change: '+12%', icon: UsersIcon },
  { label: 'Revenue', value: '$8,420', change: '+8%', icon: CreditCardIcon },
  { label: 'Growth', value: '24%', change: '+3%', icon: TrendingUpIcon },
  { label: 'Active Now', value: '42', change: '', icon: ActivityIcon },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-xs text-muted-foreground">
          Welcome back. Here&apos;s an overview of your app.
        </p>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp}>
            <Card className="hover:border-foreground/10 transition-colors duration-150">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="size-3.5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold tracking-tight">
                  {stat.value}
                </div>
                {stat.change && (
                  <p className="mt-0.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                    {stat.change} from last month
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center text-xs text-muted-foreground">
            Activity feed will appear here when connected to Supabase.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
