# Massa de teste

A suíte roda com `fullyParallel: true`. Missões de testes diferentes não podem usar o mesmo `id`. A vitrine do storefront mostra dados compartilhados: `docs/arquitetura.md` manda validar a missão semeada pelo próprio teste, nunca a contagem total nem a posição na lista.

## Funções que existem

Importe de `../../support/db` o que o spec precisa, como `register.spec.ts`:

| Situação do **Dado** | Função |
|---|---|
| A missão não pode estar no banco, porque a tela vai criá-la | `cleanMission(mission)` |
| A missão precisa existir antes da ação | `cleanAndInsertMission(mission)` |
| Só remover uma missão | `deleteMission(id)` |
| Apagar reserva ou ticket ligados a uma missão que o teste criou | `deleteReservation(missionId)` e `deleteTicket(missionId)`, já chamados por `cleanMission` |

`cleanMission` apaga reserva, ticket e missão, nessa ordem. Não altere essa ordem no `db.ts`.

Não há insert de reserva nem de ticket. Dúvida D7.

Não altere `DATABASE_URL`, o `Pool`, o SSL nem o `CamelCasePlugin`.

## Como montar uma `Mission`

Tipo de `playwright/support/types.ts`. Os três objetos de `register.spec.ts` repetem:

- `rocket: 'Starship'`
- `baseId: 'aurora'`
- `departureDate: '2028-01-20'`
- `returnDate: '2028-01-27'`
- `price: 1000.00`

Se o cenário não pede outro foguete, preço ou data, reutilize esses valores e troque só o `id`. Outro `baseId` é a dúvida D6. Data em outro formato que não `AAAA-MM-DD` não cabe em `formatDate`.

## ID exclusivo

Antes de escolher, procure o ID no repositório. Os specs usam `LP-0128A` e `LP-DUP01`. `docs/aderencia.md` usa `LP-0127A` como exemplo de markup. Não reutilize nenhum ID encontrado.

Forma de um ID válido novo: dúvida D5. ID inválido de propósito: o precedente do Faker em `register.spec.ts`, sem criar factory.

## Limpeza

Limpe antes, com as funções acima. Não adicione `test.afterEach` (dúvida D3).

Não altere missão, usuário ou cadastro que o teste não criou. O usuário `buzz@lunarpass.dev` é o de login dos specs, não massa de missão.

## O que não introduzir

- Factory, `@faker-js/faker` como gerador de missão válida, ou arquivo novo de dados. O Faker fica restrito ao uso já existente: código de missão inválido.
- `storageState` e login pulando a UI. Teste autenticado do Mission Control repete o `beforeEach` de `register.spec.ts`.
- `db.destroy()` no fim da suíte.
