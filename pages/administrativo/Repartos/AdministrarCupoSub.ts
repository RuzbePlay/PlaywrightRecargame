import { Page } from '@playwright/test';

export class AdministrarCupoSub {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async AumentaCupoVenta(identificacion: string, valorAmpliacionCV: string, testInfo: any) {
        // Navega a la vista de administrar cupo subdistribuidor
        await this.page.locator('frame[name="leftFrame"]').contentFrame().getByText('Repartos', { exact: true }).click();
        await this.page.locator('frame[name="leftFrame"]').contentFrame().getByRole('link', { name: '| Administrar balance subdistribuidor' }).click();
        const mainFrame = this.page.locator('frame[name="leftFrame"]').contentFrame().locator('iframe[name="mainFrame"]').contentFrame();
        await this.page.waitForTimeout(3000);
        await mainFrame.locator('#txtSearchOperador').click();
        await mainFrame.locator('#txtSearchOperador').fill(identificacion);
        await mainFrame.locator('#txtSearchOperador').press('Enter');
        // obtiene la fila visible
        const visibleRowCV = await mainFrame.locator('#resultado tbody tr:not([style*="display: none"])').first();
        await visibleRowCV.locator('input[name="txtAmpliacionCupo"]').click();
        await visibleRowCV.locator('input[name="txtAmpliacionCupo"]').fill(valorAmpliacionCV);
        await visibleRowCV.locator('input[name="txtAmpliacionCupo"]').press('Enter');
        await visibleRowCV.locator('.btnAmpliar').click();
        await mainFrame.getByRole('textbox', { name: 'Digite una observación' }).click();
        await mainFrame.getByRole('textbox', { name: 'Digite una observación' }).fill('Ampliacion CV ' + valorAmpliacionCV);
        await mainFrame.getByRole('button', { name: 'OK' }).click();
        await this.page.waitForEvent('download');
        //Screenshot del aumento de cupo venta del subdistribuidor
        await testInfo.attach('AumentoCupoVenta', { // Attaach a screenshot to the test report.
            body: await this.page.screenshot({ path: 'screenshots/Repartos/AumentaSubCV.png', fullPage: true }),
            contentType: 'image/png'
        });
        await mainFrame.getByRole('button', { name: 'Aceptar' }).click();
        await this.page.waitForTimeout(3000);
    }

    async AumentaCupoAmpliacion(identificacion: string, valorAmpliacionCA: string, testInfo: any) {
        // Navega a la vista de administrar cupo subdistribuidor
        await this.page.locator('frame[name="leftFrame"]').contentFrame().getByText('Repartos', { exact: true }).click();
        await this.page.locator('frame[name="leftFrame"]').contentFrame().getByRole('link', { name: '| Administrar balance subdistribuidor' }).click();
        await this.page.waitForTimeout(3000);
        const mainFrame = this.page.locator('frame[name="leftFrame"]').contentFrame().locator('iframe[name="mainFrame"]').contentFrame();
        await mainFrame.locator('#lstTipoCupo').selectOption('CA');
        await this.page.waitForTimeout(3000);
        await mainFrame.locator('#txtSearchOperador').click();
        await mainFrame.locator('#txtSearchOperador').fill(identificacion);
        await mainFrame.locator('#txtSearchOperador').press('Enter');
        await this.page.waitForTimeout(3000);
        // obtiene la fila visible
        const visibleRowCA = await mainFrame.locator('#resultado tbody tr:not([style*="display: none"])').first();
        await visibleRowCA.locator('input[name="txtAmpliacionCupoServicio"]').waitFor({ state: 'visible' });
        await visibleRowCA.locator('input[name="txtAmpliacionCupoServicio"]').click();
        await visibleRowCA.locator('input[name="txtAmpliacionCupoServicio"]').fill(valorAmpliacionCA);
        await visibleRowCA.locator('input[name="txtAmpliacionCupoServicio"]').press('Enter');
        await visibleRowCA.locator('.btnAmpliar').click();
        await mainFrame.getByRole('textbox', { name: 'Digite una observación' }).click();
        await mainFrame.getByRole('textbox', { name: 'Digite una observación' }).fill('Ampliacion CA ' + valorAmpliacionCA);
        const downloadPromise = this.page.waitForEvent('download');
        await mainFrame.getByRole('button', { name: 'OK' }).click();
        const download = await downloadPromise;
        //Screenshot del aumento de cupo ampliacion del subdistribuidor
        await testInfo.attach('AumentoCupoAmpliacion', { // Attaach a screenshot to the test report.
            body: await this.page.screenshot({ path: 'screenshots/Repartos/AumentaSubCA.png', fullPage: true }),
            contentType: 'image/png'
        });
        await mainFrame.getByRole('button', { name: 'Aceptar' }).click();
    }

