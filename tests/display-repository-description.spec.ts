/**
 * TESTE REFERENTE AO BUG03 NO RELATÓRIO.
 * Teste para validar a exibição da descrição do repositório.
 *
 * O que o teste faz:
 * 1. Acessa a página inicial da aplicação (https://localhost:44329/).
 * 2. Clica no link "Detalhe" referente ao primeiro repositório disponível.
 * 3. Valida se o cabeçalho da página de detalhes ("Detalhe") está visível.
 * 4. Captura o texto correspondente à descrição do repositório na tabela de detalhes.
 * 5. Verifica se a descrição capturada não está vazia (garantindo que o campo foi preenchido e exibido corretamente).
 */

import { test, expect } from '@playwright/test';
import { gotoHome, openFirstRepositoryDetails } from './helpers';

test('should display repository description on details page', async ({ page }) => {
  await gotoHome(page);

  await openFirstRepositoryDetails(page);
  await expect(page.getByRole('heading', { name: 'Detalhe' })).toBeVisible();

  const description = (await page.locator('table td').nth(1).innerText()).trim();

  expect(description, 'repository description is not displayed on the details page').not.toBe('');
});
