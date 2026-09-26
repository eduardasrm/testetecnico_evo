/**
 * TESTE REFERENTE A VALIDAÇÃO 02 NO RELATÓRIO.
 * Teste para validar a busca de um repositório por nome.
 *
 * O que o teste faz:
 * 1. Acessa a página inicial da aplicação (https://localhost:44329/).
 * 2. Clica no link para ver outros repositórios.
 * 3. Preenche o campo de texto (textbox) com o termo de busca "react".
 * 4. Clica no botão "Buscar" para submeter a pesquisa.
 * 5. Valida se a tabela exibe ao menos um resultado contendo o texto "react".
 */

import { test, expect } from '@playwright/test';
import { gotoHome, openRepositoryListing, searchRepositories } from './helpers';

test('should successfully search for a repository by name', async ({ page }) => {
  await gotoHome(page);

  await openRepositoryListing(page);
  await searchRepositories(page, 'react');

  await expect(page.locator('table.table td').getByText('react').first()).toBeVisible();
});
