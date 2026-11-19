#!/usr/bin/env node
/**
 * query-brain.mjs — Offline query engine for The King's Advicer knowledge graph.
 * Queries bundled 1,005 Outside Hackathon Winners + 1,267-node Graphify knowledge graph.
 *
 * Examples:
 *   node scripts/query-brain.mjs --stats
 *   node scripts/query-brain.mjs --tracks "World ID,Uniswap v4,Circle USDC,Open Innovation"
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
const COMMUNITY_WINNERS_PATH = path.join(DATA_DIR, "community_meme_winners_302.json");
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
  c11b: "cond_c11b_community_meme_sprint",
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
    else if (k === "--tracks" && argv[i + 1]) args.tracks = argv[++i];
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

function computeStats(outsideWinners, graph, communityWinners = []) {
  const combined = [...outsideWinners, ...communityWinners];
  const countBy = (arr, key) => {
    const out = {};
    for (const item of arr) {
      const k = item[key] || "unknown";
      out[k] = (out[k] || 0) + 1;
    }
    return Object.fromEntries(Object.entries(out).sort((a, b) => b[1] - a[1]));
  };
  return {
    total_outside_winners: outsideWinners.length,
    total_community_winners: communityWinners.length,
    total_combined_winners: combined.length,
    graph_nodes: (graph.nodes || []).length,
    graph_edges: (graph.links || []).length,
    by_condition: countBy(combined, "condition"),
    by_framing_outside_only: countBy(outsideWinners, "framing_formula"),
    by_creativity: countBy(combined, "creativity_type"),
    by_precedent: countBy(combined, "precedent_strategy"),
    by_sponsor_benefit: countBy(combined, "sponsor_benefit"),
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

const LAYER_RULES = [
  {
    name: "Layer 1 (Ingress / Identity / Voice / Sensing)",
    keywords: [
      "voice", "elevenlabs", "world id", "worldcoin", "tlsnotary", "zkpass",
      "privy", "dynamic", "lit", "camera", "vision", "sensor", "hardware",
      "telegram", "whatsapp", "nfc", "qr",
    ],
  },
  {
    name: "Layer 2 (Core Compute / Hook / ZK / Model / Enclave)",
    keywords: [
      "uniswap", "hook", "fhe", "fhenix", "inca", "inco", "aztec", "noir",
      "risc zero", "succinct", "sp1", "stylus", "eigenlayer", "avs", "tee",
      "phala", "marlin", "openai", "anthropic", "claude", "mistral", "gemini",
      "vlm", "llm", "agent", "langgraph", "mcp",
    ],
  },
  {
    name: "Layer 3 (Settlement / Storage / Cross-Chain / Rail)",
    keywords: [
      "circle", "usdc", "stripe", "plaid", "layerzero", "wormhole",
      "chainlink", "ccip", "walrus", "filecoin", "arweave", "celestia",
      "avail", "supabase", "neon", "cloudflare", "base", "solana", "sui",
      "aptos", "arbitrum", "optimism", "polygon",
    ],
  },
];

const BAIT_KEYWORDS = [
  "open track", "open innovation", "open ai", "general",
  "best ai", "ai wrapper", "anything", "social",
];

const SPECIFIC_PRIMITIVE_KEYWORDS = [
  "world id", "worldcoin", "tlsnotary", "zkpass", "elevenlabs", "camera",
  "sensor", "hardware", "uniswap", "hook", "fhe", "fhenix", "aztec", "noir",
  "risc zero", "succinct", "sp1", "stylus", "eigenlayer", "tee", "phala",
  "marlin", "circle", "usdc", "stripe", "plaid", "layerzero", "wormhole",
  "chainlink", "ccip", "walrus", "filecoin", "arweave", "celestia", "supabase",
  "neon", "cloudflare", "solana", "sui", "aptos", "arbitrum", "optimism", "polygon",
  "rust", "zk",
];

const TRACK_STOPWORDS = new Set([
  "track", "best", "use", "open", "for", "the", "and", "with",
  "api", "sdk", "innovation", "general", "bounty", "prize", "main",
]);

function hasKeyword(text, kw) {
  const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(text);
}

/**
 * Classifies candidate hackathon tracks/sponsors into atomic stack layers,
 * flags crowd-bait tracks, surfaces precedent winners, and recommends a 3-layer stack.
 */
