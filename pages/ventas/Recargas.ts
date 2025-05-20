import { Page, test, expect } from '@playwright/test';
import { generarNumeroTelefonico, generarNumeroContrato } from '../../helpers/utils';
import { faker } from '@faker-js/faker'

export class Recargas {
    readonly page: Page;

    constructor(page : Page) {
        this.page = page;

    }

    async RecargasNacionales(testInfo: any) {
        // Realiza varias ventas de recargas nacionales
        for (let i = 0; i <= 2; i++) {
            //Genera numero telefonico aleatorio
            const cellNumber = generarNumeroTelefonico();
    
            //Vender una recarga
            await this.page.locator('//*[@id="10|VentaRecarga|1"]').click();
            await this.page.locator("(//p[contains(.,'CLARO')])[1]").click();
            await this.page.locator("//input[@id='txtNumero']").fill(cellNumber);
            await this.page.locator("(//span[@class='ui-button-text'][contains(.,'30')])[1]").click();
            await this.page.locator("//span[contains(.,'Recargar')]").click();
            await this.page.locator("//button[@type='button'][contains(.,'Aceptar')]").click();
            await this.page.pause();
            await this.page.waitForSelector('//*[@id="swal2-content"]');
            const mensajeReferencia = await this.page.locator('//*[@id="swal2-content"]').textContent();
            const recargaRef = (mensajeReferencia as string).slice(-5);
    
            await testInfo.attach('RecargaNacional', {   //Se adjuntan las capturas al HTML del reporte de pruebas.
                body: await this.page.screenshot({ path: 'screenshots/Recargas/recargaNacional1.png', fullPage: true }),
                contentType: 'image/png'
            })
            //await page.screenshot({path: 'screenshots/recargaNacional1.png', fullPage: true}); //Se toma captura de la ultima venta
    
            await this.page.locator("//button[contains(.,'Aceptar')]").click();
    
    
            //Validarción del reporte "Historial ventas"
            await this.page.locator("//a[contains(.,'Historial ventas')]").click();
            await this.page.locator("//span[contains(.,'Consultar')]").click();
    
            await this.page.waitForTimeout(2000);
            await testInfo.attach('RecargaNacional', {   //Se adjuntan las capturas al HTML del reporte de pruebas.
                body: await this.page.screenshot({ path: 'screenshots/Recargas/recargaNacionalRegistro.png', fullPage: true }),
                contentType: 'image/png'
            })
            //await page.screenshot({path: 'screenshots/recargaNacionalRegistro.png', fullPage: true}); //Se toma captura del historial de ventas
    
            //Guarda el ultimo registro de la tabla "Historial ventas"
            const tableDate = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[1]').textContent();
            const fechaActual = new Date();
            const fechaFormateadaActual = fechaActual.toISOString().split('T')[0];
            const tableRef = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[3]').textContent();
            const tableCellNumber = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[6]').textContent();
    
            //Aserción (verificación) de la recarga en el reporte
            expect(tableDate).toEqual(fechaFormateadaActual);
            expect(tableRef).toEqual(recargaRef);
            expect(tableCellNumber).toEqual(cellNumber);
            //Muestra que los valores coinciden
            console.log('Verificación del reporte:' +
                '\nCompara fecha Recarga Nacional:         ' + tableDate + ' >>> ' + fechaFormateadaActual +
                '\nCompara referencia Recarga Nacional:      ' + tableRef + ' >>> ' + recargaRef +
                '\nCompara numero telefonico:       ' + tableCellNumber + ' >>> ' + cellNumber)
        }
    }


