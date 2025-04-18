import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Where } from "payload";
import { Category } from "@/payload-types";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });
        console.log(JSON.stringify(categoriesData, null, 2));

        const formattedData = categoriesData.docs.map((item) => ({
          ...item,
          subcategories: (item.subcategories?.docs ?? []).map((item) => ({
            ...(item as Category),
          })),
        }));
        const subcategoriesSlugs = [];

        const parentCategory = formattedData[0];

        if (parentCategory) {
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug
            )
          );
        }
        where["category.slug"] = {
          in: [parentCategory.slug, ...subcategoriesSlugs],
        };
      }
      const data = await ctx.db.find({
        collection: "products",
        depth: 1,
        where,
      });
      return data;
    }),
});
