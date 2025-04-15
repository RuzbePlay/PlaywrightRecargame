import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage.ts';
import { generarNumeroTelefonico } from '../helpers/utils.ts';



test('Realizar recarga nacional', async ({ page }) => {
    await page.goto('http://pruebas.recargameonline.co/RecargamePos/index.php');
    
    //Inicio de sesión
    await page.locator('//input[@id=\'txtLogin\']').fill('Peach.vend');
    await page.locator('//input[@id=\'txtClave\']').fill('112233');
    await page.locator('//button[@id=\'btnAutenticar\']').click();

    //Genera numero telefonico aleatorio
    const cellNumber = generarNumeroTelefonico();

    //Vender una recarga
    await page.locator("(//p[contains(.,'CLARO')])[1]").click();
    await page.locator("//input[@id='txtNumero']").fill(cellNumber);
    await page.locator("(//span[@class='ui-button-text'][contains(.,'30')])[1]").click();
    await page.locator("//span[contains(.,'Recargar')]").click();
    await page.locator("//button[@type='button'][contains(.,'Aceptar')]").click();
    await page.pause();
    await page.waitForSelector('//*[@id="swal2-content"]');
    const mensajeReferencia = await page.locator('//*[@id="swal2-content"]').textContent();
    const recargaRef = (mensajeReferencia as string).slice(-5);
    await page.locator("//button[contains(.,'Aceptar')]").click();

    //Validarción del reporte "Historial ventas"
    await page.locator("//a[contains(.,'Historial ventas')]").click();
    await page.locator("//span[contains(.,'Consultar')]").click();
    await page.locator("//span[contains(.,'Consultar')]").click();
    //Guarda el ultimo registro de la tabla "Historial ventas"
    const tableDate = await page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[1]').textContent();
    const fechaActual  = new Date();
    const fechaFormateadaActual = fechaActual.toISOString().split('T')[0];
    const tableRef = await page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[3]').textContent();
    const tableCellNumber = await page.locator('//*[@id="divTable"]/table/tbody/tr[1]/td[6]').textContent();
    //Aserción (verificación) de la recarga en el reporte
    expect(tableDate).toEqual(fechaFormateadaActual);
    expect(tableRef).toEqual(recargaRef);
    expect(tableCellNumber).toEqual(cellNumber);
    //Muestra que los valores coinciden
    console.log('Verificación del reporte:' +
            '\nCompara fecha recarga:         ' + tableDate + ' >>> ' + fechaFormateadaActual +
            '\nCompara referencia recarga:      ' + tableRef + ' >>> ' + recargaRef +
            '\nCompara numero telefonico:       ' + tableCellNumber + ' >>> ' + cellNumber)

    
});

test('vender recargas', async ({ page }) => {
    await page.goto('http://pruebas.recargameonline.co/RecargamePos/index.php');
  
    await page.locator('//input[@id=\'txtLogin\']').fill('Peach.vend');
    await page.locator('//input[@id=\'txtClave\']').fill('112233');
    await page.locator('//button[@id=\'btnAutenticar\']').click();
    await page.pause();
    
});

