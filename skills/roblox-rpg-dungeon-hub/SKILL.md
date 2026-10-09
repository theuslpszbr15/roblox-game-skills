---
name: roblox-rpg-dungeon-hub
description: "Use when building a Roblox action RPG in the style of popular voxel dungeon games: hub town, party queue pads for dungeons/raids, NPCs with cinematic name reveal and dialogue, boss intro cutscenes (skippable), weapon arsenal with stars/tiers/stats/skills/upgrades, chests with drop tables, world map, pixel-font UI. Includes the shot map of a real gameplay recording."
---

# Action RPG with a dungeon hub (voxel / pixel style)

## Reference breakdown (54 s screen recording of a popular voxel RPG, frame by frame)
1. Hub town (0-14 s): wide street between giant voxel cliffs and trees, giant mushrooms, shops with huge 3D signs (red crossed swords = PLAY, green $ = shop), lanterns, floating blue crystal portal at the end of the street. Third-person camera, character with voxel armor and a glowing red blade (pink sparks trail).
2. Queue pads in the hub: each dungeon has a billboard with a preview image, name ("Pastagens"), difficulty tag (HEROICO), progress pips (3/4) and "AGUARDANDO JOGADORES 0/4" over a pad. Standing on the pad = joining the party; when full or timer ends, teleport into the dungeon.
3. Bottom dock: 5 big pixel icons with labels: CONFIGURACOES, LOJA, JOGAR (bigger, red crossed swords, center), ARSENAL (with "!" badge), PESCAR. Top-right: own name + level card, "BONUS DE AMIGOS +x% DE ITENS", server player list with colored levels. Floating reward text in the center ("AMULETO SUPER RARO x1", "BAU FOSSIL x1", "RESGATADO!").
4. Settings (14-18 s): dark brown panel, gold section titles, rows with title + description + control on the right (slider, < AUTOMATICO >, LIGADO/DESLIGADO pill), "PADRAO" hint under each control. Notable options: Indicadores de Ataque (warning ring on the ground before enemy attacks), Vibracao da Camera, Assistencia de Mira, Efeitos (world/enemies/other players separately), **Pular cenas automaticamente** (skip boss cutscenes already seen; everyone must agree).
5. Shop (18-28 s): tabs PACOTES / PASSES / DIARIO / MOEDAS, creator code box, coins top right. Bundle card with value tag ("VALOR 4.00X"), item tiles with counts and stars, crossed old price -> new price. VIP pass card (infinite revive, gold title, mini pet, double daily rewards). Daily tab: free daily chest (RESGATAR -> RESGATADO), chests bought with coins, 23h45m timer.
6. World map (28-30 s): pixel-art island with fog of war; zones labeled with level (Campos, Areias Antigas, Tundra Assombrada, Abismo Carmesim, Saguao da Incursao, Treinamento) and "VOCE ESTA AQUI".
7. Arsenal (30-36 s): left grid of weapon tiles (stars, tier T1/T2, copies bar 2/5), filter "ESTRELAS". Center: big 3D weapon rotating with particles. Right: name, rarity (LENDARIO), type (Espada, Retalhador), stats bars (Dano, Chance de Golpe Critico, Velocidade de Ataque, Repulsao), skill card (name, cooldown, energy cost), level + copies, EQUIPAR / MELHORIA buttons. Bottom tabs: ARMAS, ARMADURA, BAUS, POCOES, CLASSES.
8. Chests (36-42 s): chest detail with drop table grouped by rarity (LENDARIO 0.41%, EPICO 1.3%, RARO 65.49%) and each item's %, ABRIR / ABRIR TODOS. Opening happens in a small dedicated room (wooden walls, two lanterns, crate): chest in center, "toque no bau" -> clicks shake it -> burst.
9. NPC name reveal (44-54 s): walking near an NPC, the screen fades to black for a beat, then big pixel letters type in at the bottom right: "Clyde" + "Instrutor do treinamento" while the camera keeps following the player.