    async DisminuyeCupoVenta(identificacion: string, valorDisminuirCV: string, testInfo: any) {
        // Navega a la vista de administrar cupo subdistribuidor
        await this.page.locator('frame[name="leftFrame"]').contentFrame().getByText('Repartos', { exact: true }).click();
        await this.page.locator('frame[name="leftFrame"]').contentFrame().getByRole('link', { name: '| Administrar balance subdistribuidor' }).click();
        const mainFrame = this.page.locator('frame[name="leftFrame"]').contentFrame().locator('iframe[name="mainFrame"]').contentFrame();
        await mainFrame.getByPlaceholder('Buscar').click();
        await mainFrame.getByPlaceholder('Buscar').fill(identificacion);
        await mainFrame.getByPlaceholder('Buscar').press('Enter');
        // obtiene la fila visible
        const visibleRowCV = await mainFrame.locator('#resultado tbody tr:not([style*="display: none"])').first();
        await visibleRowCV.locator('input[name="txtAmpliacionCupo"]').click();
        await visibleRowCV.locator('input[name="txtAmpliacionCupo"]').fill(valorDisminuirCV);
        await visibleRowCV.locator('input[name="txtAmpliacionCupo"]').press('Enter');
        await visibleRowCV.locator('.btnReducir').click();
        await mainFrame.getByRole('textbox', { name: 'Digite una observación' }).click();
        await mainFrame.getByRole('textbox', { name: 'Digite una observación' }).fill('Disminución CV ' + valorDisminuirCV);
        await mainFrame.getByRole('button', { name: 'OK' }).click();
        //Screenshot de la disminucion de cupo venta del subdistribuidor
        await testInfo.attach('DisminuyeCupoVenta', { // Attaach a screenshot to the test report.
            body: await this.page.screenshot({ path: 'screenshots/Repartos/DisminuyeSubCV.png', fullPage: true }),
            contentType: 'image/png'
        });
        await mainFrame.getByRole('button', { name: 'Aceptar' }).click();
    }

    async DisminuyeCupoAmpliacion(identificacion: string, valorDisminuirCA: string, testInfo: any) {
        // Navega a la vista de administrar cupo subdistribuidor
        await this.page.locator('frame[name="leftFrame"]').contentFrame().getByText('Repartos', { exact: true }).click();
        await this.page.locator('frame[name="leftFrame"]').contentFrame().getByRole('link', { name: '| Administrar balance subdistribuidor' }).click();
        await this.page.waitForTimeout(3000);
        const mainFrame = this.page.locator('frame[name="leftFrame"]').contentFrame().locator('iframe[name="mainFrame"]').contentFrame();
        await mainFrame.locator('#lstTipoCupo').selectOption('CA');
        await this.page.waitForTimeout(3000);
        await mainFrame.getByPlaceholder('Buscar').click();
        await mainFrame.getByPlaceholder('Buscar').fill(identificacion);
        await mainFrame.getByPlaceholder('Buscar').press('Enter');
        await this.page.waitForTimeout(3000);
        // obtiene la fila visible
        const visibleRowCA = await mainFrame.locator('#resultado tbody tr:not([style*="display: none"])').first();
        await visibleRowCA.locator('input[name="txtAmpliacionCupoServicio"]').waitFor({ state: 'visible' });
        await visibleRowCA.locator('input[name="txtAmpliacionCupoServicio"]').click();
        await visibleRowCA.locator('input[name="txtAmpliacionCupoServicio"]').fill(valorDisminuirCA);
        await visibleRowCA.locator('input[name="txtAmpliacionCupoServicio"]').press('Enter');
        await visibleRowCA.locator('.btnReducir').click();
        await mainFrame.getByRole('textbox', { name: 'Digite una observación' }).click();
        await mainFrame.getByRole('textbox', { name: 'Digite una observación' }).fill('Disminución CA ' + valorDisminuirCA);
        const downloadPromise = this.page.waitForEvent('download');
        await mainFrame.getByRole('button', { name: 'OK' }).click();
        const download = await downloadPromise;
        //Screenshot de la disminucion de cupo Ampliacion del subdistribuidor
        await testInfo.attach('DisminuyeCupoAmpliacion', { // Attaach a screenshot to the test report.
            body: await this.page.screenshot({ path: 'screenshots/Repartos/DisminuyeSubCA.png', fullPage: true }),
            contentType: 'image/png'
        });
        await mainFrame.getByRole('button', { name: 'Aceptar' }).click();
    }


    //Pendiente Generar deuda ampliando scupo sin realizar todo el pago, y pagar deuda ampliando sin aumentar el balance 


}