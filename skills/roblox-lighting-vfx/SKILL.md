---
name: roblox-lighting-vfx
description: "Use when setting up Roblox lighting, atmosphere, materials, particles and VFX: realistic lighting settings, per-area looks, avoiding scenes that are too dark or color-washed, particle rules, hit effects, and asset/texture/collision budgets."
---

# Lighting, materials and VFX

## Rules learned the hard way
- Screenshot EVERY area after any lighting change. A dark floor + dark object + colored fog made two whole levels black for a release.
- Saturated tints (Atmosphere Color/Decay, ColorCorrection Tint, colored PointLights) wash the whole scene. Keep ambient/fog near neutral; put color in props, trims and particles.
- RGB below ~60 on large surfaces disappears indoors. Lighten base colors before adding light.
- Players dislike heavy glow: Neon only for small accents, particle LightEmission <= 0.6, Bloom ~0.15.

## Settings
- Lighting (edit time): `Technology = Future`, `LightingStyle = Realistic`, `PrioritizeLightingQuality = true`, `EnvironmentSpecularScale ~1` (metal reads real), `ShadowSoftness ~0.3`, `GlobalShadows`.
- Per-area look table on the client, tweened over ~2.5 s: ClockTime, Brightness, Ambient, OutdoorAmbient, ExposureCompensation, Atmosphere Color/Decay/Density (indoors 0.1-0.2), ColorCorrection Tint.
- Open-sky recipes from creators: stylized Sky, ColorCorrection brightness .05 / contrast .1-.5 / saturation .3, SunRays .1, Brightness up to 4, DepthOfField. Not for indoor or first-person aiming games.

## Materials
Materials beat flat colors: Grass, Basalt, CrackedLava, Glacier, Snow, DiamondPlate, Metal, WoodPlanks, Foil, Concrete. Theme structural pieces (scaffolds, rails) per area too.

## Particles
- Fade Transparency in and out and grow Size from 0, or particles pop.
- Low Rate (mobile cap ~100/s); alive particles ~= Rate x Lifetime.
- Ambient motes: one invisible Box part over the area, emitter enabled only for the current area (dust, embers rising, snow falling, sparks).
- Built-in textures: `rbxasset://textures/particles/sparkles_main.dds`, `smoke_main.dds`, `fire_main.dds`.
- Rare pickups: small sparkle + label visible only up close (`BillboardGui.MaxDistance` ~20).

## Hit / impact recipe
Crack decal or lines on the hit surface, white `Highlight` flash 0.2 s, dust burst, a few flying fragments, camera shake, small FOV kick, rising pitch on combos. Parry/critical: golden spark burst + expanding ring (see movement-combat skill).

## Budgets
Images 512 px or less (256 for minor), reuse ids. `CollisionFidelity` Box/Hull for small props, invisible proxy collision for big meshes. Target 60 FPS; > 1 ms Luau per frame deserves profiling (`debug.profilebegin/end`).
