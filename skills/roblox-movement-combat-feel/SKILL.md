---
name: roblox-movement-combat-feel
description: "Use when making Roblox character movement and combat feel good: walk/run/sprint with stamina, 4-directional movement, footstep effects, dash, wall-run, vault, slide, landing roll, parry/feint combat, hit reactions, health/posture bars, and animation architecture."
---

# Movement and combat feel

## Running system (from SKATER STUDIOS "Advanced Running System", frame study)
- Separate walk and run animations, and 4-directional sets (forward/back/left/right) so strafing and backpedaling look right; torso leans into the move direction while sprinting.
- Footstep "rock" haptic: small debris particles kicked up at each foot plant while running (tie to animation markers `GetMarkerReachedSignal('Footstep')`), plus a faint shake.
- Stamina bar shown as a small vertical bar next to the character (world-space BillboardGui), visible only while sprinting/recovering.
- Setup in the video: R6 avatar, custom animations published by the game owner (animations must belong to the experience owner/group or they won't load).

## Movement system showcase (dash, parkour)
Dash with white speed-line streaks (Trails/Beams on the limbs, 0.15-0.3 s), wall-run along walls, ledge grab/climb and vault, slide on the ground, long fall into a landing roll, colored landing splash decal. Every move: anticipation pose -> burst -> recovery pose; camera FOV kick on dash.

## Parry combat (SKATER STUDIOS)
- Weapon selector (Fists / Blade / Rapier) with key hints on the right; health/posture bar bottom-center.
- Successful parry: golden spark burst + expanding ring flash at the contact point, short hitstop; getting hit: red screen tint flash.
- Feints (cancel a swing) for players and AI dummies; dummies for testing.
- Server validates timing windows, distance and cooldowns; client only plays effects.

## Animation architecture
- One registry of animation ids; small state machine (Idle -> Walk/Run -> Windup -> Active -> Recover -> Idle); stop tracks on state change; clean connections on respawn.
- R15 defaults used before: walk `rbxassetid://507777826`, idle `507766388`, slash `522635514` (default Animate run often `507767714` - verify). `track:AdjustSpeed(speed/16)` to match run speed.
- Code-only alternative (no uploads): drive `Motor6D.Transform` every RenderStepped with sine waves (legs opposite phase, arms opposite legs, torso lean ~ speed). Verify by recording frames in Play.
- `AnimationController` for non-humanoid models; prefer tweens/constraints for simple props.

## First-person feel
Head bob / breathing / landing dip via `Humanoid.CameraOffset` (never accumulates). Bob amount = horizontal speed / walk speed, frequency 6 + speed*0.35, landing dip decays over ~0.5 s.
