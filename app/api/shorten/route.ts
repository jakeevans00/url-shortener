import { NextResponse } from "next/server";
import { FileDatabase } from "@/lib/db";
import { isValidUrl } from "@/lib/utils";

export async function POST(request: Request) {
  const db = FileDatabase.getInstance();
  const { urlText } = await request.json();
  console.log(urlText);

  if (!isValidUrl(urlText)) {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
  }

  console.log("pass vlidation");
  const alias = await db.getUnusedAlias();
  const shortUrl = `http://localhost:3000/${alias}`;

  if (!shortUrl) {
    throw new Error(`No more usable aliases available!`);
  }

  try {
    db.mapAliasToUrl(shortUrl, urlText);
  } catch (err) {
    throw new Error(`Database error ${err}`);
  }

  return NextResponse.json({ shortUrl });
}
