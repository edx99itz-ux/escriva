# Site e SEO Local de Neurofisiologia — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir e validar um site rápido, rastreável e eticamente responsável para neurofisiologia clínica em Imperatriz-MA, com descoberta regional em MA, TO e PA.

**Architecture:** Aplicação Next.js com App Router e TypeScript, conteúdo institucional e de exames em módulos tipados e páginas estáticas. Metadados, sitemap, robots e JSON-LD serão derivados da mesma fonte de dados para manter consistência e impedir publicação de campos incompletos.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules/global CSS, Vitest, Testing Library, ESLint e Lighthouse.

## Global Constraints

- Domínio canônico planejado: `https://edx99itz.com`.
- Repositório remoto: `edx99itz-ux/escriva`, privado durante o desenvolvimento.
- Não publicar alegações de exclusividade, superioridade, garantia ou primeiro lugar.
- Não publicar exame, credencial, contato, endereço ou horário sem confirmação.
- Não criar páginas duplicadas por município.
- Não coletar dados clínicos na primeira versão.
- Priorizar HTML estático, acessibilidade, desempenho móvel e JavaScript mínimo.

---

## Estrutura de arquivos

- `src/app/`: rotas, layouts, metadata, sitemap, robots e páginas de erro.
- `src/components/`: navegação, cards, breadcrumbs, contato, FAQ e JSON-LD.
- `src/content/`: dados tipados do profissional, clínica, exames e região.
- `src/lib/`: geração de URL, metadata e schemas.
- `src/__tests__/`: testes de conteúdo, SEO e navegação.
- `public/`: ícones e imagens autorizadas.
- `docs/`: decisões, checklist de publicação e pendências externas.

### Task 1: Base Next.js e testes

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Test: `src/__tests__/smoke.test.tsx`

**Interfaces:**
- Produces: aplicação Next.js executável e comando `npm test`.

- [ ] **Step 1: Escrever o teste inicial**

```tsx
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

it('apresenta o serviço e a localização principal', () => {
  render(<HomePage />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Neurofisiologia Clínica/i);
  expect(screen.getByText(/Imperatriz/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Executar o teste e verificar a falha**

Run: `npm test -- --run src/__tests__/smoke.test.tsx`
Expected: FAIL porque a página ainda não existe.

- [ ] **Step 3: Criar a aplicação mínima**

```tsx
export default function HomePage() {
  return <main><h1>Neurofisiologia Clínica em Imperatriz</h1></main>;
}
```

- [ ] **Step 4: Instalar dependências e validar**

Run: `npm install && npm test -- --run src/__tests__/smoke.test.tsx && npm run build`
Expected: teste e build concluídos sem erro.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json next.config.ts tsconfig.json vitest.config.ts src
git commit -m "feat: scaffold SEO-ready Next.js site"
```

### Task 2: Modelo de conteúdo validável

**Files:**
- Create: `src/content/site.ts`
- Create: `src/content/exams.ts`
- Create: `src/content/region.ts`
- Test: `src/__tests__/content.test.ts`

**Interfaces:**
- Produces: `site`, `exams`, `regionalAreas` e tipos `SiteProfile`, `Exam`, `RegionalArea`.

- [ ] **Step 1: Escrever testes contra alegações e campos vazios**

```ts
import { exams } from '@/content/exams';

it('não contém alegações de exclusividade', () => {
  const copy = JSON.stringify(exams).toLowerCase();
  expect(copy).not.toMatch(/único|exclusivo|melhor da região|garantia/);
});

it('usa slugs únicos', () => {
  expect(new Set(exams.map((exam) => exam.slug)).size).toBe(exams.length);
});
```

- [ ] **Step 2: Executar e verificar a falha**

Run: `npm test -- --run src/__tests__/content.test.ts`
Expected: FAIL porque os módulos de conteúdo não existem.

- [ ] **Step 3: Criar dados tipados e estado de publicação**

```ts
export type Exam = {
  slug: string;
  name: string;
  summary: string;
  preparation: string[];
  faq: { question: string; answer: string }[];
  confirmed: boolean;
};

export const exams: Exam[] = [];
```

Os exames candidatos ficarão marcados como não confirmados até validação do responsável e não gerarão rotas públicas.

- [ ] **Step 4: Validar**

