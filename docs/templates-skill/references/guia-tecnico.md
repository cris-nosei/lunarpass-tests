# Guia Técnico de Execução

Este documento orienta o agente sobre o padrão técnico esperado na execução da tarefa.

## 1. Boas Práticas Obrigatórias

1. **Simplicidade e Clareza**: Prefira soluções simples e declarativas em vez de abstrações prematuras.
2. **Tratamento de Exceções**: Todo caso de falha ou dado inválido deve possuir tratamento explícito.
3. **Não-regressão**: Certifique-se de que alterações não quebrem funcionalidades adjacentes.

## 2. Padrões de Implementação

- [Descreva aqui o padrão técnico principal: ex: Page Object Pattern, Clean Architecture, CQRS, etc.]

## 3. O que Evitar a Todo Custo (Anti-padrões)

- Modificar arquivos de configuração de ambiente (`.env`, configs globais) sem pedido explícito.
- Silenciar erros ou usar timeouts arbitrários.
- Introduzir dependências externas sem aprovação prévia.
