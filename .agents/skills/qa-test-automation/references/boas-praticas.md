# Spec

## Arquivo

- Pasta `playwright/e2e/<modulo>/<funcionalidade>.spec.ts`.
- Primeira linha: `import { test, expect } from '../../support'`.
- Tipo e banco, quando o teste semeia missão, no estilo de `register.spec.ts`:

```ts
import { Mission } from '../../support/types'
import { cleanMission, cleanAndInsertMission } from '../../support/db'
```

Importe só as funções que o arquivo usa.

- 2 espaços, aspas simples, sem ponto e vírgula.
- Sem `test.skip`, `test.only` ou asserção comentada.

## Ordem dentro do teste

1. Preparar o estado (**Dado**), pela massa ou pelo `beforeEach`.
2. Agir (**Quando**), por método do Page Object.
3. Verificar (**Então** e cada **E**), uma asserção cada, nenhuma a mais.

Comentários `// Arrange`, `// Act` e `// Assert` aparecem só no teste de código duplicado. Não os copie para testes novos e não os espalhe pelos arquivos antigos.

`beforeEach` recebe `{ app }` quando navega ou autentica, como nos specs de `mission-control`. Teste que precisa de `page` (título da aba, por exemplo) declara `{ page, app }`, como `home.spec.ts`.

## Asserções já usadas

- `toBeVisible()` e, só na espera do logout depois do login, `toBeVisible({ timeout: 10_000 })`
- `toHaveText('texto exato')` para alerta
- `toContainText('texto')` para `app.toast.message`
- `toHaveTitle('...')` em `page`

Não crie timeout novo. Não use `waitForTimeout`. Não use `toHaveCount` para a lista pública de missões. Dentro da missão semeada pelo teste, conte só o que o cenário pede e que pertence a esse ID.

Texto esperado que o cenário não definiu fica marcado no resumo.

## Isolamento

- Nenhum teste depende da ordem nem de outro teste.
- Nenhum teste depende de missão que ele não limpou ou não inseriu.
- Login do Mission Control usa as credenciais já presentes nos specs. Não crie outro usuário.

## Nomes

Variáveis, funções e classes em inglês. Título do teste: dúvida D2. Textos de tela como a aplicação mostra, em português.

## Esquema do Cenário

Dúvida D8. Não gere a lista de testes enquanto essa resposta não existir.
