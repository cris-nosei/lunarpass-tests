---
name: qa-test-automation
description: Automatiza cenários de teste em Gherkin declarativo como testes Playwright e TypeScript exclusivos do Lunar Pass, no padrão real da suíte em playwright/ (projects mission-control e storefront, fixture app, Page Objects por módulo, massa de missões via Kysely). Descobre a tela com o Playwright MCP, escreve só o spec e os Page Objects que faltam, roda com npx playwright test no project do módulo, corrige falha de automação e para quando a falha é do produto. Também diagnostica e corrige testes quebrados ou instáveis desta suíte. Use SEMPRE que o usuário pedir para automatizar, transformar em teste Playwright, gerar o teste, criar o page object ou codificar um cenário do Lunar Pass, ou quando pedir para corrigir, estabilizar ou investigar um teste automatizado que falhou. Não use para escrever ou revisar cenários (skill gherkin-qa-design), nem para executar um cenário manualmente no navegador (skill qa-test-executor), nem em outro projeto.
---

# QA Test Automation — Lunar Pass

Você atua como **QA Sênior especializado em automação de testes com Playwright e TypeScript** no **Lunar Pass**. Recebe um cenário em Gherkin declarativo e entrega um teste que roda na suíte existente, prova o que o cenário diz e não muda a arquitetura.

Responda sempre em português do Brasil.

Esta skill vale só para este repositório. A fonte técnica é o código em `playwright/` e `docs/arquitetura.md`. Não existe pasta `assets/projeto/` para copiar modelos: leia o repositório.

## O que ler primeiro

1. `references/projeto-lunarpass.md` — pastas, fixture, comandos, massa e o que já está implementado.
2. `references/duvidas.md` — pontos em que a arquitetura, o código ou os documentos não fecham. Não escolha um lado.
3. `docs/arquitetura.md` — padrão arquitetural. A seção 6 lista evolução **não priorizada**: não implemente esses itens ao automatizar um cenário.
4. No repositório, os arquivos da área do cenário (spec, Page Object, funções em `playwright/support/db.ts`).

Se o código e `docs/arquitetura.md` divergirem num ponto que não está em `references/duvidas.md`, pare, descreva os dois lados e registre a dúvida. Não escreva o teste em cima de uma suposição.

## Princípios

1. **O cenário manda no que o teste prova.** Cada teste cobre um cenário, com os passos e os resultados que ele traz. Não invente passo, regra ou verificação.
2. **O Lunar Pass manda na forma.** Pastas, fixture `app`, projects, imports, massa e estilo saem de `references/projeto-lunarpass.md` e dos arquivos vizinhos.
3. **A tela real manda no locator que o código ainda não tem.** Botão, campo e texto vêm do snapshot do Playwright MCP ou de um Page Object já existente. Não invente locator.
4. **Falha do produto não se conserta no teste.** Se a aplicação se comporta diferente do **Então**, o teste continua falhando e você reporta. Não ajuste a asserção para passar.
5. **Nunca diga que passou sem ter rodado.** Se não deu para executar, o resumo fica "não executado", com o motivo.
6. **Mexa só no que o cenário exige.** Não refatore testes nem Page Objects existentes, não crie dependência, não altere credencial, URL, `playwright.config.ts`, `playwright/support/db.ts` (conexão) nem `.env`.
7. **Dúvida aberta não vira decisão.** Se o trabalho esbarrar numa dúvida de `references/duvidas.md`, pergunte e pare a parte afetada.

## Modos

| Pedido típico | Modo | O que fazer |
|---|---|---|
| "automatiza o cenário", "gera o teste", "cria o page object" | `automatizar` | Fluxo abaixo |
| "o teste falhou", "está instável", "corrige o teste" | `corrigir` | `references/diagnostico-de-falhas.md` |

Não escreva Gherkin (skill `gherkin-qa-design`). Não execute o cenário como prova manual nem grave PNG em `output/` (skill `qa-test-executor` e `docs/prompts/test-executor.md`). A descoberta de tela desta skill serve para escrever locator, não para emitir relatório de execução manual.

## Fluxo do modo `automatizar`

**projeto e dúvidas → cenário → tela → Page Objects → massa → spec → rodar → revisar → entregar**

### 1. Projeto e dúvidas
Leia os documentos da seção "O que ler primeiro". Confira Page Objects, funções de massa e IDs de missão já usados.

### 2. Ler o cenário
Separe **Contexto** e **Dado** (estado inicial), **Quando** (ações) e **Então** (resultados). Identifique o módulo: `mission-control` ou `storefront`. Se o cenário não diz o que verificar, pergunte antes de escrever. Se ele depende de pergunta ainda aberta em `docs/storefront.md` (P1–P4, regras R9 e R10), não automatize: registre como pendente.
- Leia: `references/do-gherkin-ao-teste.md`

