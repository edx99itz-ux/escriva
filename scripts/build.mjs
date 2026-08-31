import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/(.:)/, "$1");
const out = join(root, "dist");
const origin = "https://edx99itz.com";
const basePath = (process.env.PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const exams = [
  {
    slug: "eletroneuromiografia",
    short: "ENMG",
    name: "Eletroneuromiografia",
    summary: "Avalia nervos periféricos e músculos, contribuindo para a investigação de sintomas como dormência, fraqueza, dor e formigamento.",
    indications: "Pode ser solicitada na investigação de neuropatias, compressões nervosas, radiculopatias e alterações musculares.",
    preparation: "Leve o pedido médico e exames anteriores. Evite cremes e óleos na pele no dia do exame. Confirme orientações específicas antes do atendimento."
  },
  {
    slug: "doppler-transcraniano",
    short: "DTC",
    name: "Doppler transcraniano",
    summary: "Exame ultrassonográfico que avalia o fluxo sanguíneo em vasos intracranianos de forma não invasiva.",
    indications: "Pode auxiliar avaliações vasculares neurológicas conforme a indicação do profissional solicitante.",
    preparation: "Tenha em mãos o pedido médico e confirme previamente se existe alguma orientação específica para o seu caso."
  },
  {
    slug: "potenciais-evocados",
    short: "PE",
    name: "Potenciais evocados",
    summary: "Registra respostas elétricas do sistema nervoso a estímulos específicos para avaliar a condução das vias neurológicas.",
    indications: "O tipo de potencial evocado depende da via que o médico solicitante precisa investigar.",
    preparation: "Confirme qual modalidade foi solicitada e as orientações de preparo correspondentes antes do deslocamento."
  },
  {
    slug: "eletroencefalograma",
    short: "EEG",
    name: "Eletroencefalograma",
    summary: "Registra a atividade elétrica cerebral por meio de eletrodos posicionados no couro cabeludo.",
    indications: "É utilizado em diferentes contextos neurológicos, sempre conforme avaliação e solicitação médica.",
    preparation: "Compareça com os cabelos limpos e secos, sem cremes ou óleos, e confirme previamente orientações sobre sono e medicamentos."
  }
];

const routes = ["/", "/exames/", ...exams.map((exam) => `/exames/${exam.slug}/`), "/profissional/", "/atendimento-regional/", "/contato/"];

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const url = (path) => `${origin}${path}`;
const nav = `
  <a class="brand" href="/"><span>EDX</span><strong>99 ITZ</strong></a>
  <nav aria-label="Principal">
    <a href="/exames/">Exames</a><a href="/profissional/">Profissional</a><a href="/atendimento-regional/">Atendimento regional</a><a href="/contato/">Contato</a>
  </nav>`;

const schema = (extra = {}) => JSON.stringify({
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "EDX99 ITZ — Neurofisiologia Clínica",
  url: origin,
  areaServed: ["Imperatriz", "Região Tocantina", "Maranhão", "Tocantins", "Pará"],
  medicalSpecialty: "Neurofisiologia Clínica",
  ...extra
});

function layout({ title, description, path, body, jsonLd = schema() }) {
  const canonical = url(path);
  const html = `<!doctype html>
<html lang="pt-BR"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}"><meta name="theme-color" content="#0b3142">
  <meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${origin}/og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${origin}/og.png"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="manifest" href="/manifest.webmanifest"><link rel="stylesheet" href="/assets/site.css">
  <script type="application/ld+json">${jsonLd}</script>
</head><body><header>${nav}</header>${body}<footer><div><strong>EDX99 ITZ</strong><p>Informação clara sobre exames de neurofisiologia clínica em Imperatriz e região.</p></div><div><p>Conteúdo informativo. Não substitui consulta ou orientação médica.</p><a href="/contato/">Informações de atendimento</a></div></footer></body></html>`;
  return basePath ? html.replaceAll('href="/', `href="${basePath}/`) : html;
}

const cards = exams.map((exam) => `<article class="card"><span class="eyebrow">${exam.short}</span><h3>${exam.name}</h3><p>${exam.summary}</p><a class="text-link" href="/exames/${exam.slug}/">Entenda o exame <span aria-hidden="true">→</span></a></article>`).join("");

const pages = new Map();
pages.set("/", layout({
  title: "Neurofisiologia Clínica em Imperatriz | EDX99 ITZ",
  description: "Informações sobre exames neurofisiológicos em Imperatriz-MA e atendimento a pacientes da região Tocantina, Maranhão, Tocantins e Pará.",
  path: "/",
  body: `<main><section class="hero"><div><p class="eyebrow">Imperatriz · Maranhão</p><h1>Neurofisiologia clínica com informação precisa e acesso regional</h1><p class="lead">Conheça os exames neurofisiológicos, orientações de preparo e como organizar seu atendimento em Imperatriz.</p><div class="actions"><a class="button" href="/exames/">Conhecer os exames</a><a class="button secondary" href="/atendimento-regional/">Venho de outra cidade</a></div></div><aside class="hero-note"><span>Centro regional</span><strong>Imperatriz conecta pacientes do MA, TO e PA</strong><p>Planeje seu deslocamento e confirme previamente a disponibilidade do exame solicitado.</p></aside></section><section class="section"><div class="section-head"><p class="eyebrow">Exames</p><h2>Informação para chegar mais preparado</h2><p>Conteúdo educativo sobre indicações gerais, realização e preparo. A disponibilidade deve ser confirmada no agendamento.</p></div><div class="grid">${cards}</div></section><section class="band"><div><p class="eyebrow">Atendimento regional</p><h2>Uma referência de acesso em Imperatriz</h2></div><p>Orientações para quem se desloca da região Tocantina, do sul do Maranhão, norte do Tocantins e sudeste do Pará — sem páginas artificiais por cidade.</p><a class="button light" href="/atendimento-regional/">Planejar atendimento</a></section></main>`
}));

pages.set("/exames/", layout({ title: "Exames de Neurofisiologia em Imperatriz | EDX99 ITZ", description: "Conheça exames neurofisiológicos, indicações gerais e orientações de preparo em Imperatriz-MA.", path: "/exames/", body: `<main><section class="page-intro"><p class="eyebrow">Exames neurofisiológicos</p><h1>Entenda o exame antes do atendimento</h1><p class="lead">Selecione o exame solicitado para conhecer sua finalidade geral e orientações iniciais. Confirme a disponibilidade ao agendar.</p></section><section class="section"><div class="grid">${cards}</div></section></main>` }));

for (const exam of exams) {
  pages.set(`/exames/${exam.slug}/`, layout({
    title: `${exam.name} em Imperatriz | EDX99 ITZ`,
    description: `${exam.summary} Saiba como funciona e veja orientações de preparo em Imperatriz-MA.`,
    path: `/exames/${exam.slug}/`,
    jsonLd: JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "MedicalProcedure", name: exam.name, description: exam.summary, url: url(`/exames/${exam.slug}/`) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: url("/") },
        { "@type": "ListItem", position: 2, name: "Exames", item: url("/exames/") },
        { "@type": "ListItem", position: 3, name: exam.name, item: url(`/exames/${exam.slug}/`) }
      ] }
    ] }),
    body: `<main><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Início</a><span>›</span><a href="/exames/">Exames</a><span>›</span><span>${exam.name}</span></nav><section class="page-intro exam"><p class="eyebrow">${exam.short} · Imperatriz-MA</p><h1>${exam.name}</h1><p class="lead">${exam.summary}</p></section><section class="article"><div><h2>Quando pode ser solicitado?</h2><p>${exam.indications}</p><h2>Como se preparar</h2><p>${exam.preparation}</p><h2>O que levar</h2><ul><li>Pedido médico</li><li>Documento de identificação</li><li>Exames e laudos anteriores relacionados</li></ul></div><aside class="info-box"><h2>Antes de se deslocar</h2><p>Confirme a modalidade exata, a disponibilidade, o preparo e os documentos necessários.</p><a class="button" href="/contato/">Ver informações de contato</a></aside></section></main>`
  }));
}

