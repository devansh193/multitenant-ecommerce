import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: "categories",
      depth: 1,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });
    const formattedData = data.docs.map((item) => ({
      ...item,
      subcategories: (item.subcategories?.docs ?? []).map((item) => ({
        ...(item as Category),
      })),
    }));
    return formattedData;
  }),
});
