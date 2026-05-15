import { useListCampaigns, getListCampaignsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

export default function Campaigns() {
  const { data: campaigns, isLoading, isError } = useListCampaigns({
    query: { queryKey: getListCampaignsQueryKey() }
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Advocacy & Campaigns</h1>
          <p className="text-lg text-primary-foreground/80">
            Active initiatives designed to bring structural relief to small businesses and laborers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
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
            <h3 className="text-xl font-bold text-destructive mb-2">Unable to load campaigns</h3>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        ) : !campaigns || campaigns.length === 0 ? (
          <div className="text-center py-20" data-testid="campaigns-empty">
            <h3 className="text-xl font-bold text-foreground mb-2">No active campaigns</h3>
            <p className="text-muted-foreground">Check back later for new initiatives.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="flex flex-col h-full border-border bg-card shadow-sm hover:shadow-md transition-shadow" data-testid={`campaign-card-${campaign.id}`}>
                {campaign.imageUrl ? (
                  <div className="h-48 w-full overflow-hidden rounded-t-lg bg-muted">
                    <img 
                      src={campaign.imageUrl} 
                      alt={campaign.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-secondary/50 rounded-t-lg flex items-center justify-center">
                    <span className="font-serif text-2xl text-secondary-foreground/50 opacity-50">Kifayat</span>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 capitalize">
                      {campaign.category}
                    </Badge>
                    <Badge 
                      variant={campaign.status === 'active' ? 'default' : 'secondary'}
                      className={campaign.status === 'active' ? 'bg-primary' : ''}
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <CardTitle className="font-serif text-xl line-clamp-2">{campaign.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <CardDescription className="text-base text-foreground/80 mb-6 line-clamp-3">
                    {campaign.description}
                  </CardDescription>
                  
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span><strong>{campaign.beneficiaryCount}</strong> Beneficiaries targeted</span>
                    </div>
                    
                    {campaign.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{campaign.location}</span>
                      </div>
                    )}
                    
                    {campaign.startDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>Started: {format(new Date(campaign.startDate), 'MMM d, yyyy')}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
