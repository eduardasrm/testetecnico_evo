/**
 * TESTE REFERENTE A VALIDAÇÃO 03 NO RELATÓRIO.
 * Teste para validar se a página de detalhes abre corretamente para o repositório buscado.
 * 
 * O que o teste faz:
 * 1. Acessa a página inicial da aplicação (https://localhost:44329/).
 * 2. Clica no link para ver outros repositórios e busca pelo termo "react".
 * 3. Captura o nome do primeiro repositório listado na tabela de resultados.
 * 4. Clica no link "Detalhe" do primeiro item.
 * 5. Valida se o cabeçalho "Detalhes do Repositório" está visível.
 * 6. Confirma se o nome do repositório exibido na página de detalhes corresponde exatamente ao nome capturado na busca.
 */

import { test, expect } from '@playwright/test';

test('should open the details page of the searched repository', async ({ page }) => {
  await page.goto('https://localhost:44329/');

  await page.getByRole('link', { name: 'Veja Outros Repositórios' }).click();
  await page.getByRole('textbox').fill('react');
  await page.getByRole('button', { name: 'Buscar' }).click();

  const repositoryName = (await page.locator('table.table td').first().innerText()).trim();
  await page.getByRole('link', { name: 'Detalhe' }).first().click();

  await expect(page.getByRole('heading', { name: 'Detalhes do Repositório' })).toBeVisible();
  await expect(page.locator('table tbody td').first()).toHaveText(repositoryName);
});
