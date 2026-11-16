# Especificação e Design de QA: Storefront Lunar Pass

**Origem:** Documentação Funcional do Módulo Storefront Lunar Pass (`docs/storefront-rfs.md`)  
**Metodologia:** Gherkin QA Design (análise crítica, raciocínio de QA, técnicas formais de teste e especificação colaborativa em Gherkin declarativo)

---

## 1. Análise dos Artefatos

### Resumo

- **Objetivo de negócio:** Permitir que o viajante busque missões lunares para quatro bases de destino, visualize a cabine de 4 assentos, reserve lugares para si e acompanhantes, informe os dados dos passageiros, realize o pagamento simulado por cartão de crédito e receba a confirmação com o código único da reserva e as passagens nominais emitidas.
- **Atores e perfis:**
  - **Viajante:** usuário final que realiza a busca, seleciona assentos, cadastra dados de passageiros e efetua o pagamento da reserva.
  - **Outro viajante (concorrente):** outro usuário do sistema que pode reservar o mesmo assento concorrentemente antes da confirmação da compra.
- **Artefatos analisados:** Documentação Funcional do Storefront (`storefront-rfs.md`), cobrindo as cinco etapas da jornada: 1. Busca de Missões, 2. Mapa de Assentos, 3. Passageiros, 4. Pagamento e 5. Emissão do Ticket.

### Regras Identificadas

| # | Regra ou informação | Classe | Origem | Observação / Justificativa |
|---|---|---|---|---|
| R01 | O catálogo oferece exatamente 4 bases lunares: Base Lunar Alpha, Base Lunar Orion, Base Lunar Aurora e Base Lunar Selene | Explícita | 1.2 Regras | Destinos fechados e pré-definidos |
| R02 | Toda missão é de ida e volta com estadia fixa de 7 dias na base lunar | Explícita | 1.2 Regras | Regra temporal estática de duração |
| R03 | Preço da missão é decimal por passageiro e cotado em dólares americanos (USD) | Explícita | 1.2 Regras | Moeda padrão de todo o Storefront |
| R04 | Capacidade máxima de cada foguete é de exatamente 4 assentos | Explícita | 1.2 Regras | Limite físico da cabine da missão |
| R05 | Missões esgotadas permanecem visíveis nos resultados, rotuladas como "Esgotado", sem opção de iniciar reserva | Explícita | 1.2 Regras / RF-04 | Visibilidade mantida, ação de compra desabilitada |
| R06 | Quando nenhuma base é selecionada ou quando todas são selecionadas, a busca exibe todas as bases | Explícita | 1.2 Regras | Comportamento neutro de filtro |
| R07 | A ordenação padrão dos resultados é por data de partida mais próxima | Explícita | 1.2 Regras / RF-02 | Critério padrão sem intervenção do usuário |
| R08 | É possível filtrar missões por uma ou mais bases lunares, exibindo total de resultados e bases ativas | Explícita | RF-01 | Filtro cumulativo de seleção múltipla |
| R09 | É possível ordenar missões por data de partida mais próxima ou mais distante | Explícita | RF-02 | Ordenação explícita bidirecional |
| R10 | Alteração de filtros e ordenação na página de resultados atualiza a lista sem retornar à home | Explícita | RF-03 | Refinamento in-place dos resultados |
| R11 | Cada missão apresenta id, foguete, destino, datas (ida/retorno), estadia, assentos disponíveis/total e preço | Explícita | RF-04 | Atributos obrigatórios de exibição da missão |
| R12 | Qualquer missão com assentos disponíveis permite iniciar reserva | Explícita | RF-04 | Gatilho de início da jornada de reserva |
| R13 | Quando nenhuma missão atende aos filtros, exibe aviso informando a situação e atalho para ver todas as missões | Explícita | RF-05 | Tratamento de catálogo vazio para filtros |
| R14 | O atalho para visualizar todas as missões redefine os filtros de base lunar aplicados | Derivável | RF-05 | Justificativa: para exibir todas as missões, os filtros de base ativos devem ser limpos |
| R15 | A cabine tem 4 assentos em 2 fileiras: A1 e A2 (vista Terra); B1 e B2 (vista Lua) | Explícita | 2.2 Regras | Layout fixo e vistas associadas |
| R16 | Uma reserva deve conter no mínimo 1 e no máximo 4 assentos | Explícita | 2.2 Regras | Limites de quantidade de assentos por reserva |
| R17 | Estados do assento: disponível, selecionado ou ocupado | Explícita | 2.2 Regras | Máquina de estados do assento |
| R18 | Assentos ocupados pertencem a reservas confirmadas e não podem ser selecionados; tentar selecionar exibe aviso | Explícita | 2.2 Regras / RF-02 | Bloqueio de assentos indisponíveis |
| R19 | Um mesmo assento não pode ser reservado duas vezes na mesma missão | Explícita | 2.2 Regras | Unicidade de ocupação por assento |
| R20 | Valor total da reserva = preço por passageiro × assentos selecionados (em USD) | Explícita | 2.2 Regras | Fórmula de cálculo do valor da reserva |
| R21 | Mapa de assentos reflete a ocupação real de reservas confirmadas e detalha cada assento (id, estado, vista, preço) | Explícita | RF-01 | Sincronismo com estado das reservas |
| R22 | Seleção e desmarcação livres; resumo de assentos e total em USD atualizam a cada mudança | Explícita | RF-02 | Reatividade da seleção |
| R23 | Avançar para passageiros exige pelo menos 1 assento selecionado | Explícita | RF-03 | Guarda de transição de etapa |
| R24 | Cabine com todos os assentos ocupados exibe aviso de missão esgotada e opção de voltar à busca | Explícita | RF-03 | Bloqueio de fluxo para missão 100% ocupada |
| R25 | Cada assento selecionado possui exatamente um passageiro associado | Explícita | 3.2 Regras / RF-01 | Relação 1:1 entre assento e viajante |
| R26 | Nome completo e número de passaporte são obrigatórios para todos os passageiros | Explícita | 3.2 Regras / RF-01 | Campos mandatórios do formulário |
| R27 | Nome completo deve conter entre 3 e 120 caracteres | Explícita | 3.2 Regras | Limites de comprimento do nome |
| R28 | Número do passaporte deve conter entre 5 e 30 caracteres | Explícita | 3.2 Regras | Limites de comprimento do passaporte |
| R29 | Normalização: espaços nas extremidades são removidos e passaporte é registrado em letras maiúsculas | Explícita | 3.2 Regras | Tratamento prévio de dados |
| R30 | Violação de dados gera mensagem junto ao campo e foco no primeiro campo com erro; avanço exige todos válidos | Explícita | RF-01 | Bloqueio de avanço para dados inválidos |
| R31 | Retornar aos assentos não perde dados de passageiros; revalidação ocorre conforme correção | Explícita | RF-02 | Persistência entre etapas e feedback contínuo |
| R32 | Ao desmarcar um assento após preencher passageiros, o formulário correspondente a ele é descartado mantendo os demais | Derivável | RF-01 / RF-02 | Justificativa: como cada formulário é vinculado ao assento, desmarcar remove a vaga associada |
| R33 | O pagamento é simulado para fins acadêmicos; nenhuma cobrança real é realizada | Explícita | 4.2 Regras | Ambiente simulado comunicado ao usuário |
| R34 | Resultados possíveis do pagamento: aprovado, negado ou dados do cartão incorretos | Explícita | 4.2 Regras | Três saídas de negócio do simulador |
| R35 | Cartões de teste pré-definidos determinam aprovação; outros números com formato válido resultam em "dados do cartão incorretos" | Explícita | 4.2 Regras | Critério de distinção de aprovação/erro |
| R36 | Dados obrigatórios de pagamento: e-mail de contato, nome no cartão (3-80 chars), número (13-16 dígitos), validade (MM/AA, mês 01-12) e CVV (3-4 dígitos) | Explícita | 4.2 Regras / RF-01 | Campos mandatórios e restrições de formato |
| R37 | Bandeiras reconhecidas: Visa, Mastercard e American Express, identificadas pelo número com formatação automática | Explícita | 4.2 Regras / RF-01 | Reconhecimento de bandeiras autorizadas |
| R38 | Valor total em USD exibido antes da confirmação; servidor é a referência oficial | Explícita | 4.2 Regras / RF-01 | Exibição prévia do valor da transação |
| R39 | Reserva só é criada após aprovação do pagamento; dados de cartão não são salvos | Explícita | 4.2 Regras | Transação atômica e segurança de dados |
| R40 | Processamento de pagamento exibe indicador visual e bloqueia edição e reenvio | Explícita | RF-02 | Prevenção de duplicidade e submissão concorrente |
| R41 | Recusa por negação, dados incorretos ou falha mantém viajante na tela com dados preenchidos para correção | Explícita | RF-02 | Recuperação de falha no pagamento |
| R42 | Conflito de concorrência: se o assento for ocupado por outro viajante durante o checkout, reserva não é criada e viajante é orientado a escolher outro | Explícita | RF-03 | Tratamento de concorrência simultânea |
| R43 | Reserva confirmada recebe código único de 6 caracteres alfanuméricos sem caracteres ambíguos | Explícita | 5.2 Regras | Identificador público da reserva |
| R44 | Emissão de uma passagem (ticket) por assento, vinculada a nome, passaporte e assento | Explícita | 5.2 Regras / RF-02 | Emissão de passagens individuais |
| R45 | Confirmação exibe código, destino, datas, foguete, assentos, e-mail de contato, valor total em USD, bandeira e aviso de simulação | Explícita | RF-01 / RF-02 | Dados consolidados do comprovante de viagem |
| R46 | Opção de iniciar nova busca de missões após a finalização da compra | Explícita | RF-03 | Recomeço de fluxo a partir do sucesso |

