import fs from 'fs';

const winners = JSON.parse(fs.readFileSync('the-kings-advicer/data/community_meme_winners_302.json', 'utf8'));

console.log("=== EMPIRICAL MACRO ANALYSIS OF 302 COMMUNITY & MEME WINNERS (C11-B) ===");
console.log(`Total Winners: ${winners.length}\n`);

const countBy = (key) => {
  const counts = {};
  winners.forEach(w => {
    const val = w[key] || "unknown";
    counts[val] = (counts[val] || 0) + 1;
  });
  return Object.entries(counts).sort((a,b) => b[1] - a[1]);
};

console.log("1. DISTRIBUTION BY CREATIVITY ARCHETYPE:");
countBy("creativity_type").forEach(([k, v]) => {
  const pct = ((v / winners.length) * 100).toFixed(1);
  console.log(`  - ${k}: ${v} winners (${pct}%)`);
});

console.log("\n2. DISTRIBUTION BY SPONSOR BENEFIT VECTOR (B1-B6):");
countBy("sponsor_benefit").forEach(([k, v]) => {
  const pct = ((v / winners.length) * 100).toFixed(1);
  console.log(`  - ${k}: ${v} winners (${pct}%)`);
});

console.log("\n3. DISTRIBUTION BY FRAMING FORMULA (F1-F7):");
countBy("framing_formula").forEach(([k, v]) => {
  const pct = ((v / winners.length) * 100).toFixed(1);
  console.log(`  - ${k}: ${v} winners (${pct}%)`);
});

console.log("\n4. DISTRIBUTION BY PRECEDENT STRATEGY:");
countBy("precedent_strategy").forEach(([k, v]) => {
  const pct = ((v / winners.length) * 100).toFixed(1);
  console.log(`  - ${k}: ${v} winners (${pct}%)`);
});

console.log("\n5. SECTION BREAKDOWN (ACROSS 6 HACKATHONS):");
countBy("section").forEach(([k, v]) => {
  console.log(`  - ${k}: ${v} winners`);
});
