# Contrastive Smart-Loser Traps, 8 Peer Habits & Dual-Score Anchors

Studying only winners creates **Abraham Wald's Survivorship Bias**: winners had working repos, clean UIs, and sponsor APIs—and so did the top 30 losing teams in that exact same track. To beat smart, high-effort competitors cleanly, kill every candidate that trips the 5 Smart-Loser Traps (`trap_*`) or 5 Framing Anti-Patterns (`antiframe_*`), then arm survivors with the 8 Peer Mechanized Habits.

---

## 1. The 5 Contrastive Smart-Loser Idea Traps (Good Code, $0 Prize)

| Trap ID | What High-Effort Losers Built | Why Judges Eliminated It on Sunday | Mandatory Escape Route |
| :--- | :--- | :--- | :--- |
| **`trap_layer2_crowd_collision`** | **The first logical engineering project** after reading sponsor docs (e.g., 18 smart teams all building *"Agent Wallet Spend Caps"* or *"Dynamic Fee AMM Hooks"*). | Track judges grade 15 nearly identical submissions in a row and get numb—awarding 1st place to the orthogonal lane (`UniV4Backtester`, `Partycles`, `TapeDrive`). | Apply **`SCAMPER: Reverse`** or **`Put to Another Use`** after asking: *"What will the smartest 20 teams build in Hour 2?"* |
| **`trap_sponsor_cosmetic`** | Great full-stack app where the sponsor's core primitive (TEE, FHE, MPC, Filecoin, ElevenLabs) could be swapped for Postgres/OpenAI in 20 mins. | Sponsor judges test: *"If we delete our SDK, does their core trick survive?"* If yes, $0 sponsor bounty. | Make the sponsor's newest/most unique primitive **mechanically non-removable** (`ZKP2P` ZK-Email, `Incorpr` `v1.signer`, `Tendon`/hooks intra-block callbacks). |
| **`trap_wrong_room_mismatch`** | Shipping a 400-test B2B ERP/compliance dashboard at a 36h collegiate tabletop expo (`C1`), or an uncalibrated toy game inside a blind quant leaderboard (`C9`). | Strong execution evaluated by the wrong human judge archetype. | Lock the **`Signal-to-Payoff Router` (`C1`–`C11`)** before writing code. |
| **`trap_3_paragraph_setup_tax`** | Complex domain workflow requiring the judge to read 3 paragraphs before clicking the demo button makes sense. | Judges spend **90–120 seconds total** per entry; if comprehension takes > 20s, they move on. | Cure with **`F1` Giant Compression**, **`F3` Hard Denominator**, or **`F5` Physical Dare**. |
| **`trap_pure_brake_fatigue`** | Projects framed strictly around *"AI/Crypto is scary, so here is a firewall/blocker/auditor"* where 100% of receipts are `BLOCKED`, `REJECTED`, or `DEMOTED`. | Policing users/judges creates fatigue. Judges don't reward a hall monitor that only yells "Stop!". **Formula 1 Law & 50/50 Throttle:** Brakes exist only to drive 10x faster into corners. | Enforce the **50/50 Throttle Mandate**: exactly 50% proof of brake, 50% proof of full-throttle autonomous completion (`0-click auto-merge to prod`, `instant settlement`, `zero-friction checkout`). The climax must be the green superpower, not the red siren. |

---

## 2. The 5 Fatal Framing Anti-Patterns (`AF1`–`AF5`)

Reject or rewrite any idea frame exhibiting these five instant judge killers:
1. **`AF1` SDK Stack-Dump Opener:** Opening with *"An AI-powered decentralized app using Next.js, LangGraph, Solidity, and TEEs..."* $\to$ flags a solution looking for a problem.
2. **`AF2` Polite Incrementalism:** *"A cleaner UI / 20% faster tool for X"* $\to$ fails hackathon novelty thresholds (`F2` inversion or `F4` missing layer needed).
3. **`AF3` Wernicke Jargon Fog (AI Slop):** Using `"seamless"`, `"robust"`, `"revolutionize"`, `"empower"`, `"leverage"`, `"orchestrate"`, `"trustless"`, `"paradigm"`, `"next-gen"`, `"unlock"`.
4. **`AF4` Moralizing Hall-Monitor Lecturing:** Lecturing judges about security risks instead of showing live **`eng_frame_visual_diff_labs`** contrast (`Originbound`, `ReqLab`).
5. **`AF5` Architecture Before Human Stakes:** Dumping microservice diagrams before stating the broken human/protocol wall (`W1`–`W3`).