### Ambiguidades, Lacunas e Contradições Encontradas

1. **Variação de nomenclatura de datas:** O documento menciona "data de lançamento" (história e RF-02), "data de partida" (1.2 e RF-02) e "data de ida" (RF-04). Não há confirmação de que representem rigorosamente a mesma data.
2. **Critérios de aprovação e recusa de cartão não especificados:** O artefato não fornece a lista de números de teste para aprovação, não define a regra que dispara o resultado "negado", nem o algoritmo que valida "formato válido" (ex.: algoritmo de Luhn).
3. **Falha de processamento como resultado:** Citada em RF-02 ("interrompido por falha de processamento"), mas não incluída na enumeração oficial de resultados da regra 4.2 (aprovado, negado, dados incorretos).
4. **Bandeiras não suportadas:** Não está documentado se números de cartões com bandeiras não reconhecidas (ex.: Elo, Hipercard) são bloqueados na digitação ou se geram recusa de dados incorretos.
5. **Impacto financeiro em conflito de assentos:** Se o pagamento for aprovado pelo simulador e a criação da reserva for abortada devido a conflito de concorrência de assentos, não está definido se ocorre estorno automático simulado e qual orientação precisa é exibida.
6. **Ordem de validação de tamanho de texto:** Não está especificado se os limites de caracteres (3-120 no nome e 5-30 no passaporte) são aferidos antes ou depois da remoção de espaços nas extremidades (trim).
7. **Caracteres ambíguos do código de reserva:** Não estão discriminados quais caracteres alfanuméricos foram excluídos da geração do código de 6 caracteres (ex.: exclusão de 0, O, 1, I, L).
8. **Validade de cartão no passado:** O documento exige mês entre 01 e 12, mas não detalha explicitamente a regra de bloqueio para ano/mês anteriores à data corrente.
9. **Unicidade de passaporte na mesma reserva:** Não há regra definindo se é permitido registrar o mesmo número de passaporte para dois assentos distintos na mesma reserva.

