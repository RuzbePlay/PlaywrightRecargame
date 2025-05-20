import { Page, Locator } from '@playwright/test';


export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async inicioSesionVentas(usuario: string, contrasena: string) {
    await this.page.goto('http://pruebas.recargameonline.co/RecargamePos/index.php');
    await this.page.locator('//input[@id="txtLogin"]').fill(usuario);
    await this.page.locator('//input[@id="txtClave"]').fill(contrasena);
    await this.page.locator('//button[@id="btnAutenticar"]').click();

    await this.page.waitForURL('**/index.php');
    await this.page.waitForTimeout(3000);

    // const estaLogueado = await this.page.locator('//*[@id="header-app"]/table/tbody/tr/td[1]/img').isVisible();
    // expect(estaLogueado).toBeTruthy(); // O lanza un error si prefieres
  }

  async inicioSesionAdministrativo(usuario: string, contrasena: string) {
    await this.page.goto('http://pruebas.recargameonline.co/Recargame/index.php');
    await this.page.locator('//*[@id="txtLogin"]').fill(usuario);
    await this.page.locator('//*[@id="txtClave"]').fill(contrasena);
    await this.page.locator('//*[@id="btnAutenticar"]').click();

    await this.page.waitForURL('**/index.php');
    await this.page.waitForTimeout(3000);

    // const estaLogueado = await this.page.locator("//img[contains(@src,'logo.png')]").isVisible();
    // expect(estaLogueado).toBeTruthy();
  }
}

