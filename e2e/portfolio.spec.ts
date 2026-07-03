import { test, expect } from '@playwright/test';

test.describe('Visual regression - portfolio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('homepage renders correctly', async ({ page }) => {
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('hero section visible', async ({ page }) => {
    const hero = page.locator('#about');
    await expect(hero).toBeVisible();
    await expect(page.locator('text=Available for new opportunities')).toBeVisible();
  });

  test('projects section visible', async ({ page }) => {
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('text=Featured Projects')).toBeVisible();
  });

  test('contact section visible', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('text=Let\'s Connect')).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    await page.click('text=Projects');
    await expect(page.locator('#projects')).toBeInViewport();
    
    await page.click('text=Contact');
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('project filter works', async ({ page }) => {
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await expect(page.locator('button:has-text("Full-Stack")')).toBeVisible();
    await page.click('button:has-text("Full-Stack")');
    await expect(page.locator('button:has-text("Full-Stack")')).toHaveClass(/bg-primary-600/);
  });

  test('contact form validation', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.click('button:has-text("Send Message")');
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Subject is required')).toBeVisible();
    await expect(page.locator('text=Message is required')).toBeVisible();
  });
});