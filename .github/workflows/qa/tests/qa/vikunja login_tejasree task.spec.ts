import { test, expect } from '@playwright/test';

test('create task', async ({ page }) => {
  /*await page.goto('http://localhost:8080/login');
await page.fill('input[type="text"]', 'testuser');
await page.fill('input[type="password"]', 'vikunga24');
await page.click('button:has-text("Register")');*/


//login
 await page.goto('http://localhost:8080/login');
await page.fill('input[type="text"]', 'testuser1');
await page.fill('input[type="password"]', 'vikunga24');
await page.getByRole('button',{name:'Login'}).click();
//crea task
const taskName = `My task ${Date.now()}`;
const updatedTask = `Updated task ${Date.now()}`;
const description = 'This is my task description';

// create task
const taskInput = page.getByPlaceholder(/Add a task/i);
await taskInput.fill(taskName);
await page.keyboard.press('Enter');

// open created task
await page.getByText(taskName).click();

// 🔥 edit title
const titleInput = page.getByRole('textbox').first();
await titleInput.fill(updatedTask);
await page.keyboard.press('Enter');

// 🔥 add description
const descBox = page.locator('[contenteditable="true"]').nth(1);
await descBox.click();
await descBox.pressSequentially(description);

// save
const saveBtn = page.getByRole('button', { name: 'Save' });
await expect(saveBtn).toBeEnabled();
await saveBtn.click();


});


