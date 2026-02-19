import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "shared/ui/select";

export function SortDropdown() {
  return (
    <Select>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Сортировка" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="default">По умолчанию</SelectItem>
        <SelectItem value="price_asc">По цене (↑)</SelectItem>
        <SelectItem value="price_desc">По цене (↓)</SelectItem>
      </SelectContent>
    </Select>
  );
}
