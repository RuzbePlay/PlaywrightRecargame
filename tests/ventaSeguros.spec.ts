import { test, expect } from '@playwright/test';
import { generarPlaca, generarChasis } from '../helpers/utils';

test('iniciar sesion', async ({ page }) => {
    await page.goto('http://pruebas.recargameonline.co/RecargamePos/index.php');
  
    await page.locator('//input[@id=\'txtLogin\']').fill('Peach.vend');
    await page.locator('//input[@id=\'txtClave\']').fill('112233');
    await page.locator('//button[@id=\'btnAutenticar\']').click();

    for (let i=0; i<=2;i++){
    const placa = generarPlaca();
    const chasis = generarChasis();
    await page.locator("//a[contains(.,'Seguros')]").click();
    await page.waitForSelector("//p[contains(.,'Segurito 24')]");
    await page.locator("//p[contains(.,'Segurito 24')]").click();
    await page.locator("//input[@id='txtPlaca']").fill(placa);
    await page.locator("//span[@id='select2-lstMarcas-container']").click();
    await page.locator('li.select2-results__option', { hasText: 'AUDI' }).click();
    await page.waitForTimeout(3000);
    //await page.locator("//li[contains(.,'AUDI')]").click();
    await page.locator("//span[@id='select2-lstModelos-container']").click();
    await page.locator("//li[contains(.,'A6')]").click();    
    await page.locator("//span[@id='select2-lstProvincias-container']").click();
    await page.locator("//li[contains(.,'DISTRITO NACIONAL')]").click();
    await page.locator("//span[@id='select2-lstAnio-container']").click();
    await page.locator("//li[contains(.,'2012')]").click();
    await page.locator("//input[@id='txtChasis']").fill(chasis);

    }



        
});
