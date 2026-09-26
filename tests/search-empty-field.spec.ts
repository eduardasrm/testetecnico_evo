/**
 * TESTE REFERENTE A VALIDAÇÃO 01 NO RELATÓRIO.
 * Teste para validar a mensagem de aviso ao realizar uma busca com o campo vazio.
 * 
 * O que o teste faz:
 * 1. Acessa a página inicial da aplicação (https://localhost:44329/).
 * 2. Clica no link para ver outros repositórios.
 * 3. Deixa o campo de texto vazio e clica diretamente no botão "Buscar".
 * 4. Valida se a mensagem de erro/aviso "O Campo Nome Repositório tem que ser Preenchido" aparece visível na tela.
 */


import { test, expect } from '@playwright/test';

test('should show warning message when searching with empty field', async ({ page }) => {
  await page.goto('https://localhost:44329/');

  await page.getByRole('link', { name: 'Veja Outros Repositórios' }).click();
  await page.getByRole('button', { name: 'Buscar' }).click();

  await expect(page.getByText('O Campo Nome Repositório tem que ser Preenchido')).toBeVisible();
});