---

## 2. Mapa de Variantes e Técnicas Aplicadas

| # | Variante (o que muda o comportamento) | Eixo | Regra de origem | Técnica | Decisão |
|---|---|---|---|---|---|
| V01 | Nenhuma base lunar selecionada na busca | Filtro | R06 | Classes de equivalência | Cenário |
| V02 | Filtro por uma única base lunar (ex: Base Lunar Selene) | Filtro | R01, R08 | Classes de equivalência | Cenário |
| V03 | Filtro por múltiplas bases lunares (ex: Alpha e Orion) | Filtro | R08 | Classes de equivalência | Cenário |
| V04 | Todas as 4 bases selecionadas simultaneamente | Filtro | R06 | Classes de equivalência | Cenário |
| V05 | Filtro sem nenhuma missão correspondente encontrada | Dados | R13 | Fluxo de exceção | Cenário |
| V06 | Acionar atalho de exibição de todas as missões após busca vazia | Ação / Estado | R13, R14 | Transição de estados | Cenário |
| V07 | Ordenação padrão por data de partida mais próxima | Ordem | R07 | Classes de equivalência | Cenário |
| V08 | Ordenação por data de partida mais distante | Ordem | R09 | Classes de equivalência | Cenário |
| V09 | Refinamento de base e ordenação direto nos resultados | Ação | R10 | Transição de estados | Cenário |
| V10 | Missão com assentos disponíveis vs missão com assentos esgotados | Estado | R05, R12 | Tabela de decisão | Esquema do Cenário |
| V11 | Filtro por outra base isolada (ex: Base Lunar Aurora) | Filtro | R08 | Classes de equivalência | Descartada: equivalente à variante V02 |
| V12 | Visualização da cabine com assentos disponíveis e ocupados | Estado | R15, R17, R21 | Classes de equivalência | Cenário |
| V13 | Seleção de assentos de 1 a 4 lugares com cálculo do valor | Limite / Dado | R16, R20, R22 | Valores-limite | Esquema do Cenário |
| V14 | Desmarcar um assento já selecionado | Desfazer | R22 | Transição de estados | Cenário |
| V15 | Tentativa de selecionar um assento ocupado | Permissão | R18 | Fluxo de exceção | Cenário |
| V16 | Tentativa de avançar para passageiros com 0 assentos selecionados | Limite | R23 | Valor-limite (abaixo do mínimo) | Cenário |
| V17 | Cabine com todos os assentos ocupados (esgotada) | Limite / Estado | R24 | Transição de estados | Cenário |
| V18 | Cadastro de passageiros com dados válidos para cada assento | Dado | R25, R26, R30 | Classes de equivalência | Cenário |
| V19 | Normalização de dados (remoção de espaços nas bordas e passaporte em maiúsculas) | Dado | R29 | Heurística de transformação | Cenário |
| V20 | Nome de passageiro com tamanho inferior a 3 caracteres | Limite | R27, R30 | Valores-limite (abaixo da fronteira) | Cenário |
| V21 | Nome de passageiro com tamanho superior a 120 caracteres | Limite | R27, R30 | Valores-limite (acima da fronteira) | Cenário |
| V22 | Passaporte com tamanho inferior a 5 caracteres | Limite | R28, R30 | Valores-limite (abaixo da fronteira) | Cenário |
| V23 | Passaporte com tamanho superior a 30 caracteres | Limite | R28, R30 | Valores-limite (acima da fronteira) | Cenário |
| V24 | Campos obrigatórios de passageiro em branco | Dado | R26, R30 | Tabela de decisão | Esquema do Cenário |
| V25 | Revalidação imediata do campo corrigido | Tempo / Ação | R31 | Antes e depois | Cenário |
| V26 | Retornar à etapa de assentos e manter dados de passageiros preenchidos | Histórico | R31 | Persistência de estado | Cenário |
| V27 | Desmarcar um assento após preencher dados dos passageiros | Desfazer | R32 | Transição de estados | Cenário (com hipótese) |
| V28 | Pagamento aprovado com cartão de teste pré-definido | Dado / Estado | R33, R34, R35, R39 | Caminho principal | Cenário |
| V29 | Pagamento recusado por dados do cartão incorretos (número com formato válido não cadastrado) | Dado | R34, R35, R41 | Tabela de decisão | Cenário |
| V30 | Pagamento negado pelo simulador | Estado | R34, R41 | Fluxo alternativo / Tabela de decisão | Cenário |
| V31 | Pagamento interrompido por falha de processamento | Falha | R41 | Fluxo de exceção | Cenário |
| V32 | Reconhecimento automático de bandeiras (Visa, Mastercard, American Express) | Dado | R37 | Classes de equivalência | Esquema do Cenário |
| V33 | Bloqueio de interface e indicação visual durante processamento de pagamento | Tempo / Concorrência | R40 | Transição de estados | Cenário |
| V34 | Dados de cartão inválidos ou fora dos limites obrigatórios | Limite / Formato | R36, R41 | Classes de equivalência e limites | Esquema do Cenário |
| V35 | Conflito de concorrência: assento reservado por outro viajante antes da confirmação | Concorrência | R42 | Concorrência e exceção | Cenário |
| V36 | Confirmação da compra com exibição de código de 6 caracteres e dados completos | Dado | R43, R45 | Caminho principal | Cenário |
| V37 | Apresentação de tickets individuais emitidos por passageiro | Dado | R44, R45 | Heurística 1:1 | Cenário |
| V38 | Iniciar nova compra a partir da tela de confirmação | Ação | R46 | Transição de estados | Cenário |
| V39 | Cartão de crédito de bandeira não suportada | Dado | sem regra definida | | Investigar (P04) |
| V40 | Validação de limites de caracteres com espaços antes da normalização | Limite | R27, R28, R29 | | Investigar (P06) |