    async RecargasInternacionales(testInfo: any) {
        for (let i=0; i<=2;i++){
            //Genera numero telefonico aleatorio
            const cellNumber = generarNumeroTelefonico();
        
            //Vender una recarga internacional
            await this.page.locator('//*[@id="10|VentaRecarga|1"]').click();
            await this.page.locator('button[name="Movistar Colombia"]').click();         //Vende recarga de Movistar
            //await page.getByRole('button', { name: 'Claro Colombia' }).click();   //Vende recarga de Claro
            await this.page.locator('#txtNumero').fill(cellNumber);
            await this.page.waitForTimeout(3000);
            await this.page.locator('//*[@id="inputs-recarga"]/div[3]/button[1]').click();
            //await page.getByRole('button', { name: '25' }).click();
            //await page.getByRole('button', { name: 'Recargar' }).click();
            await this.page.locator('//*[@id="btnGuardar"]').click();
            const page1Promise = this.page.waitForEvent('popup');
            await this.page.getByRole('button', { name: 'Aceptar' }).click();
            const page1 = await page1Promise;
            await this.page.waitForSelector('//*[@id="swal2-content"]');
            const mensajeReferencia = await this.page.locator('//*[@id="swal2-content"]').textContent();
            const recargaRef = (mensajeReferencia as string).slice(-5);
            await testInfo.attach('RecargaInternacional', {   //Se adjuntan las capturas al HTML del reporte de pruebas.
                body: await this.page.screenshot({path: 'screenshots/Recargas/recargaInternacional1.png', fullPage: true}),
                contentType: 'image/png'})
            await this.page.getByRole('button', { name: 'Aceptar' }).click();
        
            //Validarción del reporte "Historial ventas"
            await this.page.locator("//a[contains(.,'Historial ventas')]").click();
            await this.page.locator("//span[contains(.,'Consultar')]").click();
            await this.page.waitForTimeout(2000);
            await testInfo.attach('RecargaInternacional', {   //Se adjuntan las capturas al HTML del reporte de pruebas.
                body: await this.page.screenshot({path: 'screenshots/Recargas/recargaInternacionalRegistro.png', fullPage: true}),
                contentType: 'image/png'})
            //Guarda el ultimo registro de la tabla "Historial ventas"
            const tableDate = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[1]').textContent();
            const fechaActual  = new Date();
            const fechaFormateadaActual = fechaActual.toISOString().split('T')[0];
            const tableRef = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[3]').textContent();
            const tableCellNumber = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[6]').textContent();
            
            //Aserción (verificación) de la recarga en el reporte
            expect(tableDate).toEqual(fechaFormateadaActual);
            expect(tableRef).toEqual(recargaRef);
            expect(tableCellNumber).toEqual(cellNumber);
            //Muestra que los valores coinciden
            console.log('Verificación del reporte:' +
                    '\nCompara fecha Recarga Internacional:         ' + tableDate + ' >>> ' + fechaFormateadaActual +
                    '\nCompara referencia Recarga Internacional:      ' + tableRef + ' >>> ' + recargaRef +
                    '\nCompara numero telefonico:       ' + tableCellNumber + ' >>> ' + cellNumber)
            }
    }

    async RecargasEnergia(testInfo: any) {
        for (let i = 0; i <= 2; i++) {
            //Genera numero de contrato aleatorio
            const contractNumber = generarNumeroContrato();
    
            //Vender una recarga de energia
            await this.page.locator('//*[@id="10|VentaRecarga|1"]').click();
            //await page.getByRole('button', { name: 'EDENORTE - PREPAGO' }).click();     //Vende recarga de EDENORTE
            await this.page.locator('button[name="EDESUR - PREPAGO"]').click();              //Vende recarga de EDESUR   
            await this.page.locator('#txtNumero').click();
            await this.page.locator('#txtNumero').fill(contractNumber);
            await this.page.locator('button').filter({ hasText: '25' }).click();
            await this.page.locator('#btnGuardar').click();
            const page1Promise = this.page.waitForEvent('popup');
            await this.page.getByRole('button', { name: 'Aceptar' }).click();
            const page1 = await page1Promise;
            await this.page.waitForSelector('//*[@id="swal2-content"]');
            const mensajeReferencia = await this.page.locator('//*[@id="swal2-content"]').textContent();
            const recargaRef = (mensajeReferencia as string).slice(-5);
            await testInfo.attach('RecargaEnergia', {   //Se adjuntan las capturas al HTML del reporte de pruebas.
                body: await this.page.screenshot({ path: 'screenshots/Recargas/recargaEnergia1.png', fullPage: true }),
                contentType: 'image/png'
            })
            await this.page.getByRole('button', { name: 'Aceptar' }).click();
    
            //Validarción del reporte "Historial ventas"
            await this.page.locator("//a[contains(.,'Historial ventas')]").click();
            await this.page.locator("//span[contains(.,'Consultar')]").click();
            await this.page.waitForTimeout(2000);
            await testInfo.attach('RecargaEnergia', {   //Se adjuntan las capturas al HTML del reporte de pruebas.
                body: await this.page.screenshot({ path: 'screenshots/Recargas/recargaEnergiaRegistro.png', fullPage: true }),
                contentType: 'image/png'
            })
            //Guarda el ultimo registro de la tabla "Historial ventas"
            const tableDate = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[1]').textContent();
            const fechaActual = new Date();
            const fechaFormateadaActual = fechaActual.toISOString().split('T')[0];
            const tableRef = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[3]').textContent();
            const tableContractNumber = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[6]').textContent();
    
            //Aserción (verificación) de la recarga en el reporte
            expect(tableDate).toEqual(fechaFormateadaActual);
            expect(tableRef).toEqual(recargaRef);
            expect(tableContractNumber).toEqual(contractNumber);
            //Muestra que los valores coinciden
            console.log('Verificación del reporte:' +
                '\nCompara fecha Recarga Energia:         ' + tableDate + ' >>> ' + fechaFormateadaActual +
                '\nCompara referencia Recarga Energia:      ' + tableRef + ' >>> ' + recargaRef +
                '\nCompara numero telefonico:       ' + tableContractNumber + ' >>> ' + contractNumber)
        }

    }

    

   


    

};