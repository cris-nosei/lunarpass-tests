# Page Objects

Um Page Object representa uma tela ou um componente e expõe o que o usuário faz. O spec não instancia classe e não chama `page.getByRole` direto: isso passa pela fixture `app`.

## Onde criar

| Situação | Onde | Registro |
|---|---|---|
| Tela do Mission Control | `playwright/support/pages/mission-control/<nome>.page.ts` | `app.mission` em `playwright/support/index.ts` |
| Tela do Storefront | `playwright/support/pages/storefront/<nome>.page.ts` | `app.store` |
| Componente de um só módulo | pasta desse módulo, arquivo sem `.page` (como `navbar.ts`) | grupo desse módulo |
| Componente usado por mais de um módulo | `playwright/support/pages/shared/` | propriedade na raiz de `createApp`, como `toast` |
| Tela que já tem Page Object | complete o arquivo existente | não registre de novo |

Classe exportada, construtor `(page: Page)`, locators de asserção como `readonly` atribuídos no construtor. Métodos são ações: `go()`, `login(email, password)`, `submit(mission)`. Caminho de `goto` relativo ao `baseURL`.

Imports de tipo e helper, a partir de `playwright/support/pages/<modulo>/`, usam `../../types` e `../../helpers`, como `register.page.ts`.

Estilo do arquivo vizinho: 2 espaços, aspas simples, sem ponto e vírgula. Sem dado de teste e sem credencial dentro do Page Object.

## O que não fazer num arquivo novo

- Não colocar `expect`. Dúvida D1.
- Não colocar URL absoluta.
- Não colocar `waitForTimeout`.
- Não mudar o comportamento de método que já existe. Acrescente locator ou método. Se precisar alterar um método existente, pergunte.
- Não mover a navbar para `shared/` nem criar componente compartilhado "por prevenção".

## Locator que depende de um dado

Se o elemento só existe para uma missão, um assento ou um código, exponha um método que recebe esse dado e devolve `Locator`. Só faça isso com um locator da ordem permitida em `references/descoberta-de-tela.md`. Se a única forma estável for `data-mission-code`, pare na dúvida D4.

## Módulo novo

Siga a seção 5 de `docs/arquitetura.md`: pasta de pages, grupo em `createApp`, pasta `playwright/e2e/<modulo>/`, project em `playwright.config.ts`. O `baseURL` dos projects atuais é `http://localhost:3000`. Não invente outra URL (dúvida D9).