### Técnicas Aplicadas

- **Classes de equivalência:** aplicadas nas seleções de bases lunares (nenhuma, uma, múltiplas, todas), nas bandeiras reconhecidas (Visa, Mastercard, Amex), nos estados de assento (disponível, selecionado, ocupado) e nos resultados de pagamento do simulador.
- **Valores-limite:** aplicados nas quantidades de assentos por reserva (fronteiras 0, 1, 4 assentos), no comprimento do nome completo (fronteiras 2, 3, 120 e 121 caracteres), no comprimento do passaporte (fronteiras 4, 5, 30 e 31 caracteres) e nos campos do cartão (nome 3-80, número 13-16 dígitos, mês 01-12, CVV 3-4 dígitos).
- **Tabela de decisão:** aplicada na validação de campos obrigatórios de passageiros e cartão, nas regras de autorização do simulador de cartão e no tratamento de missões disponíveis vs esgotadas.
- **Transição de estados:** aplicada no ciclo de vida dos assentos na cabine (disponível → selecionado → disponível), na navegação de avanço e retorno entre etapas preservando formulários e na submissão de pagamento (preenchido → em processamento → aprovado ou recusado).
- **Tratamento de concorrência e exceções:** aplicado no conflito de assento ocupado simultaneamente por outro viajante no instante do checkout e na recuperação de dados após recusa de pagamento.
- **Descartes fundamentados:** variantes redundantes (como testar isoladamente a Base Lunar Aurora quando a Base Lunar Selene já valida a classe de filtro unitário) foram descartadas para evitar duplicidade de cobertura.

---

## 3. Especificação em Gherkin Declarativo

# Funcionalidade 1: Busca e Comparação de Missões Lunares

**Contexto:**  
**Dado** que o catálogo contém missões cadastradas para as quatro bases lunares  
**E** toda missão possui estadia fixa de 7 dias com preço definido por passageiro em dólares

### Filtros e Listagem de Missões

**Cenário:** Buscar missões considerando todas as bases por padrão  
*Regra de origem: R06, R07*  
**Dado** que eu estou na consulta de missões  
**Quando** eu realizo a busca sem selecionar nenhuma base lunar específica  
**Então** eu devo ver missões de todas as quatro bases lunares  
**E** os resultados devem estar ordenados pela data de partida mais próxima

**Cenário:** Buscar missões filtrando por uma única base lunar  
*Regra de origem: R01, R08*  
**Dado** que eu estou na consulta de missões  
**Quando** eu busco missões selecionando apenas a "Base Lunar Selene"  
**Então** eu devo ver apenas missões com destino à "Base Lunar Selene"  
**E** devo ser informado sobre a quantidade de missões encontradas e a base ativa no filtro

**Cenário:** Buscar missões filtrando por múltiplas bases lunares  
*Regra de origem: R08*  
**Dado** que eu estou na consulta de missões  
**Quando** eu busco missões selecionando as bases "Base Lunar Alpha" e "Base Lunar Orion"  
**Então** eu devo ver apenas missões que atendam a uma dessas duas bases selecionadas  
**E** os resultados devem indicar ambas as bases como filtros aplicados

**Cenário:** Buscar missões selecionando todas as quatro bases lunares  
*Regra de origem: R06*  
**Dado** que eu estou na consulta de missões  
**Quando** eu seleciono todas as quatro bases lunares e realizo a busca  
**Então** eu devo ver as missões disponíveis para todas as bases do catálogo

**Cenário:** Tratar a ausência de resultados para filtros sem missões correspondentes  
*Regra de origem: R13*  
**Dado** que não existem missões disponíveis para os filtros que eu escolhi  
**Quando** eu realizo a busca com esses critérios  
**Então** eu devo ser informado de que nenhuma missão atende aos filtros aplicados  
**E** devo ter acesso a um atalho para visualizar todas as missões sem filtro

**Cenário:** Retornar ao catálogo completo através do atalho de busca vazia  
*Regra de origem: R13, R14*  
*Hipótese a validar: o atalho de exibição limpa automaticamente os filtros de base ativos*  
**Dado** que eu recebi o aviso de nenhuma missão encontrada para os meus filtros  
**Quando** eu aciono o atalho para visualizar todas as missões  
**Então** todos os filtros de base devem ser desmarcados  
**E** eu devo ver a lista com todas as missões vigentes do catálogo

### Ordenação e Refinamento

**Cenário:** Ordenar missões pela data de partida mais distante  
*Regra de origem: R09*  
**Dado** que estou visualizando o resultado de uma busca de missões  
**Quando** eu altero a ordenação para data de partida mais distante  
**Então** os resultados devem ser reorganizados exibindo primeiro a missão com o lançamento mais futuro

**Cenário:** Refinar filtros diretamente na tela de resultados  
*Regra de origem: R10*  
**Dado** que estou visualizando os resultados filtrados pela "Base Lunar Alpha"  
**Quando** eu altero meu filtro diretamente na lista para a "Base Lunar Aurora"  
**Então** a lista de missões deve ser atualizada imediatamente sem me redirecionar para a página inicial  
**E** apenas missões da "Base Lunar Aurora" devem ser apresentadas

