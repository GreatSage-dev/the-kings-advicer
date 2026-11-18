# the-kings-advicer

An empirical hackathon ideation advisor and contrastive idea auditor built on **1,005 verified external global hackathon winners**, **5 peer champions**, and a **1,267-node Graphify knowledge graph** (`7,441 edges`).

Most AI idea prompts produce **"First Right Answer" slop**—recycling training-data averages or pulling every prompt down one rigid habit. `the-kings-advicer` forces your agent to diagnose the exact **Hackathon Condition (`C1`–`C11`)**, simulate a **180-Second First-Person Wall-Walk** across all three human triggers (`Operational Pain`, `Absurdity Inversion`, `Dead-Screen Boredom`), test concepts against **Contrastive Smart-Loser Traps**, and lock **code-level Birth Framing (`F1`–`F7`)** before writing product code.

---

## What It Produces

Depending on whether you ask for new ideas or audit an existing one, the advisor delivers:

- **Room Diagnosis (`Signal-to-Payoff Router`):** Maps changelog age, judging duration/format, track crowding, and target surface to Conditions **`C1`–`C11`**, Sponsor Payoffs **`B1`–`B6`**, and Judge Archetypes **`J1`–`J4`**.
- **3 Orthogonal Candidates (Never 3 Variations of the Same Idea):**
  1. **Channel 1 — Big-Company Category Port** (`740 / 1,005` = `73.6%` in `query-brain --stats`)
  2. **Channel 2 — Brand-New Native Mechanism** (`151 / 1,005` = `15.0%` in `query-brain --stats`)
  3. **Channel 3 — Contrarian Premise Inversion** (`114 / 1,005` = `11.3%` in `query-brain --stats`)
- **Contrastive Smart-Loser Kill Gate:** Filters candidates against `Layer-2 Crowd Collision`, `Cosmetic Sponsor Bolt-On`, `Wrong Room Mismatch`, `3-Paragraph Setup Tax`, and `Pure Brake Fatigue`.
- **Dual-Score Rubric (Never Averaged):**
  - **Idea & Condition Fit (`1–10`)**
  - **Framing & Judge Conversion (`1–10`)** — checked deterministically with `scripts/frame-lint.mjs` against 25 banned AI-slop buzzwords and stack-dump openers (`AF1`–`AF5`).

---

## Architecture & Bundled Knowledge Graph

```text
the-kings-advicer/
├── SKILL.md                                    # 6-phase ideation & audit workflow
├── README.md
├── data/
│   ├── outside_winners_1005.json               # 1,005 structured external hackathon winners
│   └── graph.json                              # 1,267-node / 7,441-edge Graphify knowledge graph
├── references/
│   ├── 01-conditional-routing-matrix.md        # Conditions C1-C11, Benefits B1-B6, Judges J1-J4
│   ├── 02-dual-brain-wall-walk-and-scamper.md  # 3 Walls, 180s Wall-Walk, 5 Lobes, Bisociation, SCAMPER
│   ├── 03-framing-engineering-and-hooks.md     # 7 Framing Formulas (F1-F7) + 4 code mechanisms
│   ├── 04-contrastive-loser-traps-and-habits.md# 5 Smart-Loser Traps + 8 Peer Proof Habits + Scoring
│   └── 05-empirical-winner-index.md            # Cross-condition lookup across top global winners
└── scripts/
    ├── query-brain.mjs                         # Zero-dependency graph & precedent CLI
    ├── frame-lint.mjs                          # Deterministic Birth-Frame & Anti-Slop CI linter
    └── test.mjs                                # Full deterministic verification suite
```

---

## CLI Utilities & Verification

Query the bundled knowledge graph directly from any terminal (`Node.js >= 18`):

```bash
# Inspect graph stats across all 1,005 external winners + 1,267 nodes
node scripts/query-brain.mjs --stats

# Find winning precedents for a Day-Zero SDK launch (C2) using Polarity Flip framing (F2)
node scripts/query-brain.mjs --condition C2 --framing F2 --limit 8

# Trace graph neighbors for any concept, framing formula, or trap
node scripts/query-brain.mjs --neighbors "frame_f1_giant_compression" --limit 10

# Lint a proposed 4-Line Birth Frame (exit 0 = pass, exit 1 = slop/stack-dump detected)
node scripts/frame-lint.mjs --text "Cursor for Surgery. ..."

# Run the complete deterministic verification suite
node scripts/test.mjs
```

---

## Install

### Skills CLI (`npx skills`)

```bash
npx skills add GreatSage-dev/the-kings-advicer -g
```

### Antigravity / Claude Code (Manual Global Install)

**Windows (PowerShell):**
```powershell
git clone https://github.com/GreatSage-dev/the-kings-advicer.git "$env:USERPROFILE\.gemini\config\skills\the-kings-advicer"
```

**macOS / Linux:**
```bash
git clone https://github.com/GreatSage-dev/the-kings-advicer.git ~/.claude/skills/the-kings-advicer
```

---

## Use

Ask your agent naturally:
- *"Use `the-kings-advicer` to ideate for the ETHGlobal Bangkok Uniswap v4 track."*
- *"Audit this hackathon idea against smart-loser traps before we build."*
- *"Run the 180-second Wall-Walk on the AssemblyAI voice track and give me 3 orthogonal ideas."*
- *"Check if my Birth Frame passes `frame-lint` and fits a 36h collegiate expo."*
