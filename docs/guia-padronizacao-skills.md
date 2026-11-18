# Guia de Arquitetura e Padronização de Skills

> **Objetivo:** Documento de referência extraído do projeto **Lunar Pass** para padronizar, estruturar e elevar a maturidade de skills em outros projetos e repositórios (incluindo uso com Claude Code, Antigravity ou outros agentes).

---

## 1. Visão Geral e Contexto

No projeto Lunar Pass, as skills deixaram de ser simples "prompts longos" e passaram a operar como **módulos de software cognitivo**. Cada skill possui:
1. **Contrato de Execução Claro** (`SKILL.md`) com gatilhos positivos e negativos.
2. **Progressive Disclosure** (divisão em etapas com leitura sob demanda de arquivos em `references/`).
3. **Guardrails Inegociáveis** (leis estritas para impedir alucinações e invenção de regras).
4. **Matriz de Tensão** (regras explícitas para resolver conflitos de decisão).
5. **Moldes Padronizados de Saída** (`assets/templates/`).
6. **Suíte de Testes da Skill** (`evals/evals.json`).

---

## 2. A Esteira de Três Skills do Lunar Pass

No Lunar Pass, o processo de QA foi dividido em 3 skills complementares com fronteiras rígidas ("hand-offs"):

```
[ Requisitos / Histórias / Tickets ]
                 │
                 ▼
┌─────────────────────────────────┐
│        gherkin-qa-design        │  ◄── Design de Testes & Regras de Negócio
│ (Linguagem natural declarativa) │      (Nunca inventa regras; dúvidas viram perguntas)
└─────────────────────────────────┘
                 │
                 ├───────────────────────────────────────────┐
                 ▼                                           ▼
┌─────────────────────────────────┐         ┌─────────────────────────────────┐
│       qa-test-automation        │         │        qa-test-executor         │
│ (Código Playwright/TypeScript)  │         │ (Validação Funcional em Tela)   │
│ (Testes automatizados na suíte) │         │ (MCP gráfico, evidências PNG)   │
└─────────────────────────────────┘         └─────────────────────────────────┘
```

### Por que essa separação funciona tão bem?
- **Foco Único:** A skill que escreve cenários (`gherkin-qa-design`) não se preocupa com seletores CSS, URLs ou sintaxe de código.
- **Fronteiras Claras:** A automação (`qa-test-automation`) não altera regras de negócio. Se o teste falha porque a tela está diferente, a falha é do produto, não do teste.
- **Execução Real:** A validação (`qa-test-executor`) roda exclusivamente via navegador com validações objetivas e evidências visuais.

---

## 3. Anatomia de Diretórios de uma Skill Madura

Para skills complexas em qualquer projeto, adote a seguinte estrutura modular:

```
.agents/skills/<nome-da-skill>/
├── SKILL.md                  # Ponto de entrada: persona, fluxo e guardrails
├── evals/
│   └── evals.json            # Casos de teste para calibrar a própria skill
├── references/               # Conhecimento detalhado lido sob demanda (Progressive Disclosure)
│   ├── contexto-projeto.md   # Arquitetura, tecnologias e convenções locais
│   ├── guia-tecnico.md       # Regras técnicas, boas práticas e padrões
│   └── checklist-revisao.md  # Checklist de validação antes de entregar
└── assets/
    ├── templates/            # Moldes que o agente deve preencher
    └── examples/             # Exemplos reais (Few-shot learning: Bom vs Ruim)
```

---

## 4. As 6 Melhores Práticas Identificadas no Lunar Pass

### 1. Progressive Disclosure (Economia de Contexto)
Em vez de colocar 500 linhas de instruções no `SKILL.md`, ele possui apenas ~60 a 100 linhas. Ele orquestra etapas e comanda:
> *"Execute as etapas em ordem. Leia o arquivo indicado no início de cada etapa, não antes."*
Isso impede que o modelo consuma sua janela de contexto com detalhes irrelevantes para a etapa inicial.

### 2. Gatilhos Positivos e Negativos no Frontmatter YAML
O frontmatter define com precisão cirúrgica quando disparar e quando **NÃO** disparar:
```yaml
---
name: minha-skill
description: Realiza [tarefa X]. Use SEMPRE que o usuário pedir para [gatilhos positivos]. Não use para [fronteiras com outras skills].
---
```

