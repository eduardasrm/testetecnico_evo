/**
 * * TESTE REFERENTE AO BUG01 NO RELATÓRIO.
 * Teste para validar se a página de detalhes é aberta ao clicar no nome do repositório.
 *
 * O que o teste faz:
 * 1. Acessa a página inicial da aplicação (https://localhost:44329/).
 * 2. Localiza a primeira célula da tabela que contém o nome do repositório e garante que está visível.
 * 3. Clica no nome do repositório.
 * 4. Captura a URL da página após o clique.
 * 5. Usa uma expressão regular (`/\/Home\/Details\/\d+/.test`) para confirmar se a URL alterou para a rota padrão de detalhes com ID numérico.
 * 6. Valida o resultado com uma mensagem descritiva caso a página de detalhes não seja aberta corretamente.
 */

import { test, expect } from '@playwright/test';
import { gotoHome, isRepositoryDetailsUrl } from './helpers';

test('should open details page when clicking on repository name', async ({ page }) => {
  await gotoHome(page);

  const repositoryName = page.locator('table.table tr td').first();
  await expect(repositoryName).toBeVisible();

  await repositoryName.click();

  const urlafterClick = page.url();

  expect(
    isRepositoryDetailsUrl(urlafterClick),
    `Could not open the details page'(${urlafterClick})`
  ).toBe(true);
});
