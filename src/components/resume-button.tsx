import { Download, Eye, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface ResumeButtonGroupProps {
  url: string;
  filename: string;
}

export function ResumeButton({ url, filename }: ResumeButtonGroupProps) {
  return (
    <div className="flex gap-0 hover:-translate-y-1 bg-white transition-all">
      <Button variant="outline" className="rounded-r-none border-r-0 px-8 py-4 h-auto" asChild>
        <a href={url} download={filename}>
          <Download size={18} className="mr-2" />
          Download Resume
        </a>
      </Button>

      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-l-none px-3 py-4 h-auto">
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <a href={url} target="_blank" rel="noopener noreferrer" className="cursor-pointer flex items-center">
              <Eye size={18} className="mr-2" />
              <span>View Resume</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
