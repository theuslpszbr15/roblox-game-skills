---
name: roblox-reference-learning
description: "Use when the user sends a TikTok, YouTube or other video/link to learn a Roblox technique from: extract frames (one per 0.5-1 s), read on-screen captions, write a shot map, and turn it into reusable rules in the relevant skill. Covers TikTok without login and YouTube storyboards."
---

# Learning from reference videos

Goal: copy the technique (structure, timing, colors, easing), never the art or code of the creator.

## TikTok (no login needed)
1. Open the video URL in the integrated browser (new page). Page fetch only returns title/caption, so grab frames.
2. Playwright: remove `[role="dialog"]`; pick `[...document.querySelectorAll('video')].find(v => v.src.includes('tiktok.com/video'))`; `muted = true`, `pause()`, wait `loadedmetadata`.
3. Seek every 0.5 s (0.1-0.2 s around fast moments), `drawImage` each frame into canvases stored on `window`.
4. Show 3 frames side by side on a fixed `width:100vw` canvas, screenshot, step through all of them. Too many frames per sheet = unreadable.

## YouTube
- The `<video>` often does not play in the embedded browser. Use storyboards instead: on the watch page read `ytInitialPlayerResponse.storyboards.playerStoryboardSpecRenderer.spec`, split by `|`; the last level is `w#h#count#cols#rows#intervalMs#M$M#sig`. Sheet URL = base with `$L` -> level index and `$N` -> `M<n>`, plus `&sigh=<sig>`. Open each sheet image and screenshot (9 frames each).
- Channel list: the RSS feed `https://www.youtube.com/feeds/videos.xml?channel_id=UC...` lists the latest videos.
- If Google shows a CAPTCHA / "unusual traffic", stop scripted requests and use the open browser page only. Never try to bypass it.
- Description timestamps (Showcase / Set-up) tell you where the important frames are.

## Output
Write a shot map: time -> camera, light, UI, motion, text on screen. Then extract rules (timings, sequence, colors, what makes it feel good) and append them to the matching skill. Say clearly what you saw vs. what you inferred.

## Example lessons already extracted
- Crate reveal (GoofyStudio): see `roblox-reward-reveal`.
- Running / movement / parry (SKATER STUDIOS): see `roblox-movement-combat-feel`.
- UI button juice (phoxik, Flay1z, fishmopf) and scaling (StackIt): see `roblox-ui-juice`.
- Lighting recipes (Flay1z, KH Studios): see `roblox-lighting-vfx`.
