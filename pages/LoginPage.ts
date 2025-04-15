import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly inputUsuario: Locator;
    readonly inputContrasena: Locator;
    readonly botonIngresar: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.inputUsuario = page.locator('//input[@id=\'txtLogin\']'); 
      this.inputContrasena = page.locator('//input[@id=\'txtClave\']'); 
      this.botonIngresar = page.locator('//button[@id=\'btnAutenticar\']'); // inicia sesión
    }
  
    async navegar() {
      await this.page.goto('http://pruebas.recargameonline.co/RecargamePos/index.php'); 
    }
  
    async login(usuario: string, contrasena: string) {
      await this.inputUsuario.fill(usuario);
      await this.inputContrasena.fill(contrasena);
      await this.botonIngresar.click();
    }
  }

