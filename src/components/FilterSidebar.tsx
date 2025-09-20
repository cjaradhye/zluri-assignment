import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { departments } from "@/lib/mockData";

interface FilterSidebarProps {
  selectedDepartments: string[];
  selectedCategories: string[];
  selectedPopularity: string[];
  onDepartmentChange: (department: string) => void;
  onCategoryChange: (category: string) => void;
  onPopularityChange: (popularity: string) => void;
  onClearFilters: () => void;
}

const categories = [
  'Communication',
  'Development',
  'Project Management',
  'CRM',
  'HR',
  'Design',
  'Documentation'
];

const popularityLevels = [
  { value: 'high', label: 'High', count: 5 },
  { value: 'medium', label: 'Medium', count: 3 },
  { value: 'low', label: 'Low', count: 0 }
];

export const FilterSidebar = ({
  selectedDepartments,
  selectedCategories,
  selectedPopularity,
  onDepartmentChange,
  onCategoryChange,
  onPopularityChange,
  onClearFilters
}: FilterSidebarProps) => {
  const activeFiltersCount = selectedDepartments.length + selectedCategories.length + selectedPopularity.length;

  return (
    <div className="w-72 space-y-6">
      {/* Filter Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <CardTitle className="text-lg">Filters</CardTitle>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Department Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Department</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {departments.map((dept) => (
            <div key={dept} className="flex items-center space-x-2">
              <Checkbox
                id={`dept-${dept}`}
                checked={selectedDepartments.includes(dept)}
                onCheckedChange={() => onDepartmentChange(dept)}
              />
              <Label 
                htmlFor={`dept-${dept}`} 
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {dept}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => onCategoryChange(category)}
              />
              <Label 
                htmlFor={`cat-${category}`} 
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {category}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Popularity Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Popularity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {popularityLevels.map((level) => (
            <div key={level.value} className="flex items-center space-x-2">
              <Checkbox
                id={`pop-${level.value}`}
                checked={selectedPopularity.includes(level.value)}
                onCheckedChange={() => onPopularityChange(level.value)}
              />
              <Label 
                htmlFor={`pop-${level.value}`} 
                className="text-sm font-normal cursor-pointer flex-1 flex items-center justify-between"
              >
                <span>{level.label}</span>
                <span className="text-muted-foreground">({level.count})</span>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};