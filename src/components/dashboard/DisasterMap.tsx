import { motion } from "framer-motion";
import { MapPin, AlertTriangle, CheckCircle2, Circle } from "lucide-react";

interface DisasterLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  severity: "critical" | "severe" | "moderate";
  status: "verified" | "pending" | "monitoring";
  type: string;
}

const mockDisasters: DisasterLocation[] = [
  { id: "1", name: "Chennai Floods", lat: 40, lng: 25, severity: "critical", status: "verified", type: "Flood" },
  { id: "2", name: "Odisha Cyclone", lat: 55, lng: 65, severity: "severe", status: "pending", type: "Cyclone" },
  { id: "3", name: "Gujarat Earthquake", lat: 30, lng: 15, severity: "moderate", status: "monitoring", type: "Earthquake" },
  { id: "4", name: "Kerala Landslide", lat: 70, lng: 20, severity: "severe", status: "verified", type: "Landslide" },
];

const severityColors = {
  critical: "bg-destructive",
  severe: "bg-warning",
  moderate: "bg-info",
};

const statusIcons = {
  verified: CheckCircle2,
  pending: AlertTriangle,
  monitoring: Circle,
};

export function DisasterMap() {
  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="panel-title">Live Disaster Map</span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {mockDisasters.length} Active Zones
        </span>
      </div>
      
      <div className="flex-1 relative map-container m-4 min-h-[300px]">
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* India map outline (simplified SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path 
            d="M35 15 L55 10 L70 20 L75 35 L80 50 L75 65 L65 80 L50 85 L40 80 L30 70 L25 55 L30 40 L35 25 Z" 
            fill="none" 
            stroke="hsl(var(--primary))" 
            strokeWidth="0.5"
            className="opacity-50"
          />
        </svg>
        
        {/* Disaster markers */}
        {mockDisasters.map((disaster, index) => {
          const StatusIcon = statusIcons[disaster.status];
          return (
            <motion.div
              key={disaster.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="absolute group cursor-pointer"
              style={{ left: `${disaster.lng}%`, top: `${disaster.lat}%` }}
            >
              {/* Ripple effect for critical */}
              {disaster.severity === "critical" && (
                <>
                  <motion.div 
                    className="absolute -inset-3 rounded-full bg-destructive/20"
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute -inset-2 rounded-full bg-destructive/30"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0.3, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </>
              )}
              
              <div className={`relative z-10 w-4 h-4 rounded-full ${severityColors[disaster.severity]} flex items-center justify-center shadow-lg`}>
                <MapPin className="w-2.5 h-2.5 text-background" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute left-6 top-0 hidden group-hover:block z-20 animate-fade-in">
                <div className="glass px-3 py-2 rounded-lg border border-border shadow-xl min-w-[150px]">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusIcon className={`w-3 h-3 ${disaster.status === 'verified' ? 'text-success' : disaster.status === 'pending' ? 'text-warning' : 'text-info'}`} />
                    <span className="text-xs font-semibold">{disaster.name}</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    <div>Type: {disaster.type}</div>
                    <div>Severity: <span className="capitalize">{disaster.severity}</span></div>
                    <div>Status: <span className="capitalize">{disaster.status}</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {/* Legend */}
        <div className="absolute bottom-3 left-3 glass px-3 py-2 rounded-lg border border-border">
          <div className="text-[10px] font-medium text-muted-foreground mb-2">SEVERITY</div>
          <div className="flex gap-3">
            {Object.entries(severityColors).map(([key, color]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-[10px] capitalize">{key}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
