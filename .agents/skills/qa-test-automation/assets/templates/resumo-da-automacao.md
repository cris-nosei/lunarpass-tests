# Resumo da automação

**Modo:** automatizar | corrigir

**Cenário:** [nome informado pelo usuário]

**Módulo / project:** mission-control | storefront | [outro, se a seção 5 foi aplicada]

**Arquivos:** [criados ou alterados, com caminho]

**ID de missão:** [ID novo, ou "não se aplica"]

**Comando:** `npx playwright test <arquivo> --project=<modulo>`

**Resultado:** passou | falhou — produto | não executado

**Motivo, se não executado:** [aplicação fora, MCP ausente, dúvida D# sem resposta, pergunta de produto aberta]

## Asserções

| Parte do cenário | Asserção | Texto |
|---|---|---|
| Então | [matcher] | [texto do cenário ou "observado na tela"] |
| E | [matcher] | [texto] |

## Observações

- Texto observado que a especificação não definia: [nenhum | lista]
- Lacuna de testabilidade vista na tela (atributo pedido em `docs/aderencia.md` e ausente no DOM): [nenhuma | lista]
- Dúvidas consultadas: [nenhuma | D1…D9, e se ficaram sem resposta]

## Produto, se a falha não for da automação

- **Esperado:** [Então do cenário]
- **Observado:** [o que a tela mostrou]
- **Asserção:** mantida

## Correção, no modo corrigir

- **Causa:** locator | sincronização | dados | ambiente | produto | não concluída
- **O que mudou:** [arquivo e comportamento, ou "nenhum código alterado"]
