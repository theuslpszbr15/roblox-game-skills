---
name: roblox-reward-reveal
description: "Use when building a crate/egg/gacha opening, unit summon or reward reveal in Roblox: screen flow, rarity colors, anticipation, flash, showcase, result card, and the policy/odds rules for paid random rewards."
---

# Reward / crate reveal

Shot map from a polished reveal (GoofyStudio, 15 s, frame by frame):
1. Lobby menu (Battle, Team, Collection, Crates, Shop).
2. Crate window: 5 cards colored by rarity (white, blue, purple, gold, red) with glowing icons and prices; below, a drop-rate table with one colored bar per rarity. That rarity color is reused everywhere after.
3. Transition: screen to black, a thin horizontal light line sweeps, crate name in the middle.
4. Dedicated reveal stage: crate on a stepped hexagonal pedestal inside a ring arch with torches. Anticipation 1.5-2 s: light bands climb the crate, glow grows.
5. Peak: white bloom flash ~0.3 s + particle burst.
6. Wide shot of all collectible units on pedestals (shows what you could get).
7. Dolly-in to the won unit; scene light turns the rarity color.
8. Unit spins on its pedestal.
9. God rays in rarity color + card (RARITY, name, stats) with CONTINUE and OPEN AGAIN.

Rules: anticipation -> flash -> context -> close-up -> rarity payoff -> next action. Never skip "open again". Rare results should look different, not take longer. Server rolls the result before the animation starts; the client only plays it.

## Paid random rewards (policy)
- Roblox requires showing the odds of paid random items before purchase; keep the drop-rate table visible on the crate screen and make it match the server table exactly.
- Do not let random rewards be traded back into Robux-value loops; check current Roblox rules (paid random items, age/region restrictions) before release.
