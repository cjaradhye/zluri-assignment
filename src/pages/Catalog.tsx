import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/Header";
import { FilterSidebar } from "@/components/FilterSidebar";
import { AppCard } from "@/components/AppCard";
import { Navigation } from "@/components/Navigation";
import { LoadingScreen } from "@/components/LoadingScreen";
import { DemoWalkthrough } from "@/components/DemoWalkthrough";
import { mockApps, App } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPopularity, setSelectedPopularity] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if it's first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('zluri-catalog-visited');
    if (!hasVisited) {
      setShowWalkthrough(true);
      localStorage.setItem('zluri-catalog-visited', 'true');
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleWalkthroughComplete = () => {
    setShowWalkthrough(false);
    toast({
      title: "Welcome to Zluri!",
      description: "You're all set to discover amazing applications. Start exploring!",
    });
  };

  const handleWalkthroughSkip = () => {
    setShowWalkthrough(false);
  };

  // Filter apps based on search and filters
  const filteredApps = useMemo(() => {
    return mockApps.filter(app => {
      // Search filter
      const matchesSearch = searchTerm === "" || 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.department.some(dept => dept.toLowerCase().includes(searchTerm.toLowerCase()));

      // Department filter
      const matchesDepartment = selectedDepartments.length === 0 ||
        selectedDepartments.some(dept => app.department.includes(dept));

      // Category filter
      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(app.category);

      // Popularity filter
      const matchesPopularity = selectedPopularity.length === 0 ||
        selectedPopularity.includes(app.popularity);

      return matchesSearch && matchesDepartment && matchesCategory && matchesPopularity;
    });
  }, [searchTerm, selectedDepartments, selectedCategories, selectedPopularity]);

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartments(prev => 
      prev.includes(department) 
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePopularityChange = (popularity: string) => {
    setSelectedPopularity(prev => 
      prev.includes(popularity) 
        ? prev.filter(p => p !== popularity)
        : [...prev, popularity]
    );
  };

  const handleClearFilters = () => {
    setSelectedDepartments([]);
    setSelectedCategories([]);
    setSelectedPopularity([]);
  };

  const handleRequestAccess = (app: App) => {
    navigate(`/request/${app.id}`);
  };

  const handleViewDetails = (app: App) => {
    navigate(`/app/${app.id}`);
  };

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Walkthrough */}
      {showWalkthrough && (
        <DemoWalkthrough
          onComplete={handleWalkthroughComplete}
          onSkip={handleWalkthroughSkip}
        />
      )}

      <Header 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <main className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Hidden on mobile */}
          <aside className="hidden lg:block" data-walkthrough="filter-sidebar">
            <FilterSidebar
              selectedDepartments={selectedDepartments}
              selectedCategories={selectedCategories}
              selectedPopularity={selectedPopularity}
              onDepartmentChange={handleDepartmentChange}
              onCategoryChange={handleCategoryChange}
              onPopularityChange={handlePopularityChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-heading font-bold mb-2">
                Available Applications
              </h2>
              <p className="text-muted-foreground">
                Showing {filteredApps.length} of {mockApps.length} applications
                {searchTerm && (
                  <span className="ml-1">for "{searchTerm}"</span>
                )}
              </p>
            </div>

            {/* Apps Grid/List */}
            {filteredApps.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-heading font-semibold mb-2">No apps found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredApps.map(app => (
                  <AppCard
                    key={app.id}
                    app={app}
                    viewMode={viewMode}
                    onRequestAccess={handleRequestAccess}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}