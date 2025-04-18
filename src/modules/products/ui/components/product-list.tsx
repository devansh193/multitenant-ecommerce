"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  category?: string;
}

export const ProductList = ({ category }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({ category })
  );
  return (
    <div>
      <h1>{JSON.stringify(data)}</h1>
    </div>
  );
};

export const ProductListSkeleton = () => {
  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
};
