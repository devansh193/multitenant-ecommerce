import Link from "next/link";
import { useCart } from "../../hooks/useCart";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, generateTenantURL } from "@/lib/utils";

interface CheckButtonProps {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}
export const CheckoutButton = ({
  className,
  hideIfEmpty,
  tenantSlug,
}: CheckButtonProps) => {
  const { totalItems } = useCart(tenantSlug);
  if (hideIfEmpty && totalItems === 0) return null;
  return (
    <Button variant={"elevated"} asChild className={cn("bg-white", className)}>
      <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
        <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ""}
      </Link>
    </Button>
  );
};
