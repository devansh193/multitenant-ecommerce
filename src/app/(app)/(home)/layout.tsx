import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filter";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Category } from "@/payload-types";
import { customCategory } from "./types";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  });

  const formattedData: customCategory[] = data.docs.map((item) => ({
    ...item,
    subcategories: (item.subcategories?.docs ?? []).map((item: Category) => ({
      ...(item as Category),
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