Run: `npm test -- --run src/__tests__/content.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content src/__tests__/content.test.ts
git commit -m "feat: add validated clinical content model"
```

### Task 3: Sistema visual e layout responsivo

**Files:**
- Create: `src/app/globals.css`
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/SiteFooter.tsx`
- Create: `src/components/ContactBar.tsx`
- Modify: `src/app/layout.tsx`
- Test: `src/__tests__/layout.test.tsx`

**Interfaces:**
- Consumes: `site` de `src/content/site.ts`.
- Produces: layout semântico compartilhado e navegação móvel.

- [ ] **Step 1: Testar landmarks e navegação**

```tsx
render(<RootLayout><div>Conteúdo</div></RootLayout>);
expect(screen.getByRole('banner')).toBeInTheDocument();
expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument();
expect(screen.getByRole('contentinfo')).toBeInTheDocument();
```

- [ ] **Step 2: Executar e verificar a falha**

Run: `npm test -- --run src/__tests__/layout.test.tsx`
Expected: FAIL até os componentes existirem.

- [ ] **Step 3: Implementar layout**

Criar cabeçalho, rodapé e barra de contato com HTML semântico, foco visível, contraste AA e breakpoints móveis. Usar tokens CSS para cores, espaçamento, tipografia e largura de conteúdo.

- [ ] **Step 4: Validar**

Run: `npm test -- --run src/__tests__/layout.test.tsx && npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app src/components src/__tests__/layout.test.tsx
git commit -m "feat: add accessible responsive layout"
```

### Task 4: Home, perfil, região e contato

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/profissional/page.tsx`
- Create: `src/app/atendimento-regional/page.tsx`
- Create: `src/app/contato/page.tsx`
- Create: `src/components/ExamCard.tsx`
- Create: `src/components/Breadcrumbs.tsx`
- Test: `src/__tests__/core-pages.test.tsx`

**Interfaces:**
- Consumes: `site`, `exams`, `regionalAreas`.
- Produces: quatro rotas institucionais com links internos.

- [ ] **Step 1: Testar headings, links e linguagem regional**

```tsx
render(<RegionalPage />);
expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/atendimento regional/i);
expect(screen.getByText(/Maranhão/i)).toBeInTheDocument();
expect(screen.getByText(/Tocantins/i)).toBeInTheDocument();
expect(screen.getByText(/Pará/i)).toBeInTheDocument();
```

- [ ] **Step 2: Executar e verificar a falha**

Run: `npm test -- --run src/__tests__/core-pages.test.tsx`
Expected: FAIL porque as rotas ainda não existem.

- [ ] **Step 3: Implementar páginas**

Criar conteúdo útil e não duplicado, CTA de contato sem coleta clínica e placeholders visuais neutros para dados ainda não confirmados. Dados provisórios não devem ser renderizados.

- [ ] **Step 4: Validar**

Run: `npm test -- --run src/__tests__/core-pages.test.tsx && npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app src/components src/__tests__/core-pages.test.tsx
git commit -m "feat: add core local discovery pages"
```

### Task 5: Índice e páginas de exames

**Files:**
- Create: `src/app/exames/page.tsx`
- Create: `src/app/exames/[slug]/page.tsx`
- Create: `src/components/ExamFaq.tsx`
- Test: `src/__tests__/exam-pages.test.tsx`

**Interfaces:**
- Consumes: `exams.filter((exam) => exam.confirmed)`.
- Produces: `generateStaticParams()` e `generateMetadata()` para exames confirmados.

- [ ] **Step 1: Testar geração apenas de exames confirmados**

```ts
const params = generateStaticParams();
expect(params).toEqual(exams.filter((exam) => exam.confirmed).map(({ slug }) => ({ slug })));
```

- [ ] **Step 2: Executar e verificar a falha**

Run: `npm test -- --run src/__tests__/exam-pages.test.tsx`
Expected: FAIL até a rota dinâmica existir.

- [ ] **Step 3: Implementar índice e template**

Cada página terá um H1, descrição, indicações gerais, realização, preparo, FAQ, links relacionados e contato. Slug inválido chamará `notFound()`.

- [ ] **Step 4: Validar**

Run: `npm test -- --run src/__tests__/exam-pages.test.tsx && npm run build`
Expected: PASS e nenhuma rota para exame não confirmado.

- [ ] **Step 5: Commit**

