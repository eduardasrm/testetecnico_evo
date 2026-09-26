# Testes E2E — Repositórios GitHub

Suíte de testes end-to-end com [Playwright](https://playwright.dev/) para a aplicação de consulta de repositórios do GitHub em `https://localhost:44329`.

Os testes cobrem busca, abertura de detalhes, exibição da descrição e o fluxo de favoritar e desfavoritar.

## Pré-requisitos

- Node.js 18 ou superior
- A aplicação rodando em `https://localhost:44329` (certificado HTTPS local é ignorado pelos testes)

## Instalação

```bash
npm install
npx playwright install
```

## Executar os testes

```bash
npm test
```

Interface do Playwright:

```bash
npm run test:ui
```

Para um arquivo específico:

```bash
npx playwright test tests/repository-search.spec.ts
```

## Cenários

| Arquivo | O que valida |
| --- | --- |
| `search-empty-field.spec.ts` | Aviso ao buscar com o campo de nome vazio |
| `repository-search.spec.ts` | Busca por nome (`react`) retorna resultados na tabela |
| `open-repository-details.spec.ts` | Clique no nome do repositório abre `/Home/Details/{id}` |
| `display-repository-description.spec.ts` | A página de detalhes exibe a descrição preenchida |
| `search-opens-correct-details.spec.ts` | O detalhe aberto corresponde ao repositório buscado |
| `favorite-and-unfavorite.spec.ts` | Favoritar um repositório, conferir em Favoritos e remover |

## Favoritos

O teste de favoritar depende do estado persistido pela aplicação. Se o repositório já estiver na lista, a tela mostra "Esse repositório ja existe" e o teste segue para a remoção. Para uma execução limpa do favoritar, esvazie o arquivo de favoritos da aplicação (`Teste QA\TesteW12Github\RepositorioGitHub.App`) antes de rodar.
