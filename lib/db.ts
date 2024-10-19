import path from "path";
import fs from "fs";

export interface UrlEntry {
  alias: string;
  redirect: string;
}

export interface Database {
  mapAliasToUrl(alias: string, redirect: string): Promise<void>;
  getUrlFromAlias(alias: string): Promise<string | undefined>;
  getAllUrls(): Promise<UrlEntry[]>;
  getUnusedAlias(): Promise<string | null>;
}
export class FileDatabase implements Database {
  private static instance: FileDatabase | null = null;
  private urlMap: UrlEntry[] = [];
  private unusedAliases: Set<string> = new Set();
  private filePath: string;

  private constructor() {
    this.filePath = path.join(process.cwd(), "db.json");
    this.loadData();
  }

  public static getInstance(): FileDatabase {
    if (!FileDatabase.instance) {
      FileDatabase.instance = new FileDatabase();
    }
    return FileDatabase.instance;
  }

  private loadData(): void {
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      const parsedData = JSON.parse(data);
      this.urlMap = parsedData.urlMap || [];
      this.unusedAliases = new Set(
        parsedData.unusedAliases || ["test", "test1", "test2"]
      );
    } catch (error) {
      console.log(error);
      this.urlMap = [];
      this.unusedAliases = new Set(["test", "test1", "test2"]);
    }
  }

  private saveData(): void {
    const data = JSON.stringify(
      {
        urlMap: this.urlMap,
        unusedAliases: Array.from(this.unusedAliases),
      },
      null,
      2
    );
    fs.writeFileSync(this.filePath, data);
  }

  async getUnusedAlias(): Promise<string | null> {
    if (this.unusedAliases.size === 0) {
      return null;
    }
    const alias = this.unusedAliases.values().next().value;
    if (alias) {
      this.unusedAliases.delete(alias);
      this.saveData();
      return alias;
    }
    return null;
  }

  async mapAliasToUrl(alias: string, redirect: string): Promise<void> {
    this.urlMap.push({ alias, redirect });
    this.saveData();
  }

  async getUrlFromAlias(alias: string): Promise<string | undefined> {
    const url = this.urlMap.find((entry) => entry.alias === alias);
    return url?.redirect;
  }

  async getAllUrls(): Promise<UrlEntry[]> {
    return this.urlMap;
  }

  async clearDatabase(): Promise<void> {
    this.urlMap = [];
    this.unusedAliases.clear();
    this.saveData();
  }
}
