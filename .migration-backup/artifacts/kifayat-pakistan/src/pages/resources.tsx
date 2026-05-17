import { useState } from "react";
import { useListResources, getListResourcesQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, ExternalLink, Phone, BookOpen, Shield, Landmark } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Resources() {
  const [category, setCategory] = useState<string>("all");
  
  const { data: resources, isLoading, isError } = useListResources(
    category !== "all" ? { category } : {},
    { query: { queryKey: getListResourcesQueryKey(category !== "all" ? { category } : {}) } }
  );

  const getIconForType = (type: string) => {
    switch (type) {
      case 'guide': return <BookOpen className="w-5 h-5 text-accent" />;
      case 'legal': return <Shield className="w-5 h-5 text-accent" />;
      case 'financial': return <Landmark className="w-5 h-5 text-accent" />;
      case 'contact': return <Phone className="w-5 h-5 text-accent" />;
      default: return <FileText className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Resource Center</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Practical guides, legal frameworks, and support schemes for small retailers and laborers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-2xl font-serif font-bold text-foreground">Available Resources</h2>
          <div className="w-full md:w-64">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger data-testid="select-category">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="shopkeepers">Shopkeepers</SelectItem>
                <SelectItem value="vendors">Vendors</SelectItem>
                <SelectItem value="laborers">Laborers</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-border" data-testid="resource-skeleton">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full mb-4" />
                  <Skeleton className="h-10 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-card rounded-lg border border-border" data-testid="resources-error">
            <h3 className="text-xl font-bold text-destructive mb-2">Unable to load resources</h3>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        ) : !resources || resources.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-lg border border-border" data-testid="resources-empty">
            <h3 className="text-xl font-bold text-foreground mb-2">No resources found</h3>
            <p className="text-muted-foreground">Try selecting a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="border-border bg-card shadow-sm hover:shadow-md transition-shadow flex flex-col" data-testid={`resource-card-${resource.id}`}>
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                  <div className="p-2 bg-accent/10 rounded-full mt-1">
                    {getIconForType(resource.resourceType)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="font-serif text-xl mb-1">{resource.title}</CardTitle>
                    <div className="flex gap-2 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      <span>{resource.category}</span>
                      <span>•</span>
                      <span>{resource.resourceType}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="text-base text-foreground/80 mb-6 flex-1">
                    {resource.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {resource.url && (
                      <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          View Resource
                        </a>
                      </Button>
                    )}
                    {resource.phoneNumber && (
                      <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5">
                        <a href={`tel:${resource.phoneNumber}`} className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {resource.phoneNumber}
                        </a>
                      </Button>
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
