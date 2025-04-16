import configPromise from "@payload-config";
import { getPayload } from "payload";

/**
 * React server component that fetches and displays category data from the Payload CMS.
 *
 * Retrieves all entries from the "categories" collection and renders the result as a formatted JSON string.
 *
 * @returns A JSX element containing the formatted category data.
 */
export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });
  const data = await payload.find({
    collection: "categories",
  });
  return (
    <div className="flex flex-col gap-y-4 m-4">
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
