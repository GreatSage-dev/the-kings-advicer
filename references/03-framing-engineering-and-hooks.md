# Framing Engineering & Birth Hooks (`F1`–`F7` & Code-Level Mechanisms)

In winning hackathons across our **1,164-node knowledge graph** (`1,005 Outside Winners` + `159 Peer Builds`), **Birth Framing is an engineering architecture decision made at Hour 0**, not slide-deck copy written before submission. The frame dictates what routes you code first, what screen loads in 3 seconds, and whether judges comprehend your edge before 90 seconds expire.

---

## 1. Empirical Breakdown of the 7 Winning Framing Formulas (`N = 1,164` Graph Projects)

| Formula ID & Name | Graph Share ($N = 1,164$) | Exact Structural Pattern | Best Condition & Judge Fit | Verified Winners |
| :--- | :---: | :--- | :--- | :--- |
| **`F1` 2-Token Giant Compression** | **45.5%** (`530`) | `"[Proven $10B Giant] for [Unfamiliar New Frontier]"` | `C3` VCs (`J3`), `C2` Track Specialists | **Robosurge** (*"Cursor for Surgery"*), **Latinum** (*"Stripe for AI Agents"*), **Txtx** (*"Terraform for Smart Contracts"*), **`facet`** (*"Hide My Email, for your money"*), **Tool Assisted Shopping** (*"Speedrunning for Groceries"*) |
| **`F6` Trojan Indirect Value** | **13.3%** (`155`) | Hide deep infra/economics inside an irresistible consumer ritual | `C1`/`C4` Consumer & Gaming, `B5` Distribution | **Meshmap** (*AR laser tag $\to$ 3D maps*), **DynOS 95** (*Win95 UI $\to$ cross-dApp SSO*), **`Calmr`** (*Calming room $\to$ 1.83s video latency*), **`Pendiente`** (*Hot meal $\to$ Soroban escrow*) |
| **`F5` Physical / Interactive Dare** | **10.7%** (`124`) | Imperative action verb the judge executes in 10s | `C1` Tabletop, `C4` XR/Hardware, `C8` Craft | **FaceTimeOS** (*"Call your MacBook on FaceTime"*), **kinemo** (*Punch at webcam*), **ETHPark-QR** (*Scan PromptPay QR*), **`Incorpr`** (*"Click `/rob` and steal its money"*) |
| **`F2` One-Word Polarity Flip** | **10.1%** (`117`) | Flip 1 expected word or premise 180° (**#1 among Grand Prizes**) | Crowded Main Tracks, Grand Finals, `C4`/`C11` | **Split Finance** (*"Buy Now, Pay Never"*), **Dime Defender** (*Honey blocking Amazon*), **GibberLink** (*Switch to 56k modem tones*), **`rectify-`** (*"Where 'Closed' isn't fixed"*) |
| **`F3` Crime Scene Denominator** | **8.5%** (`99`) | Open with a cited statutory/human casualty metric | `C5`/`C10` Enterprise, Health & Gov (`J4`) | **Peel** (*WHO 1-in-10 falsified pills*), **Healthiator** (*CMS rule*), **`Eighty`** (*"18,000 cut from Medicaid in Arkansas"*), **`Unhuntable`** (*"61/91 snapbacks in 1h"*) |
| **`F4` Unacceptable Dilemma** | **7.6%** (`88`) | Frame a catastrophic binary trap + position as 1-inch Missing Layer | `C2` Day-Zero SDK Launches (`J1` Protocol Eng) | **UniV4Backtester** (*Test v4 hooks blind OR simulate*), **Cache Coherence** (*Rotate key on Base, leave Arb exposed*), **`Clasp`** (*Root key forever OR useless agent*) |
| **`F7` Disarming Honesty & Refusal** | **4.4%** (`51`) | Prove the naive hyped trade fails; make deterministic refusal the hero | `C7` Security Benchmarks & `C9` Quant (`J2`) | **Atlantis / Buttercup** (*AIxCC crash/patch proof*), **InvestogAId** (*Exposing YouTube gurus*), **`Deltr`** (*Refused `-11 bps` live*), **`Exnight`** (*"I tested it. It doesn't work."*) |

---

## 2. The 4 Code-Level Software Engineering Mechanisms Behind Framing

Never leave framing trapped inside markdown bullets. Engineer it directly into the runtime so the software proves the frame without bragging:

1. **`eng_frame_route_entrypoints` — Zero-Friction Action Entrypoints:**
   - Hardcode dedicated judge routes/devices so a 90-second evaluator hits the proof in 1 click:
     - `/judge` pre-funded single-click execution (`Jennycruzy/unhuntable`),
     - `/rob` public adversarial prompt-injection/theft sandbox (`mrnetwork0001/Incorpr`),
     - Browser WebCrypto `#hash` fragment key delivery so the server never sees secrets (`SPC Wallet`),
     - OS Wi-Fi Captive Portal hijack (`Project OWL`) or physical receipt souvenir (`diffuji`).
2. **`eng_frame_visual_diff_labs` — Differential Side-by-Side State Machines:**
   - Engineer A/B proof right into the UI:
     - `Originbound` (`Amaan2k`): Left panel shows a relay attack breaking TOTP 2FA; right panel shows the exact same attack failing deterministically against WebAuthn `clientDataJSON.origin`.
     - `ReqLab` (`mrnetwork0001`): Red `500` cells flipping live to green `422` Zod-guarded cells.
     - `Silicr` (`mrnetwork0001`): Press `L` for a 4-column `Leak Inspector` comparing what Buyer, Provider, Public Chain, and Observer actually see.
3. **`eng_frame_indirect_show_dont_tell` — Indirect Value Choreography:**
   - **Never lecture judges on how smart the architecture is.** Choreograph a concrete 10-second runtime event whose consequence forces the judge to deduce the brilliance themselves:
     - `GibberLink`: Bots speak English $\to$ realize both are AI $\to$ drop English for `ggwave` modem tones $\to$ latency drops visually.
     - `DELTR`: Live button press $\to$ 19 checks run in `2μs` $\to$ displays **`NET EDGE: -11 bps -> REFUSED`** alongside 3 links to real failed mainnet transactions.
4. **`eng_frame_lexical_ci_gate` — Lexical CI Enforcement:**
   - Enforce plain-English discipline programmatically using `node scripts/frame-lint.mjs` (modeled on `plain-words-check.mjs`): **< 300 pre-technical words**, **zero buzzword slop** (`seamless`, `robust`, `revolutionize`, `leverage`, `orchestrate`, `trustless`), and concrete nouns + numeric anchors first.

---

## 3. The Mandatory "4-Line Birth Frame" Specification

Every finalized hackathon idea **must** output this compact 4-line Birth Frame before writing a line of product code:

1. **Line 1 — 5-Word Broca Hook (`F1` or `F2`):** Instant cognitive anchor (*"Cursor for Surgery"*, *"Buy Now, Pay Never"*, *"FaceTime Your Laptop"*).
2. **Line 2 — Villain / Casualty / Dare Opener (`F3`, `F4`, `F5`, or `F7`):** One plain sentence naming the exact broken wall, casualty number, or false dilemma (`<= 25 words`).
3. **Line 3 — Load-Bearing Mechanism (2 Plain Sentences):** How it works mechanically and why removing the sponsor's core technology breaks the entire circuit.
4. **Line 4 — The 10-Second Code Trigger (`eng_frame_*`):** The exact button, route (`/judge`, `/rob`), visual A/B diff, or physical sensor action the judge performs in the first 10 seconds to witness the proof live.