## How to build each piece (code-first)
- Pixel look: voxel parts (SmoothPlastic, flat saturated colors, 1-stud blocks), pixel font (`Font.Arcade` for UI numbers/titles, `Font.Code` for body), dark brown panels (#2b1d14) with gold (#e8b04a) titles, no rounded corners (or 2 px).
- Queue pad: Part + BillboardGui (name, difficulty, players n/max). Server tracks players inside the pad region each 0.5 s; countdown when >=1; at 0 teleport the party (TeleportService reserved server, or same place: move to the dungeon area and lock the door).
- NPC name reveal: on ProximityPrompt/zone enter, client plays: letterbox bars in (0.3 s), title label types one letter every 0.04 s (big pixel font, bottom right), subtitle fades in, hold 2 s, out. Once per NPC per session.
- Dialogue: data table `{speaker, text, choices}`; box at the bottom with portrait (ViewportFrame of the NPC head), typewriter text, click to finish line / advance, choices as buttons. Camera: Scriptable shot over the shoulder looking at the NPC (TweenService on CFrame, 0.6 s Sine), restore on close.
- Boss intro cutscene: lock input, letterbox, camera path of 3 shots (wide arena -> low angle on boss -> close-up on face), boss plays a roar animation, title card "NOME DO CHEFAO / subtitle" with screen shake, then health bar slides in at the top. Total 5-7 s, skippable (hold a key) and auto-skipped if the setting is on and already seen.
- Attack indicators: before a heavy attack, server spawns a flat red Neon disc/cylinder on the ground that fills (size tween) for the telegraph time; damage only inside it when it completes.
- Arsenal stats: keep weapon data in a ModuleScript (damage, crit, speed, knockback, skill {name, cooldown, energy}); level and copies upgrade stats; server validates equip.
- Chest drop table: weights per rarity -> show % in UI computed from the same table (never a separate hard-coded list).

## Assets from the internet (bosses, NPCs)
- Use Creator Store models with InsertService in Studio (edit time) or `AssetService` free models; strip every Script/LocalScript/ModuleScript, check for `require(<id>)`, anchor and group under the place's folders.
- Prefer rigged models (Humanoid + Motor6D) so animations play; use catalog animation ids or the default R15 ones.
- Keep a credits list (asset id + creator) in the repo.

## Live play notes (second pass on the same game, inside the client)
- Swords are pixel art in 3D: the blade is a grid of small cubes (~0.2 stud) with a dark core, bright edge pixels, a few Neon "glow" pixels and sparkle particles in the blade color. Build them from a pixel map / generator (one Part per pixel welded to an invisible Handle); share the builder between the Tool and the UI ViewportFrame.
- Ground is a light stone floor broken by big irregular darker patches (2-3 overlapping flat boxes per patch); giant voxel landmarks (wizard hat roof, floating skull, fallen red/white mushroom caps, palm trees with spiky leaves) make each street readable.
- Dash (Q): instant white Highlight flash on the character, a white smoke puff + ring on the ground, short burst of speed. Players get i-frames during the dash (server keeps an `invulnUntil` per player and ignores damage).
- Interaction prompts are custom: dark brown panel, key box on the left ("E"), object name small + action big. Use `ProximityPrompt.Style = Custom` and draw a BillboardGui on `PromptShown`, call `prompt:InputHoldBegin()/End()` when the panel is tapped.
- Name tags: name + [level] in the pixel font over every player; player list panel top right with levels.

## Movement kit that matches this style
- Sprint (Shift / mobile button): WalkSpeed 18 -> 30, stamina 100 drains 18/s, regen 22/s after 0.7 s; FOV 70 -> 82; a run animation track at Movement priority (catalog Knight run 657564596 worked); voxel footstep debris every 0.16 s colored like the floor (raycast); radial speed lines in the HUD.
- Stamina bar: horizontal in the HUD card + vertical BillboardGui next to the character (StudsOffset is camera-relative, so it stays on the right) visible only while not full; flash red when a dash fails for lack of stamina.
- Dash: costs 25, cooldown 0.9 s, LinearVelocity 95 studs/s for 0.2 s, lunge animation, FOV punch 92, 3 neon after-images (cloned body parts, transparency 0.62 -> 1) colored by the aura.
- Aura: local VFX for every character from attributes `Aura` (Color3) and `AuraTier`; rising sparkles from the feet, soft sparkles on the body, and for Rare+ a ring of 14 neon segments spinning at the feet. Strength scales with tier.
