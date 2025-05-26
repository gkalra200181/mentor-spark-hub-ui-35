
import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SearchAndFiltersProps {
  onFiltersChange: (filters: {
    completionFilter: number[];
    projectFilters: {
      week1: boolean;
      week2: boolean;
      week3: boolean;
      week4: boolean;
      hackathon: boolean;
      communityCreation: boolean;
    };
    timezone: string;
  }) => void;
}

export default function SearchAndFilters({ onFiltersChange }: SearchAndFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [completionFilter, setCompletionFilter] = useState([0, 100]);
  const [filters, setFilters] = useState({
    timezone: "all",
    projectFilters: {
      week1: false,
      week2: false,
      week3: false,
      week4: false,
      hackathon: false,
      communityCreation: false
    }
  });

  const handleCompletionChange = (value: number[]) => {
    setCompletionFilter(value);
    onFiltersChange({
      completionFilter: value,
      projectFilters: filters.projectFilters,
      timezone: filters.timezone
    });
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange({
      completionFilter,
      projectFilters: newFilters.projectFilters,
      timezone: newFilters.timezone
    });
  };
  
  const handleProjectFilterChange = (projectKey: string, value: boolean) => {
    const newProjectFilters = {
      ...filters.projectFilters,
      [projectKey]: value
    };
    const newFilters = {
      ...filters,
      projectFilters: newProjectFilters
    };
    setFilters(newFilters);
    onFiltersChange({
      completionFilter,
      projectFilters: newProjectFilters,
      timezone: newFilters.timezone
    });
  };

  const clearFilters = () => {
    setCompletionFilter([0, 100]);
    const clearedFilters = {
      timezone: "all",
      projectFilters: {
        week1: false,
        week2: false,
        week3: false,
        week4: false,
        hackathon: false,
        communityCreation: false
      }
    };
    setFilters(clearedFilters);
    onFiltersChange({
      completionFilter: [0, 100],
      projectFilters: clearedFilters.projectFilters,
      timezone: clearedFilters.timezone
    });
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Input 
            type="text" 
            placeholder="Search learners by name or email..." 
            className="pl-10 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap min-w-[120px]">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            <div className="space-y-4 p-2">
              <div className="flex items-center justify-between">
                <h3 className="text-left text-base font-semibold">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-8 px-2 text-xs"
                >
                  Clear all
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm">Completion Percentage</Label>
                <div className="px-2">
                  <Slider 
                    defaultValue={[0, 100]} 
                    max={100} 
                    step={1} 
                    value={completionFilter}
                    onValueChange={handleCompletionChange}
                    className="py-4"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{completionFilter[0]}%</span>
                  <span>{completionFilter[1]}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Project Completion</Label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { key: "week1", label: "Week 1 Project" },
                    { key: "week2", label: "Week 2 Project" },
                    { key: "week3", label: "Week 3 Project" },
                    { key: "week4", label: "Week 4 Project" },
                    { key: "hackathon", label: "Optional Hackathon" },
                    { key: "communityCreation", label: "Optional Community Creation" }
                  ].map((project) => (
                    <div key={project.key} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`project-${project.key}`} 
                        checked={filters.projectFilters[project.key]}
                        onCheckedChange={(checked) => 
                          handleProjectFilterChange(project.key, !!checked)
                        }
                      />
                      <Label htmlFor={`project-${project.key}`} className="text-sm font-normal">{project.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Timezone</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["all", "americas", "emea", "apac"].map(zone => (
                    <div key={zone} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`timezone-${zone}`}
                        name="timezone"
                        checked={filters.timezone === zone}
                        onChange={() => handleFilterChange("timezone", zone)}
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor={`timezone-${zone}`} className="text-sm font-normal capitalize">
                        {zone === "all" ? "All" : zone}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => setFiltersOpen(false)} 
                className="w-full bg-primary hover:bg-primary/90"
              >
                Apply Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
