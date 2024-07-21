import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";

interface PageProps {
  searchParams: {
    [key: string]: string;
  };
}
const PreviewPage = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") return notFound();

  const congiguration = await db.configuration.findUnique({
    where: { id },
  });
  if (!congiguration) return notFound();
  return <DesignPreview configuration={congiguration} />;
};
export default PreviewPage;
