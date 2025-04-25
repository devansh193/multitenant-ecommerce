export const dynamic = "force-dynamic";
import { SigninView } from "@/modules/auth/ui/views/sigin-in-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await caller.auth.session();
  if (session.user) {
    redirect("/");
  }
  return <SigninView />;
};
export default Page;
