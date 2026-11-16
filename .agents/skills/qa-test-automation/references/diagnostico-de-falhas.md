# Diagnóstico de falhas

Use ao rodar um teste recém-criado e no modo `corrigir`.

## Onde olhar

1. A mensagem no terminal: linha, locator, esperado e recebido.
2. O `error-context.md` em `test-results/` do teste.
3. O screenshot da falha, na mesma pasta (`screenshot: 'only-on-failure'`).
4. O relatório HTML: `npx playwright show-report`.
5. Se a causa ainda não estiver clara, percorra o mesmo caminho com o Playwright MCP. Se o MCP não estiver disponível, entregue o diagnóstico com as evidências que já tem. Não troque de ferramenta.

## Classifique antes de mexer

| Causa | Sinais | O que fazer |
|---|---|---|
| **Locator** | Elemento ausente, ou mais de um elemento | Corrija no Page Object, na ordem de `references/descoberta-de-tela.md`. Se a correção cair na dúvida D4, pare |
| **Sincronização** | Passa às vezes, ou a ação ocorre antes da tela | Espere pelo estado visível com asserção do Playwright. Não use `waitForTimeout`. Não copie `timeout: 10_000` para fora da espera de logout |
| **Dados** | ID repetido, missão ausente, sobra de outra execução | Ajuste `cleanMission` ou `cleanAndInsertMission` e o ID. Não crie `afterEach` (dúvida D3) |
| **Ambiente** | Aplicação fora do ar; banco inacessível (`DATABASE_URL`, `getaddrinfo ENOTFOUND`); navegador ausente (`Executable doesn't exist`) | Não altere teste, config nem conexão. Resumo "não executado", com a mensagem. Navegador ausente só se instala com `npx playwright install chromium` se o usuário autorizar |
| **Produto** | A tela mostra, de forma estável, outro resultado que não o **Então** | Não altere a asserção. Reporte esperado e observado |

## Como rodar de novo

Project do arquivo:

```bash
npx playwright test playwright/e2e/<modulo>/<arquivo>.spec.ts --project=<modulo>
```

`<modulo>` é `mission-control` ou `storefront`.

Uma correção por vez, e rode de novo. Não altere asserção, valor esperado ou título para o teste passar. Não use `test.skip` nem `retries` no spec. Não mexa no `retries` do config.

Teste instável: rode o arquivo em série, `--repeat-each=5 --workers=1`, antes de chamar de instável e depois da correção. Repetir o mesmo teste em paralelo com o mesmo ID de missão colide no banco. Isso não é instabilidade.

Se a causa não ficar clara, entregue as evidências e as hipóteses, sem alterar o código.
