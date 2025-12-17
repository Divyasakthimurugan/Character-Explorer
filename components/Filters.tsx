"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  onChange: (key: "status" | "gender", value: string) => void;
}

export default function Filters({ onChange }: FiltersProps) {
  return (
    <div className="flex gap-4">
      <Select onValueChange={(v) => onChange("status", v)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alive">Alive</SelectItem>
          <SelectItem value="dead">Dead</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(v) => onChange("gender", v)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="genderless">Genderless</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
