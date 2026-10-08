# Como usar (passo a passo)

Você não precisa saber programar. A IA lê estas skills e segue as regras sozinha.

## 1. O que você precisa
- VS Code com GitHub Copilot (modo Agent), ou Claude Code, ou Cursor.
- Roblox Studio instalado e logado na sua conta.
- Node.js instalado (https://nodejs.org) — a IA usa para gerar o jogo.

## 2. Jeito mais fácil: mande a IA instalar
Abra o chat da IA em modo **Agent** e cole isto:

```
Baixe o repositório <LINK_DESTE_REPOSITORIO> (pode ser pelo zip em
https://codeload.github.com/<USUARIO>/<REPO>/zip/refs/heads/main) e copie cada pasta
de skills/ para a pasta de skills do meu agente:
- GitHub Copilot: ~/.copilot/skills/
- Claude Code: ~/.claude/skills/
Depois liste as skills instaladas e me diga em português o que cada uma faz.
```

## 3. Jeito manual
1. Clique em **Code > Download ZIP** nesta página e extraia.
2. Copie as pastas de dentro de `skills/` para:
   - Copilot (Windows): `C:\Users\SEU_USUARIO\.copilot\skills\`
   - Claude Code: `C:\Users\SEU_USUARIO\.claude\skills\`
3. Feche e abra o VS Code / Claude de novo.

## 4. Criando um jogo
Cole no chat (modo Agent) e troque a ideia:

```
Quero criar um jogo de Roblox: <SUA IDEIA, ex: simulador medieval de treinar força
com pets e auras, pay to win>.
Use as skills roblox-*. Comece pela roblox-game-design-monetization para avaliar a
ideia, depois roblox-build-workflow: escreva um escopo curto, divida em fatias jogáveis
e construa a primeira fatia com roblox-studio-pipeline. Teste no Studio, tire
screenshot e me mostre. Responda em português e curto.
```

Depois é só ir pedindo:
- "Faz a próxima fatia."
- "Deixa a UI mais bonita" (usa `roblox-ui-juice`).
- "Tá escuro / sem vida" (usa `roblox-lighting-vfx`).
- "Quero dash e parry" (usa `roblox-movement-combat-feel`).
- "Faz a abertura de ovo/caixa" (usa `roblox-reward-reveal`).
- "Aprende com esse vídeo: <link TikTok/YouTube>" (usa `roblox-reference-learning`).
- "Publica no Roblox" (usa `roblox-studio-pipeline`).

## 5. Ponte com o Studio (pasta `starter/`)
Para a IA testar o jogo sozinha ela usa uma ponte local:
- `starter/plugin/StudioBridge.lua` -> copie para `%LOCALAPPDATA%\Roblox\Plugins\` e reabra o Studio (aceite o pedido de HTTP para 127.0.0.1).
- `starter/tools/bridge.cjs` -> a IA copia para `tools/` do seu projeto e roda `node tools/bridge.cjs serve`.
Só funciona no seu PC (127.0.0.1); nada vai para a internet.

## 6. Dicas
- Peça uma coisa por vez; a IA testa cada parte antes da próxima.
- Sempre peça screenshot para ver de verdade como ficou.
- Na primeira vez a IA vai pedir para você instalar um plugin no Studio (ponte entre o terminal e o Studio). Aceite.
- Logins (Roblox, GitHub, Figma) é você quem faz. Nunca cole senha no chat.
- Caixas/ovos pagos precisam mostrar as chances antes da compra (regra do Roblox).
