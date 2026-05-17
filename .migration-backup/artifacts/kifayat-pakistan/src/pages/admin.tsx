import { useState } from "react";
import { 
  useListContacts, 
  getListContactsQueryKey, 
  useGetStats, 
  getGetStatsQueryKey,
  useUpdateContactStatus
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Mail, CheckCircle2, Lock } from "lucide-react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const queryClient = useQueryClient();
  const updateStatus = useUpdateContactStatus();

  const { data: contactsData, isLoading: isLoadingContacts } = useListContacts(
    {}, 
    { query: { queryKey: getListContactsQueryKey({}), enabled: isAuthenticated } }
  );

  const { data: stats, isLoading: isLoadingStats } = useGetStats({
    query: { queryKey: getGetStatsQueryKey(), enabled: isAuthenticated }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "kifayat2024") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    updateStatus.mutate(
      { 
        id, 
        data: { status: newStatus as "new" | "read" | "replied" } 
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListContactsQueryKey({}) });
        }
      }
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-border">
          <CardHeader className="text-center pb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <CardTitle className="font-serif text-2xl">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder="Enter admin password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={error ? "border-destructive" : ""}
                  data-testid="input-admin-password"
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
              <Button type="submit" className="w-full" data-testid="btn-admin-login">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <Badge variant="destructive" className="bg-destructive/10 text-destructive border-none hover:bg-destructive/20">New</Badge>;
      case 'read': return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none dark:bg-blue-900/30 dark:text-blue-300">Read</Badge>;
      case 'replied': return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200 border-none dark:bg-green-900/30 dark:text-green-300">Replied</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage inquiries and view platform statistics.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Contacts</p>
                {isLoadingStats ? <Skeleton className="h-8 w-16" /> : <h3 className="text-3xl font-bold">{stats?.totalContacts || 0}</h3>}
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Users className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">New Messages</p>
                {isLoadingStats ? <Skeleton className="h-8 w-16" /> : <h3 className="text-3xl font-bold text-destructive">{stats?.newContacts || 0}</h3>}
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center text-destructive">
                <Mail className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Campaigns</p>
                {isLoadingStats ? <Skeleton className="h-8 w-16" /> : <h3 className="text-3xl font-bold text-accent">{stats?.activeCampaigns || 0}</h3>}
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingContacts ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : !contactsData?.items || contactsData.items.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No contact submissions found.</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Message Preview</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contactsData.items.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                          {format(new Date(contact.createdAt), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-xs text-muted-foreground">{contact.email}</div>
                        </TableCell>
                        <TableCell className="capitalize">
                          {contact.inquiryType}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-sm">
                          {contact.message}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(contact.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Select 
                            defaultValue={contact.status} 
                            onValueChange={(val) => handleStatusChange(contact.id, val)}
                          >
                            <SelectTrigger className="w-[110px] h-8 text-xs ml-auto">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="read">Read</SelectItem>
                              <SelectItem value="replied">Replied</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
