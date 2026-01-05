import { Header } from "@/components/dashboard/Header";
import { StatsBar } from "@/components/dashboard/StatsBar";
import { DisasterMap } from "@/components/dashboard/DisasterMap";
import { OracleStatus } from "@/components/dashboard/OracleStatus";
import { ConsensusPanel } from "@/components/dashboard/ConsensusPanel";
import { TriggerTimeline } from "@/components/dashboard/TriggerTimeline";
import { AccountabilityFeed } from "@/components/dashboard/AccountabilityFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <StatsBar />
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map & Consensus */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-[400px]">
              <DisasterMap />
            </div>
            <div className="h-[450px]">
              <ConsensusPanel />
            </div>
          </div>
          
          {/* Right Column - Oracles */}
          <div className="h-[870px]">
            <OracleStatus />
          </div>
        </div>
        
        {/* Bottom Grid - Triggers & Accountability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[400px]">
            <TriggerTimeline />
          </div>
          <div className="h-[400px]">
            <AccountabilityFeed />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="border-t border-border pt-6 pb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-semibold gradient-text">D-TRUST</span>
              <span>|</span>
              <span>Decentralized Disaster Truth & Relief Triggering System</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Built for IIT Kharagpur Hackathon</span>
              <span>•</span>
              <span className="font-mono">Hyperledger Fabric</span>
              <span>•</span>
              <span>No on-chain payments</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
