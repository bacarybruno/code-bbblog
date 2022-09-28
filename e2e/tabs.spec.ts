import { test, expect } from '@playwright/test';

test('tab changing', async ({ page }) => {
  await page.goto('/');

  const homeButton = page.locator('a[title="Home"]');
  await homeButton.click();
  const homeTabHeader = await page.locator('.tabpane__header[title="Home"]');

  const aboutMeButton = page.locator('a[title="About me"]');
  await aboutMeButton.click();
  const aboutMeTabHeader = await page.locator('.tabpane__header[title="About me"]');

  const blogButton = page.locator('a[title="Blog"]');
  await blogButton.click();
  const blogTabHeader = await page.locator('.tabpane__header[title="Blog"]');

  await aboutMeTabHeader.click();
  await expect(page).toHaveURL('/about');

  await blogTabHeader.click();
  await expect(page).toHaveURL('/blog');

  await homeTabHeader.click();
  await expect(page).toHaveURL('/');

  await aboutMeTabHeader.hover();
});
