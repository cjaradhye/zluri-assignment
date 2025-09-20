import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Users, Calendar, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { mockApps } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function AppDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const app = mockApps.find(a => a.id === id);
  
  if (!app) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">App not found</h1>
          <Button onClick={() => navigate('/')}>Back to Catalog</Button>
        </div>
      </div>
    );
  }

  const handleRequestAccess = () => {
    if (app.accessStatus === 'available') {
      toast({
        title: "Already Available",
        description: "You already have access to this application."
      });
    } else {
      navigate(`/request/${app.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* App Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-hero rounded-2xl flex items-center justify-center text-4xl">
                {app.logo}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-heading font-bold mb-2">{app.name}</h1>
                  <p className="text-lg text-muted-foreground mb-4">{app.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-zluri-lime text-zluri-lime" />
                      <span className="font-semibold">{app.rating}</span>
                      <span className="text-muted-foreground">({app.reviews.length} reviews)</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">{app.usageCount.toLocaleString()} users</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">Added {new Date(app.dateAdded).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{app.category}</Badge>
                    <Badge variant="outline" className={
                      app.popularity === 'high' ? 'border-zluri-lime text-zluri-lime' :
                      app.popularity === 'medium' ? 'border-zluri-cyan text-zluri-cyan' :
                      'border-muted-foreground text-muted-foreground'
                    }>
                      {app.popularity.charAt(0).toUpperCase() + app.popularity.slice(1)} Demand
                    </Badge>
                    {app.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  {app.accessStatus === 'available' ? (
                    <Badge className="bg-success text-success-foreground">
                      <Shield className="h-4 w-4 mr-1" />
                      Available
                    </Badge>
                  ) : (
                    <Button variant="hero" size="lg" onClick={handleRequestAccess}>
                      Request Access
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About {app.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {app.longDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {app.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-zluri-lime rounded-full flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle>User Reviews</CardTitle>
                  <CardDescription>
                    What employees are saying about {app.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {app.reviews.map(review => (
                    <div key={review.id}>
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {review.user.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{review.user}</span>
                            <div className="flex items-center">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-zluri-lime text-zluri-lime" />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                      {review.id !== app.reviews[app.reviews.length - 1].id && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Departments */}
              <Card>
                <CardHeader>
                  <CardTitle>Used by Departments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {app.department.map(dept => (
                      <div key={dept} className="flex items-center justify-between">
                        <span className="text-sm">{dept}</span>
                        <Badge variant="outline" className="text-xs">Active</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Users</span>
                    <span className="font-semibold">{app.usageCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Rating</span>
                    <span className="font-semibold">{app.rating}/5.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Reviews</span>
                    <span className="font-semibold">{app.reviews.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <span className="font-semibold">{app.category}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}