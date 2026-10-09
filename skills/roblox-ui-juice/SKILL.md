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

## Premium button anatomy (phoxik "INDEX" button, Figma -> Framewisp, frame by frame)
Build order seen in Figma (85 s video), each layer maps to a Roblox object:
1. Base rectangle ~300x100: vertical linear gradient light -> saturated (e.g. #BFE6FF -> #2F9BFF) = `Frame` + `UIGradient` (Rotation 90).
2. Outside stroke, dark (#0B1E33, ~4-6 px) = `UIStroke` (ApplyStrokeMode Border). Rounded corners small (`UICorner` 8-12 px).
3. Pattern overlay (diamond/lattice image) in a mask group, blend Overlay/Soft light, low opacity = `ImageLabel` ScaleType Tile, ImageTransparency ~0.8, inside a `ClipsDescendants` frame.
4. Label in a chunky pixel/display font, white fill with a dark thick stroke = `TextLabel` + `UIStroke` (Contextual) 3 px.
5. Icon (book) bigger than the bar, tilted ~-15 deg and poking out of the left edge (breaks the frame = feels 3D).
6. Thin white diagonal stripes for shine; a gradient border rectangle on top.
Framewisp tags (layer name suffix) and their Roblox equivalent:
- `_smooth` (group): hover scale 1.08, press scale 0.9, optional hover/click sound -> `UIScale` tweens.
- `_stroke` (border rectangle): gradient on the outline rotating 360 deg/s, gradient angle 360, start phase 0 -> `UIStroke` + child `UIGradient` whose `Rotation` += 360*dt (Heartbeat).
- `_lean` (icon): tilts toward the cursor / rotates on hover -> tween icon `Rotation` (-15 -> -5) and slight scale on hover.
- `_gleam` (text): light sweep across the label -> `UIGradient` on the TextLabel with a white band, tween `Offset` X -1 -> 1 every ~2.5 s.
- `_burst` (group): icons fly out on every click -> icon burst (below).
Rules: one strong color per button, dark outline everywhere, icon breaks the frame, everything moves a little (stroke always, gleam periodic, icon on hover). Framewisp export needs the user's Figma + Roblox login (pairing code) - the user does it; code-first projects reproduce the same effects with the mapping above.

## Icon burst (sell / buy / reward)
Clone a label/image N times at the origin, random size and rotation; tween up 0.32 s Quad Out to a random peak, then fall + fade 0.7 s Quad In, `Destroy` on Completed. Some emoji (e.g. 🪙) don't render in Roblox - prefer images or 💰 ⭐.
## 2D particles inside UI (from the DMiner plugin tier list: Emitter2D = top tier)
ParticleEmitter does not work in ScreenGuis. Emitter2D (plugin) turns a Frame into an emitter driven by Attributes; the same attribute set is a good spec for a code-first `uiEmitter(frame)`:
- `EmissionRate` (/s), `EmissionShape` Rectangle|Point, `EmissionShapeStyle` Volume|Surface, `EmissionDirection` + `SpreadAngle` (deg), `Speed` (px/s, NumberRange), `Acceleration` (Vector2, gravity), `Drag`.
- `Lifetime` (NumberRange s), `Size` / `Transparency` (NumberSequence over life), `Color` (ColorSequence), `Rotation` + `RotationSpeed`, `Squash`, `Texture` (image id), `FlipbookLayout`/`FlipbookFramerate`, `ZIndex`, `Enabled`, `IgnoreClipsDescendants`.
- Implementation: pool ImageLabels, step them on RenderStepped (pos += vel*dt, vel += acc*dt, vel *= 1-drag*dt), sample sequences by age/life, `Emit(n)` for bursts. Cap ~60 live particles per emitter for mobile.
- Use for: sparkles around rare cards, embers on boss health bar, confetti on level up, stars around premium buttons.

## Item icons rendered from 3D models (the "crazy" plugin in the same video)
Icon/thumbnail render plugins take a model, frame it with a camera and export a PNG with **outline**, **drop shadow** (opacity ~90, distance 4, blur 3-5, angle 45), inner shadow and presets. Code-first equivalent at runtime: `ViewportFrame` + cloned model + Camera fitted to the bounding box (FieldOfView 20-30, 3/4 angle), plus a duplicate dark ViewportFrame offset (4,4) with ImageTransparency 0.6 as the drop shadow and a `UIStroke` on the card. All item cards in a game must use the same angle, light and shadow so the inventory looks like one set.

Plugins seen as low value in that list: "googly eye" avatars / Team Create cursors (fun, no gameplay value).
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