### Disponibilidade e Início de Reserva

**Esquema do Cenário:** Exibir a disponibilidade da missão e controlar o início da reserva  
*Regra de origem: R04, R05, R11, R12*  
**Dado** que uma missão possui capacidade total de 4 assentos  
**Quando** a quantidade de assentos ocupados for <ocupados>  
**Então** a missão deve indicar <disponibilidade> assentos disponíveis  
**E** o status da missão deve ser <status_exibido>  
**E** a possibilidade de iniciar a reserva deve ser <reserva_permitida>

**Exemplos:**

| ocupados | disponibilidade | status_exibido | reserva_permitida |
|---|---|---|---|
| 0 | "4 de 4" | "Disponível" | "habilitada" |
| 1 | "3 de 4" | "Disponível" | "habilitada" |
| 3 | "1 de 4" | "Disponível" | "habilitada" |
| 4 | "0 de 4" | "Esgotado" | "desabilitada" |

---

# Funcionalidade 2: Visualização da Cabine e Seleção de Assentos

**Contexto:**  
**Dado** que eu iniciei a reserva de uma missão com preço de $ 10.000 por passageiro  
**E** a cabine possui exatamente 4 assentos (A1 e A2 voltados para a Terra; B1 e B2 voltados para a Lua)

### Visualização e Seleção de Assentos

**Cenário:** Visualizar a cabine com assentos disponíveis e ocupados por reservas anteriores  
*Regra de origem: R15, R17, R21*  
**Dado** que o assento A1 pertence a uma reserva já confirmada por outro viajante  
**E** os assentos A2, B1 e B2 estão livres  
**Quando** eu acesso o mapa de assentos da missão  
**Então** eu devo ver o assento A1 identificado como ocupado  
**E** devo ver os assentos A2, B1 e B2 identificados como disponíveis com suas respectivas vistas e preços

**Esquema do Cenário:** Selecionar quantidades válidas de assentos e atualizar o valor total  
*Regra de origem: R16, R20, R22*  
**Dado** que todos os assentos da cabine estão disponíveis  
**Quando** eu seleciono <quantidade> assento(s)  
**Então** o resumo da reserva deve indicar <quantidade> de 4 assentos escolhidos  
**E** o valor total da minha reserva deve ser calculado em <valor_total>

**Exemplos:**

| quantidade | valor_total |
|---|---|
| 1 | "$ 10.000" |
| 2 | "$ 20.000" |
| 3 | "$ 30.000" |
| 4 | "$ 40.000" |

**Cenário:** Desmarcar um assento previamente selecionado  
*Regra de origem: R22*  
**Dado** que eu selecionei os assentos A1 e A2 totalizando $ 20.000  
**Quando** eu desmarco o assento A2  
**Então** o assento A2 deve retornar ao estado disponível  
**E** o resumo da minha seleção deve indicar 1 assento selecionado com valor total de $ 10.000

### Restrições e Casos Limite de Assentos

**Cenário:** Tentar selecionar um assento já ocupado  
*Regra de origem: R18*  
**Dado** que o assento B1 está ocupado por uma reserva confirmada  
**Quando** eu tento selecionar o assento B1  
**Então** o assento B1 não deve ser marcado como selecionado  
**E** eu devo ser alertado de que o assento está ocupado e que devo escolher outro

**Cenário:** Tentar avançar para passageiros sem selecionar nenhum assento  
*Regra de origem: R23*  
**Dado** que eu estou no mapa de assentos  
**Quando** eu tento avançar para a etapa de passageiros sem nenhum assento selecionado  
**Então** o avanço deve ser bloqueado  
**E** eu devo ser informado de que preciso selecionar ao menos um assento para prosseguir

**Cenário:** Acessar o mapa de assentos de uma missão que esgotou todos os lugares  
*Regra de origem: R24*  
**Dado** que todos os 4 assentos da missão já foram confirmados  
**Quando** eu abro o mapa de assentos dessa missão  
**Então** eu devo ser informado de que a missão está esgotada  
**E** devo ter a opção de retornar à listagem de missões

---

# Funcionalidade 3: Cadastro de Passageiros da Reserva

**Contexto:**  
**Dado** que eu selecionei assentos para a minha viagem e avancei para a etapa de passageiros

### Preenchimento Válido e Normalização

**Cenário:** Preencher os dados de passageiro com informações válidas  
*Regra de origem: R25, R26, R30*  
**Dado** que eu selecionei 1 assento na cabine  
**Quando** eu informo o nome "Joana Dark" e o passaporte "BR123456" para o assento correspondente  
**E** solicito o avanço para o pagamento  
**Então** os dados do passageiro devem ser aceitos  
**E** eu devo ser conduzido à etapa de pagamento

**Cenário:** Normalizar espaços nas extremidades e caixa alta no passaporte  
*Regra de origem: R29*  
**Dado** que eu informo o nome "   Carlos Silva   " com espaços nas pontas  
**E** informo o passaporte "   pa98765   " em letras minúsculas e com espaços nas pontas  
**Quando** eu confirmo os dados dos passageiros  
**Então** o nome deve ser registrado sem os espaços nas extremidades  
**E** o passaporte deve ser registrado em letras maiúsculas e sem os espaços nas extremidades

### Limites e Validações de Entrada

**Esquema do Cenário:** Validar os limites de tamanho do nome completo do passageiro  
*Regra de origem: R27, R30*  
**Dado** que estou preenchendo o formulário de passageiro  
**Quando** eu informo um nome com <tamanho> caracteres  
**Então** o sistema deve considerar o nome <situacao>  
**E** a mensagem de erro no nome deve ser <exibicao_erro>

