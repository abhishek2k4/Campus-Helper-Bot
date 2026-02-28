const fs = require("fs");
const path = require("path");

const admissionsPath = path.join(__dirname, "../data/admissions.json");

function buildAdmissionsChunks() {
  const data = JSON.parse(fs.readFileSync(admissionsPath, "utf-8"));
  const chunks = [];

  // 1️⃣ General admission info
  chunks.push({
    id: "admissions-overview",
    text: `${data.info} Last updated in ${data.lastUpdated}.`,
    metadata: {
      type: "admissions_overview"
    }
  });

  // 2️⃣ Branch-wise chunks
  for (const [branch, details] of Object.entries(data.branches)) {
    // Branch overview
    let overviewText = `${details.fullName} (${branch}) is a ${details.duration} program with ${details.seats} seats available. `;
    overviewText += `Eligibility criteria: ${details.eligibility}.`;

    chunks.push({
      id: `admissions-${branch}-overview`,
      text: overviewText,
      metadata: {
        type: "admissions_branch",
        branch,
        program: details.fullName
      }
    });

    // Admission process
    chunks.push({
      id: `admissions-${branch}-process`,
      text: `Admission process for ${details.fullName}: ${details.admissionProcess}.`,
      metadata: {
        type: "admissions_process",
        branch
      }
    });

    // Cutoffs (category-wise)
    let cutoffText = `Cutoff details for ${details.fullName} (${branch}):\n`;
    for (const [category, cutoff] of Object.entries(details.cutoffs)) {
      const cutoffValues = Object.entries(cutoff)
        .map(([k, v]) => `${k.replace(/_/g, " ")} ${v}`)
        .join(", ");

      cutoffText += `${category}: ${cutoffValues}.\n`;
    }

    chunks.push({
      id: `admissions-${branch}-cutoff`,
      text: cutoffText.trim(),
      metadata: {
        type: "admissions_cutoff",
        branch
      }
    });
  }

  // 3️⃣ Admission office contact
  const contact = data.contact;
  const contactText =
    `Admission office is located at ${contact.admissionOffice}. ` +
    `Contact number: ${contact.phone}. Email: ${contact.email}. ` +
    `Office timings: ${contact.timings}.`;

  chunks.push({
    id: "admissions-contact",
    text: contactText,
    metadata: {
      type: "admissions_contact"
    }
  });

  return chunks;
}

module.exports = buildAdmissionsChunks;