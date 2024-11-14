import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-8 pr-4 py-2 rounded-full border-slate-300 dark:border-slate-700 focus:border-slate-500 dark:focus:border-slate-500 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-500"
        />
      </div>
    </div>
  );
}
