import { test, expect } from '@playwright/test';

// about me
test('the "About me" button opens /about url', async ({ page }) => {
  await page.goto('/');
  const aboutMeButton = page.locator('a[title="About me"]');
  await aboutMeButton.click();
  await expect(page).toHaveURL('/about');
});

// blog
test('the "Blog" button opens /blog url', async ({ page }) => {
  await page.goto('/');
  const blogButton = page.locator('a[title="Blog"]');
  await blogButton.click();
  await expect(page).toHaveURL('/blog');
});

// projects
test('the "My projects" button opens repositories url', async ({ page }) => {
  await page.goto('/');
  const projectsButton = page.locator('a[title="My projects"]');
  await projectsButton.click();
  const popup = await page.waitForEvent('popup');
  await expect(popup).toHaveURL(
    'https://github.com/bacarybruno?tab=repositories'
  );
});

// home
test('the "Home" button opens / url', async ({ page }) => {
  await page.goto('/');
  const homeButton = page.locator('a[title="Home"]');
  await homeButton.click();
  await expect(page).toHaveURL('/');
});
