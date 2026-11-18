#!/usr/bin/env node
/**
 * query-brain.mjs — Offline query engine for The King's Advicer knowledge graph.
 * Queries bundled 1,005 Outside Hackathon Winners + 1,267-node Graphify knowledge graph.
 *
 * Examples:
 *   node scripts/query-brain.mjs --stats
 *   node scripts/query-brain.mjs --condition C2 --limit 8
 *   node scripts/query-brain.mjs --framing F2 --query "voice"
 *   node scripts/query-brain.mjs --neighbors "creat_premise_inversion"
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "..", "data");
const WINNERS_PATH = path.join(DATA_DIR, "outside_winners_1005.json");
const GRAPH_PATH = path.join(DATA_DIR, "graph.json");

const CONDITION_ALIASES = {
  c1: "cond_c1_tabletop_spectacle",
  c2: "cond_c2_day_zero_primitive",
  c3: "cond_c3_venture_incubator",
  c4: "cond_c4_medium_theme_jam",
  c5: "cond_c5_enterprise_fintech",
  c6: "cond_c6_scientific_edge_hw",
  c7: "cond_c7_deterministic_benchmark",
  c8: "cond_c8_design_vibecoding",
  c9: "cond_c9_ml_leaderboard",
  c10: "cond_c10_conservative_corp",
  c11: "cond_c11_zero_sponsor_open",
};

const FRAMING_ALIASES = {
  f1: "frame_f1_giant_compression",
  f2: "frame_f2_polarity_flip",
  f3: "frame_f3_crime_scene_denominator",
  f4: "frame_f4_unacceptable_dilemma",
  f5: "frame_f5_physical_verb_dare",
  f6: "frame_f6_trojan_indirect_value",
  f7: "frame_f7_disarming_honesty_refusal",
};

function parseArgs(argv) {
  const args = { limit: 10 };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--stats") args.stats = true;
    else if (k === "--json") args.json = true;
    else if (k === "--condition" && argv[i + 1]) args.condition = argv[++i];
    else if (k === "--framing" && argv[i + 1]) args.framing = argv[++i];
    else if (k === "--creativity" && argv[i + 1]) args.creativity = argv[++i];
    else if (k === "--precedent" && argv[i + 1]) args.precedent = argv[++i];
    else if (k === "--scamper" && argv[i + 1]) args.scamper = argv[++i];
    else if (k === "--query" && argv[i + 1]) args.query = argv[++i];
    else if (k === "--neighbors" && argv[i + 1]) args.neighbors = argv[++i];
    else if (k === "--limit" && argv[i + 1]) args.limit = Math.max(1, parseInt(argv[++i], 10) || 10);
  }
  return args;
}

function loadJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing bundled data file: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolveAlias(val, map) {
  if (!val) return null;
  const low = val.trim().toLowerCase();
  return map[low] || val.trim();
}

function computeStats(winners, graph) {
  const countBy = (arr, key) => {
    const out = {};
    for (const item of arr) {
      const k = item[key] || "unknown";
      out[k] = (out[k] || 0) + 1;
    }
    return Object.fromEntries(Object.entries(out).sort((a, b) => b[1] - a[1]));
  };
  return {
    total_outside_winners: winners.length,
    graph_nodes: (graph.nodes || []).length,
    graph_edges: (graph.links || []).length,
    by_condition: countBy(winners, "condition"),
    by_framing_outside_only: countBy(winners, "framing_formula"),
    by_creativity: countBy(winners, "creativity_type"),
    by_precedent: countBy(winners, "precedent_strategy"),
    by_sponsor_benefit: countBy(winners, "sponsor_benefit"),
  };
}

function getNeighbors(graph, nodeQuery, limit) {
  const nodes = graph.nodes || [];
  const links = graph.links || [];
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const lowQ = nodeQuery.toLowerCase();
  const targetNode =
    nodeMap.get(nodeQuery) ||
    nodes.find((n) => (n.label || "").toLowerCase().includes(lowQ) || n.id.toLowerCase().includes(lowQ));

  if (!targetNode) {
    return { error: `No graph node matched '${nodeQuery}'`, matches: [] };
  }
  const connected = [];
  for (const e of links) {
    if (e.source === targetNode.id) {
      const other = nodeMap.get(e.target);
      connected.push({ direction: "out", relation: e.relation, id: e.target, label: other?.label || e.target, confidence: e.confidence });
    } else if (e.target === targetNode.id) {
      const other = nodeMap.get(e.source);
      connected.push({ direction: "in", relation: e.relation, id: e.source, label: other?.label || e.source, confidence: e.confidence });
    }
  }
  return {
    node: { id: targetNode.id, label: targetNode.label, source_file: targetNode.source_file, community: targetNode.community },
    total_edges: connected.length,
    sample_neighbors: connected.slice(0, limit),
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const winners = loadJson(WINNERS_PATH);
  const graph = loadJson(GRAPH_PATH);

  if (args.stats) {
    const s = computeStats(winners, graph);
    if (args.json) {
      console.log(JSON.stringify(s, null, 2));
    } else {
      console.log(`=== THE KING'S ADVICER KNOWLEDGE BRAIN ===`);
      console.log(`Outside Winners: ${s.total_outside_winners} | Graph Nodes: ${s.graph_nodes} | Graph Edges: ${s.graph_edges}\n`);
      console.log("Outside Winners by Condition:", s.by_condition);
      console.log("Outside Winners by Framing:", s.by_framing_outside_only);
      console.log("Outside Winners by Precedent:", s.by_precedent);
      console.log("Outside Winners by Creativity:", s.by_creativity);
    }
    return;
  }

  if (args.neighbors) {
    const res = getNeighbors(graph, args.neighbors, args.limit);
    if (res.error) {
      console.error(res.error);
      process.exit(1);
    }
    if (args.json) {
      console.log(JSON.stringify(res, null, 2));
    } else {
      console.log(`NODE: ${res.node.id} | "${res.node.label}" | Total Edges: ${res.total_edges}`);
      for (const n of res.sample_neighbors) {
        console.log(`  [${n.direction}] --${n.relation}--> ${n.id}: ${n.label}`);
      }
    }
    return;
  }

  const condFilter = resolveAlias(args.condition, CONDITION_ALIASES);
  const frameFilter = resolveAlias(args.framing, FRAMING_ALIASES);
  const creatFilter = args.creativity?.trim().toLowerCase();
  const precFilter = args.precedent?.trim().toLowerCase();
  const scampFilter = args.scamper?.trim().toLowerCase();
  const qFilter = args.query?.trim().toLowerCase();

  let matched = winners.filter((w) => {
    if (condFilter && w.condition !== condFilter) return false;
    if (frameFilter && w.framing_formula !== frameFilter) return false;
    if (creatFilter && !w.creativity_type.toLowerCase().includes(creatFilter)) return false;
    if (precFilter && !w.precedent_strategy.toLowerCase().includes(precFilter)) return false;
    if (scampFilter && !w.scamper_operator.toLowerCase().includes(scampFilter)) return false;
    if (qFilter) {
      const hay = `${w.project} ${w.section} ${w.raw_idea} ${w.precedent}`.toLowerCase();
      if (!hay.includes(qFilter)) return false;
    }
    return true;
  });

  // Also check graph nodes for C8-C11 / peer concepts if query given and needed
  const out = matched.slice(0, args.limit);
  if (args.json) {
    console.log(JSON.stringify({ total_matched: matched.length, showing: out.length, results: out }, null, 2));
  } else {
    console.log(`Matched ${matched.length} outside winners (showing ${out.length}):\n`);
    for (const w of out) {
      console.log(`- [${w.id}] ${w.project}`);
      console.log(`  Condition: ${w.condition} | Frame: ${w.framing_formula} | Creativity: ${w.creativity_type} | Precedent: ${w.precedent}`);
      console.log(`  Idea: ${w.raw_idea}\n`);
    }
  }
}

main();
