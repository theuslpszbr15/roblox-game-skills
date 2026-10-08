---
name: roblox-camera-cinematics
description: "Use for Roblox camera work: screen shake, FOV kicks, scripted cinematics (intro, boss door, victory), letterbox and blur, camera shots that stay inside walls, test cameras for screenshots, and pop-in animations for spawned rewards."
---

# Camera and cinematics

- Shake: keep a decaying `shake` value; after the camera updates offset `camera.CFrame` by random * shake * 0.4; decay ~2/s. Make it reducible for players who dislike it.
- FOV kick: add a few degrees on impacts/dash and ease back.
- Cinematic: Scriptable camera, a list of shots `{from, to, time}` tweened in order, letterbox bars + slight blur, and a token so a newer cinematic cancels an older one. Keep shots inside walls (clamp orbit radius to the room).
- Typical shots: phase intro orbit around the objective, door/boss reveal from the side, victory orbit with confetti.
- Pop-in: spawned creature/reward scales up with easeOutBack over ~0.9 s on the client (`Model:ScaleTo`).
- Idle props: client-side bob + spin while the server leaves them still; stop when the server moves them.
- Test camera: a Studio-only attribute (e.g. `State.TestCam` CFrame) that the client obeys, so automated tests can take screenshots of any area.
