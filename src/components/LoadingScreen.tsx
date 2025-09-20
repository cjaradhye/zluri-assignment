import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import zluriLogo from "@/assets/zluri-logo.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    "Initializing Zluri App Catalog...",
    "Loading available applications...",
    "Preparing your dashboard...",
    "Setting up recommendations...",
    "Almost ready!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        
        // Update step based on progress
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="mb-12">
          <img 
            src={zluriLogo} 
            alt="Zluri" 
            className="h-16 w-auto mx-auto mb-6"
          />
          <div className="w-20 h-20 gradient-hero rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 animate-pulse">
            📱
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-heading font-bold mb-2">
          Employee App Catalog
        </h1>
        <p className="text-muted-foreground mb-8">
          Discover and request access to approved business applications
        </p>

        {/* Progress */}
        <div className="space-y-4">
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-muted-foreground animate-pulse">
            {loadingSteps[currentStep]}
          </p>
          <p className="text-xs text-muted-foreground">
            {progress}% complete
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-zluri-red rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};