import { motion } from "framer-motion";
import { FileCheck, AlertOctagon, Eye, Clock, CheckCircle2, XCircle } from "lucide-react";

interface AccountabilityEvent {
  id: string;
  type: "proof_submitted" | "verification_complete" | "discrepancy" | "audit_request";
  actor: string;
  actorType: "ngo" | "government" | "donor";
  action: string;
  disasterRef: string;
  timestamp: string;
  verified: boolean;
  hash?: string;
}

const mockEvents: AccountabilityEvent[] = [
  { 
    id: "1", 
    type: "proof_submitted", 
    actor: "Red Cross India",
    actorType: "ngo",
    action: "Submitted relief delivery proof (1,240 families)", 
    disasterRef: "Chennai Floods",
    timestamp: "5 minutes ago",
    verified: true,
    hash: "Qm8f4e...3a2b"
  },
  { 
    id: "2", 
    type: "verification_complete", 
    actor: "Tamil Nadu SDMA",
    actorType: "government",
    action: "Verified ground-level impact assessment", 
    disasterRef: "Chennai Floods",
    timestamp: "12 minutes ago",
    verified: true,
    hash: "Qm2c7d...9f1e"
  },
  { 
    id: "3", 
    type: "discrepancy", 
    actor: "Audit System",
    actorType: "government",
    action: "Detected 15% variance in reported vs satellite data", 
    disasterRef: "Kerala Landslide",
    timestamp: "1 hour ago",
    verified: false,
  },
  { 
    id: "4", 
    type: "audit_request", 
    actor: "Tata Trusts",
    actorType: "donor",
    action: "Requested detailed audit trail for CSR allocation", 
    disasterRef: "Gujarat Earthquake",
    timestamp: "2 hours ago",
    verified: true,
    hash: "Qm5a1b...7c4d"
  },
];

const typeConfig = {
  proof_submitted: { icon: FileCheck, color: "text-success", bgColor: "bg-success/10" },
  verification_complete: { icon: CheckCircle2, color: "text-primary", bgColor: "bg-primary/10" },
  discrepancy: { icon: AlertOctagon, color: "text-destructive", bgColor: "bg-destructive/10" },
  audit_request: { icon: Eye, color: "text-info", bgColor: "bg-info/10" },
};

const actorBadgeColors = {
  ngo: "bg-info/20 text-info",
  government: "bg-warning/20 text-warning",
  donor: "bg-success/20 text-success",
};

export function AccountabilityFeed() {
  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-success" />
          <span className="panel-title">Accountability Ledger</span>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          Immutable Audit Trail
        </div>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar p-4 space-y-3">
        {mockEvents.map((event, index) => {
          const config = typeConfig[event.type];
          const Icon = config.icon;
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`p-3 rounded-lg border border-border ${config.bgColor}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg bg-card flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm truncate">{event.actor}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-medium ${actorBadgeColors[event.actorType]}`}>
                      {event.actorType}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{event.action}</p>
                  
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                    <span>{event.disasterRef}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{event.timestamp}</span>
                    {event.hash && (
                      <>
                        <span>•</span>
                        <span className="font-mono text-primary">{event.hash}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="shrink-0">
                  {event.verified ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : (
                    <XCircle className="w-4 h-4 text-destructive" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
