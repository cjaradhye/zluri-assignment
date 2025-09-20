import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, FileText, Linkedin, Github } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold mb-2">User Profile</h1>
            <p className="text-muted-foreground">Your professional journey with Zluri</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <Avatar className="w-32 h-32 border-4 border-zluri-lime shadow-lg">
              <AvatarImage src="/profile.png" alt="Profile" />
              <AvatarFallback className="text-4xl font-bold bg-gradient-hero text-white">
                ZU
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-12">
            <a
              href="https://cjaradhye.github.io/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-zluri-red to-red-400 rounded-full transition-smooth hover:shadow-medium hover:shadow-soft hover:-translate-y-1"
              title="Resume"
            >
              <FileText className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
            </a>
            
            <a
              href="https://linkedin.com/in/aradhyeswarup"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full transition-smooth hover:shadow-medium hover:shadow-soft hover:-translate-y-1"
              title="LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
            </a>
            
            <a
              href="https://github.com/cjaradhye"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full transition-smooth hover:shadow-medium hover:shadow-soft hover:-translate-y-1"
              title="GitHub"
            >
              <Github className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* Cards Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Why I Like Zluri Card */}
            <Card className="transition-smooth hover:shadow-medium hover:shadow-soft hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-zluri-lime to-green-400 rounded-lg flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-heading">Why I Like Zluri</CardTitle>
                    <Badge variant="outline" className="text-xs mt-1">
                      Personal Perspective
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  I admire Zluri's mission to simplify SaaS management while maintaining a clean and intuitive design language. In building my demo app, I stayed close to this design style, and working with it reinforced why I'm in love with Zluri's approach to clarity and usability.
                </CardDescription>
              </CardContent>
            </Card>

            {/* What Zluri Will Get from Me Card */}
            <Card className="transition-smooth hover:shadow-medium hover:shadow-soft hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-zluri-red to-red-400 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-heading">What Zluri Will Get from Me</CardTitle>
                    <Badge variant="outline" className="text-xs mt-1">
                      Professional Value
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  I bring hands-on experience in full-stack development, AI/ML, and scalable cloud systems. Along with technical depth, I offer a product mindset that values clean, user-centric design—ensuring that I can contribute to Zluri's vision of delivering impactful, easy-to-use solutions for employees and IT teams alike.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info Section */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Ready to contribute to Zluri's success</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;