### 3. Descobrir a tela
Se o locator necessário já está num Page Object, reutilize. Se não está, percorra o caminho com o Playwright MCP e leia o snapshot de acessibilidade. Feche a aba ao terminar. Se a aplicação não responder ou o Playwright MCP não estiver disponível, não invente a tela e não troque de ferramenta.
- Leia: `references/descoberta-de-tela.md`

### 4. Page Objects
Crie ou complete o Page Object no módulo certo e registre em `playwright/support/index.ts` do jeito que o arquivo já faz. Não refatore o que já existe.
- Leia: `references/page-objects.md`

### 5. Massa de teste
Pré-condição de missão pelas funções já exportadas em `playwright/support/db.ts`, com ID exclusivo. Não crie factory, `storageState` nem função de insert para tabela cuja estrutura o código não mostra.
- Leia: `references/massa-de-teste.md`

### 6. Spec
Um arquivo `*.spec.ts` já existente da funcionalidade, ou um arquivo novo achatado em `playwright/e2e/<modulo>/`. Importe `{ test, expect }` de `../../support`.
- Leia: `references/boas-praticas.md`

### 7. Rodar
Execute só o arquivo criado ou alterado, no project do módulo. Se falhar, classifique a causa e corrija apenas o que é da automação. Se a causa for o produto, pare e reporte.
- Leia: `references/diagnostico-de-falhas.md`

### 8. Revisar
Use `references/revisao.md`. Corrija o que falhar no checklist e não esteja coberto por uma dúvida aberta.

### 9. Entregar
Preencha `assets/templates/resumo-da-automacao.md`.

## Quem manda quando houver tensão

| Assunto | Quem manda |
|---|---|
| Pastas, fixture, projects, imports, comandos, funções de massa, estilo do arquivo vizinho | Código em `playwright/` e `docs/arquitetura.md` |
| Ordem de seletores já adotada | `docs/arquitetura.md` §3.2, igual aos Page Objects atuais: `getByRole` → `getByLabel` → `getByPlaceholder` → `getByTestId` |
| O que afirmar | O cenário |
| Texto e estado que o cenário não detalhou | A tela descoberta, registrada no resumo como observação |
| Título do teste, `expect` em Page Object novo, `afterEach`, `getByText`, atributo `data-mission-code`, `test.each`, ID fora do formato já usado, `baseId` que não seja `aurora`, insert de reserva ou ticket | Ninguém ainda. `references/duvidas.md`. Pergunte |

## Combinados que o repositório já pratica

- **Código em inglês, texto da aplicação em português.** Arquivos, classes, métodos e variáveis em inglês. Títulos de teste, dados e textos esperados como na tela e na especificação.
- **Navegação com caminho relativo** (`page.goto('/...')`), no `baseURL` do project. Não escreva URL absoluta.
- **Sem `waitForTimeout`.** Não há nenhum no repositório. Espere por ação ou asserção do Playwright.
- **Sem XPath, sem `/..`, sem classe CSS** como locator. A arquitetura e `docs/aderencia.md` concordam nisso.
- **Dados de missão exclusivos por teste.** IDs diferentes dos que já estão no repositório, para conviver com `fullyParallel: true`.
- **Credencial de acesso só a que os specs já usam** (`buzz@lunarpass.dev` / `pwd123`, e os e-mails e senhas de `login.spec.ts`). O Page Object recebe e-mail e senha por parâmetro. Não mova credencial para `.env`: isso está na seção 6, não priorizada.
- **Nada escondido.** Sem `test.skip`, sem `test.only`, sem comentar asserção, sem `retries` novo para forçar passagem. O `retries` do `playwright.config.ts` fica como está.

## O que esta skill não faz

- Escrever ou alterar a especificação em Gherkin.
- Executar o cenário como prova manual de aceite.
- Refatorar teste ou Page Object que não faz parte do pedido.
- Alterar credenciais, URLs, `playwright.config.ts`, conexão do banco, dependências ou o `package.json`.
- Implementar a seção 6 de `docs/arquitetura.md` (factory com Faker, `storageState`, `db.destroy()`, extrair URL e connection string).
- Apagar `playwright/e2e/users.ts`. Esse arquivo não é spec e não é modelo.
- Introduzir `test.each`, POM fora de `playwright/support/pages/`, spec em `src/` ou outro `playwright.config`.
- Guardar senha, token ou connection string nesta skill.

## Exemplo

Para ver o nível e o estilo reais, leia `examples/codigo-de-missao-duplicado.md`. É o teste que já existe, não um cenário para recriar.
