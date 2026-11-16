# Descoberta de tela com o Playwright MCP

O cenário diz o que acontece. O Page Object existente ou a tela dizem como localizar. Não escreva locator de memória.

## Procedimento

1. Confirme que a aplicação responde no `baseURL` do project (`http://localhost:3000` nos dois projects; dúvida D9). Se não responder, não invente a tela. Siga só com Page Objects que já tenham o locator e marque o resumo como "não executado".
2. Se o Playwright MCP não estiver disponível nesta conversa, diga isso e pare a descoberta. Não use outro navegador, `curl` nem script para "ver" a tela.
3. Abra o caminho do cenário pelo Playwright MCP.
4. Leia o snapshot de acessibilidade de cada tela: papel, nome acessível e estado.
5. Percorra as ações do **Quando** para ver o resultado do **Então**.
6. Anote, por tela, o caminho relativo e o locator de cada elemento que o código ainda não tem.
7. Feche a aba ao terminar.

A descoberta não substitui a execução do spec e não gera relatório Passou/Falhou/Bloqueado. Isso é da skill `qa-test-executor`.

## Credenciais e dados

- Mission Control: as credenciais já usadas em `login.spec.ts` e `register.spec.ts`. Não crie usuário.
- Missão: massa de `references/massa-de-teste.md`. Não altere missão que o teste não tenha criado.
- Não conclua reserva nem pagamento com dado real só para explorar. Se o cenário for esse fluxo, use o que a especificação chamar de cartão de teste e pare se o texto do cartão não estiver no cenário nem na tela.

## Locator

Use nesta ordem, que é a de `docs/arquitetura.md` §3.2 e a dos Page Objects atuais:

| Ordem | Locator | Quando os arquivos atuais usam |
|---|---|---|
| 1 | `getByRole(papel, { name })` | Botão, link, heading, textbox, spinbutton, alert |
| 2 | `getByLabel(rótulo)` | Select `Base lunar` |
| 3 | `getByPlaceholder(texto)` | E-mail e senha do login |
| 4 | `getByTestId(id)` | `mission-form-return-date` |

Não use XPath, `/..` nem classe CSS.

`getByText` e `[data-mission-code]` são a dúvida D4. Atributos que `docs/aderencia.md` apenas solicita (datas da missão, duração, assentos disponíveis, estado vazio, tooltip, resumo, confirmação) só entram no Page Object se o snapshot mostrar esse atributo no DOM. Se o snapshot não mostrar, registre a lacuna de testabilidade no resumo e não escreva o locator do exemplo do documento.

## O que a descoberta precisa separar

- **Botão desabilitado:** o snapshot pode não mostrar. Confira o estado antes de planejar o clique.
- **Mensagem:** anote o texto de cada estado que o cenário usa. Se o cenário não fixou o texto, o resumo marca "texto observado".
- **Contraprova:** se a asserção verifica um estado (alerta visível, botão que não segue), confira na tela que esse estado é o que o cenário descreve, e não um elemento que estaria ali de qualquer forma.
