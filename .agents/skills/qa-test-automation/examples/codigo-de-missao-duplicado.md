# Exemplo real: código de missão duplicado

Calibragem com o teste que já está em `playwright/e2e/mission-control/register.spec.ts`. Não recriar este teste e não reutilizar o ID `LP-DUP01`.

## O que o teste cobre

Há um teste chamado `não deve cadastrar com código duplicado`. Ele não veio de um arquivo `.feature`. O título está no formato dos specs de Mission Control, não no formato "nome do cenário Gherkin" (dúvida D2).

## Massa

```ts
const mission: Mission = {
  id: 'LP-DUP01',
  rocket: 'Starship',
  baseId: 'aurora',
  departureDate: '2028-01-20',
  returnDate: '2028-01-27',
  price: 1000.00,
}

await cleanAndInsertMission(mission)
```

A missão é inserida pelo banco antes da ação. Não há `afterEach`.

## Ações e asserção

O `beforeEach` do arquivo autentica com `buzz@lunarpass.dev` / `pwd123` e espera `app.mission.navbar.logout`.

O teste abre o cadastro por `app.mission.dashPage.addButton`, espera `app.mission.registerPage.title`, envia a mesma missão com `app.mission.registerPage.submit(mission)` e verifica:

```ts
await expect(app.mission.registerPage.alert).toHaveText('Já existe uma missão com este ID.')
```

Este é o único teste do arquivo que marca `// Arrange`, `// Act` e `// Assert`.

## O que copiar em teste novo

- Import de `test` e `expect` por `../../support`.
- `Mission` e `cleanAndInsertMission` quando o **Dado** é "essa missão já existe".
- Ações por `app.mission` / `app.store` / `app.toast`.
- Uma asserção `toHaveText` quando o resultado é um alerta com texto definido.
- ID exclusivo, outro que não `LP-DUP01` nem `LP-0128A`.

## O que este exemplo não autoriza

- Renomear este teste para um nome de cenário.
- Tratar os comentários Arrange/Act/Assert como obrigatórios.
- Colocar `expect` em Page Object novo só porque `RegisterPage.submit` já tem `expect`.
- Gerar missão válida com Faker. Neste arquivo, o Faker aparece só no teste de código inválido.
