import { motion } from "framer-motion";
import { Shield, Bell, Settings, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-success flex items-center justify-center">
              <Shield className="w-5 h-5 text-background" />
            </div>
            <motion.div 
              className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              <span className="gradient-text">D-TRUST</span>
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Decentralized Disaster Truth System
            </p>
          </div>
        </motion.div>
        
        {/* Status indicator */}
        <motion.div 
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Activity className="w-4 h-4 text-success animate-pulse" />
          <span className="text-xs font-medium">Network Active</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground font-mono">Block #1,247,893</span>
        </motion.div>
        
        {/* Actions */}
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-xs font-bold text-background">
            OP
          </div>
        </motion.div>
      </div>
    </header>
  );
}