**Exemplos:**

| tamanho | situacao | exibicao_erro |
|---|---|---|
| 2 | "inválido" | "apresentada" |
| 3 | "válido" | "ausente" |
| 120 | "válido" | "ausente" |
| 121 | "inválido" | "apresentada" |

**Esquema do Cenário:** Validar os limites de tamanho do passaporte do passageiro  
*Regra de origem: R28, R30*  
**Dado** que estou preenchendo o formulário de passageiro  
**Quando** eu informo um passaporte com <tamanho> caracteres  
**Então** o sistema deve considerar o passaporte <situacao>  
**E** a mensagem de erro no passaporte deve ser <exibicao_erro>

**Exemplos:**

| tamanho | situacao | exibicao_erro |
|---|---|---|
| 4 | "inválido" | "apresentada" |
| 5 | "válido" | "ausente" |
| 30 | "válido" | "ausente" |
| 31 | "inválido" | "apresentada" |

**Esquema do Cenário:** Impedir avanço com campos obrigatórios não preenchidos  
*Regra de origem: R26, R30*  
**Dado** que estou no cadastro de passageiros  
**Quando** eu deixo o campo <campo_vazio> sem preenchimento  
**E** tento avançar para o pagamento  
**Então** o avanço deve ser impedido  
**E** eu devo ser alertado sobre a obrigatoriedade do <campo_vazio>  
**E** o foco deve ser posicionado no primeiro campo inválido

**Exemplos:**

| campo_vazio |
|---|
| "nome completo" |
| "número do passaporte" |

### Navegação e Correção Durante o Fluxo

**Cenário:** Revalidar campo com erro imediatamente após correção  
*Regra de origem: R31*  
**Dado** que o campo de passaporte exibiu um erro por conter menos de 5 caracteres  
**Quando** eu corrijo o valor informando um passaporte com 8 caracteres  
**Então** o aviso de erro daquele campo deve ser removido sem exigir nova tentativa de avanço

**Cenário:** Preservar os dados dos passageiros ao retornar à etapa de assentos  
*Regra de origem: R31*  
**Dado** que eu preenchi os dados do passageiro para o assento A1  
**Quando** eu retorno à etapa de assentos para conferir a cabine  
**E** avanço novamente para a etapa de passageiros  
**Então** os dados preenchidos anteriormente para o assento A1 devem permanecer intactos

**Cenário:** Desmarcar um assento e descartar o passageiro associado  
*Regra de origem: R32*  
*Hipótese a validar: ao desmarcar um assento no mapa, o formulário de passageiro correspondente a ele é removido*  
**Dado** que eu havia selecionado os assentos A1 e A2 e preenchido ambos os passageiros  
**Quando** eu retorno ao mapa de assentos e desmarco o assento A2  
**E** avanço novamente para passageiros  
**Então** devo ver apenas o formulário referente ao assento A1 com seus dados preservados  
**E** o formulário referente ao assento A2 não deve mais ser exibido

---

# Funcionalidade 4: Pagamento Simulado da Reserva

**Contexto:**  
**Dado** que eu reservei 2 assentos totalizando $ 20.000 com todos os passageiros válidos  
**E** estou na etapa de pagamento da reserva

### Validação dos Dados do Cartão

**Esquema do Cenário:** Reconhecer automaticamente as bandeiras aceitas pelo número do cartão  
*Regra de origem: R37*  
**Dado** que estou preenchendo os dados do pagamento  
**Quando** eu digito um número correspondente à bandeira <bandeira>  
**Então** a bandeira <bandeira> deve ser identificada e exibida na tela  
**E** o número do cartão deve ser formatado automaticamente

**Exemplos:**

| bandeira |
|---|
| "Visa" |
| "Mastercard" |
| "American Express" |

**Esquema do Cenário:** Validar restrições de formato nos dados do cartão  
*Regra de origem: R36, R41*  
**Dado** que estou na etapa de pagamento  
**Quando** eu submeto o formulário com o campo <campo> contendo o dado <valor_invalido>  
**Então** o pagamento não deve ser submetido  
**E** devo ser alertado sobre a irregularidade no <campo> com o foco voltado a ele

**Exemplos:**

| campo | valor_invalido |
|---|---|
| "nome no cartão" | "Ab" |
| "nome no cartão" | "Nome extremamente longo ultrapassando oitenta caracteres com sobra de texto para estourar o limite" |
| "número do cartão" | "123456789012" |
| "número do cartão" | "12345678901234567" |
| "validade" | "13/28" |
| "validade" | "00/28" |
| "CVV" | "12" |
| "CVV" | "12345" |

### Processamento e Resultados do Simulador

**Cenário:** Efetuar pagamento aprovado com cartão de teste cadastrado  
*Regra de origem: R33, R34, R35, R38, R39*  
**Dado** que o resumo apresenta o total oficial de $ 20.000 em dólares  
**Quando** eu informo um e-mail de contato válido e um número de cartão de teste pré-definido para aprovação  
**E** confirmo o pagamento  
**Então** a reserva deve ser registrada no sistema  
**E** eu devo ser conduzido à tela de confirmação da compra

**Cenário:** Indicar estado de processamento e bloquear duplo envio  
*Regra de origem: R40*  
**Dado** que eu informei todos os dados de pagamento válidos  
**Quando** eu aciono a confirmação do pagamento  
**Então** o sistema deve exibir visualmente a condição de processamento em andamento  
**E** deve bloquear qualquer alteração nos campos ou reenvio do pedido durante essa execução

