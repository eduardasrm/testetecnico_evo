import { expect, type Page } from '@playwright/test';

/** Usa baseURL do playwright.config.ts */
export async function gotoHome(page: Page): Promise<void> {
  await page.goto('/');
}

export async function openRepositoryListing(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'Veja Outros Repositórios' }).click();
}

export async function searchRepositories(page: Page, term: string): Promise<void> {
  await page.getByRole('textbox').fill(term);
  await page.getByRole('button', { name: 'Buscar' }).click();
}

export async function submitEmptySearch(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Buscar' }).click();
}

export async function getFirstRepositoryNameFromTable(page: Page): Promise<string> {
  return (await page.locator('table.table td').first().innerText()).trim();
}

export async function openFirstRepositoryDetails(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'Detalhe' }).first().click();
}

export async function expectDetailsPageHeading(page: Page): Promise<void> {
  await expect(page.getByRole('heading', { name: 'Detalhes do Repositório' })).toBeVisible();
}

export function isRepositoryDetailsUrl(url: string): boolean {
  return /\/Home\/Details\/\d+/.test(url);
}

export async function clickFavoriteButtonInDom(page: Page): Promise<void> {
  await page.evaluate(() => {
    const button = document.querySelector<HTMLElement>('.btn-favorito');
    if (!button) throw new Error('favorite button not found');
    button.click();
  });
}

/** Aceita favorito novo ou repositório já salvo (estado persistente). */
export async function expectFavoriteActionAcknowledged(page: Page): Promise<void> {
  const alreadyFavorited = page.getByText('Esse repositório ja existe');
  const favoritedNow = page.getByText('Ok', { exact: true });
  await expect(alreadyFavorited.or(favoritedNow)).toBeVisible();
}

export async function gotoFavorites(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'Favoritos' }).click();
}

/** Listagem → busca → detalhe do primeiro resultado; retorna o nome capturado na tabela. */
export async function searchAndOpenFirstDetails(page: Page, term: string): Promise<string> {
  await openRepositoryListing(page);
  await searchRepositories(page, term);
  const name = await getFirstRepositoryNameFromTable(page);
  await openFirstRepositoryDetails(page);
  return name;
}
