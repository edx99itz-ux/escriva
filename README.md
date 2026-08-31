# Escriva — EDX99 ITZ

Site estático de neurofisiologia clínica em Imperatriz-MA, preparado para SEO local e regional.

## Desenvolvimento

Requer Node.js 20 ou superior.

```sh
npm run build
npm test
```

O build gera a versão publicável em `dist/`.

## Conteúdo

Antes de publicar no domínio principal, revise `docs/CONTENT-CHECKLIST.md`. Dados profissionais, exames, endereço, telefone e horários só devem ser apresentados depois de confirmados pelo responsável.

## Publicação

O workflow em `.github/workflows/pages.yml` gera o site e publica o conteúdo de `dist/` no GitHub Pages quando Pages estiver configurado para GitHub Actions.
