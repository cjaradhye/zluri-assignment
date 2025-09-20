import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { AppCard } from "@/components/AppCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { mockRequests, myApps, getRecommendedApps, App } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { WalkthroughTrigger } from "@/components/WalkthroughTrigger";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();
  
  // Mock user department
  const userDepartment = "Engineering";
  const recommendedApps = getRecommendedApps(userDepartment);

  const handleRequestAccess = (app: App) => {
    navigate(`/request/${app.id}`);
  };

  const handleViewDetails = (app: App) => {
    navigate(`/app/${app.id}`);
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

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            Manage your applications and track your access requests.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">My Apps</CardTitle>
              <div className="text-2xl font-bold">{myApps.length}</div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Active applications</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
              <div className="text-2xl font-bold">
                {mockRequests.filter(r => r.status === 'pending').length}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Department</CardTitle>
              <div className="text-2xl font-bold">{userDepartment}</div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Your team</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="my-apps" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="my-apps">My Apps</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="my-apps" className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-semibold">My Applications</h2>
                <WalkthroughTrigger />
              </div>
              {myApps.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-4">📱</div>
                    <h3 className="font-semibold mb-2">No apps yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start by exploring the catalog and requesting access to apps you need.
                    </p>
                    <Button onClick={() => navigate('/')}>
                      Browse Catalog
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {myApps.map(app => (
                    <AppCard
                      key={app.id}
                      app={app}
                      viewMode="grid"
                      onRequestAccess={handleRequestAccess}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-semibold mb-4">Access Requests</h2>
              {mockRequests.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-4">📋</div>
                    <h3 className="font-semibold mb-2">No requests yet</h3>
                    <p className="text-muted-foreground">
                      Your access requests will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {mockRequests.map(request => (
                    <Card key={request.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{request.appName}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {request.reason}
                            </p>
                            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                              <span>Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
                              <span>Department: {request.department}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant="outline"
                              className={getStatusColor(request.status)}
                            >
                              {getStatusIcon(request.status)}
                              <span className="ml-1 capitalize">{request.status}</span>
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Recommended Tab */}
          <TabsContent value="recommended" className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-zluri-lime" />
                <h2 className="text-xl font-heading font-semibold">Recommended for {userDepartment}</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Popular applications used by your department and similar teams.
              </p>
              
              {recommendedApps.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="font-semibold mb-2">No recommendations available</h3>
                    <p className="text-muted-foreground">
                      Check back later for personalized app recommendations.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recommendedApps.map(app => (
                    <AppCard
                      key={app.id}
                      app={app}
                      viewMode="grid"
                      onRequestAccess={handleRequestAccess}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Navigation />
    </div>
  );
}