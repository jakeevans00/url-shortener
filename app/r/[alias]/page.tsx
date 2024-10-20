import { FileDatabase } from "../../../lib/db";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

interface PageProps {
  params: { alias: string };
}

export default async function AliasPage({ params }: PageProps) {
  const { alias } = params;
  const db = FileDatabase.getInstance();
  const url = await db.getUrlFromAlias(alias);

  if (url) {
    redirect(url);
  }

  notFound();
}
