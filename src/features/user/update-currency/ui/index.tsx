"use client";

import { useUpdateCurrencySubmit } from "features/user/update-currency";
import { useAppSelector } from "shared/lib/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "shared/ui/select";

export const UpdateCurrencySelect = () => {
  const currency = useAppSelector((state) => state.userSlice.user?.currency);

  const { onSubmit } = useUpdateCurrencySubmit();

  const handleValueChange = (newValue: string) => {
    if (newValue === "BYN" || newValue === "RUB") {
      void onSubmit({ currency: newValue });
    }
  };

  return (
    <Select value={currency} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Валюта">{currency}</SelectValue>
      </SelectTrigger>
      <SelectContent position="popper" align="end">
        <SelectItem value="BYN">BYN</SelectItem>
        <SelectItem value="RUB">RUB</SelectItem>
      </SelectContent>
    </Select>
  );
};
