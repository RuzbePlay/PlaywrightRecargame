import { Page, test, expect } from '@playwright/test';
import { generarNumeroContrato } from '../../helpers/utils';
import { faker } from '@faker-js/faker'

export class Facturas {
    readonly page: Page;

    constructor(page : Page) {
        this.page = page;

    }

    async Facturas(testInfo: any) {
        // Realiza pagos de facturas
        for (let i = 0; i <= 1; i++) {
            //Genera numero telefonico aleatorio
            const contratoNumber = generarNumeroContrato();
    
            //Vender una recarga
            await this.page.getByRole('link', { name: 'Facturas' }).click();
            await this.page.getByRole('button', { name: 'CLARO POSTPAGO' }).click();
            await this.page.getByRole('textbox', { name: 'Contrato' }).fill(contratoNumber);
            await this.page.getByRole('button', { name: '' }).click();
            await this.page.getByRole('button', { name: 'Pagar' }).click();
            await this.page.getByRole('button', { name: 'Aceptar' }).click();
            await this.page.pause();
            await this.page.waitForSelector('//*[@id="swal2-content"]');
            const mensajeReferencia = await this.page.locator('//*[@id="swal2-content"]').textContent();
            const recargaRef = (mensajeReferencia as string).slice(-5);
    
            await testInfo.attach('PagoFacturas', {   //Se adjuntan las capturas al HTML del reporte de pruebas.
                body: await this.page.screenshot({ path: 'screenshots/Facturas/factura1.png', fullPage: true }),
                contentType: 'image/png'
            })
    
            await this.page.locator("//button[contains(.,'Aceptar')]").click();
    
    
            //Validarción del reporte "Historial ventas"
            await this.page.locator("//a[contains(.,'Historial ventas')]").click();
            await this.page.locator("//span[contains(.,'Consultar')]").click();
    
            await this.page.waitForTimeout(2000);
            await testInfo.attach('PagoFacturas', {   //Se adjuntan las capturas al HTML del reporte de pruebas.
                body: await this.page.screenshot({ path: 'screenshots/Facturas/facturaRegistro.png', fullPage: true }),
                contentType: 'image/png'
            })
    
            //Guarda el ultimo registro de la tabla "Historial ventas"
            const tableDate = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[1]').textContent();
            const fechaActual = new Date();
            const fechaColombia = new Date(fechaActual.getTime() + (-5) * 60 * 60 * 1000);
    
            const fechaFormateadaActual = fechaColombia.toISOString().split('T')[0];
            const tableRef = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[3]').textContent();
            const tableContratoNumber = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[6]').textContent();
    
            //Aserción (verificación) de la factura en el reporte
            expect(tableDate).toEqual(fechaFormateadaActual);
            expect(tableRef).toEqual(recargaRef);
            expect(tableContratoNumber).toEqual(contratoNumber);
            //Muestra que los valores coinciden
            console.log('Verificación del reporte:' +
                '\nCompara fecha Factura:         ' + tableDate + ' >>> ' + fechaFormateadaActual +
                '\nCompara referencia Factura:      ' + tableRef + ' >>> ' + recargaRef +
                '\nCompara numero Contrato:       ' + tableContratoNumber + ' >>> ' + contratoNumber)
        }
    }

};