# Revisão antes de entregar

Corrija o que falhar aqui. Onde a lista apontar uma dúvida, o item certo é ter perguntado, não ter escolhido.

## Fidelidade ao cenário

- [ ] Cada **Então** e cada **E** tem uma asserção, e não há asserção extra.
- [ ] Nenhum passo ou regra foi inventado.
- [ ] Texto visto na tela e ausente na especificação está no resumo.
- [ ] Cenário ligado a P1–P4 ou às regras R9 e R10 não foi automatizado.
- [ ] O título segue a resposta da dúvida D2. Sem resposta, o spec não foi nomeado no escuro.

## Arquitetura do Lunar Pass

- [ ] Spec em `playwright/e2e/<modulo>/`, importando `{ test, expect }` de `../../support`.
- [ ] Page Object no módulo certo, registrado no grupo certo de `createApp`.
- [ ] Componente novo em `shared/` só se mais de um módulo usa.
- [ ] Nenhum `new` de Page Object dentro do spec.
- [ ] `goto` com caminho relativo.
- [ ] Nenhum teste, Page Object, config, conexão ou dependência foi refatorado fora do pedido.
- [ ] Seção 6 de `docs/arquitetura.md` continua sem implementação nova.

## Locators e esperas

- [ ] Locators novos seguem `getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`.
- [ ] Não há XPath, `/..`, classe CSS, `getByText` nem `data-mission-code` (dúvida D4).
- [ ] Não há `waitForTimeout`.
- [ ] Page Object novo não contém `expect` (dúvida D1).
- [ ] `timeout: 10_000` não foi copiado para fora da espera de logout.

## Dados

- [ ] ID de missão novo, ausente no repositório, na forma da dúvida D5.
- [ ] Pré-condição feita com `cleanMission` ou `cleanAndInsertMission`.
- [ ] Não há `afterEach` novo (dúvida D3).
- [ ] Não há insert de reserva ou ticket (dúvida D7).
- [ ] `baseId` diferente de `aurora` só se a descoberta mostrou o valor (dúvida D6).
- [ ] Lista do storefront sem asserção de contagem total nem de posição.
- [ ] Esquema do Cenário não virou código sem resposta da dúvida D8.

## Execução

- [ ] O comando foi `npx playwright test <arquivo> --project=<modulo>`.
- [ ] O resultado no resumo é o que o comando devolveu.
- [ ] Falha de produto está com esperado e observado, asserção intacta.
- [ ] Não ficou `test.only`, `test.skip` nem asserção comentada.