pages.set("/profissional/", layout({ title: "Neurofisiologia Clínica em Imperatriz | Perfil Profissional", description: "Conheça a atuação profissional em neurofisiologia clínica e exames neurofisiológicos em Imperatriz-MA.", path: "/profissional/", body: `<main><section class="page-intro"><p class="eyebrow">Perfil profissional</p><h1>Experiência clínica apresentada com transparência</h1><p class="lead">Esta página receberá formação, registros profissionais e vínculos após conferência final pelo responsável, evitando publicar credenciais incompletas.</p></section><section class="article"><div><h2>Área de atuação</h2><p>Neurofisiologia clínica e realização de exames complementares do sistema nervoso, conforme indicação médica.</p><h2>Compromisso editorial</h2><p>As informações deste site são educativas e não prometem diagnóstico, resultado ou superioridade profissional.</p></div><aside class="info-box"><h2>Dados em revisão</h2><p>CRM, RQE, formação, sociedades médicas e fotografia serão apresentados após validação documental.</p></aside></section></main>` }));

pages.set("/atendimento-regional/", layout({ title: "Atendimento Regional em Imperatriz para MA, TO e PA", description: "Orientações para pacientes que viajam a Imperatriz para exames neurofisiológicos a partir do Maranhão, Tocantins e Pará.", path: "/atendimento-regional/", body: `<main><section class="page-intro"><p class="eyebrow">Imperatriz como polo regional</p><h1>Atendimento para quem vem de outras cidades</h1><p class="lead">Imperatriz recebe pacientes da região Tocantina e de áreas próximas do Maranhão, Tocantins e Pará. Planeje o deslocamento somente após confirmar o exame e o horário.</p></section><section class="section"><div class="grid three"><article class="card"><span class="state">MA</span><h2>Maranhão</h2><p>Atendimento a pacientes de Imperatriz, Região Tocantina e municípios do sul do estado.</p></article><article class="card"><span class="state">TO</span><h2>Tocantins</h2><p>Orientações para pacientes do norte do Tocantins que utilizam Imperatriz como polo de serviços.</p></article><article class="card"><span class="state">PA</span><h2>Pará</h2><p>Informações para pacientes do sudeste paraense e áreas próximas ao eixo de Imperatriz.</p></article></div></section><section class="band"><div><p class="eyebrow">Antes da viagem</p><h2>Confirme pedido, preparo e disponibilidade</h2></div><p>Evite deslocamentos desnecessários. Verifique antecipadamente a modalidade do exame, documentos e orientações específicas.</p><a class="button light" href="/contato/">Ver contato</a></section></main>` }));

