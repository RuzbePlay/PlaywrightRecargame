import { Page, Locator } from '@playwright/test';
import { generarNumeroTelefonico } from '../helpers/utils';

export class RecargasPage {
    readonly page: Page;
    readonly menuRecarga: Locator;
    readonly inputNumero: Locator;
    readonly botonValor: Locator;
    readonly botonRecargar: Locator;
    readonly confirmacionExitosa: Locator;
  
    constructor(page: Page) {
        this.page = page;
        this.menuRecarga = page.locator("//a[contains(.,'Recargas')]"); // menu derecho 
        this.inputNumero = page.locator("//input[@id='txtNumero']");        
        this.botonValor = page.locator("(//span[@class='ui-button-text'][contains(.,'30')])[1]");    
        this.botonRecargar = page.locator("//span[contains(.,'Recargar')]");
        this.confirmacionExitosa = page.locator("//button[@type='button'][contains(.,'Aceptar')]"); 
    }

    async irARecargas() {
        await this.menuRecarga.click();
      }
  
  
    async realizarRecargaNacional(): Promise<{ numeroTel: string; recargaReferencia: string }>  {
        await this.irARecargas();
        await this.page.locator("(//p[contains(.,'CLARO')])[1]"); //Selecciona operador
        const numeroTel = generarNumeroTelefonico();
        await this.inputNumero.fill(numeroTel);
        await this.botonValor.click();
        await this.botonRecargar.click();
        await this.confirmacionExitosa.click();
        await this.page.waitForTimeout(8000);
        await this.page.waitForSelector('//*[@id="swal2-content"]');
        const mensajeReferencia = await this.page.locator('//*[@id="swal2-content"]').textContent();
        const recargaReferencia = (mensajeReferencia as string).slice(-5);
        await this.page.locator("//button[contains(.,'Aceptar')]").click();
        
        return { numeroTel, recargaReferencia };

    }
  }