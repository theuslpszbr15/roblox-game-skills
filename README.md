# Roblox Game Skills

Skills (playbooks em Markdown) para um agente de IA criar jogos de Roblox com qualidade: pipeline code-first, aprendizado com vídeos de referência, UI animada, iluminação/VFX, movimento e combate com "feel", cinemáticas, sequência de recompensa (caixas), design de jogo e monetização, e fluxo de trabalho em fatias jogáveis.

Cada pasta em `skills/` tem um `SKILL.md` com frontmatter `name` + `description`. Agentes compatíveis (GitHub Copilot, Claude Code, etc.) carregam a skill quando o pedido combina com a `description`.

## Instalação
**Novo aqui? Leia [COMO-USAR.md](COMO-USAR.md)** — tem o texto pronto para colar na IA.

- GitHub Copilot (VS Code): copie as pastas de `skills/` para `~/.copilot/skills/`.
- Claude Code: copie para `~/.claude/skills/` (ou `.claude/skills/` dentro do projeto).

## Skills
| Skill | Para que serve |
|---|---|
| `roblox-studio-pipeline` | Construir o place por código, testar no Studio por terminal, publicar |
| `roblox-reference-learning` | Estudar TikTok/YouTube quadro a quadro e virar regra reutilizável |
| `roblox-ui-juice` | Botões, brilho, explosão de ícones, escala, tokens, toque no celular |
| `roblox-lighting-vfx` | Luz realista, materiais, partículas, regras contra cenas escuras/estouradas |
| `roblox-movement-combat-feel` | Corrida, stamina, dash, wall-run, parry, feedback de golpe |
| `roblox-camera-cinematics` | Head bob, shake, cinemáticas, pop-in de recompensa |
| `roblox-reward-reveal` | Abertura de caixa/gacha passo a passo + regras de chances |
| `roblox-game-design-monetization` | Escolher ideia, retenção, economia, monetização (inclui pay-to-win) |
| `roblox-build-workflow` | PRD curto, fatias jogáveis, QA antes de publicar |

## Créditos
Parte do conhecimento foi resumida (não copiada) de pacotes MIT: afrxo/roblox-agent-skills, AshExplained/roblox-skills, gogolumo/rbsmithy-roblox-claude-skill; documentação oficial Roblox (creator-docs); e análise de vídeos públicos (SKATER STUDIOS, GoofyStudio, Flay1z, fishmopf, phoxik, StackIt, KH Studios). Nenhum asset desses criadores está incluído.

## Licença
MIT.
