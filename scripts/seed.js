/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/seed.js
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DB_FILE = path.join(__dirname, "..", "db.json");

function generateAlias(length = 6) {
  return crypto.randomBytes(length).toString("base64").slice(0, length);
}

function generateAndStoreAliases(count, existingAliases) {
  const newAliases = new Set(existingAliases);
  for (let i = 0; i < count; i++) {
    let alias = generateAlias();
    while (newAliases.has(alias)) {
      alias = generateAlias();
    }
    newAliases.add(alias);
  }
  return Array.from(newAliases);
}

function seedDatabase() {
  const initialData = {
    urlMap: [
      { alias: "example1", redirect: "https://example.com/1" },
      { alias: "example2", redirect: "https://example.com/2" },
      { alias: "example3", redirect: "https://example.com/3" },
    ],
    unusedAliases: [],
  };

  // Generate and store 20 unused aliases
  initialData.unusedAliases = generateAndStoreAliases(
    100,
    initialData.unusedAliases
  );

  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  console.log("Database seeded successfully");
  console.log(`Generated ${initialData.unusedAliases.length} unused aliases`);
}

seedDatabase();
