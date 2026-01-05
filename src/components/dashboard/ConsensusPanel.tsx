import { motion } from "framer-motion";
import { Fingerprint, Users, MapPin, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ConsensusEvent {
  id: string;
  disasterName: string;
  region: string;
  oraclesAgreed: number;
  oraclesRequired: number;
  confidenceScore: number;
  status: "consensus_reached" | "pending" | "insufficient";
  severity: number;
  timestamp: string;
}

const mockConsensus: ConsensusEvent[] = [
  { 
    id: "1", 
    disasterName: "Chennai Urban Flooding", 
    region: "Tamil Nadu", 
    oraclesAgreed: 5, 
    oraclesRequired: 4, 
    confidenceScore: 94,
    status: "consensus_reached",
    severity: 8.5,
    timestamp: "2 minutes ago"
  },
  { 
    id: "2", 
    disasterName: "Cyclone Michaung", 
    region: "Odisha Coast", 
    oraclesAgreed: 3, 
    oraclesRequired: 4, 
    confidenceScore: 72,
    status: "pending",
    severity: 7.2,
    timestamp: "15 minutes ago"
  },
  { 
    id: "3", 
    disasterName: "Kutch Tremor", 
    region: "Gujarat", 
    oraclesAgreed: 2, 
    oraclesRequired: 4, 
    confidenceScore: 45,
    status: "insufficient",
    severity: 4.1,
    timestamp: "1 hour ago"
  },
];

const statusConfig = {
  consensus_reached: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", label: "Consensus Reached" },
  pending: { icon: Loader2, color: "text-warning", bg: "bg-warning/10", label: "Awaiting Consensus" },
  insufficient: { icon: AlertCircle, color: "text-muted-foreground", bg: "bg-muted", label: "Insufficient Data" },
};

export function ConsensusPanel() {
  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Fingerprint className="w-4 h-4 text-primary" />
          <span className="panel-title">Reality Consensus Engine</span>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          Quorum: 4/6 oracles
        </div>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar p-4 space-y-4">
        {mockConsensus.map((event, index) => {
          const config = statusConfig[event.status];
          const StatusIcon = config.icon;
          const progress = (event.oraclesAgreed / event.oraclesRequired) * 100;
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${event.status === 'consensus_reached' ? 'border-success/30 bg-success/5' : 'border-border bg-card/50'}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm">{event.disasterName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{event.region}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${config.bg}`}>
                  <StatusIcon className={`w-3 h-3 ${config.color} ${event.status === 'pending' ? 'animate-spin' : ''}`} />
                  <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                </div>
              </div>
              
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="data-cell">
                  <div className="data-label flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Oracles
                  </div>
                  <div className="text-lg font-bold font-mono">
                    <span className={event.oraclesAgreed >= event.oraclesRequired ? 'text-success' : 'text-warning'}>
                      {event.oraclesAgreed}
                    </span>
                    <span className="text-muted-foreground">/{event.oraclesRequired}</span>
                  </div>
                </div>
                <div className="data-cell">
                  <div className="data-label">Confidence</div>
                  <div className={`text-lg font-bold font-mono ${event.confidenceScore >= 80 ? 'text-success' : event.confidenceScore >= 60 ? 'text-warning' : 'text-muted-foreground'}`}>
                    {event.confidenceScore}%
                  </div>
                </div>
                <div className="data-cell">
                  <div className="data-label">Severity</div>
                  <div className={`text-lg font-bold font-mono ${event.severity >= 7 ? 'text-destructive' : event.severity >= 5 ? 'text-warning' : 'text-info'}`}>
                    {event.severity.toFixed(1)}
                  </div>
                </div>
              </div>
              
              {/* Consensus Progress */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Consensus Progress</span>
                  <span className="font-mono">{Math.round(progress)}%</span>
                </div>
                <div className="consensus-bar">
                  <motion.div
                    className="consensus-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                    style={{
                      background: progress >= 100 
                        ? 'linear-gradient(90deg, hsl(var(--success)) 0%, hsl(var(--primary)) 100%)' 
                        : progress >= 75
                        ? 'linear-gradient(90deg, hsl(var(--warning)) 0%, hsl(var(--success)) 100%)'
                        : 'hsl(var(--muted-foreground))'
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
