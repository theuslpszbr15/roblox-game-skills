---
name: roblox-build-workflow
description: "Use when starting or growing a Roblox game so the agent builds in small playable slices instead of the whole game at once: short PRD, slice plan, per-slice test, visual review, security review and pre-publish QA checklist."
---

# Build workflow (vertical slices)

1. PRD (one page): player promise, core loop, first session, server-owned systems, economy and monetization, persistence, UI status, mobile/perf targets, out of scope, 1-3 risks.
2. Slice list: each slice is ONE playable capability end to end (input -> server validation -> remote -> save -> UI -> feedback). The first slice proves action -> reward -> next goal.
3. Build one slice, then: compile, automated test through the Studio bridge, screenshot every affected screen, play it, fix. Only then the next slice.
4. Polish pass per slice with the UI, lighting/VFX, camera and movement skills.

## Security checklist (every slice)
- Remotes are public: validate type, range, ownership, distance, cooldown and rate; the server computes rewards, damage and prices.
- Set properties before parenting replicated instances. Don't trust client physics for decisions.
- DataStore: versioned schema, defaults merged only after a successful load, never save after a failed load, save on leave and on shutdown.
- Imported Creator Store models: strip scripts, check for hidden requires, quarantine before use.

## Pre-publish QA
First action in < 30 s, touch-only path works, HUD readable on a phone, reward and next goal visible, monetization prompts not blocking play, no errors in Output, every area screenshotted, tested in the real cloud place (other scripts may exist there), publish confirmed in the Studio log.
