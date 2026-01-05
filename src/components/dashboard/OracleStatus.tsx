import { motion } from "framer-motion";
import { Cloud, Satellite, Activity, Radio, Users, Building2, Shield, TrendingUp, TrendingDown } from "lucide-react";

interface Oracle {
  id: string;
  name: string;
  type: "weather" | "satellite" | "seismic" | "telecom" | "ngo" | "government";
  status: "active" | "pending" | "offline";
  reputation: number;
  lastUpdate: string;
  submissions: number;
  trend: "up" | "down" | "stable";
}

const mockOracles: Oracle[] = [
  { id: "1", name: "IMD Weather API", type: "weather", status: "active", reputation: 98, lastUpdate: "2s ago", submissions: 1247, trend: "up" },
  { id: "2", name: "ISRO Bhuvan", type: "satellite", status: "active", reputation: 95, lastUpdate: "5m ago", submissions: 892, trend: "stable" },
  { id: "3", name: "USGS Seismic", type: "seismic", status: "active", reputation: 97, lastUpdate: "1m ago", submissions: 456, trend: "up" },
  { id: "4", name: "BSNL Network", type: "telecom", status: "pending", reputation: 82, lastUpdate: "15m ago", submissions: 234, trend: "down" },
  { id: "5", name: "Goonj NGO", type: "ngo", status: "active", reputation: 91, lastUpdate: "3m ago", submissions: 567, trend: "up" },
  { id: "6", name: "NDMA Official", type: "government", status: "active", reputation: 99, lastUpdate: "10m ago", submissions: 123, trend: "stable" },
];

const iconMap = {
  weather: Cloud,
  satellite: Satellite,
  seismic: Activity,
  telecom: Radio,
  ngo: Users,
  government: Building2,
};

const statusStyles = {
  active: "status-active",
  pending: "status-pending",
  offline: "status-critical",
};

export function OracleStatus() {
  const activeCount = mockOracles.filter(o => o.status === "active").length;
  const avgReputation = Math.round(mockOracles.reduce((a, b) => a + b.reputation, 0) / mockOracles.length);

  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <span className="panel-title">Oracle Network</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-success font-mono">{activeCount}/{mockOracles.length} Active</span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs text-muted-foreground font-mono">Avg Rep: {avgReputation}%</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar p-4 space-y-3">
        {mockOracles.map((oracle, index) => {
          const Icon = iconMap[oracle.type];
          const TrendIcon = oracle.trend === "up" ? TrendingUp : oracle.trend === "down" ? TrendingDown : Activity;
          
          return (
            <motion.div
              key={oracle.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="oracle-card"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{oracle.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{oracle.type} Oracle</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`status-dot ${statusStyles[oracle.status]}`} />
                  <span className="text-xs capitalize text-muted-foreground">{oracle.status}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Reputation</div>
                  <div className="flex items-center gap-1">
                    <span className={`text-sm font-mono font-bold ${oracle.reputation >= 90 ? 'text-success' : oracle.reputation >= 80 ? 'text-warning' : 'text-destructive'}`}>
                      {oracle.reputation}%
                    </span>
                    <TrendIcon className={`w-3 h-3 ${oracle.trend === 'up' ? 'text-success' : oracle.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`} />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Last Update</div>
                  <div className="text-sm font-mono">{oracle.lastUpdate}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Submissions</div>
                  <div className="text-sm font-mono">{oracle.submissions.toLocaleString()}</div>
                </div>
              </div>
              
              {/* Reputation bar */}
              <div className="mt-3">
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${oracle.reputation}%` }}
                    transition={{ delay: index * 0.05 + 0.3, duration: 0.5 }}
                    style={{
                      background: oracle.reputation >= 90 
                        ? 'hsl(var(--success))' 
                        : oracle.reputation >= 80 
                        ? 'hsl(var(--warning))' 
                        : 'hsl(var(--destructive))'
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
