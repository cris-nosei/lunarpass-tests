# Do Gherkin ao teste

O Gherkin declarativo descreve comportamento, sem botão nem campo. A automação traduz o cenário para a suíte do Lunar Pass sem acrescentar regra.

A especificação pode estar em `docs/storefront.md`, em outro arquivo do repositório ou colada na conversa. As palavras-chave podem vir em texto, em negrito ou num `.feature`.

## Como cada parte vira código

| Gherkin | No teste | Como, neste repositório |
|---|---|---|
| **Contexto** | `test.beforeEach` | Igual a `login.spec.ts` e `register.spec.ts`, quando o estado é comum aos testes do arquivo. `home.spec.ts` não usa `beforeEach`: cada teste chama `go()` |
| **Dado** de missão já existente ou ausente | Arrange, via `playwright/support/db.ts` | `cleanAndInsertMission` quando a missão precisa existir; `cleanMission` quando a tela é que vai criá-la. Pela UI só se o próprio cenário pede essa navegação |
| **Dado** que é o login do Mission Control | O `beforeEach` de `register.spec.ts` | `go()`, `login('buzz@lunarpass.dev', 'pwd123')`, logout visível |
| **Quando** | Act | Métodos do Page Object já existente, ou os que você acabou de criar |
| **Então** / **E** | Assert | Uma asserção para cada resultado, no locator do Page Object |
| **Esquema do Cenário** | Não automatize ainda | Dúvida D8 |
| Anotação de rastreio (`Regra de origem`, IDs de regra) | Nada no código | Não vira asserção |

## Módulo

- Telas de login, painel e cadastro de missão: project `mission-control`, `app.mission`.
- Vitrine, busca, reserva do viajante: project `storefront`, `app.store`.
- Toast de feedback: `app.toast`, como em `register.spec.ts`.

## Quando o cenário não é suficiente

| Situação | O que fazer |
|---|---|
| O **Então** não diz o que verificar | Pergunte antes de escrever |
| O **Então** descreve uma mensagem sem o texto exato | Use o texto visto na descoberta e registre no resumo: "texto observado, não definido na especificação" |
| O **Quando** é uma ação que a tela impede | Não force o clique. Verifique o estado observável que o cenário descreve. Se esse estado depender de um tipo de locator da dúvida D4, pare |
| O **Dado** pede reserva, ticket ou assento vendido | Dúvida D7. Não simule pela UI sem combinar |
| O cenário depende de P1–P4 ou das regras R9 e R10 em `docs/storefront.md` | Não automatize. Registre como pendente |
| A tela se comporta diferente do **Então** | O teste fica falhando. Reporte como possível defeito |
| Falta título, limpeza final ou linha de Exemplos | Dúvidas D2, D3 e D8 |

## Título

Não invente o título. Dúvida D2. Não renomeie os testes atuais.
