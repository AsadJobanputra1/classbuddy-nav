import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ScrollArea } from "./ui/scroll-area";

interface Category {
  id: string;
  name: string;
  description: string;
}

interface GPTCategoryListProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

const GPTCategoryList = ({ categories, selectedCategory, onSelectCategory }: GPTCategoryListProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] fixed left-64 top-16">
      <ScrollArea className="h-full">
        <div className="p-4">
          <h2 className="font-semibold mb-4">Categories</h2>
          <div className="space-y-1">
            <button
              onClick={() => onSelectCategory(null)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === null ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"
              }`}
            >
              All GPTs
            </button>
            {categories.map((category) => (
              <HoverCard key={category.id}>
                <HoverCardTrigger asChild>
                  <button
                    onClick={() => onSelectCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                  </button>
                </HoverCardTrigger>
                <HoverCardContent side="right" className="w-80">
                  <div>
                    <h4 className="font-semibold mb-2">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default GPTCategoryList;