import { motion } from "framer-motion";
import { AlertTriangle, Shield, Zap, Users, TrendingUp } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ElementType;
  color: string;
}

const stats: Stat[] = [
  { label: "Active Disasters", value: "4", change: "+2 today", trend: "up", icon: AlertTriangle, color: "text-destructive" },
  { label: "Oracle Uptime", value: "99.7%", change: "+0.2%", trend: "up", icon: Shield, color: "text-success" },
  { label: "Triggers Today", value: "12", change: "5 pending", trend: "neutral", icon: Zap, color: "text-accent" },
  { label: "NGOs Active", value: "47", change: "+8 this week", trend: "up", icon: Users, color: "text-info" },
  { label: "Consensus Rate", value: "94%", change: "+3%", trend: "up", icon: TrendingUp, color: "text-primary" },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="panel p-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
              {stat.change && (
                <p className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-success' : stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {stat.change}
                </p>
              )}
            </div>
            <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
