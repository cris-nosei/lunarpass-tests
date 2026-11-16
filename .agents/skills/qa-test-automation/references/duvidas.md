# Dúvidas em aberto

A arquitetura, os specs e os outros documentos não fecham estes pontos. Não escolha uma opção. Não implemente os dois lados. Pergunte, cite o número da dúvida e deixe a parte afetada de fora do código até ter resposta.

O restante do trabalho, que não depende da dúvida, pode seguir.

## D1 — `expect` dentro de Page Object novo

`LoginPage.go` e `RegisterPage.submit` usam `expect` importado de `@playwright/test`. Os outros Page Objects não usam. `docs/arquitetura.md` não diz se asserção fica no Page Object ou só no spec.

Não retire os `expect` que já existem. Em Page Object novo, não adicione `expect`. Se a ação nova só fica estável com o mesmo tipo de espera que esses dois métodos fazem via `expect`, pare e pergunte.

## D2 — Título do teste

Nenhum spec copia o nome de um cenário de `docs/storefront.md`. Os títulos atuais são frases em português, no formato `deve ...` ou `não deve ...`. A arquitetura não define o título.

Antes de nomear um teste novo, pergunte qual das duas formas usar:

- o nome do cenário, palavra por palavra
- uma frase no formato dos specs atuais

Não renomeie testes que já existem.

## D3 — `test.afterEach`

Nenhum spec limpa dados depois do teste. `register.spec.ts` chama `cleanMission` ou `cleanAndInsertMission` antes da ação. A arquitetura pede ID exclusivo e essas funções, e não cita `afterEach`.

Não crie `afterEach`. Se o cenário exigir limpeza ao final, inclusive quando o teste falha, pergunte antes de acrescentar.

## D4 — `getByText` e atributo `data-mission-code`

A ordem escrita em `docs/arquitetura.md` §3.2 e usada nos Page Objects é `getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`.

`docs/aderencia.md` também cita `getByText` e `page.locator('[data-mission-code="..."]')`. Nenhum Page Object usa esses dois. Parte do documento pede atributos que a aplicação ainda precisaria ganhar (`data-testid` de data, assento, resumo, reserva, estado vazio).

Não use `getByText` nem seletor de `data-mission-code`. Se role, label, placeholder e test id não identificarem o elemento, pare e pergunte. Se a descoberta mostrar um `data-testid` que já está no DOM, `getByTestId` continua válido, porque está na ordem da arquitetura.

## D5 — Formato do ID da missão

Os IDs válidos nos specs são `LP-0128A` e `LP-DUP01` (`LP-` e mais cinco caracteres). A mensagem da tela, no spec, é `Use o formato LP-0000`. Não há regex no repositório.

Para um ID válido novo, copie essa forma (`LP-` + cinco caracteres) e não reutilize um ID já presente no repositório. Não deduza um regex. Se o cenário precisar de um limite diferente (tamanho, letra, prefixo), pergunte. Para código propositalmente inválido, o precedente é o de `register.spec.ts`: cinco caracteres maiúsculos, via Faker, sem o prefixo `LP-`.

## D6 — `baseId` além de `aurora`

O único `baseId` nos specs é `aurora`. `docs/storefront.md` nomeia as bases Alpha, Orion, Aurora e Selene, sem o valor do `select`. `docs/aderencia.md` mostra exemplos de checkbox com `value="alpha"`, como markup desejado, não como valor já usado pela suíte.

Não invente `alpha`, `orion` ou `selene`. Se o cenário precisar de outra base, leia as opções no `select` durante a descoberta de tela e registre o valor observado. Se a tela não puder ser lida, pergunte.

## D7 — Inserir reserva ou ticket

`db.ts` só insere em `missions`. `deleteReservation` e `deleteTicket` filtram por `missionId`. Os tipos `Reservation` e `Ticket` só declaram `missionId`.

Se o **Dado** exige assento vendido, reserva ou ticket, não crie `insert`. Pergunte. Não monte coluna que o código não mostra.

## D8 — Esquema do Cenário

A suíte não tem Esquema do Cenário automatizado e não usa `test.each`.

Não crie `test.each` nem helper de tabela. Antes de gerar os testes das linhas de **Exemplos**, pergunte se cada linha vira um `test()` separado no arquivo da funcionalidade.

## D9 — `baseURL` do storefront

Os dois projects usam `http://localhost:3000`. O config deixa um TODO para confirmar a URL do storefront. Não altere o config para "resolver" o TODO.
