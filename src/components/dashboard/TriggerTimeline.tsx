import { motion } from "framer-motion";
import { Zap, CheckCircle2, Clock, AlertTriangle, Building2, Truck, Users, Wallet } from "lucide-react";

interface TriggerEvent {
  id: string;
  type: "dbt_signal" | "ndrf_activation" | "ngo_access" | "supply_chain" | "csr_notification";
  title: string;
  description: string;
  disasterRef: string;
  timestamp: string;
  status: "executed" | "pending" | "queued";
  txHash?: string;
}

const mockTriggers: TriggerEvent[] = [
  { 
    id: "1", 
    type: "dbt_signal", 
    title: "DBT Release Signal Emitted", 
    description: "Trigger sent for ₹50 Cr relief fund release", 
    disasterRef: "Chennai Floods",
    timestamp: "2 minutes ago",
    status: "executed",
    txHash: "0x8f4e...3a2b"
  },
  { 
    id: "2", 
    type: "ndrf_activation", 
    title: "NDRF Workflow Activated", 
    description: "Emergency response team deployment authorized", 
    disasterRef: "Chennai Floods",
    timestamp: "5 minutes ago",
    status: "executed",
    txHash: "0x2c7d...9f1e"
  },
  { 
    id: "3", 
    type: "ngo_access", 
    title: "NGO Access Granted", 
    description: "5 verified NGOs authorized for relief operations", 
    disasterRef: "Chennai Floods",
    timestamp: "8 minutes ago",
    status: "executed",
    txHash: "0x5a1b...7c4d"
  },
  { 
    id: "4", 
    type: "supply_chain", 
    title: "Supply Chain Alert", 
    description: "Mobilization signal sent to logistics network", 
    disasterRef: "Odisha Cyclone",
    timestamp: "15 minutes ago",
    status: "pending",
  },
  { 
    id: "5", 
    type: "csr_notification", 
    title: "CSR Fund Notification", 
    description: "Corporate donors notified of verified disaster", 
    disasterRef: "Odisha Cyclone",
    timestamp: "20 minutes ago",
    status: "queued",
  },
];

const typeConfig = {
  dbt_signal: { icon: Wallet, color: "bg-success", label: "DBT" },
  ndrf_activation: { icon: Building2, color: "bg-primary", label: "NDRF" },
  ngo_access: { icon: Users, color: "bg-info", label: "NGO" },
  supply_chain: { icon: Truck, color: "bg-warning", label: "Logistics" },
  csr_notification: { icon: AlertTriangle, color: "bg-accent", label: "CSR" },
};

const statusConfig = {
  executed: { icon: CheckCircle2, color: "text-success", label: "Executed" },
  pending: { icon: Clock, color: "text-warning", label: "Pending" },
  queued: { icon: Clock, color: "text-muted-foreground", label: "Queued" },
};

export function TriggerTimeline() {
  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-accent" />
          <span className="panel-title">Trigger Events</span>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          {mockTriggers.filter(t => t.status === 'executed').length} executed today
        </div>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar p-4">
        <div className="relative">
          {mockTriggers.map((trigger, index) => {
            const type = typeConfig[trigger.type];
            const status = statusConfig[trigger.status];
            const TypeIcon = type.icon;
            const StatusIcon = status.icon;
            
            return (
              <motion.div
                key={trigger.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="timeline-item"
              >
                {/* Timeline dot */}
                <div className={`timeline-dot ${type.color}`}>
                  <TypeIcon className="w-2 h-2 text-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                
                {/* Content */}
                <div className="ml-2">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${type.color} text-background`}>
                          {type.label}
                        </span>
                        <h4 className="text-sm font-medium">{trigger.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{trigger.description}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <StatusIcon className={`w-3 h-3 ${status.color}`} />
                      <span className={`text-xs ${status.color}`}>{status.label}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span>Ref: {trigger.disasterRef}</span>
                    <span>•</span>
                    <span>{trigger.timestamp}</span>
                    {trigger.txHash && (
                      <>
                        <span>•</span>
                        <span className="font-mono text-primary">{trigger.txHash}</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