### 3. Princípios Inegociáveis (Guardrails Rígidos)
Uma lista de 5 a 7 mandamentos inegociáveis logo no início do documento. Exemplos do Lunar Pass:
- *Nunca invente regra de negócio.*
- *Distinga a origem de cada informação (explícita, derivável ou a investigar).*
- *Falha do produto não se conserta no teste.*
- *Mexa só no que o cenário exige.*

### 4. Matriz de Resolução de Tensão ("Quem manda quando...")
Quando há conflito entre documentação antiga, código legado e solicitação do usuário, o modelo costuma alucinar. A tabela de tensão elimina a dúvida:

| Assunto | Quem manda |
|---|---|
| Convenção de código e arquitetura | O código existente no repositório |
| Regra de negócio e comportamento esperado | A especificação fornecida pelo usuário |
| Lacunas não documentadas | Ninguém. Pergunte ao usuário |

### 5. Modos de Operação
Se a mesma skill pode criar do zero ou corrigir algo quebrado, crie uma tabela de modos:
- Modo `criar`: fluxo A.
- Modo `corrigir`: fluxo de diagnóstico B.

### 6. Evals com Asserções Comportamentais
O arquivo `evals/evals.json` garante que a skill possa ser testada e recalibrada. As asserções testam tanto o que deve estar presente quanto o que **não pode** acontecer (anti-alucinação).

---

## 5. Matriz de Desacoplamento: Genérico vs Específico

Ao migrar para outro projeto, utilize este guia para saber o que reaproveitar e o que substituir:

