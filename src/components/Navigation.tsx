import { Home, User, Grid3X3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: "Catalog", path: "/" },
    { icon: User, label: "Dashboard", path: "/dashboard" },
    { icon: Settings, label: "Admin", path: "/admin" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background border-t border-border">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-around">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Button
              key={path}
              variant={location.pathname === path ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate(path)}
              className="flex-col h-auto py-2 px-3"
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};