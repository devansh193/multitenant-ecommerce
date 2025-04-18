import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

interface Props {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export const formatAsCurrency = (value: string) => {
  const numericValue = value.replace(/[^0-9.]/g, "");
  const parts = numericValue.split(".");
  const formattedValue =
    parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");
  if (!formattedValue) return "";

  const numberValue = parseFloat(formattedValue);
  if (isNaN(numberValue)) return "";
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue);
};

export const PriceFilter = ({
  minPrice,
  maxPrice,
  onMaxPriceChange,
  onMinPriceChange,
}: Props) => {
  const handleMinimumPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericalValue = e.target.value.replace(/[^0-9.]/g, "");
    onMinPriceChange(numericalValue);
  };
  const handleMaximumPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericalValue = e.target.value.replace(/[^0-9.]/g, "");
    onMaxPriceChange(numericalValue);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Minimum price</Label>
        <Input
          type="text"
          placeholder="$0"
          value={minPrice ? formatAsCurrency(minPrice) : ""}
          onChange={handleMinimumPriceChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Maximum price</Label>
        <Input
          type="text"
          placeholder="∞"
          value={maxPrice ? formatAsCurrency(maxPrice) : ""}
          onChange={handleMaximumPriceChange}
        />
      </div>
    </div>
  );
};
