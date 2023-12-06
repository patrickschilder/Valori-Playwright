import { FullConfig, chromium } from "@playwright/test";
import { LoginPage } from "./pageObjects/login-page";
import { Username } from "./enums/username";

async function globalSetup(config: FullConfig): Promise<void> {
  const { baseURL, storageState } = config.projects[0].use;
    
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(baseURL!);

    const loginPage = new LoginPage(page);
    await loginPage.loginWithUser(Username.Standard);
    
    await page.waitForLoadState('domcontentloaded');
    await page.context().storageState({ path: storageState as string });

    await browser.close();
  }
  
  export default globalSetup;