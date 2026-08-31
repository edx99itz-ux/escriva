import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");

test("gera as páginas essenciais para descoberta local", () => {
  for (const path of [
    "index.html",
    "exames/index.html",
    "profissional/index.html",
    "atendimento-regional/index.html",
    "contato/index.html"
  ]) {
    assert.equal(existsSync(new URL(`../dist/${path}`, import.meta.url)), true, path);
  }
});

test("a home possui título, canonical e um único H1", () => {
  const html = read("index.html");
  assert.match(html, /<title>Neurofisiologia Clínica em Imperatriz/);
  assert.match(html, /rel="canonical" href="https:\/\/edx99itz\.com\/"/);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
});

test("gera sitemap e robots apontando para o domínio canônico", () => {
  assert.match(read("robots.txt"), /Sitemap: https:\/\/edx99itz\.com\/sitemap\.xml/);
  assert.match(read("sitemap.xml"), /https:\/\/edx99itz\.com\/exames\/eletroneuromiografia\//);
});

test("não publica alegações médicas impróprias", () => {
  const home = read("index.html").toLowerCase();
  assert.doesNotMatch(home, /somos os únicos|o único da região|garantia de resultado|o melhor/);
});

test("expõe manifesto e identidade de aplicação", () => {
  const home = read("index.html");
  assert.match(home, /rel="manifest" href="\/manifest\.webmanifest"/);
  const manifest = JSON.parse(read("manifest.webmanifest"));
  assert.equal(manifest.lang, "pt-BR");
  assert.equal(manifest.start_url, "/");
});

test("todos os links internos apontam para páginas geradas", () => {
  const files = [
    "index.html", "exames/index.html", "profissional/index.html",
    "atendimento-regional/index.html", "contato/index.html"
  ];
  for (const file of files) {
    const html = read(file);
    for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
      if (href.startsWith("/assets/") || href === "/manifest.webmanifest") continue;
      const target = href === "/" ? "index.html" : `${href.replace(/^\//, "")}index.html`;
      assert.equal(existsSync(new URL(`../dist/${target}`, import.meta.url)), true, `${file} -> ${href}`);
    }
  }
});

test("páginas de exame expõem procedimento e breadcrumb em JSON-LD", () => {
  const html = read("exames/eletroneuromiografia/index.html");
  const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1] ?? "{}";
  const data = JSON.parse(json);
  assert.equal(data["@graph"].some((item) => item["@type"] === "MedicalProcedure"), true);
  assert.equal(data["@graph"].some((item) => item["@type"] === "BreadcrumbList"), true);
});
