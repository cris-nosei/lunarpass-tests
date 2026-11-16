# Projeto Lunar Pass — fatos da suíte

Leia isto antes de escrever código. Os caminhos abaixo são os do repositório. Não duplique estes arquivos para dentro da skill.

## Stack e configuração

- Playwright e TypeScript. Configuração em `playwright.config.ts`.
- Banco: Kysely e `pg`, connection string em `process.env.DATABASE_URL`. O config chama `process.loadEnvFile()`. Modelo de variável em `.env.example`. Não copie a connection string para a skill nem para o spec.
- Dois projects, os dois com `baseURL: 'http://localhost:3000'` e `devices['Desktop Chrome']`:
  - `mission-control` → `playwright/e2e/mission-control`
  - `storefront` → `playwright/e2e/storefront`
- O project `storefront` tem o comentário `TODO: confirmar baseURL do storefront`. Use o valor que está no config. Não troque a URL.
- `fullyParallel: true`. `retries` é `2` em CI e `0` fora. `workers` é `1` em CI e o padrão do Playwright fora. `reporter: 'html'`. Screenshot `only-on-failure`. Trace `on-first-retry`.
- `package.json` não tem script de teste. O documento de arquitetura manda:

```bash
npx playwright test --project=mission-control
npx playwright test --project=storefront
```

Para rodar só o arquivo em que você mexeu, passe o caminho e o project desse módulo. Não altere `workers` nem `retries` no config.

## Pastas que a suíte usa

```plaintext
playwright/
├── e2e/
│   ├── mission-control/
│   │   ├── login.spec.ts
│   │   └── register.spec.ts
│   ├── storefront/
│   │   └── home.spec.ts
│   └── users.ts                 # não é spec e não é modelo
└── support/
    ├── index.ts                 # fixture { app }
    ├── db.ts
    ├── helpers.ts               # formatDate
    ├── types.ts                 # Mission, Reservation, Ticket
    └── pages/
        ├── mission-control/     # login.page.ts, dash.page.ts, register.page.ts, navbar.ts
        ├── storefront/          # home.page.ts
        └── shared/              # toast.ts
```

`src/` não recebe teste. Specs ficam achatados em `playwright/e2e/<modulo>/`, um arquivo por funcionalidade já existente (`login`, `register`, `home`). Cenário novo de uma funcionalidade que já tem spec entra nesse arquivo. Funcionalidade nova ganha outro `*.spec.ts` na mesma pasta do módulo. Não crie subpasta de spec.

Módulo que não seja `mission-control` nem `storefront` segue o roteiro da seção 5 de `docs/arquitetura.md` (pasta de pages, grupo novo em `createApp`, pasta de e2e, project novo). Só faça isso quando o cenário pertence a outro módulo. Não antecipe módulo.

## Fixture

Os specs importam:

```ts
import { test, expect } from '../../support'
```

`playwright/support/index.ts` monta `createApp(page)` com:

- `app.mission.loginPage`, `dashPage`, `registerPage`, `navbar`
- `app.store.homePage`
- `app.toast` na raiz, não dentro de um módulo

Page Object novo entra no grupo do módulo, com `new Classe(page)`, no mesmo estilo desse arquivo. Componente só vai para `playwright/support/pages/shared/` quando mais de um módulo usa. A navbar fica em `mission-control/` porque só esse módulo a usa. O toast está em `shared/` e é o único componente compartilhado.

Não instancie Page Object com `new` dentro do spec.

## Page Objects que já existem

| Arquivo | Classe | O que expõe |
|---|---|---|
| `login.page.ts` | `LoginPage` | `alert` com `getByRole('alert')`. `go()` abre `/mission-control/login` e faz `expect` no heading `Mission Control`. `login(email, password)` preenche placeholder `Informe seu email` e `Sua senha secreta` e clica no botão `Entrar` |
| `dash.page.ts` | `DashPage` | `addButton` com `getByRole('link', { name: 'Nova missão' })` |
| `register.page.ts` | `RegisterPage` | `title` heading `Programar missão`, `alert` com `getByRole('alert')`. `submit(mission)` preenche ID, foguete, base (`getByLabel('Base lunar').selectOption`), data de partida e preço, clica em `Salvar missão`, e faz `expect` em `getByTestId('mission-form-return-date')` com `formatDate(mission.returnDate)`. Não preenche a data de volta |
| `navbar.ts` | `Navbar` | `logout` botão `Sair` |
| `home.page.ts` | `HomePage` | `slogan` heading `Sua viagem para a Lua começa aqui.`. `go()` abre `/` |
| `toast.ts` | `Toast` | `message` com `getByRole('listitem')` |

