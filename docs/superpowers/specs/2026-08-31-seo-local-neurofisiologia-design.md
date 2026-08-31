# Site regional de neurofisiologia — especificação de design

## Objetivo

Criar um site rápido, responsivo e clinicamente responsável para a atuação em neurofisiologia clínica em Imperatriz-MA, aumentando a descoberta orgânica de exames de alta intenção por pacientes e profissionais de saúde em um raio aproximado de 100 milhas, incluindo áreas próximas do Maranhão, Tocantins e Pará.

O site não prometerá primeiro lugar no Google, não afirmará exclusividade sem comprovação e não substituirá avaliação médica. Seu papel será tornar serviços, profissional, localização, preparo e formas de contato claros para pessoas e mecanismos de busca.

## Arquitetura recomendada

O projeto será construído em Next.js com TypeScript, geração estática sempre que possível e conteúdo organizado em estruturas reutilizáveis. Essa abordagem oferece HTML rastreável, metadados por página, sitemap e robots gerados pelo framework, bom desempenho em dispositivos móveis e expansão simples de páginas sem duplicação.

O repositório privado será `edx99itz-ux/escriva`. A ramificação principal será `main`. O domínio canônico planejado será `https://edx99itz.com`, condicionado à confirmação de que essa será a versão pública definitiva.

## Estrutura de informação

A navegação principal terá cinco áreas:

1. Início: proposta clínica, exames prioritários, diferenciais verificáveis, localização e contato.
2. Exames: índice e páginas individuais para cada exame efetivamente oferecido.
3. Profissional: formação, CRM, RQE, experiência e vínculos que possam ser comprovados.
4. Atendimento regional: orientação prática para pacientes de cidades próximas, sem criar páginas duplicadas por município.
5. Contato: endereço, telefone, WhatsApp, horários, rota e instruções de agendamento confirmados.

As páginas iniciais de exames serão criadas somente para serviços confirmados. A lista candidata é eletroneuromiografia, Doppler transcraniano, potenciais evocados e eletroencefalograma. Exames não confirmados permanecerão fora da publicação.

Cada página de exame explicará em linguagem simples: o que é, quando costuma ser solicitado, como é realizado, preparo, duração aproximada quando confirmada, limitações, perguntas frequentes e chamada para contato. A redação evitará diagnóstico individual, garantia de resultado, comparação depreciativa e alegação de ser o único profissional da região.

## Estratégia regional sem doorway pages

Haverá uma única página editorial de atendimento regional descrevendo Imperatriz como polo de acesso e explicando deslocamento e atendimento a pacientes provenientes de localidades próximas nos três estados. Cidades só serão mencionadas quando houver informação útil e verdadeira, como rota, tempo aproximado de viagem ou fluxo de atendimento confirmado.

Não serão geradas páginas quase idênticas do tipo “exame em cidade X”. A captação regional ocorrerá por conteúdo útil, contexto geográfico consistente, links internos e sinais locais externos.

## SEO técnico

Cada rota terá título e descrição exclusivos, URL curta, canonical absoluto, um único H1 e hierarquia correta de headings. O projeto incluirá sitemap XML, robots.txt, Open Graph, Twitter cards, favicon, manifest, página 404 útil e navegação por breadcrumbs onde aplicável.

Os dados estruturados em JSON-LD usarão tipos compatíveis e conservadores, como `MedicalBusiness` ou `Physician`, `Person`, `MedicalProcedure`, `BreadcrumbList` e `FAQPage` somente quando o conteúdo correspondente estiver visível. Endereço, telefone, coordenadas, CRM, RQE, horários e perfis externos só entrarão após validação.

Todas as páginas serão incluídas em uma malha de links internos: início para exames, índice para páginas individuais, páginas de exames para profissional, atendimento regional e contato, além de exames relacionados quando clinicamente apropriado.

## Desempenho, acessibilidade e mobile

O site priorizará HTML estático, CSS enxuto, fontes locais ou de sistema, imagens responsivas em formatos modernos e JavaScript mínimo. O objetivo de qualidade será atingir, em ambiente de produção e em páginas representativas, Core Web Vitals satisfatórios e auditorias Lighthouse altas, sem transformar uma pontuação isolada em promessa.

A interface terá contraste adequado, foco visível, navegação por teclado, áreas de toque confortáveis, texto legível e respeito a preferências de redução de movimento. O botão de contato não cobrirá conteúdo em telas pequenas.

## Conteúdo e ética médica

Informações médicas serão educativas, neutras e revisáveis pelo responsável. O rodapé exibirá identificação profissional e aviso de que o conteúdo não substitui consulta. Depoimentos, antes/depois, superlativos, garantias e alegações de exclusividade não serão usados.

Dados provisórios não serão publicados como fatos. Antes da publicação final, o responsável deverá confirmar nome profissional, CRM/UF, RQE, especialidade, lista de exames, endereço completo, telefones, WhatsApp, horários, convênios, formas de atendimento, fotografia autorizada e política de privacidade.

## Componentes e fluxo de dados

Os dados institucionais e dos exames ficarão em módulos tipados, separados dos componentes visuais. Páginas consumirão esses dados para renderizar conteúdo, metadados, links e JSON-LD de modo consistente. Campos obrigatórios ausentes impedirão que a informação incompleta apareça nos dados estruturados.

Componentes compartilhados incluirão cabeçalho, rodapé, cartões de exames, breadcrumbs, bloco de contato, perguntas frequentes e script de dados estruturados. Isso permitirá atualizar telefone, endereço e credenciais em um único lugar.

## Tratamento de erros e segurança

Links de contato terão formatos válidos e rótulos claros. Formulários próprios não serão incluídos na primeira versão para evitar coleta desnecessária de dados de saúde; o contato será encaminhado aos canais já utilizados pela clínica. Nenhum segredo, token ou credencial será salvo no repositório.

Rotas inexistentes apresentarão uma página 404 com retorno à navegação. Falhas de imagem terão dimensões reservadas e texto alternativo adequado. Links externos usarão atributos de segurança quando abrirem nova aba.

## Validação

A implementação terá testes para geração de metadados, canonicals, sitemap, robots, JSON-LD e integridade dos links internos. Também serão executados build de produção, verificação de TypeScript, lint, teste responsivo e auditorias de acessibilidade e desempenho em páginas representativas.

Antes da publicação, o conteúdo médico e os dados profissionais passarão por revisão humana do responsável. Após a publicação, serão validados HTTPS, redirecionamentos, domínio canônico, indexabilidade, sitemap e dados estruturados.

## Dependências externas

O código poderá ser concluído e versionado sem credenciais externas. As seguintes etapas dependerão de acesso ou ação do responsável:

- Configurar DNS e conectar `edx99itz.com` à hospedagem.
- Verificar a propriedade no Google Search Console e enviar o sitemap.
- Reivindicar ou atualizar o Google Business Profile.
- Manter nome, endereço e telefone consistentes em perfis e diretórios relevantes.
- Solicitar avaliações legítimas sem incentivo e sem condicionamento.
- Confirmar dados médicos, profissionais e operacionais antes da publicação.

## Critérios de aceite

O projeto será aceito quando houver build de produção válido; páginas únicas para os exames confirmados; perfil profissional, atendimento regional e contato; metadados e canonicals corretos; sitemap e robots acessíveis; JSON-LD coerente com conteúdo visível; navegação interna completa; experiência móvel funcional; ausência de alegações médicas não comprovadas; e documentação clara das ações externas pendentes.
