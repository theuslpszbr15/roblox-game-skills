---
name: roblox-ui-juice
description: "Use when building or polishing Roblox UI: animated buttons (hover/press/release), gleam sweeps, icon bursts on rewards, modal windows in first person, responsive scaling, spacing/text tokens, mobile touch targets, safe areas and UI states."
---

# Roblox UI that feels good

## Buttons
- Each button gets a `UIScale`: hover -> 1.06 (0.12 s Quad), press -> 0.92 (0.06 s), release -> 1.06 with Back easing, leave -> 1.
- Gleam: white Frame (BackgroundTransparency 0.82, Rotation 20, 25% width, 160% height) tweened X -0.3 -> 1.3 (0.9 s Sine) every ~3.5 s inside a `ClipsDescendants` button or bar.
- Seen in references (Figma + Framewisp): squish on click, icons fly out on every click, icon rotates on hover, outline keeps moving, light sweeps across the label.
- Use `Activated` (mouse, touch and gamepad). Cover states: default, hover, pressed, focused, selected, disabled, loading, error, success.

## Icon burst (sell / buy / reward)
Clone a label/image N times at the origin, random size and rotation; tween up 0.32 s Quad Out to a random peak, then fall + fade 0.7 s Quad In, `Destroy` on Completed. Some emoji (e.g. 🪙) don't render in Roblox - prefer images or 💰 ⭐.

## Layout tokens
- Spacing 4/8/12/16/24/32/48 px; text 12/14/16/18/24/32/48; one body font + one display font (`FontFace`).
- `UIPadding` and `UIListLayout.Padding` instead of ad-hoc offsets. `UITextSizeConstraint` with TextScaled; `UISizeConstraint` pixel floors.
- Touch targets >= 44x44 px with >= 8 px gaps; a 32 px icon can sit in a transparent 44 px hit box.

## Scaling and devices
- Design at 1080p in Offset, then add a `UIScale` per window = min(1, (viewport - margin) / design size); HUD blocks scale with `ViewportSize.Y / 900` clamped 0.7-1.15.
- Check 320x568, 1280x800, 1920x1080, 3840x2160; respect `ScreenGui.ScreenInsets` / safe area and the top bar.
- Don't poll `AbsoluteSize` every frame (listen to its change signal).

## Windows and modals
- First-person games lock the mouse: an invisible `TextButton` with `Modal = true` inside the open window frees it.
- Opaque window backgrounds, or HUD text bleeds through.
- Item previews: `ViewportFrame` + cloned model + its own Camera; locked items recolored dark (silhouette).
- Foreign GUIs added by collaborators can duplicate flows; hide them from your client instead of deleting their work.
- Loading: spinner under ~2 s, skeleton when longer; errors inline with an action.