**Cenário:** Tratar recusa por dados de cartão incorretos  
*Regra de origem: R34, R35, R41*  
**Dado** que eu informo um número de cartão com formato válido mas não cadastrado para aprovação  
**Quando** eu submeto o pagamento  
**Então** o simulador deve recusar com motivo de dados do cartão incorretos  
**E** eu devo permanecer na tela de pagamento com os dados preservados para correção

**Cenário:** Tratar pagamento negado pelo simulador  
*Regra de origem: R34, R41*  
**Dado** que eu informo os dados de pagamento que resultam na condição de negado  
**Quando** eu tento concluir a compra  
**Então** eu devo ser informado de que o pagamento foi negado  
**E** devo permanecer na tela de pagamento podendo tentar novamente

**Cenário:** Tratar interrupção por falha inesperada de processamento  
*Regra de origem: R41*  
**Dado** que ocorre uma falha inesperada na comunicação do simulador durante o processamento  
**Quando** a resposta de erro for recebida  
**Então** eu devo ser informado de que ocorreu uma falha de processamento  
**E** meus dados de pagamento devem ser mantidos para que eu possa tentar novamente

### Concorrência de Assentos

**Cenário:** Bloquear reserva em caso de conflito de assento ocupado concorrentemente  
*Regra de origem: R42*  
**Dado** que outro viajante confirmou uma reserva para o assento A1 enquanto eu preenchia o pagamento  
**Quando** o meu pagamento for submetido  
**Então** a minha reserva não deve ser criada  
**E** eu devo ser informado de que o assento acabou de ser ocupado e que preciso escolher outro

---

# Funcionalidade 5: Confirmação da Reserva e Emissão de Tickets

**Contexto:**  
**Dado** que o meu pagamento foi processado com sucesso para a "Base Lunar Selene"  
**E** a compra compreendeu os assentos A1 e A2 para dois passageiros

### Apresentação da Confirmação

**Cenário:** Exibir o comprovante da reserva com dados consolidados e aviso acadêmico  
*Regra de origem: R33, R43, R45*  
**Quando** eu sou direcionado à confirmação da compra  
**Então** eu devo ver o código único da reserva composto por 6 caracteres alfanuméricos  
**E** devo ver os detalhes da missão com base de destino, datas de ida e volta, foguete e assentos reservados  
**E** devo ser informado de que nenhuma cobrança real foi realizada por se tratar de uma simulação acadêmica  
**E** devo ver o e-mail de contato indicado como destino dos detalhes e a recomendação de guardar o código

**Cenário:** Apresentar as passagens individuais emitidas para cada passageiro  
*Regra de origem: R44, R45*  
**Quando** eu consulto as passagens emitidas na confirmação  
**Então** eu devo ver exatamente duas passagens individuais exibidas  
**E** cada passagem deve apresentar o nome completo do passageiro, o passaporte correspondente e o respectivo assento  
**E** o valor total pago em dólares deve ser apresentado na confirmação

**Cenário:** Iniciar uma nova compra a partir da tela de confirmação  
*Regra de origem: R46*  
**Dado** que estou na tela de confirmação da minha reserva concluída  
**Quando** eu opto por iniciar uma nova compra  
**Então** eu devo ser conduzido à página de busca de missões para iniciar um novo planejamento de viagem

---

## 4. Matriz de Rastreabilidade

