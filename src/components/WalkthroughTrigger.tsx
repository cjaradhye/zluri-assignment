import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { DemoWalkthrough } from "./DemoWalkthrough";
import { useToast } from "@/hooks/use-toast";

export const WalkthroughTrigger = () => {
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const { toast } = useToast();

  const handleStartWalkthrough = () => {
    setShowWalkthrough(true);
  };

  const handleComplete = () => {
    setShowWalkthrough(false);
    toast({
      title: "Walkthrough Complete!",
      description: "You're now ready to make the most of the app catalog.",
    });
  };

  const handleSkip = () => {
    setShowWalkthrough(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleStartWalkthrough}
        className="relative"
        title="Take a tour"
      >
        <HelpCircle className="h-5 w-5" />
      </Button>

      {showWalkthrough && (
        <DemoWalkthrough
          onComplete={handleComplete}
          onSkip={handleSkip}
        />
      )}
    </>
  );
};