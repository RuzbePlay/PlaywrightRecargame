import { Page, test, expect } from '@playwright/test';
import { generarNumeroTelefonico, generarPlaca, generarChasis, generarDocumentoAleatorio, generarApellidoAleatorio, generarCorreoElectronico } from '../../helpers/utils';
import { faker } from '@faker-js/faker'

export class Seguros {
    readonly page: Page;

    constructor(page : Page) {
        this.page = page;

    }

    async Segurito24(testInfo: any) {
        
        for (let i = 0; i < 1; i++) {
            const placa = generarPlaca();
            const chasis = generarChasis();
            const documento = generarDocumentoAleatorio();
            const nombre = faker.person.firstName();
            const apellido = generarApellidoAleatorio();
            const telefono = generarNumeroTelefonico();
            const email = generarCorreoElectronico();
    
            await this.page.waitForTimeout(3000);
            await this.page.locator("//a[contains(.,'Seguros')]").click();
            await this.page.waitForSelector("//p[contains(.,'Segurito 24')]");
            await this.page.locator("//p[contains(.,'Segurito 24')]").click();
            await this.page.locator('#txtPlaca').click();
            await this.page.locator('#txtPlaca').fill(placa);
            await this.page.waitForTimeout(1000);
            await this.page.locator("//span[contains(@id,'select2-lstMarcas-container')]").click({ force: true });
            await this.page.locator("//li[contains(text(),'AUDI')]").click();
            await this.page.getByRole('textbox', { name: '100' }).click();
            await this.page.getByRole('option', { name: '80' }).click();
            await this.page.locator('#select2-lstProvincias-container').click();
            await this.page.getByRole('option', { name: 'BARAHONA' }).click();
            await this.page.waitForTimeout(1000);
            await this.page.locator('#select2-lstAnio-container').click();
            await this.page.getByRole('option', { name: '2015' }).click();
            await this.page.locator('#txtChasis').click();
            await this.page.locator('#txtChasis').fill(chasis);
            await this.page.locator('#txtDocumento').click();
            await this.page.locator('#txtDocumento').fill(documento);
            await this.page.locator('#txtNombre').click();
            await this.page.locator('#txtNombre').fill(nombre);
            await this.page.locator('#txtApellidos').click();
            await this.page.locator('#txtApellidos').fill(apellido);
            await this.page.locator('#txtTelefono').click();
            await this.page.locator('#txtTelefono').fill(telefono);
            await this.page.locator('#txtCorreo').click();
            await this.page.locator('#txtCorreo').fill(email);
            await this.page.getByRole('textbox', { name: 'Seleccione' }).click();
            await this.page.getByRole('textbox', { name: 'Seleccione' }).click();//AYUDA DANIEL
            await this.page.getByRole('textbox', { name: 'Seleccione' }).click();
            await this.page.getByRole('option', { name: 'Motor <250cc 3 meses' }).click();
            await this.page.getByRole('button', { name: 'Ver cobertura' }).click();
            await this.page.getByRole('button', { name: 'Aceptar' }).click();
            await this.page.waitForTimeout(1000);
            await this.page.locator("//*[@id='btnGuardar']").click();
            await this.page.getByRole('button', { name: 'Aceptar' }).click();
            await this.page.waitForSelector("//button[text()='Aceptar']");
            await this.page.waitForSelector('//*[@id="swal2-content"]');
            const mensajeReferencia = await this.page.locator('//*[@id="swal2-content"]').textContent();
            const seguroRef = (mensajeReferencia as string).slice(-5);
            await testInfo.attach('Segurito24', {   //Se adjuntan las capturas al HTML del reporte de pruebas.
                body: await this.page.screenshot({ path: 'screenshots/Seguros/Seguros1.png', fullPage: true }),
                contentType: 'image/png'
            });
            await this.page.getByRole('button', { name: 'Aceptar' }).click();
            await this.page.waitForTimeout(3000);
            await this.page.reload();
    
            //Validarción del reporte "Historial ventas"
            await this.page.locator("//a[contains(.,'Historial ventas')]").click();
            await this.page.locator("//span[contains(.,'Consultar')]").click();
            await this.page.waitForTimeout(3000);
    
            await testInfo.attach('Segurito24', {   //Se adjuntan las capturas al HTML del reporte de pruebas.
                body: await this.page.screenshot({ path: 'screenshots/Seguros/Seguros2.png', fullPage: true }),
                contentType: 'image/png'
            });
    
            //Guarda el ultimo registro de la tabla "Historial ventas"
            const tableDate = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[1]').textContent();
            const fechaActual = new Date();
            const fechaFormateadaActual = fechaActual.toISOString().split('T')[0];
            const tableRef = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[3]').textContent();
            const tableChasisNumber = await this.page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[6]').textContent();
    
            //Aserción (verificación) de la recarga en el reporte
            expect(tableDate).toEqual(fechaFormateadaActual);
            expect(tableRef).toEqual(seguroRef);
            //expect(tableChasisNumber).toEqual(chasis); //Corregir porque el numero de la tabla es el numero de poliza, revisar como obtener numero de poliza con summarypage
            //Muestra que los valores coinciden
            console.log('Verificación del reporte:' +
                '\nCompara fecha Segurito24:         ' + tableDate + ' >>> ' + fechaFormateadaActual +
                '\nCompara referencia Segurito24:      ' + tableRef + ' >>> ' + seguroRef +
                '\nCompara numero Chasis:       ' + tableChasisNumber + ' >>> ' + chasis)
        }

    }

};