| Regra de Negócio | Cenários que a cobrem |
|---|---|
| R01 (4 bases) | Buscar missões filtrando por uma única base lunar |
| R02 (Estadia fixa 7 dias) | Contexto de Busca de Missões; Exibir comprovante da reserva |
| R03 (Preço decimal USD) | Contexto de Busca de Missões; Esquema do Cenário de valores de assentos |
| R04 (Capacidade de 4 assentos) | Esquema do Cenário de disponibilidade e status da missão |
| R05 (Missão esgotada na listagem) | Esquema do Cenário de disponibilidade e status da missão |
| R06 (Busca todas as bases) | Buscar missões considerando todas as bases por padrão; Buscar missões com todas as bases |
| R07 (Ordenação padrão) | Buscar missões considerando todas as bases por padrão |
| R08 (Filtro de bases) | Buscar missões por base única; Buscar missões por múltiplas bases |
| R09 (Ordenação por data) | Ordenar missões pela data de partida mais distante |
| R10 (Refinamento direto) | Refinar filtros diretamente na tela de resultados |
| R11 (Dados do card) | Esquema do Cenário de disponibilidade e status da missão |
| R12 (Iniciar reserva) | Esquema do Cenário de disponibilidade e status da missão |
| R13 (Ausência de resultados) | Tratar a ausência de resultados para filtros sem missões correspondentes |
| R14 (Atalho catálogo completo) | Retornar ao catálogo completo através do atalho de busca vazia (Hipótese) |
| R15 (Cabine de 4 assentos) | Visualizar a cabine com assentos disponíveis e ocupados |
| R16 (1 a 4 assentos) | Esquema do Cenário de seleção de quantidades válidas de assentos |
| R17 (Estados do assento) | Visualizar a cabine com assentos disponíveis e ocupados |
| R18 (Assento ocupado) | Tentar selecionar um assento já ocupado |
| R19 (Unicidade de assento) | Bloquear reserva em caso de conflito de assento ocupado concorrentemente |
| R20 (Cálculo do valor total) | Esquema do Cenário de seleção de quantidades válidas de assentos |
| R21 (Ocupação real do mapa) | Visualizar a cabine com assentos disponíveis e ocupados |
| R22 (Reatividade de seleção) | Desmarcar um assento previamente selecionado |
| R23 (Avanço com mínimo de 1) | Tentar avançar para passageiros sem selecionar nenhum assento |
| R24 (Missão esgotada no mapa) | Acessar o mapa de assentos de uma missão que esgotou todos os lugares |
| R25 (Associação 1:1) | Preencher os dados de passageiro com informações válidas |
| R26 (Campos obrigatórios) | Esquema do Cenário de campos obrigatórios de passageiro |
| R27 (Nome 3-120 chars) | Esquema do Cenário de limites de tamanho do nome completo |
| R28 (Passaporte 5-30 chars) | Esquema do Cenário de limites de tamanho do passaporte |
| R29 (Normalização de dados) | Normalizar espaços nas extremidades e caixa alta no passaporte |
| R30 (Mensagens de erro) | Esquemas de limites de nome, passaporte e campos vazios |
| R31 (Persistência e revalidação) | Revalidar campo com erro imediatamente; Preservar dados ao voltar |
| R32 (Desmarcação de assento) | Desmarcar um assento e descartar o passageiro associado (Hipótese) |
| R33 (Simulação acadêmica) | Efetuar pagamento aprovado; Exibir comprovante da reserva |
| R34 (Resultados de pagamento) | Pagamento aprovado; Recusa por dados incorretos; Pagamento negado |
| R35 (Cartões de teste) | Pagamento aprovado com cartão de teste; Recusa por dados incorretos |
| R36 (Campos do cartão) | Esquema do Cenário de restrições de formato nos dados do cartão |
| R37 (Bandeiras reconhecidas) | Esquema do Cenário de bandeiras aceitas |
| R38 (Exibição do total) | Efetuar pagamento aprovado com cartão de teste cadastrado |
| R39 (Criação após aprovação) | Efetuar pagamento aprovado com cartão de teste cadastrado |
| R40 (Bloqueio de reenvio) | Indicar estado de processamento e bloquear duplo envio |
| R41 (Recuperação de falhas) | Recusa por dados incorretos; Pagamento negado; Falha de processamento |
| R42 (Concorrência de assento) | Bloquear reserva em caso de conflito de assento ocupado concorrentemente |
| R43 (Código único 6 chars) | Exibir o comprovante da reserva com dados consolidados |
| R44 (1 ticket por passageiro) | Apresentar as passagens individuais emitidas para cada passageiro |
| R45 (Conteúdo da confirmação) | Exibir o comprovante da reserva; Apresentar passagens individuais |
| R46 (Nova compra) | Iniciar uma nova compra a partir da tela de confirmação |

---

## 5. Perguntas para os Três Amigos

Questões críticas levantadas durante a análise de QA que demandam alinhamento e definição entre Produto, Engenharia e QA antes ou durante o desenvolvimento.

| # | Pergunta ou hipótese | Impacto no comportamento e nos testes | Origem / Relacionado | Quem decide |
|---|---|---|---|---|
| P01 | A nomenclatura de datas ("data de lançamento", "data de partida" e "data de ida") refere-se estritamente ao mesmo campo de data ou há distinções operacionais? | Evita discrepância de exibição e ordenação entre catálogo e confirmação | R07, R09, R11, Alerta RF-02 | Produto e DEV |
| P02 | Quais são os números exatos de cartão de teste configurados no simulador para aprovação, negação e erro? | Necessário para escrita e execução dos testes automatizados e manuais | R34, R35, Alerta 4.2 | DEV |
| P03 | Qual é a regra exata de negócio que faz um pagamento ser "negado" pelo simulador em oposição a "dados incorretos"? | Permite calibrar os cenários de pagamento negado de forma determinística | R34, Alerta 4.2 | Produto e DEV |
| P04 | Como o sistema deve reagir caso o usuário informe um cartão de bandeira não suportada (ex: Elo, Hipercard)? O campo bloqueia ou exibe recusa específica? | Define o comportamento observável para cartões fora do trio Visa/Master/Amex | R37, Alerta 4.2 | Produto |
| P05 | A "falha de processamento" citada em RF-02 deve ser considerada um quarto status oficial de retorno do gateway simulado? | Define se o modelo de estados de pagamento possui 3 ou 4 saídas | R34, R41, Alerta RF-02 | DEV |
| P06 | A validação de limites de caracteres (3-120 para nome e 5-30 para passaporte) é aplicada antes ou depois da remoção de espaços nas extremidades? | Impacta testes de fronteira com espaços (ex: nome com 2 letras e 2 espaços) | R27, R28, R29, Alerta 3.2 | Produto e DEV |
| P07 | Quais caracteres alfanuméricos específicos são excluídos do código de reserva de 6 posições por ambiguidade (ex.: 0, O, 1, I, L)? | Define o gerador de identificadores e o validador de formato do ticket | R43, Alerta 5.2 | DEV |
| P08 | Quando ocorre aprovação do pagamento mas falha de reserva por conflito de assento (concorrência), há emissão de comprovante de estorno simulado? Para onde o usuário é direcionado? | Evita estado órfão na jornada do viajante após cobrança sem reserva criada | R42, Ponto em aberto 4.4 | Produto |
| P09 | É permitido cadastrar o mesmo número de passaporte para mais de um assento na mesma reserva (ex: erro de digitação de acompanhante)? | Define regra de integridade de passageiros | R26, R28, R29 | Produto |
| P10 | Existe controle de validade do cartão em relação ao tempo atual (mês/ano no passado) na validação do formulário? | Define se cartões com data expirada são bloqueados antes da submissão | R36 | Produto e DEV |
| P11 | O e-mail de contato do viajante recebe um disparo real de mensagem ou a menção de "destino dos detalhes" é apenas visual na confirmação? | Delimita se há teste de integração com serviço de e-mail | R45, RF-01 | Produto e DEV |
