#!/usr/bin/env node
/**
 * test.mjs — Deterministic verification suite for The King's Advicer skill.
 * Verifies bundled datasets, graphify integrity, zero excluded handles, link validity,
 * query-brain.mjs queries, and positive/negative frame-lint.mjs checks.
 *
 * Run: node scripts/test.mjs
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { lintBirthFrame } from "./frame-lint.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

let passed = 0;
function check(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    console.error(`  [FAIL] ${name}: ${err.message}`);
    process.exitCode = 1;
  }
}

console.log("Running The King's Advicer deterministic test suite...\n");

check("Required files and 5 references exist", () => {
  const req = [
    "SKILL.md",
    "README.md",
    "data/outside_winners_1005.json",
    "data/graph.json",
    "references/01-conditional-routing-matrix.md",
    "references/02-dual-brain-wall-walk-and-scamper.md",
    "references/03-framing-engineering-and-hooks.md",
    "references/04-contrastive-loser-traps-and-habits.md",
    "references/05-empirical-winner-index.md",
    "scripts/query-brain.mjs",
    "scripts/frame-lint.mjs",
  ];
  for (const rel of req) {
    assert.ok(fs.existsSync(path.join(ROOT, rel)), `Missing ${rel}`);
  }
});

check("SKILL.md YAML frontmatter declares name: the-kings-advicer", () => {
  const skill = fs.readFileSync(path.join(ROOT, "SKILL.md"), "utf8");
  assert.match(skill, /^---\r?\nname:\s*the-kings-advicer\r?\n/);
  assert.match(skill, /description:/);
  for (const ref of [
    "references/01-conditional-routing-matrix.md",
    "references/02-dual-brain-wall-walk-and-scamper.md",
    "references/03-framing-engineering-and-hooks.md",
    "references/04-contrastive-loser-traps-and-habits.md",
    "references/05-empirical-winner-index.md",
    "scripts/query-brain.mjs",
    "scripts/frame-lint.mjs",
  ]) {
    assert.ok(skill.includes(ref), `SKILL.md missing link to ${ref}`);
  }
});

check("Bundled outside_winners_1005.json has exactly 1,005 external winners", () => {
  const winners = JSON.parse(fs.readFileSync(path.join(ROOT, "data/outside_winners_1005.json"), "utf8"));
  assert.equal(winners.length, 1005);
  assert.ok(winners.every((w) => w.condition && w.framing_formula && w.creativity_type));
});

check("Bundled graph.json has 1,267 nodes, 7,441 links, and zero dangling endpoints", () => {
  const graph = JSON.parse(fs.readFileSync(path.join(ROOT, "data/graph.json"), "utf8"));
  assert.equal(graph.nodes.length, 1267);
  assert.equal(graph.links.length, 7441);
  const ids = new Set(graph.nodes.map((n) => n.id));
  for (const e of graph.links) {
    assert.ok(ids.has(e.source), `Dangling source ${e.source}`);
    assert.ok(ids.has(e.target), `Dangling target ${e.target}`);
  }
});

check("Zero excluded builder handles or removed down-scoping gate anywhere in package", () => {
  const walk = (dir) => {
    let files = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === ".git" || entry.name === "node_modules") continue;
        files = files.concat(walk(full));
      } else {
        files.push(full);
      }
    }
    return files;
  };
  const forbidden = ["pro" + "mzy", "great" + "sage", "promise " + "philip", "gate_time_" + "team_feasibility"];
  for (const file of walk(ROOT)) {
    const rel = path.relative(ROOT, file).replace(/\\/g, "/");
    const content = fs.readFileSync(file, "utf8").toLowerCase();
    for (const term of forbidden) {
      if (rel === "README.md" && term === "great" + "sage") continue;
      assert.ok(!content.includes(term), `Forbidden string '${term}' found in ${rel}`);
    }
  }
});

check("query-brain.mjs runs --stats, --tracks, --condition, --framing, and --neighbors cleanly", () => {
  const runQ = (args) =>
    spawnSync(process.execPath, [path.join(ROOT, "scripts/query-brain.mjs"), ...args], {
      encoding: "utf8",
    });

  const statsRes = runQ(["--stats", "--json"]);
  assert.equal(statsRes.status, 0, statsRes.stderr);
  const stats = JSON.parse(statsRes.stdout);
  assert.equal(stats.total_outside_winners, 1005);
  assert.equal(stats.graph_nodes, 1267);

  const tracksRes = runQ(["--tracks", "World ID,Uniswap v4,Circle USDC,Open Innovation", "--json"]);
  assert.equal(tracksRes.status, 0, tracksRes.stderr);
  const tJson = JSON.parse(tracksRes.stdout);
  const findTrack = (name) => tJson.analyzed.find((a) => a.track === name);
  assert.equal(findTrack("Open Innovation")?.crowding_risk, "HIGH_CROWD_BAIT");
  assert.ok(findTrack("World ID")?.layer.startsWith("Layer 1"), "World ID should map to Layer 1");
  assert.ok(findTrack("Uniswap v4")?.layer.startsWith("Layer 2"), "Uniswap v4 should map to Layer 2");
  assert.ok(findTrack("Circle USDC")?.layer.startsWith("Layer 3"), "Circle USDC should map to Layer 3");

  const condRes = runQ(["--condition", "C2", "--framing", "F2", "--json", "--limit", "5"]);
  assert.equal(condRes.status, 0, condRes.stderr);
  const condJson = JSON.parse(condRes.stdout);
  assert.ok(condJson.total_matched > 0, "Expected C2 + F2 outside winner matches");

  const graphRes = runQ(["--neighbors", "frame_f1_giant_compression", "--json", "--limit", "5"]);
  assert.equal(graphRes.status, 0, graphRes.stderr);
  const gJson = JSON.parse(graphRes.stdout);
  assert.ok(gJson.total_edges >= 500, `Expected 500+ edges on frame_f1_giant_compression, got ${gJson.total_edges}`);
});

check("frame-lint.mjs accepts crisp Birth Frames (exit 0) and rejects slop/stack-dumps (exit 1)", () => {
  const goodFrame =
    "Cursor for Surgery. Microsurgery demands sub-millimeter precision while manual robot joysticks drift under fatigue. " +
    "Robosurge uses vision-language trajectory guardrails inside ROS to snap surgical tips safely. " +
    "Move the scalpel arm in front of the judge and trigger an automatic collision stop in 2 seconds.";
  const goodRes = lintBirthFrame(goodFrame);
  assert.equal(goodRes.ok, true, `Expected good frame to pass: ${goodRes.failures.join("; ")}`);

  const slopFrame =
    "Our seamless decentralized paradigm leverages Next.js, LangGraph, Solidity, and Supabase to empower next-gen " +
    "orchestration and unlock holistic synergy across trustless AI ecosystems.";
  const slopRes = lintBirthFrame(slopFrame);
  assert.equal(slopRes.ok, false, "Expected AF1 + AF3 slop frame to fail");
  assert.ok(slopRes.foundSlop.length >= 4, "Should catch multiple slop words");
  assert.ok(slopRes.stackHitsInOpener.length >= 3, "Should catch SDK Stack-Dump opener (AF1)");

  const cliPass = spawnSync(process.execPath, [path.join(ROOT, "scripts/frame-lint.mjs"), "--text", goodFrame], {
    encoding: "utf8",
  });
  assert.equal(cliPass.status, 0);

  const cliFail = spawnSync(process.execPath, [path.join(ROOT, "scripts/frame-lint.mjs"), "--text", slopFrame], {
    encoding: "utf8",
  });
  assert.equal(cliFail.status, 1);
});

console.log(`\nSummary: ${passed} checks passed.`);
if (process.exitCode && process.exitCode !== 0) {
  process.exit(process.exitCode);
}
