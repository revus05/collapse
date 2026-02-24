import { Search } from "lucide-react";
import { Button } from "shared/ui/button";
import { Field } from "shared/ui/field";
import { Input } from "shared/ui/input";

export function SearchBar() {
  return (
    <Field orientation="horizontal">
      <Input type="text" placeholder="Поиск модели..." className="flex-1" />
      <Button type="button">
        <Search />
      </Button>
    </Field>
  );
}
