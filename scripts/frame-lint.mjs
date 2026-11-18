#!/usr/bin/env node
/**
 * frame-lint.mjs — Deterministic Birth-Frame & Anti-Slop Linter.
 * Enforces Framing Engineering 4 (lexical CI gate) before an idea pitch is accepted.
 *
 * Exit 0: Crisp, concrete, slop-free Birth Frame.
 * Exit 1: Violates buzzword ban, word cap, stack-dump opener (AF1), or concreteness check.
 *
 * Usage:
 *   node scripts/frame-lint.mjs --text "Cursor for Surgery. ..."
 *   node scripts/frame-lint.mjs --file path/to/frame.md
 */

import fs from "node:fs";

const BANNED_SLOP_WORDS = [
  "seamless",
  "seamlessly",
  "robust",
  "revolutionize",
  "revolutionary",
  "empower",
  "empowering",
  "leverage",
  "leveraging",
  "orchestrate",
  "orchestrating",
  "trustless",
  "cutting-edge",
  "next-gen",
  "next-generation",
  "game-changer",
  "game-changing",
  "synergy",
  "paradigm",
  "holistic",
  "hyper-scalable",
  "democratize",
  "unleash",
  "transformative",
  "state-of-the-art",
];

const STACK_DUMP_TERMS = [
  "next.js",
  "nextjs",
  "react",
  "solidity",
  "typescript",
  "python",
  "langchain",
  "langgraph",
  "tailwind",
  "supabase",
  "vercel",
  "postgres",
  "docker",
  "kubernetes",
  "foundry",
  "ethers.js",
  "wagmi",
  "vite",
];

function parseArgs(argv) {
  const args = { maxWords: 300, json: false };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--text" && argv[i + 1] !== undefined) args.text = argv[++i];
    else if (k === "--file" && argv[i + 1]) args.file = argv[++i];
    else if (k === "--max-words" && argv[i + 1]) args.maxWords = parseInt(argv[++i], 10) || 300;
    else if (k === "--json") args.json = true;
  }
  return args;
}

export function lintBirthFrame(rawText, { maxWords = 300 } = {}) {
  const text = (rawText || "").trim();
  const failures = [];
  const warnings = [];

  if (!text) {
    return { ok: false, wordCount: 0, failures: ["Empty frame text provided."], warnings: [] };
  }

  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  if (wordCount > maxWords) {
    failures.push(`Word count ${wordCount} exceeds max ${maxWords} pre-technical words (AF5 bloat). Cut backstory before engineering details.`);
  } else if (wordCount > 150) {
    warnings.push(`Word count ${wordCount} > 150 words; tighten into a sharper 4-Line Birth Frame if possible.`);
  }

  // 1. Check banned Wernicke AI slop words (AF3)
  const low = text.toLowerCase();
  const foundSlop = BANNED_SLOP_WORDS.filter((w) => new RegExp(`\\b${w.replace("-", "[- ]?")}\\b`, "i").test(low));
  if (foundSlop.length > 0) {
    failures.push(`Wernicke Jargon Fog (AF3) detected: [${foundSlop.join(", ")}]. Replace adjectives with concrete nouns, numbers, and verbs.`);
  }

  // 2. Check Anti-Frame AF1: SDK Stack-Dump Opener in the first sentence
  const firstSentence = text.split(/(?<=[.!?\n])\s+/)[0].toLowerCase();
  const stackHitsInOpener = STACK_DUMP_TERMS.filter((t) => firstSentence.includes(t));
  if (stackHitsInOpener.length >= 2) {
    failures.push(`SDK Stack-Dump Opener (AF1): First sentence lists tech stack [${stackHitsInOpener.join(", ")}] instead of the hook, casualty wall, or physical dare.`);
  }

  // 3. Check Anti-Frame AF2: Polite Incrementalism without concrete inversion/mechanism
  if (/^(an?\s+)?(better|cleaner|faster|smarter|improved|enhanced)\s+(ui|dashboard|interface|tool|platform|wrapper)/i.test(firstSentence)) {
    warnings.push("Possible Polite Incrementalism (AF2): Avoid opening with 'a better/cleaner dashboard for...'; lead with a Giant Compression, Polarity Flip, or Hard Denominator.");
  }

  // 4. Concreteness check: must contain at least one number/unit, slash route (/rob, /judge), or giant anchor (" for " / " without " / " instead ")
  const hasConcreteMetricOrRoute = /(\d+|\/\w+|\$\d+|bps|ms|kb|mw|%)/i.test(text);
  const hasAnchorConnector = /\b(for|instead of|without|refuses|blocks|turns|flips|scans|calls)\b/i.test(text);
  if (!hasConcreteMetricOrRoute && !hasAnchorConnector) {
    failures.push("Zero concrete anchors found: include a specific metric/cost/route (/judge, /rob, 18,000, $0.001, 100mW) OR concrete verb/giant anchor ('X for Y', 'refuses', 'scans').");
  }

  return {
    ok: failures.length === 0,
    wordCount,
    foundSlop,
    stackHitsInOpener,
    failures,
    warnings,
  };
}

// CLI entrypoint
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/").split("/").pop())) {
  const args = parseArgs(process.argv.slice(2));
  let input = args.text;
  if (!input && args.file) {
    input = fs.readFileSync(args.file, "utf8");
  } else if (!input && !process.stdin.isTTY) {
    input = fs.readFileSync(0, "utf8");
  }

  const res = lintBirthFrame(input, { maxWords: args.maxWords });
  if (args.json) {
    console.log(JSON.stringify(res, null, 2));
  } else {
    console.log(`frame-lint: ${res.ok ? "PASS" : "FAIL"} (${res.wordCount} words)`);
    for (const w of res.warnings) console.log(`  WARN: ${w}`);
    for (const f of res.failures) console.error(`  FAIL: ${f}`);
  }
  process.exit(res.ok ? 0 : 1);
}
