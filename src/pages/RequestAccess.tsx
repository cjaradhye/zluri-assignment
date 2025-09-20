import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockApps, departments } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function RequestAccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [reason, setReason] = useState("");
  const [department, setDepartment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason.trim() || !department) {
      toast({
        title: "Missing Information",
        description: "Please provide a reason and select your department.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Request Submitted!",
      description: `Your access request for ${app.name} has been submitted for review.`,
    });
    
    setIsSubmitting(false);
    navigate('/dashboard');
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
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              {app.logo}
            </div>
            <h1 className="text-3xl font-heading font-bold mb-2">
              Request Access to {app.name}
            </h1>
            <p className="text-muted-foreground">
              Fill out the form below to request access. Your request will be reviewed by the admin team.
            </p>
          </div>

          {/* Request Form */}
          <Card>
            <CardHeader>
              <CardTitle>Access Request Form</CardTitle>
              <CardDescription>
                Please provide details about why you need access to this application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* App Info */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center text-xl">
                      {app.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold">{app.name}</h3>
                      <p className="text-sm text-muted-foreground">{app.category}</p>
                    </div>
                  </div>
                </div>

                {/* Department Selection */}
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Reason */}
                <div className="space-y-2">
                  <Label htmlFor="reason">
                    Reason for Access Request *
                  </Label>
                  <Textarea
                    id="reason"
                    placeholder="Please explain why you need access to this application, how you plan to use it, and how it will benefit your work..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum 20 characters ({reason.length}/20)
                  </p>
                </div>

                {/* App Features Preview */}
                <div className="p-4 bg-accent/30 rounded-lg">
                  <h4 className="font-medium mb-3">What you'll get access to:</h4>
                  <ul className="space-y-2">
                    {app.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-zluri-lime rounded-full flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    disabled={isSubmitting || reason.length < 20 || !department}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Help Text */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Need help? Contact the IT team at{" "}
              <a href="mailto:it-support@company.com" className="text-primary hover:underline">
                it-support@company.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}