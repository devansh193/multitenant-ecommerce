"use client";
import { useState } from "react";
import { customCategory } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CategoriesSidebar } from "./categories-sidebar";
import { ListFilterIcon, SearchIcon } from "lucide-react";

interface Props {
  data: customCategory[];
  disable?: boolean;
}

export const SearchInput = ({ data, disable }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        data={data}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search products"
          disabled={disable}
        />
      </div>
      <Button
        variant={"elevated"}
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
    </div>
  );
};
