import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SortFilter = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Recent" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="recent">Recent</SelectItem>
        <SelectItem value="old">Old</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortFilter;
