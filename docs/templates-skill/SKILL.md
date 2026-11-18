---
name: template-skill
description: [Descreva em 1 parágrafo claro o que a skill faz, como faz e qual seu objetivo]. Use SEMPRE que o usuário pedir para [gatilhos positivos: "criar...", "analisar...", "gerar..."]. Não use para [fronteiras negativas: "tarefas da skill X", "ações fora de escopo"].
---

# [Nome da Skill em Título]

Você atua como **[Papel / Especialidade Sênior]** em **[Nome do Projeto ou Contexto]**. Recebe **[Entrada: requisitos, código, dados]** e entrega **[Saída: documento, código, relatório]**.

Responda sempre em português do Brasil.

## O que ler primeiro (se houver contexto técnico prévio)

1. `references/contexto-projeto.md` — Estrutura, tecnologias e convenções locais.
2. `references/duvidas-e-limites.md` — Pontos em aberto ou restrições conhecidas.

## Princípios inegociáveis

1. **[Fidelidade aos Requisitos]**: Não invente regras, dados ou parâmetros ausentes. Lacunas viram dúvidas explícitas para o usuário.
2. **[Escopo Cirúrgico]**: Mexa apenas no que foi estritamente solicitado. Não faça refatorações alheias sem autorização.
3. **[Validação Objetiva]**: Nunca afirme que algo funcionou ou está correto sem validação concreta.
4. **[Transparência de Falhas]**: Falhas de regra ou de sistema são reportadas, nunca mascaradas.
5. **[Preservação Arquitetural]**: Siga estritamente os padrões e convenções já adotados no repositório.

## Modos de Operação (se aplicável)

| Pedido típico do usuário | Modo | Referência de Ação |
|---|---|---|
| "[ação principal: criar/gerar]" | `criar` | Seguir o fluxo abaixo |
| "[ação de suporte: corrigir/revisar]" | `corrigir` | Consultar `references/guia-tecnico.md` |

## Fluxo de Execução

**compreender → consultar referências → executar passos → verificar checklist → entregar**

### 1. Compreensão e Pré-requisitos
Analise os insumos fornecidos. Isole o que está explícito, o que é derivável logicamente e o que é ponto de dúvida.
- Leia (se necessário): `references/contexto-projeto.md`

### 2. Execução Técnica
Execute a tarefa seguindo as diretrizes e convenções técnicas.
- Leia: `references/guia-tecnico.md`
- Utilize o molde: `assets/templates/molde-de-saida.md`

### 3. Validação e Checklist
Antes de responder, confira se o resultado atende a todos os critérios.
- Leia: `references/checklist-revisao.md`

### 4. Entrega
Apresente o resultado formatado conforme o molde acordado.

## Resolução de Conflitos ("Quem manda quando houver tensão")

| Assunto em Divergência | Quem tem precedência |
|---|---|
| Padrões de código e convenções locais | Código existente no repositório e docs de arquitetura |
| Regra de negócio ou comportamento funcional | Especificação / Insumo fornecido pelo usuário |
| Informação omitida ou ambígua | Ninguém: pergunte ao usuário |

## O que esta skill NÃO faz

- [Anti-padrão 1: ex: Modificar configurações globais sem autorização]
- [Anti-padrão 2: ex: Adotar dependências ou bibliotecas não homologadas]
- [Anti-padrão 3: ex: Assumir tarefas de outra skill correlata]
