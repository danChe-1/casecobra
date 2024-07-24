import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface PageProps {
  searchParams: {
    [key: string]: string;
  };
}
const PreviewPage = async ({ searchParams }: PageProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const { id } = searchParams;
  if (!id || typeof id !== "string") return notFound();

  const congiguration = await db.configuration.findUnique({
    where: { id },
  });
  if (!congiguration) return notFound();
  return <DesignPreview configuration={congiguration} user={user} />;
};
export default PreviewPage;