Papéis já usados além de button, link e heading: `textbox`, `spinbutton`, `alert`.

Arquivos de página usam o sufixo `.page.ts`. Componentes (`navbar.ts`, `toast.ts`) não usam. Indentação de 2 espaços, aspas simples, sem ponto e vírgula. `types.ts` e `helpers.ts` usam 4 espaços: ao editá-los, copie a indentação deles.

Locators reutilizados na asserção do spec são propriedades `readonly` no construtor. Locators usados só dentro de `login()` e `submit()` estão escritos no método, não como propriedade. Ao completar um arquivo, continue do jeito desse arquivo.

## Specs que já existem

`login.spec.ts` — `beforeEach` só chama `app.mission.loginPage.go()`. Seis testes, títulos em português (`deve ...` / `não deve ...`). Credenciais literais no spec. Asserções: `toBeVisible({ timeout: 10_000 })` no logout depois do login que funciona, e `toHaveText` no alerta nos demais. O timeout `10_000` aparece só nessa espera de logout (também em `register.spec.ts`). Não espalhe timeout para outras asserções.

`register.spec.ts` — `beforeEach` faz `go()`, `login('buzz@lunarpass.dev', 'pwd123')` e espera o logout visível com `timeout: 10_000`. Os três testes usam o tipo `Mission` e os mesmos campos auxiliares: `rocket: 'Starship'`, `baseId: 'aurora'`, `departureDate: '2028-01-20'`, `returnDate: '2028-01-27'`, `price: 1000.00`. IDs: `LP-0128A` (limpa com `cleanMission` e cadastra pela tela) e `LP-DUP01` (semeia com `cleanAndInsertMission`). O teste de código inválido usa `@faker-js/faker` só para gerar 5 caracteres maiúsculos sem o prefixo `LP-`. Comentários `// Arrange`, `// Act` e `// Assert` existem apenas no teste de código duplicado.

`home.spec.ts` — sem `beforeEach` e sem banco. Cada teste chama `app.store.homePage.go()`. Um teste usa `{ page, app }` e `expect(page).toHaveTitle('Lunar Pass — Passagens para a Lua')`. O outro verifica `slogan` visível.

## Massa e tipos

`Mission` em `playwright/support/types.ts`: `id`, `rocket`, `baseId`, `departureDate`, `returnDate`, `price`.

`Reservation` e `Ticket` têm só `missionId`.

Funções exportadas por `playwright/support/db.ts`:

- `cleanMission` — apaga reserva, ticket e missão, nessa ordem
- `cleanAndInsertMission` — `cleanMission` e depois `insertMission`
- `insertMission`, `deleteMission`
- `deleteReservation(missionId)`, `deleteTicket(missionId)`

Não há insert de reserva nem de ticket. As queries usam os nomes camelCase que o `CamelCasePlugin` já aplica. Não há `test.afterEach` em nenhum spec: a limpeza existente acontece antes da ação.

`formatDate` em `playwright/support/helpers.ts` recebe `AAAA-MM-DD` e devolve o texto `d de mmm. de aaaa` (mês abreviado em português, com ponto). É o formato que `RegisterPage.submit` confere.

## Documentos

- `docs/arquitetura.md` — arquitetura da suíte. Seção 6 não está priorizada.
- `docs/aderencia.md` — análise de seletores e pedidos de mudança na aplicação. Pedido não é locator enquanto a tela descoberta não mostrar o atributo.
- `docs/storefront.md` — especificação Gherkin do storefront e perguntas P1–P4 ainda abertas.
- `docs/prompts/test-executor.md` — execução manual. Não é o fluxo desta skill.

## O que não usar como padrão

- `playwright/e2e/users.ts` — rascunho de Promise, fora da suíte.
- Seção 6 de `docs/arquitetura.md` — `.env` para URL e credencial, `storageState`, factory de dados com Faker, `db.destroy()`. O Faker já está no `package.json` e só é usado no spec de código inválido, do jeito descrito acima. Não crie módulo de factory.
