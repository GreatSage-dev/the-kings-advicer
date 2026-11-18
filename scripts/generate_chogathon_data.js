const fs = require('fs');

const detailed = JSON.parse(fs.readFileSync('the-kings-advicer/chogathon_top50_detailed.json', 'utf8'));
const projects = JSON.parse(fs.readFileSync('the-kings-advicer/chogathon_top50_projects.json', 'utf8'));
const projMap = new Map(projects.map(p => [p.id, p]));

const categorized = detailed.map(item => {
  const t = (item.title + " " + item.description).toLowerCase();
  let type = "non_game";
  let subcat = "";
  let why = "";

  // Categorize
  if (item.title === "Grand Theft Chog") {
    type = "game";
    subcat = "realtime_multiplayer_heist";
    why = "Live multiplayer co-presence: rob a rival gang's vault while defenders jump in live via WebSockets. Top sensory spectacle with high stakes.";
  } else if (item.title === "CHOG STUDIO") {
    type = "non_game";
    subcat = "viral_content_ai_studio";
    why = "Highest non-game winner ($1,200). Turns 2D PFP into 3D rigged character with custom voice to export viral TikTok/X videos. Directly empowers community marketing.";
  } else if (item.title === "Chog Hotel") {
    type = "game";
    subcat = "social_virtual_world";
    why = "Habbo Hotel-style 3D social browser world for NFT holders to hang out and flex their Chogs live.";
  } else if (item.title === "CHOG GAMES") {
    type = "game";
    subcat = "multiplayer_parlor_games";
    why = "3D Monopoly, Cards, and Poker for holders. Familiar high-replayability multiplayer parlor games.";
  } else if (item.title === "Chog ToolHub") {
    type = "non_game";
    subcat = "trading_terminal_alpha";
    why = "Consolidated 5 disparate Telegram/DEX bots into 1 unified zero-fee trading terminal with scam checks, 1-click buy/sell, copy-trading, and PnL sharing.";
  } else if (item.title === "DeClub") {
    type = "non_game";
    subcat = "onchain_social_board";
    why = "Social club board signed on-chain by holders with engagement rankings and weekly reward pools funded by swap fees.";
  } else if (item.title === "The Chog World" && item.rank === 7) {
    type = "game";
    subcat = "pixel_art_mmorpg";
    why = "Pixel-art MMORPG where NFT traits dictate in-game character stats and skills.";
  } else if (item.title === "CHOG//BREAK: Mutant Arena") {
    type = "game";
    subcat = "breeding_arena_battler";
    why = "Turns NFTs into genetic material for breeding and fighting in an on-chain arena.";
  } else if (item.title === "chogdown") {
    type = "game";
    subcat = "showdown_flywheel";
    why = "Showdown arcade battle with flywheel tokenomics.";
  } else if (item.title === "AMONG CHOGS") {
    type = "game";
    subcat = "social_deduction_multiplayer";
    why = "Among Us in a crypto office: real-time multiplayer social deduction catching 'ruggers'. Highly streamable.";
  } else if (item.title === "Chog Wallet Tracker") {
    type = "non_game";
    subcat = "alpha_wallet_tracker";
    why = "Real-time onchain alpha tracking smart-money wallets sweeping/exiting collections with token-gated alerts.";
  } else if (item.title === "Animr") {
    type = "non_game";
    subcat = "autonomous_ai_trader_agent";
    why = "ERC-6551 token-bound account giving every NFT an autonomous AI trading bot on 0G Compute, scored on $CHOG stacked vs holding.";
  } else if (item.title === "chog buddy") {
    type = "non_game";
    subcat = "desktop_pet_companion";
    why = "Desktop screen companion reacting to user activity and growing an onchain soul over time.";
  } else if (item.title === "Chog League") {
    type = "non_game";
    subcat = "trading_record_leaderboard";
    why = "Binary price prediction (higher/lower) with Coinbase price settlement and verifiable leaderboard on demo money.";
  } else if (item.title === "The Chog of Wall Street (COWS)") {
    type = "non_game";
    subcat = "onchain_business_simulator";
    why = "Turns each Chog into a business starting with $20 USDC buying street shares in a shared city economy.";
  } else if (item.title === "FloorVault") {
    type = "non_game";
    subcat = "floor_defense_memecoin_launcher";
    why = "Memecoin launcher where 80% of creator fees automatically sweep and burn the NFT collection's floor.";
  } else if (item.title === "DUBU") {
    type = "non_game";
    subcat = "ai_video_generator";
    why = "Generates animated video clips and GIFs from static NFT images via AI text prompts.";
  } else if (item.title === "chogsweeper" && item.rank === 30) {
    type = "non_game";
    subcat = "p2p_multi_nft_escrow";
    why = "Atomic P2P barter escrow: swap bundles of NFTs + MON in one single transaction with zero marketplace fees.";
  } else if (item.title === "Frens with Chog") {
    type = "non_game";
    subcat = "p2p_escrow";
    why = "P2P escrow contract for OTC asset swapping.";
  } else if (item.title === "CHOG BANK") {
    type = "non_game";
    subcat = "gamified_lending";
    why = "Borrow MON against NFT collateral with a 50/50 coin-flip debt forgiveness mechanic.";
  } else if (item.title === "Chogslist") {
    type = "non_game";
    subcat = "labor_gig_board_erc6551";
    why = "Daily gig economy matching crews of Chogs with required traits to on-chain jobs via ERC-6551.";
  } else if (item.title === "Chog-noir") {
    type = "non_game";
    subcat = "daily_investigation_comic";
    why = "Daily murder-mystery detective comic grounded in real on-chain transaction history.";
  } else if (item.title.toLowerCase().includes("game") || item.title.toLowerCase().includes("brawl") || item.title.toLowerCase().includes("arena") || item.title.toLowerCase().includes("run") || item.title.toLowerCase().includes("world")) {
    type = "game";
    subcat = "community_game";
    why = "Interactive gameplay using NFT traits.";
  } else {
    type = "non_game";
    subcat = "community_utility";
    why = "Holder utility, companion, or social feature.";
  }

  const p = projMap.get(item.id) || {};
  return {
    rank: item.rank,
    prize_usd: item.prize,
    builder: item.builder,
    title: item.title,
    type: type,
    subcategory: subcat,
    why_it_placed: why,
    tagline: item.tagline,
    tech_stack: p.tech_stack || "",
    demo_url: item.demo_url,
    github_url: item.repo_url
  };
});

fs.writeFileSync('the-kings-advicer/data/chogathon_top50_winners.json', JSON.stringify(categorized, null, 2));
console.log("Successfully wrote the-kings-advicer/data/chogathon_top50_winners.json with 50 categorized winners.");