| Componente | O que é GENÉRICO (Reaproveitar) | O que é ESPECÍFICO (Adaptar ao seu projeto) |
|---|---|---|
| **Frontmatter** | Estrutura YAML e sintaxe de gatilhos | Palavras-chave do domínio do seu projeto |
| **Papel (Role)** | Nível de senioridade e formato (Entrada → Saída) | Tecnologias específicas (ex: Java, React, Python, C#) |
| **Princípios** | "Não invente regras", "Mexa apenas no escopo" | Regras de compliance ou segurança do seu time |
| **Fluxo** | Etapas lógicas (Entender → Planejar → Agir → Revisar) | Comandos de build, endpoints e ferramentas locais |
| **References** | Metodologias (TDD, BDD, Clean Code, Design Patterns) | Nomes de tabelas, Page Objects, arquivos e pastas locais |
| **Templates** | Formatação Markdown, tabelas, seções de rastreabilidade | Campos específicos das regras de negócio do seu sistema |
| **Evals** | Formato JSON com `prompt`, `expected_output` e `assertions` | Exemplos reais das histórias e tickets do seu projeto |

---

## 6. Template Mestre: `SKILL.md`

Copie e adapte este arquivo como ponto de partida para qualquer skill:

```markdown
---
name: [nome-da-skill-kebab-case]
description: [Resumo em 1 parágrafo do QUE a skill faz, COMO faz e QUAL o objetivo]. Use SEMPRE que o usuário pedir para [gatilhos positivos: "fazer X", "analisar Y", "gerar Z"]. Não use para [fronteiras negativas: "tarefas da skill A", "tarefas fora de escopo"].
---

# [Nome da Skill em Título]

Você atua como **[Papel / Especialidade Sênior]** em **[Nome do Projeto ou Contexto]**. Recebe **[Entrada: dados, requisitos, código]** e entrega **[Saída esperada: documento, teste, relatório]**.

Responda sempre em português do Brasil.

## O que ler primeiro (se houver contexto prévio)

1. `references/contexto-projeto.md` — Estrutura, tecnologias e padrões já adotados.
2. `references/duvidas-e-limites.md` — O que ainda não está definido (não decida por conta própria).

## Princípios inegociáveis

1. **[Fidelidade]**: Não invente regras, parâmetros ou comportamentos ausentes. Lacunas devem ser registradas como dúvidas ou hipóteses.
2. **[Escopo Cirúrgico]**: Altere ou gere apenas o que foi estritamente solicitado. Não faça refatorações alheias ao pedido.
3. **[Verificação Objetiva]**: Nunca confirme sucesso ou conformidade sem ter executado ou verificado concretamente.
4. **[Transparência de Falhas]**: Falha de sistema ou de requisito não é mascarada no código/teste para forçar passagem.
5. **[Preservação Arquitetural]**: Respeite os padrões, convenções e bibliotecas já consolidados no projeto.

## Modos de Operação (se aplicável)

| Pedido típico do usuário | Modo | Referência de Ação |
|---|---|---|
| "[ação de criação/geração]" | `criar` | Seguir o fluxo abaixo |
| "[ação de correção/diagnóstico]" | `corrigir` | Consultar `references/diagnostico.md` |

## Fluxo de Execução

**compreender → consultar referências → executar passos → verificar checklist → entregar**

### 1. Compreensão e Pré-requisitos
Analise os insumos fornecidos. Isole o que está explícito, o que é derivável logicamente e o que é ponto de dúvida.
- Leia: `references/guia-interpretacao.md`

### 2. Execução Técnica
Execute a tarefa seguindo as diretrizes e convenções técnicas do repositório.
- Leia: `references/guia-tecnico.md`
- Utilize o modelo: `assets/templates/molde-de-saida.md`

### 3. Validação e Checklist
Antes de responder, confira se o resultado atende a todos os critérios.
- Leia: `references/checklist-revisao.md`

### 4. Entrega
Apresente o resultado formatado conforme o padrão acordado.

## Resolução de Conflitos ("Quem manda quando houver tensão")

| Assunto em Divergência | Quem tem precedência |
|---|---|
| Padrões de código e convenções locais | Código existente no repositório e docs de arquitetura |
| Regra de negócio ou comportamento funcional | Especificação / Insumo fornecido pelo usuário |
| Informação omitida ou ambígua | Ninguém: registre como pergunta ao usuário |

## O que esta skill NÃO faz

- [Anti-padrão 1: ex: Modificar configurações globais sem autorização]
- [Anti-padrão 2: ex: Adotar dependências ou bibliotecas não homologadas]
- [Anti-padrão 3: ex: Assumir tarefas de outra skill correlata]

## Exemplos de Calibração

Para entender o padrão de entrega esperado, consulte:
- `assets/examples/exemplo-sucesso.md`
- `assets/examples/anti-padrao-vs-padrao-correto.md`
```

---

## 7. Template de Avaliação: `evals/evals.json`

```json
{
  "skill_name": "[nome-da-skill-kebab-case]",
  "evals": [
    {
      "id": 1,
      "prompt": "[Prompt realista e desafiador solicitando a tarefa da skill]",
      "expected_output": "[Descrição do comportamento analítico esperado]",
      "assertions": [
        "Não inventa dados ausentes no prompt",
        "Respeita a convenção de nomenclatura do projeto",
        "Registra dúvidas explicitamente",
        "Apresenta a saída no formato especificado no template"
      ]
    },
    {
      "id": 2,
      "prompt": "[Prompt com informação ambígua ou tentativa de violar guardrail]",
      "expected_output": "[Espera-se que a skill aponte a inconsistência antes de avançar]",
      "assertions": [
        "Não altera arquivos fora do escopo",
        "Identifica e relata a ambiguidade antes de gerar a solução"
      ]
    }
  ]
}
```

---

## 8. Como Utilizar este Material no seu Outro Notebook com Claude Code

Quando você abrir o repositório sincronizado via Git no outro computador, você pode acionar o **Claude Code** com uma instrução direta aproveitando este guia:

### Prompt Sugerido para o Claude Code no outro projeto:

> *"Claude, leia o arquivo `docs/guia-padronizacao-skills.md`. Quero utilizar a arquitetura e as melhores práticas das skills do Lunar Pass para reestruturar as skills deste projeto. Analise as skills atuais que temos aqui na pasta `.claude/skills` (ou `.agents/skills`), aponte as lacunas em relação ao modelo de referência e proponha a reestruturação em camadas (SKILL.md enxuto, references sob demanda, guardrails e templates de saída)."*

Dessa forma, o Claude Code no outro ambiente utilizará o padrão de maturidade do Lunar Pass para elevar a qualidade de qualquer skill existente.
