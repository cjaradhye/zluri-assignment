import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  Filter, 
  Star, 
  Users, 
  CheckCircle,
  Grid3X3,
  User,
  TrendingUp,
  Shield,
  Lightbulb
} from "lucide-react";

interface DemoWalkthroughProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface WalkthroughStep {
  id: string;
  title: string;
  description: string;
  research: string;
  icon: React.ReactNode;
  targetElement?: string;
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
  features: string[];
}

const walkthroughSteps: WalkthroughStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Zluri Employee App Catalog',
    description: 'Get ready to discover and request access to business applications with ease. This walkthrough will show you all the key features.',
    research: 'Inspired by modern enterprise app stores like Microsoft AppSource and Apple App Store for intuitive user experience.',
    icon: <Grid3X3 className="h-6 w-6 text-zluri-red" />,
    position: 'center',
    features: ['App Discovery', 'Access Management', 'Department Filtering', 'Usage Analytics']
  },
  {
    id: 'search',
    title: 'Smart Search & Discovery',
    description: 'Use the powerful search bar to find apps by name, category, or department. Autocomplete helps you discover relevant tools quickly.',
    research: 'Research from Microsoft AppSource shows that robust search with filters increases app discovery by 300%.',
    icon: <Search className="h-6 w-6 text-zluri-lime" />,
    position: 'top',
    targetElement: 'search-bar',
    features: ['Autocomplete Search', 'Category Filtering', 'Department Matching', 'Instant Results']
  },
  {
    id: 'filters',
    title: 'Advanced Filtering System',
    description: 'Filter apps by department, popularity, and category to find exactly what you need. Popular apps are highlighted based on usage data.',
    research: 'Okta\'s app catalog research revealed that department-specific filtering reduces search time by 60%.',
    icon: <Filter className="h-6 w-6 text-zluri-cyan" />,
    position: 'left',
    targetElement: 'filter-sidebar',
    features: ['Department Filters', 'Popularity Sorting', 'Category Groups', 'Active Filter Count']
  },
  {
    id: 'app-cards',
    title: 'Rich App Information',
    description: 'Each app shows ratings, user count, and access status. See what your colleagues think and how popular each tool is.',
    research: 'Google Play Store research shows that ratings and usage stats increase user trust by 85%.',
    icon: <Star className="h-6 w-6 text-zluri-red" />,
    position: 'center',
    features: ['Star Ratings', 'Usage Statistics', 'Access Status', 'Department Tags']
  },
  {
    id: 'app-details',
    title: 'Detailed App Pages',
    description: 'Click any app to see detailed information, features, user reviews, and request access. Make informed decisions about which tools to use.',
    research: 'ServiceNow\'s catalog research found that detailed app pages with reviews increase successful adoptions by 70%.',
    icon: <CheckCircle className="h-6 w-6 text-zluri-lime" />,
    position: 'center',
    features: ['Feature Lists', 'User Reviews', 'Department Usage', 'Access Requests']
  },
  {
    id: 'dashboard',
    title: 'Personal Dashboard',
    description: 'Track your apps, pending requests, and get personalized recommendations based on your department and role.',
    research: 'Apple App Store personalization increases user engagement by 40% according to their UX studies.',
    icon: <User className="h-6 w-6 text-zluri-cyan" />,
    position: 'center',
    features: ['My Apps', 'Request Status', 'Recommendations', 'Usage Analytics']
  },
  {
    id: 'request-flow',
    title: 'Simple Access Requests',
    description: 'Request access to restricted apps with a simple form. Track approval status and get notified when approved.',
    research: 'ServiceNow workflow research shows streamlined request processes reduce approval time by 50%.',
    icon: <Shield className="h-6 w-6 text-zluri-red" />,
    position: 'center',
    features: ['Request Forms', 'Status Tracking', 'Auto-notifications', 'Approval Workflow']
  },
  {
    id: 'admin-tools',
    title: 'Admin Management (Demo)',
    description: 'Administrators can review requests, manage app access, and view usage analytics across the organization.',
    research: 'Enterprise management tools based on Okta\'s admin interface best practices for efficient governance.',
    icon: <TrendingUp className="h-6 w-6 text-zluri-lime" />,
    position: 'center',
    features: ['Request Approval', 'Usage Analytics', 'Access Control', 'Organization Insights']
  }
];

export const DemoWalkthrough = ({ onComplete, onSkip }: DemoWalkthroughProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const currentStepData = walkthroughSteps[currentStep];
  const progress = ((currentStep + 1) / walkthroughSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < walkthroughSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => {
      onSkip();
    }, 300);
  };

  // Add spotlight effect to target elements
  useEffect(() => {
    if (currentStepData.targetElement) {
      const element = document.querySelector(`[data-walkthrough="${currentStepData.targetElement}"]`);
      if (element) {
        element.classList.add('walkthrough-highlight');
        return () => {
          element.classList.remove('walkthrough-highlight');
        };
      }
    }
  }, [currentStep]);

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300" />
      
      {/* Walkthrough Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl mx-auto shadow-strong">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {currentStepData.icon}
                <div>
                  <CardTitle className="text-xl font-heading">
                    {currentStepData.title}
                  </CardTitle>
                  <CardDescription>
                    Step {currentStep + 1} of {walkthroughSteps.length}
                  </CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleSkip}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <Progress value={progress} className="w-full h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round(progress)}% complete
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Main Description */}
            <div>
              <p className="text-muted-foreground leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            {/* Research Insight */}
            <div className="p-4 bg-accent/30 rounded-lg border-l-4 border-zluri-lime">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-5 w-5 text-zluri-lime mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Research Insight</h4>
                  <p className="text-sm text-muted-foreground">
                    {currentStepData.research}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="font-medium mb-3">Key Features:</h4>
              <div className="grid grid-cols-2 gap-2">
                {currentStepData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-zluri-red rounded-full flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                {walkthroughSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep
                        ? 'bg-zluri-red'
                        : index < currentStep
                        ? 'bg-zluri-lime'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSkip}
                >
                  Skip Tour
                </Button>
                
                {currentStep > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevious}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                )}
                
                <Button
                  variant={currentStep === walkthroughSteps.length - 1 ? "hero" : "default"}
                  size="sm"
                  onClick={handleNext}
                >
                  {currentStep === walkthroughSteps.length - 1 ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Get Started
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Styles for Highlighting */}
      <style>{`
        .walkthrough-highlight {
          position: relative;
          z-index: 51;
          border-radius: 8px;
          box-shadow: 0 0 0 4px rgba(255, 87, 87, 0.3), 0 0 20px rgba(255, 87, 87, 0.2);
          animation: walkthrough-pulse 2s infinite;
        }
        
        @keyframes walkthrough-pulse {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(255, 87, 87, 0.3), 0 0 20px rgba(255, 87, 87, 0.2);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(255, 87, 87, 0.2), 0 0 30px rgba(255, 87, 87, 0.3);
          }
        }
      `}</style>
    </>
  );
};