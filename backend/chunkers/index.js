const fs = require("fs");
const path = require("path");

const buildAdmissionsChunks = require("./admissionsChunker");


function buildAllChunks() {
  let allChunks = [];

  allChunks = allChunks.concat(buildAdmissionsChunks());
  return allChunks;
}

const outputPath = path.join(__dirname, "../chunks/allChunks.json");
const chunks = buildAllChunks();

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(chunks, null, 2));

console.log(`✅ Generated ${chunks.length} total chunks`);