import configPromise from "@payload-config";
import { getPayload } from "payload";

/**
 * Fetches category data from the Payload CMS and renders it as formatted JSON in a styled React component.
 *
 * @returns A JSX element displaying the retrieved categories data.
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