function analyzeTracks(tracksCsv, winners) {
  const trackNames = tracksCsv.split(",").map((s) => s.trim()).filter(Boolean);
  const analyzed = trackNames.map((track) => {
    const matchedLayer = LAYER_RULES.find((rule) => rule.keywords.some((kw) => hasKeyword(track, kw)));
    const layer = matchedLayer ? matchedLayer.name : "Main / Domain Track";
    const isBait = BAIT_KEYWORDS.some((kw) => hasKeyword(track, kw)) &&
      !SPECIFIC_PRIMITIVE_KEYWORDS.some((kw) => hasKeyword(track, kw));
    const crowding_risk = isBait ? "HIGH_CROWD_BAIT" : "HIGH_EV_SNIPER";

    const lowTrack = track.toLowerCase();
    const tokens = lowTrack.split(/[^a-z0-9]+/).filter((t) => t.length >= 2 && !TRACK_STOPWORDS.has(t));
    let matchedWinners = winners.filter((w) => {
      const hay = `${w.project} ${w.section} ${w.raw_idea} ${w.precedent}`.toLowerCase();
      return hay.includes(lowTrack);
    });
    if (matchedWinners.length === 0 && tokens.length > 0) {
      matchedWinners = winners.filter((w) => {
        const hay = `${w.project} ${w.section} ${w.raw_idea} ${w.precedent}`.toLowerCase();
        return tokens.some((tok) => hasKeyword(hay, tok));
      });
    }

    return {
      track,
      layer,
      crowding_risk,
      matching_winners_count: matchedWinners.length,
      sample_precedents: matchedWinners.slice(0, 3).map((w) => ({
        id: w.id,
        project: w.project,
        framing_formula: w.framing_formula,
      })),
    };
  });

  const pickBest = (layerName) =>
    analyzed.find((a) => a.layer === layerName && a.crowding_risk === "HIGH_EV_SNIPER") ||
    analyzed.find((a) => a.layer === layerName && layerName !== "Main / Domain Track") ||
    null;

  const mainPick = analyzed.find((a) => a.layer === "Main / Domain Track" && a.crowding_risk === "HIGH_EV_SNIPER") || null;
  const l1Pick = pickBest(LAYER_RULES[0].name);
  const l2Pick = pickBest(LAYER_RULES[1].name);
  const l3Pick = pickBest(LAYER_RULES[2].name);

  const selectedStack = [mainPick, l1Pick, l2Pick, l3Pick].filter(Boolean).map((a) => a.track);

  const warnings = [];
  if (trackNames.length > 4) {
    warnings.push(
      `Frankenstein Bounty-Farming Risk: >4 tracks (${trackNames.length}) provided. Lock 1 Main Track + 2-3 orthogonal sponsors across Layers 1-3.`
    );
  }
  for (const rule of LAYER_RULES) {
    const colliding = analyzed.filter((a) => a.layer === rule.name);
    if (colliding.length > 1) {
      warnings.push(
        `Layer Collision Warning: ${colliding.map((c) => c.track).join(" vs. ")} collide in ${rule.name}. Keep only one per layer.`
      );
    }
  }
  const baitTracks = analyzed.filter((a) => a.crowding_risk === "HIGH_CROWD_BAIT");
  if (baitTracks.length > 0) {
    warnings.push(
      `Crowd-Bait Warning: ${baitTracks.map((b) => b.track).join(", ")} flagged HIGH_CROWD_BAIT — avoid generic wrapper positioning here unless using a Contrarian Premise Inversion.`
    );
  }

  return {
    input_tracks: trackNames,
    analyzed,
    stack_recommendation: {
      main_or_domain_track: mainPick ? mainPick.track : null,
      layer_1_ingress: l1Pick ? l1Pick.track : null,
      layer_2_compute: l2Pick ? l2Pick.track : null,
      layer_3_settlement: l3Pick ? l3Pick.track : null,
      selected_stack: selectedStack,
    },
    warnings,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const outsideWinners = loadJson(WINNERS_PATH);
  const communityWinners = fs.existsSync(COMMUNITY_WINNERS_PATH) ? loadJson(COMMUNITY_WINNERS_PATH) : [];
  const winners = [...outsideWinners, ...communityWinners];
  const graph = loadJson(GRAPH_PATH);

  if (args.tracks) {
    const res = analyzeTracks(args.tracks, winners);
    if (args.json) {
      console.log(JSON.stringify(res, null, 2));
    } else {
      console.log("=== PHASE 0 TRACK SELECTION & 3-LAYER STACK ANALYSIS ===\n");
      for (const a of res.analyzed) {
        console.log(`- ${a.track}`);
        console.log(`  Layer: ${a.layer} | Crowding: ${a.crowding_risk} | Precedents: ${a.matching_winners_count}`);
        for (const p of a.sample_precedents) {
          console.log(`    -> [${p.id}] ${p.project} (${p.framing_formula})`);
        }
      }
      console.log("\nRecommended Atomic Stack:", res.stack_recommendation.selected_stack.join(" -> ") || "None");
      if (res.warnings.length > 0) {
        console.log("\nWarnings:");
        for (const w of res.warnings) console.log(`  ! ${w}`);
      }
    }
    return;
  }

  if (args.stats) {
    const s = computeStats(outsideWinners, graph, communityWinners);
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
