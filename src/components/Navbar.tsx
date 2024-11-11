import { ThemeToggle } from "./ThemeToggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = ({ onModelChange }: { onModelChange: (model: string) => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 border-b bg-background z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg" 
            alt="Gemini Logo" 
            className="h-8 w-8"
          />
          <span className="font-semibold text-xl hidden sm:inline">Gemini</span>
        </div>
        <div className="flex items-center gap-4">
          <Select onValueChange={onModelChange} defaultValue="gemini-1.5-pro-002">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gemini-1.5-pro-002">gemini-1.5-pro-002</SelectItem>
              <SelectItem value="gemini-1.5-pro">gemini-1.5-pro</SelectItem>
              <SelectItem value="gemini-1.5-flash">gemini-1.5-flash</SelectItem>
              <SelectItem value="gemini-1.5-flash-002">gemini-1.5-flash-002</SelectItem>
              <SelectItem value="gemini-1.5-flash-8b">gemini-1.5-flash-8b</SelectItem>
            </SelectContent>
          </Select>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;