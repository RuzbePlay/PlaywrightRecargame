import { Page, test, expect } from '@playwright/test';
import { generarNumeroTelefonico } from '../../helpers/utils';
import { faker } from '@faker-js/faker'

export class Paquetes {
    readonly page: Page;

    constructor(page : Page) {
        this.page = page;

    }

    async PaquetesNacionales(testInfo: any) {
        // Realiza varias ventas de paquetes nacionales
        for (let i = 0; i <= 1; i++) {
            //Genera numero telefonico aleatorio
            const cellNumber = generarNumeroTelefonico();
    
            //Vender una recarga
            await this.page.getByRole('link', { name: 'Paquetes' }).click();
            await this.page.getByRole('button', { name: 'Claro' }).click();
            //await page.getByRole('button', { name: 'Viva' }).click();
            await this.page.locator('#txtNumero').fill(cellNumber);
            await this.page.getByRole('button', { name: 'Paquetes', exact: true }).click();
            const botonPaquete1 = await this.page.locator(".swal2-spacer > *").nth(0);
            console.log("botonPaquete1: ", await botonPaquete1.innerText())
            botonPaquete1.click();
            // await page.getByRole('button', { name: 'Not found ILIMITADO POR 9 DIAS 39.00' }).click();
            await this.page.getByRole('button', { name: 'Recargar' }).click();
            const page1Promise = this.page.waitForEvent('popup');
            await this.page.getByRole('button', { name: 'Aceptar' }).click();
            await this.page.pause();
            await this.page.waitForSelector('//*[@id="swal2-content"]');
            const mensajeReferencia = await this.page.locator('//*[@id="swal2-content"]').textContent();
            const recargaRef = (mensajeReferencia as string).slice(-5);
    
            await testInfo.attach('PaquetesNacionales', {   //Se adjuntan las capturas al HTML del reporte de pruebas.
                body: await this.page.screenshot({ path: 'screenshots/Paquetes/PaqueteNacional1.png', fullPage: true }),
                contentType: 'image/png'
            })
    
            await this.page.getByRole('button', { name: 'Aceptar' }).click();
    
    
            //Validarción del reporte "Historial ventas"
            await this.page.locator("//a[contains(.,'Historial ventas')]").click();
            await this.page.locator("//span[contains(.,'Consultar')]").click();
            await this.page.waitForTimeout(2000);
    
            await testInfo.attach('PaquetesNacionales', {   //Se adjuntan las capturas al HTML del reporte de pruebas.
                body: await this.page.screenshot({ path: 'screenshots/Paquete/PaqueteNacionalRegistro.png', fullPage: true }),
                contentType: 'image/png'
            })
    
            //Guarda el ultimo registro de la tabla "Historial ventas"
            const tableDate = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[1]').textContent();
            const fechaActual = new Date();
            const fechaColombia = new Date(fechaActual.getTime() + (-5) * 60 * 60 * 1000);
    
            const fechaFormateadaActual = fechaColombia.toISOString().split('T')[0];
            const tableRef = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[3]').textContent();
            const tableCellNumber = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[6]').textContent();
    
            //Aserción (verificación) de la recarga en el reporte
            expect(tableDate).toEqual(fechaFormateadaActual);
            expect(tableRef).toEqual(recargaRef);
            expect(tableCellNumber).toEqual(cellNumber);
            //Muestra que los valores coinciden
            console.log('Verificación del reporte:' +
                '\nCompara fecha Paquete Nacional:         ' + tableDate + ' >>> ' + fechaFormateadaActual +
                '\nCompara referencia Paquete Nacional:      ' + tableRef + ' >>> ' + recargaRef +
                '\nCompara numero telefonico:       ' + tableCellNumber + ' >>> ' + cellNumber)
        }
    }

    async PaquetesInternacionales(testInfo: any) {
        for (let i = 0; i <= 1; i++) {
            //Realiza varias ventas de paquetes internacionales
            //Genera numero telefonico aleatorio
            const cellNumber = generarNumeroTelefonico();
    
            //Vender una recarga
            await this.page.getByRole('link', { name: 'Paquetes' }).click();
            await this.page.locator('#lstPaquetes').selectOption("Paquetes internacionales");
            await this.page.locator('#lstPais').selectOption("Colombia")
            await this.page.locator('#txtNumero').fill(cellNumber);
            await this.page.getByRole('button', { name: 'Paquetes', exact: true }).click();
            const botonPaquete1 = await this.page.locator(".swal2-spacer > *").nth(0);
            console.log("botonPaquete1: ", await botonPaquete1.innerText())
            botonPaquete1.click();
            // await page.getByRole('button', { name: 'Not found ILIMITADO POR 9 DIAS 39.00' }).click();
            await this.page.getByRole('button', { name: 'Recargar' }).click();
            const page1Promise = this.page.waitForEvent('popup');
            await this.page.getByRole('button', { name: 'Aceptar' }).click();
            await this.page.pause();
            await this.page.waitForSelector('//*[@id="swal2-content"]');
            const mensajeReferencia = await this.page.locator('//*[@id="swal2-content"]').textContent();
            const recargaRef = (mensajeReferencia as string).slice(-5);
    
            await testInfo.attach('PaquetesNacionales', {   //Se adjuntan las capturas al HTML del reporte de pruebas.
                body: await this.page.screenshot({ path: 'screenshots/Paquetes/PaqueteNacional1.png', fullPage: true }),
                contentType: 'image/png'
            })
    
            await this.page.getByRole('button', { name: 'Aceptar' }).click();
    
    
            //Validarción del reporte "Historial ventas"
            await this.page.locator("//a[contains(.,'Historial ventas')]").click();
            await this.page.locator("//span[contains(.,'Consultar')]").click();
            await this.page.waitForTimeout(2000);
    
            await testInfo.attach('PaquetesNacionales', {   //Se adjuntan las capturas al HTML del reporte de pruebas.
                body: await this.page.screenshot({ path: 'screenshots/Paquetes/PaqueteNacionalRegistro.png', fullPage: true }),
                contentType: 'image/png'
            })
    
            //Guarda el ultimo registro de la tabla "Historial ventas"
            const tableDate = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[1]').textContent();
            const fechaActual = new Date();
            const fechaColombia = new Date(fechaActual.getTime() + (-5) * 60 * 60 * 1000);
    
            const fechaFormateadaActual = fechaColombia.toISOString().split('T')[0];
            const tableRef = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[3]').textContent();
            const tableCellNumber = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[6]').textContent();
    
            //Aserción (verificación) de la recarga en el reporte
            expect(tableDate).toEqual(fechaFormateadaActual);
            expect(tableRef).toEqual(recargaRef);
            expect(tableCellNumber).toEqual(cellNumber);
            //Muestra que los valores coinciden
            console.log('Verificación del reporte:' +
                '\nCompara fecha Paquete Internacional:         ' + tableDate + ' >>> ' + fechaFormateadaActual +
                '\nCompara referencia Paquete Internacional:      ' + tableRef + ' >>> ' + recargaRef +
                '\nCompara numero telefonico:       ' + tableCellNumber + ' >>> ' + cellNumber)
        }
    

    }
};