import { Star, Users, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { App } from "@/lib/mockData";

interface AppCardProps {
  app: App;
  onRequestAccess: (app: App) => void;
  onViewDetails: (app: App) => void;
  viewMode: 'grid' | 'list';
}

export const AppCard = ({ app, onRequestAccess, onViewDetails, viewMode }: AppCardProps) => {
  const isAvailable = app.accessStatus === 'available';
  
  if (viewMode === 'list') {
    return (
      <Card className="transition-smooth hover:shadow-medium hover:shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            {/* App Logo */}
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-hero rounded-lg flex items-center justify-center text-2xl">
              {app.logo}
            </div>
            
            {/* App Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-semibold text-foreground">{app.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{app.description}</p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-zluri-lime text-zluri-lime" />
                      <span className="text-sm font-medium">{app.rating}</span>
                    </div>
                    
                    {/* Usage */}
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{app.usageCount.toLocaleString()} users</span>
                    </div>
                    
                    {/* Department */}
                    <Badge variant="outline" className="text-xs">
                      {app.department[0]}
                      {app.department.length > 1 && ` +${app.department.length - 1}`}
                    </Badge>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-3 ml-4">
                  {/* Status */}
                  <div className="flex items-center gap-2">
                    {isAvailable ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">
                      {isAvailable ? 'Available' : 'Request Access'}
                    </span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(app)}
                  >
                    View Details
                  </Button>
                  
                  {!isAvailable && (
                    <Button
                      variant="lime"
                      size="sm"
                      onClick={() => onRequestAccess(app)}
                    >
                      Request
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group transition-smooth hover:shadow-medium hover:shadow-soft hover:-translate-y-1">
      <CardHeader className="pb-4">
        {/* App Logo */}
        <div className="w-16 h-16 bg-gradient-hero rounded-lg flex items-center justify-center text-3xl mb-4 mx-auto">
          {app.logo}
        </div>
        
        {/* Status Badge */}
        <div className="flex justify-center mb-2">
          {isAvailable ? (
            <Badge variant="outline" className="text-success border-success">
              <CheckCircle className="h-3 w-3 mr-1" />
              Available
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              <Lock className="h-3 w-3 mr-1" />
              Request Access
            </Badge>
          )}
        </div>
        
        <CardTitle className="text-center text-lg font-heading">{app.name}</CardTitle>
        <CardDescription className="text-center text-sm line-clamp-2 min-h-[2.5rem]">
          {app.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Stats */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-zluri-lime text-zluri-lime" />
            <span className="font-medium">{app.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{app.usageCount.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Department */}
        <div className="mb-4">
          <Badge variant="secondary" className="text-xs">
            {app.department[0]}
            {app.department.length > 1 && ` +${app.department.length - 1}`}
          </Badge>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails(app)}
          >
            Details
          </Button>
          {!isAvailable && (
            <Button
              variant="lime"
              size="sm"
              className="flex-1"
              onClick={() => onRequestAccess(app)}
            >
              Request
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};