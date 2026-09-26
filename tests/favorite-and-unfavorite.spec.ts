/**
 * * TESTE REFERENTE AO BUG04 NO RELATÓRIO.
 * Teste para o fluxo de favoritar e desfavoritar um repositório.
 *
 * O que o teste faz:
 * 1. Acessa a aplicação e navega até a listagem de repositórios.
 * 2. Realiza uma busca pelo termo "java" e captura o nome do primeiro repositório retornado.
 * 3. Entra nos detalhes do repositório e valida se a página carregou corretamente.
 * 4. Clica no botão de favoritar via script no DOM.
 * 5. Valida se o repositório foi favoritado com sucesso (ou se já estava salvo anteriormente).
 * 6. Navega até a página de Favoritos e verifica se o repositório listado corresponde ao que foi salvo.
 * 7. Localiza o botão para remover/desfavoritar o item da lista e clica nele, validando que o item sumiu.
 *
 *  RECOMENDAÇÕES:
 *
 * - Conflito no Favorito Duplicado: Como o teste depende de um estado persistente (um arquivo ou banco
 *   que guarda a lista de favoritos), execuções subsequentes podem falhar ao tentar favoritar um item
 *   que já foi salvo anteriormente (exibindo a mensagem "Esse repositório ja existe").
 *
 * - Conselho: Para que o teste passe de forma consistente na parte de favoritar,
 * é recomendável limpar o arquivo que guarda a lista de favoritos (Teste QA\TesteW12Github\RepositorioGitHub.App)
 */

import { test, expect } from '@playwright/test';
import {
  clickFavoriteButtonInDom,
  expectDetailsPageHeading,
  expectFavoriteActionAcknowledged,
  gotoFavorites,
  gotoHome,
  searchAndOpenFirstDetails,
} from './helpers';

test('should favorite and unfavorite a repository', async ({ page }) => {
  await gotoHome(page);

  const name = await searchAndOpenFirstDetails(page, 'java');

  await expectDetailsPageHeading(page);
  await expect(page.getByText('OK', { exact: true })).toBeVisible();

  await clickFavoriteButtonInDom(page);
  await expectFavoriteActionAcknowledged(page);

  await gotoFavorites(page);

  const row = page.locator('table.table tr').filter({ hasText: name }).first();
  await expect(row, 'there is no favorite repository with given name').toBeVisible();

  const removeButton = row.getByText(/Remover|Desfavoritar/i);
  await expect(removeButton, `there is no option to remove ${name} from favorites`).toBeVisible();
  await removeButton.click();

  await expect(row).toHaveCount(0);
});