```bash
git add src/app/exames src/components/ExamFaq.tsx src/__tests__/exam-pages.test.tsx
git commit -m "feat: add high-intent exam pages"
```

### Task 6: SEO técnico e dados estruturados

**Files:**
- Create: `src/lib/seo.ts`
- Create: `src/lib/schema.ts`
- Create: `src/components/JsonLd.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/not-found.tsx`
- Create: `src/app/manifest.ts`
- Test: `src/__tests__/seo.test.ts`

**Interfaces:**
- Produces: `absoluteUrl(path)`, `buildMetadata(input)`, `buildBusinessSchema()` e `buildExamSchema(exam)`.

- [ ] **Step 1: Testar canonical, sitemap, robots e schemas**

```ts
expect(absoluteUrl('/exames')).toBe('https://edx99itz.com/exames');
expect((await robots()).sitemap).toBe('https://edx99itz.com/sitemap.xml');
expect((await sitemap()).every((entry) => entry.url.startsWith('https://edx99itz.com'))).toBe(true);
expect(buildBusinessSchema()).not.toHaveProperty('telephone', '');
```

- [ ] **Step 2: Executar e verificar a falha**

Run: `npm test -- --run src/__tests__/seo.test.ts`
Expected: FAIL até os geradores existirem.

- [ ] **Step 3: Implementar SEO técnico**

Gerar metadados exclusivos, canonicals, Open Graph, sitemap, robots, manifest, breadcrumbs e JSON-LD somente com campos confirmados e visíveis.

- [ ] **Step 4: Validar**

Run: `npm test -- --run src/__tests__/seo.test.ts && npm run build`
Expected: PASS e build sem avisos de metadata.

- [ ] **Step 5: Commit**

```bash
git add src/lib src/components/JsonLd.tsx src/app src/__tests__/seo.test.ts
git commit -m "feat: implement technical SEO and structured data"
```

### Task 7: Qualidade, documentação e preparação para publicação

**Files:**
- Create: `README.md`
- Create: `docs/PUBLISHING.md`
- Create: `docs/CONTENT-CHECKLIST.md`
- Modify: `package.json`

**Interfaces:**
- Produces: comandos `lint`, `test`, `build` e checklist de publicação.

- [ ] **Step 1: Executar a suíte completa**

Run: `npm run lint && npm test -- --run && npm run build`
Expected: todos os comandos concluídos sem erro.

- [ ] **Step 2: Testar responsividade e acessibilidade**

Run: `npm run dev`
Expected: home, página de exame e contato funcionam em 360 px, 768 px e desktop; teclado percorre todos os elementos interativos.

- [ ] **Step 3: Documentar dados pendentes**

O checklist deve listar nome profissional, CRM/UF, RQE, exames confirmados, endereço, telefone, WhatsApp, horários, fotografia autorizada, convênios, DNS, Search Console e Google Business Profile.

- [ ] **Step 4: Commit**

```bash
git add README.md docs package.json
git commit -m "docs: add publishing and content checklists"
```

- [ ] **Step 5: Enviar a ramificação principal**

Run: `git push -u origin main`
Expected: `main` publicada em `edx99itz-ux/escriva`.

### Task 8: Hospedagem e verificação pós-publicação

**Files:**
- Modify: configuração de hospedagem selecionada.
- Modify: `docs/PUBLISHING.md`

**Interfaces:**
- Consumes: build validado e credenciais de domínio fornecidas pelo responsável.
- Produces: URL HTTPS pública e checklist pós-publicação.

- [ ] **Step 1: Publicar uma versão de pré-visualização**

Conectar o repositório à hospedagem escolhida sem alterar DNS do domínio principal.

- [ ] **Step 2: Validar a pré-visualização**

Verificar status HTTP, navegação, mobile, sitemap, robots, canonical, JSON-LD e ausência de conteúdo provisório.

- [ ] **Step 3: Obter aprovação de conteúdo**

O responsável revisará credenciais, exames, contatos, endereço, horários e textos médicos antes da produção.

- [ ] **Step 4: Conectar domínio e validar produção**

Configurar DNS com autorização, confirmar HTTPS e redirecionamento para o hostname canônico.

- [ ] **Step 5: Configurar descoberta externa**

Verificar Search Console, enviar `https://edx99itz.com/sitemap.xml` e atualizar o Google Business Profile com URL, serviços e informações consistentes.