---

## 3. The 8 Peer Mechanized Proof Habits (Universal Conversion Multipliers)

Once an idea is selected freely from the **`C1`–`C11` Outside Winners Graph**, apply these 8 execution multipliers distilled from the 5 Peer Champions (`Enoch208`, `winsznx`, `AmaanSayyad`, `mrnetwork0001`, `Jennycruzy`):

1. **`JUDGES.md` + Zero-Wallet `/judge` Sandbox:** Pre-funded 1-click UI execution + 30s `curl` verification (`Jennycruzy` 36%, `mrnetwork0001` 43%, `Enoch208` 30%).
2. **`/rob` & `self-chaos` Live Honeypot:** Give judges an explicit button to try stealing funds or injecting faults and watch deterministic refusals fire (`Incorpr`, `Bulwark`, `custos`).
3. **Radical Honesty Table & Mainnet Receipts (`evidence.mjs`):** Explicitly list *"What is real vs. simplified"* and publish failed/refused tx hashes alongside passing ones (`Deltr`, `Clasp`).
4. **Plain-Words CI Linter (`scripts/frame-lint.mjs`):** Hard-block AI slop buzzwords and enforce < 300 pre-technical words.
5. **Empirical Casualty Opener (`F3`):** Open with cited primary numbers (`18,000` lost Medicaid, `61/91` snapbacks, `3.8%` taker vs `36.3%` maker win rate).
6. **The Supreme Architectural Boundary:** Unstructured parsing stays in AI; statutory cents, risk limits, routing math, and approvals (`uiOnly: true`) stay 100% deterministic (`Eighty`, `Clarilot`, `Custos`).
7. **Held-Out & Zero-`Math.random` Proof:** Validate rules on held-out days/seeds and kill seeded code mutations (`lading` 50 held-out days, `theeleven` 229/229 deterministic tests, `Crux` McNemar $p=1.4\times 10^{-14}$).
8. **Sponsor Issue & DevEx Bug Log (`25% Rubric Hack`):** Open by citing a real sponsor GitHub Issue/EIP/NEP/HIP and log every real SDK friction discovered while building (`Vaticr`, `Redeye`).

---

## 4. Dual-Score Advisory Rubric (Never Average Both Scores)

Score every evaluated or proposed idea on two **separate 1–10 scales** (mirroring `senior-gap-audit` discipline):

### Axis A: `Idea & Condition Fit` (`1–10`)
- **9–10 (`Grand Prize / Incubator Grade`):** Matches exact room condition (`C1`–`C11`), solves an authentic Wall (`W1`/`W2`/`W3`), sponsor's newest primitive is 100% load-bearing, avoids `Layer-2 Crowd Collision`, and carries proven $1B category port or clean 180° inversion.
- **7–8 (`Track Podium Grade`):** Clear pain or spectacle fitting judge archetype (`J1`–`J4`) with solid sponsor fit, minor crowding risk or modest ambition ceiling.
- **5–6 (`Smart-Loser Danger Zone`):** Competent technical concept that trips `trap_layer2_crowd_collision` (20 teams building it) or `trap_sponsor_cosmetic` (sponsor tech easily swappable).
- **1–4 (`Hour-1 Clone / Wrong Room`):** Generic wrapper ("Chat with X PDFs"), pure brake fatigue, or dry ERP pitched into a 36h hardware spectacle.

### Axis B: `Framing & Judge Conversion` (`1–10`)
- **9–10 (`Instant 10-Second Shock`):** Passes `frame-lint.mjs` with zero slop, nails a crisp 4-Line Birth Frame (`F1`–`F7`), and engineers framing into code (`/judge`, `/rob`, differential visual lab, indirect show-don't-tell, physical prop).
- **7–8 (`Clear & Crisp`):** Strong 1-sentence hook and concrete casualty/cost anchor, though runtime proof still requires 2–3 clicks or manual setup.
- **5–6 (`3-Paragraph Setup Tax`):** Judge must read dense explanation before feeling why it matters, or relies on declarative feature bullets (`AF5`).
- **1–4 (`Slop / Stack Dump`):** Fails `frame-lint.mjs` (`AF1` SDK stack dump, `AF3` buzzword fog, polite incrementalism `AF2`).