pages.set("/contato/", layout({ title: "Contato e Atendimento | Neurofisiologia em Imperatriz", description: "Informações para confirmar exames neurofisiológicos, preparo e atendimento em Imperatriz-MA.", path: "/contato/", body: `<main><section class="page-intro"><p class="eyebrow">Contato</p><h1>Confirme as informações antes do atendimento</h1><p class="lead">Os canais oficiais, endereço e horários estão em validação para evitar informação divergente. Esta página será atualizada antes da publicação definitiva.</p></section><section class="article"><div><h2>Tenha em mãos</h2><ul><li>Nome exato do exame no pedido médico</li><li>Cidade de origem</li><li>Datas possíveis para o atendimento</li><li>Dúvidas sobre preparo e documentos</li></ul></div><aside class="info-box"><h2>Dados pendentes de confirmação</h2><p>Telefone, WhatsApp, endereço completo e horários serão inseridos após conferência pelo responsável.</p></aside></section></main>` }));

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const [route, html] of pages) {
  const file = route === "/" ? join(out, "index.html") : join(out, route, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}
cpSync(join(root, "src", "assets"), join(out, "assets"), { recursive: true });
cpSync(join(root, "src", "favicon.svg"), join(out, "favicon.svg"));
cpSync(join(root, "src", "og.png"), join(out, "og.png"));
writeFileSync(join(out, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
writeFileSync(join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${url(route)}</loc></url>`).join("")}</urlset>`);
writeFileSync(join(out, "manifest.webmanifest"), JSON.stringify({ name: "EDX99 ITZ — Neurofisiologia Clínica", short_name: "EDX99 ITZ", lang: "pt-BR", start_url: `${basePath}/`, display: "standalone", background_color: "#ffffff", theme_color: "#0b3142" }));
writeFileSync(join(out, "404.html"), layout({ title: "Página não encontrada | EDX99 ITZ", description: "A página solicitada não foi encontrada.", path: "/404", body: `<main><section class="page-intro"><p class="eyebrow">Erro 404</p><h1>Página não encontrada</h1><p class="lead">Use a navegação para encontrar exames e informações de atendimento.</p><a class="button" href="/">Voltar ao início</a></section></main>` }));

console.log(`Built ${pages.size} pages in ${out}`);

