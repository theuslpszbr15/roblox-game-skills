---
name: roblox-studio-pipeline
description: "Use when building a Roblox game code-first: Luau sources + a Node build script that writes .rbxlx/.rbxmx, a local Studio bridge plugin to run Luau in edit/play from the terminal, automated playtests with a server TestHook, screenshots, and publishing to an existing place."
---

# Roblox Studio pipeline (code-first)

Nothing is hand-built in Studio. Sources live in files; a script generates the place; a plugin lets the agent run code inside Studio.

## Repo layout
- `src/Config.luau` all tunables (shared). `src/Server.server.luau` authoritative game. `src/Ui.client.luau` HUD, input, camera, effects. Extra ModuleScripts as needed.
- `tools/build.cjs` XML helpers (`item, str, bool, num, vec, color, token, part, sign, light, source`) and a `Material` enum map; writes `dist/Game.rbxlx` and `dist/GameUpdate.rbxmx` (services converted to Folders so it can be loaded into a cloud place).
- `tools/world.cjs` level geometry built from data (rooms, props, lights). Keep layout numbers in Config so world and gameplay agree.
- `tools/bridge.cjs` tiny HTTP server on 127.0.0.1; a Studio plugin polls it and runs queued Luau in `edit`, `server` or `client` context and returns the result + Output log. Ready-made copies: `starter/tools/bridge.cjs` and `starter/plugin/StudioBridge.lua` (install into `%LOCALAPPDATA%\Roblox\Plugins\`) in this skills repo.
- `tests/*.luau` run in the Play server through the bridge; they call a `ServerStorage.TestHook` BindableFunction (state, damage, skip vote, give coins, etc.). Create the hook only when `RunService:IsStudio()`.

## Commands
```
node tools/bridge.cjs serve                         # keep running in a background terminal
node tools/build.cjs                                # build place + update package
luau-compile --null src/File.luau                   # syntax check every changed file
node tools/bridge.cjs run edit "<luau>" 20000       # run in edit DataModel
node tools/bridge.cjs run server tests/x.luau 300000
```
Start a test: from edit run `task.spawn(function() game:GetService('StudioTestService'):ExecutePlayModeAsync({}) end)`. End it from the server with `StudioTestService:EndTest(value)` (stopping RunService can leave the test "in progress"). A queued job with no listener runs later and may end the next test - don't queue EndTest when nothing runs.

## Publishing to an existing place
1. Copy the update package into Studio's `content/` folder; open the cloud place with `RobloxStudioBeta.exe -task EditPlace -placeId <id> -universeId <uid>`.
2. Confirm `game.PlaceId` through the bridge before touching anything.
3. Run an `apply_update.luau` that replaces only your own services/folders (rooms, remotes, scripts) and sets Lighting/StarterPlayer properties.
4. Re-install imported models (Creator Store) in that session; strip scripts from them.
5. Publish (File > Publish to Roblox, Alt+P) and confirm in the newest Studio log: `Published new changes`.

## Hard-won rules
- Test in the CLOUD place, not only the local file: collaborators add scripts there (extra leaderstats, lobby teleports, vote handlers). Read LogService errors and check the player actually spawns with tools.
- Never overwrite other people's scripts silently; ask before deleting them. Grep the files on disk after edits (editors can hold stale buffers).
- Write Luau files as UTF-8 without BOM. Avoid long inline PowerShell scripts; write a .ps1/.cjs file instead.
- DataStore: skip real reads/writes in Studio tests; never save defaults after a failed load (`loaded=false`).
- Close extra Studio windows before using the bridge (two edit plugins = two answers).

## More hard-won rules (RPG project)
- Creator Store free models: `InsertService:LoadAsset` fails ("not authorized") unless you own them; in the edit plugin `game:GetObjects("rbxassetid://ID")[1]` works. Copy the Animation objects out of its Animate script before stripping scripts, set the root as PrimaryPart and reset `root.PivotOffset` (imported rigs can carry a huge pivot offset).
- A local referenced before its `local` declaration is a nil global at runtime and silently kills cinematics: run `luau-analyze` and look for "Unknown global" that is not a Roblox global.
- Capturing cinematics: spawning a PowerShell per screenshot takes ~2-3 s; load the Win32 types once and capture in a loop (burst) instead. If the capture is tiny, the window was minimized: restore it first.
- Push code without reloading: generate a Luau file that sets `.Source` of each script from the src files (long brackets) and run it in edit, then start Play.
- Pressing keys into a game window for testing: `keybd_event` with the scan code (MapVirtualKey) after `SetForegroundWindow` (SendKeys does not reach Roblox).
