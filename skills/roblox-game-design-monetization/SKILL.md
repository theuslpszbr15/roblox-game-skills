---
name: roblox-game-design-monetization
description: "Use when choosing a Roblox game idea or designing its loop, retention, economy and monetization, including pay-to-win designs: idea scoring, first 30 seconds, Day 1/3/7 hooks, product ladder (game passes, developer products, boosts, crates), whale vs free-player balance, and policy limits."
---

# Game design and monetization

## Pick the idea
Score 1-5: first-session clarity, loop repeatability, social hook, progression depth, mobile fit, monetization power, live-ops potential, build feasibility. For each idea write: first 30 s, core loop, social hook, progression ladder, Day 1/3/7 return hooks, what people pay for, main risk.

## Session and retention
- Core action within 10-30 s; spawn facing the objective; one prompt -> immediate reward -> next goal visible. No lore dump.
- Day 1 prove the fun, Day 2 reason to return (daily reward, timer), ~Day 3 meaningful unlock, Days 4-6 social (trading, teams, leaderboards), Day 7 reward advertised from the start. Always show the next upgrade.
- Economy: map sources, sinks, multipliers and gates; add sinks before big sources; watch runaway multipliers.

## Pay-to-win that still keeps players
P2W only works if there are many free players for payers to beat, so:
- Sell power that is visible and social: stronger units/weapons, damage/speed multipliers, extra slots, auto-farm, instant hatch/skip timers, exclusive crates. Show payers' power on leaderboards and in fights.
- Price ladder: cheap entry (25-99 R$) starter pack, mid game passes (199-499 R$ x2 multipliers, VIP, extra storage), repeatable developer products (boosts, spins, currency packs) for whales, limited-time packs during events.
- Keep free players progressing (slower) and give them a chance to win sometimes (skill, luck, team play) or they leave and payers have no one to beat.
- Events/limited items create urgency; leaderboards and trading create status.
- Game passes are permanent, developer products are repeatable - whales spend on products.

## Policy limits (check the current official rules before release)
- Paid random items must show odds before purchase.
- No real-money or Robux gambling loops, no misleading prices, no pressure tactics aimed at young players, respect age/region rules for paid random items.
- Purchases are granted only by the server (`ProcessReceipt` must return `PurchaseGranted` only after saving).
