import { useListCampaigns, getListCampaignsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Programs() {
  const { data: campaigns, isLoading, isError } = useListCampaigns({
    query: { queryKey: getListCampaignsQueryKey() }
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="relative w-full h-[60vh] flex items-center bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/programs.png" alt="Educational community program in Pakistan" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
        </div>
        <motion.div 
          className="container relative z-10 mx-auto px-4 text-center max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="inline-flex items-center rounded-full border border-secondary bg-secondary/20 px-3 py-1 text-sm font-medium text-secondary-container mb-6">
            Action & Impact
          </motion.div>
          <motion.h1 variants={fadeIn} className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6">Our Programs</motion.h1>
          <motion.p variants={fadeIn} className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Active initiatives designed to bring structural relief, awareness, and education to communities.
          </motion.p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="flex flex-col h-full border-none shadow-md" data-testid="campaign-skeleton">
                <Skeleton className="h-48 w-full rounded-t-lg rounded-b-none" />
                <CardHeader>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
                <CardContent className="flex-1">
                  <Skeleton className="h-20 w-full mb-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20" data-testid="campaigns-error">
            <h3 className="text-2xl font-bold text-destructive mb-2">Unable to load programs</h3>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        ) : !campaigns || campaigns.length === 0 ? (
          <div className="text-center py-20" data-testid="campaigns-empty">
            <div className="inline-flex w-20 h-20 items-center justify-center bg-muted rounded-full mb-6">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">No active programs</h3>
            <p className="text-muted-foreground">Check back later for new initiatives and events.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {campaigns.map((campaign) => (
              <motion.div key={campaign.id} variants={fadeIn} className="h-full">
                <Card className="flex flex-col h-full border-border bg-card elevation-1 hover:elevation-2 transition-shadow duration-300 rounded" data-testid={`campaign-card-${campaign.id}`}>
                  {campaign.imageUrl ? (
                    <div className="h-56 w-full overflow-hidden rounded-t bg-muted">
                      <img 
                        src={campaign.imageUrl} 
                        alt={campaign.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-56 w-full bg-secondary/10 rounded-t flex items-center justify-center">
                      <span className="font-serif text-3xl text-secondary/30 font-bold tracking-widest uppercase">Kifayat</span>
                    </div>
                  )}
                  
                  <CardHeader className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20 capitalize font-medium px-3 py-1">
                        {campaign.category}
                      </Badge>
                      <Badge 
                        variant={campaign.status === 'active' ? 'default' : 'secondary'}
                        className={campaign.status === 'active' ? 'bg-primary text-white font-medium px-3 py-1' : 'font-medium px-3 py-1'}
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                    <CardTitle className="font-serif text-2xl line-clamp-2 text-primary leading-tight">{campaign.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <CardDescription className="text-base text-muted-foreground mb-8 line-clamp-3 leading-relaxed">
                      {campaign.description}
                    </CardDescription>
                    
                    <div className="space-y-4 pt-4 border-t border-border mt-auto">
                      <div className="flex items-center gap-3 text-sm text-foreground font-medium">
                        <div className="p-2 bg-secondary/10 rounded text-secondary">
                          <Users className="w-4 h-4" />
                        </div>
                        <span><strong>{campaign.beneficiaryCount}</strong> Beneficiaries targeted</span>
                      </div>
                      
                      {campaign.location && (
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="p-2 bg-muted rounded text-foreground/60">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <span>{campaign.location}</span>
                        </div>
                      )}
                      
                      {campaign.startDate && (
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="p-2 bg-muted rounded text-foreground/60">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <span>Started: {format(new Date(campaign.startDate), 'MMM d, yyyy')}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
