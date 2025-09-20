import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock, Eye, Users, TrendingUp, Shield } from "lucide-react";
import { mockRequests, mockApps } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [requests, setRequests] = useState(mockRequests);
  const { toast } = useToast();

  const handleApproveRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'approved' as const, approvedDate: new Date().toISOString().split('T')[0] }
        : req
    ));
    
    const request = requests.find(r => r.id === requestId);
    toast({
      title: "Request Approved",
      description: `Access to ${request?.appName} has been approved.`,
    });
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'rejected' as const }
        : req
    ));
    
    const request = requests.find(r => r.id === requestId);
    toast({
      title: "Request Rejected",
      description: `Access to ${request?.appName} has been rejected.`,
      variant: "destructive"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const totalUsers = mockApps.reduce((sum, app) => sum + app.usageCount, 0);
  const avgRating = mockApps.reduce((sum, app) => sum + app.rating, 0) / mockApps.length;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <main className="container mx-auto px-6 py-8">
        {/* Admin Header */}
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-zluri-red" />
          <div>
            <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage app access requests and monitor usage across the organization.
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
              <div className="text-2xl font-bold text-yellow-600">
                {pendingRequests.length}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Apps</CardTitle>
              <div className="text-2xl font-bold">{mockApps.length}</div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Available in catalog</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Across all apps</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Rating</CardTitle>
              <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">User satisfaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="apps">Apps</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-semibold mb-4">Access Requests</h2>
              {requests.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-4">📋</div>
                    <h3 className="font-semibold mb-2">No requests</h3>
                    <p className="text-muted-foreground">
                      All access requests will appear here for review.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {requests.map(request => (
                    <Card key={request.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-lg">{request.appName}</h3>
                                <p className="text-muted-foreground">{request.reason}</p>
                              </div>
                              <Badge 
                                variant="outline"
                                className={getStatusColor(request.status)}
                              >
                                {getStatusIcon(request.status)}
                                <span className="ml-1 capitalize">{request.status}</span>
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <span>Department: <strong>{request.department}</strong></span>
                              <span>Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
                              {request.approvedDate && (
                                <span>Approved: {new Date(request.approvedDate).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                          
                          {request.status === 'pending' && (
                            <div className="flex items-center gap-2 ml-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectRequest(request.id)}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleApproveRequest(request.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Apps Tab */}
          <TabsContent value="apps" className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-semibold mb-4">Application Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockApps.map(app => (
                  <Card key={app.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center text-xl">
                          {app.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold">{app.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {app.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{app.usageCount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4 text-muted-foreground" />
                              <span>{app.rating}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Badge 
                              variant="outline"
                              className={app.accessStatus === 'available' ? 'border-success text-success' : 'border-muted-foreground'}
                            >
                              {app.accessStatus === 'available' ? 'Available' : 'Request Required'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-semibold mb-4">Usage Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Most Popular Apps</CardTitle>
                    <CardDescription>By user count</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockApps
                        .sort((a, b) => b.usageCount - a.usageCount)
                        .slice(0, 5)
                        .map((app, index) => (
                          <div key={app.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-muted-foreground">
                                #{index + 1}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{app.logo}</span>
                                <span className="font-medium">{app.name}</span>
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {app.usageCount} users
                            </span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Rated Apps</CardTitle>
                    <CardDescription>By average rating</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockApps
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, 5)
                        .map((app, index) => (
                          <div key={app.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-muted-foreground">
                                #{index + 1}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{app.logo}</span>
                                <span className="font-medium">{app.name}</span>
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              ⭐ {app.rating}
                            </span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Navigation />
    </div>
  );
}