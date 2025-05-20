import { FrameLocator, Locator, Page } from '@playwright/test';

export class AdministrarCupoVend {
    private page: Page;
    private repartos: Locator;
    private pestanaAdministrarBalanceVend: Locator;
    private mainFrame: FrameLocator;
    private tipoBalance: Locator;
    private buscador: Locator;
    private primerResultadoTabla: Locator;
    private administrarBalanceCVVend: Locator;
    private administrarBalanceCAVend: Locator;
    private botonAmpliar: Locator;
    private botonDisminuir: Locator;
    private inputObservacion: Locator;
    private aceptarObservacion: Locator;
    private confirmarcionFinal: Locator;



    constructor(page: Page) {
        this.page = page;
        this.repartos = this.page.locator('frame[name="leftFrame"]').contentFrame().getByText('Repartos', { exact: true });
        this.pestanaAdministrarBalanceVend = this.page.locator('frame[name="leftFrame"]').contentFrame().getByRole('link', { name: '| Administrar balance vendedor' });
        //this.mainFrame = this.page.locator('frame[name="leftFrame"]').contentFrame().locator('iframe[name="mainFrame"]').contentFrame();
        this.mainFrame = this.page.frameLocator('frame[name="leftFrame"]').frameLocator('iframe[name="mainFrame"]');
        this.tipoBalance = this.mainFrame.locator('#lstTipoCupo');
        this.buscador = this.mainFrame.locator('#txtSearchOperador');
        this.primerResultadoTabla = this.mainFrame.locator('#resultado tbody tr:not([style*="display: none"])').first();
        this.administrarBalanceCVVend = this.primerResultadoTabla.locator('input[name="txtAmpliacionCupo"]');
        this.administrarBalanceCAVend = this.primerResultadoTabla.locator('input[name="txtAmpliacionCupoServicio"]');
        this.botonAmpliar = this.primerResultadoTabla.locator('.btnAmpliar');
        this.botonDisminuir = this.primerResultadoTabla.locator('.btnReducir');
        this.inputObservacion = this.mainFrame.getByRole('textbox', { name: 'Digite una observación' });
        this.aceptarObservacion = this.mainFrame.getByRole('button', { name: 'OK' });
        this.confirmarcionFinal = this.mainFrame.getByRole('button', { name: 'Aceptar' });
    }



    async AumentaCupoVenta(identificacion: string, valorAmpliacionCV: string, testInfo: any) {
        // Navega a la vista de administrar cupo vendedor
        await this.repartos.click();
        await this.pestanaAdministrarBalanceVend.click();
        //const mainFrame = this.page.locator('frame[name="leftFrame"]').contentFrame().locator('iframe[name="mainFrame"]').contentFrame();
        const mainFrame = this.mainFrame
        await this.page.waitForTimeout(3000);
        await this.buscador.click();
        await this.buscador.fill(identificacion);
        await this.page.waitForTimeout(3000);
        await this.buscador.press('Enter');
        // obtiene la fila visible
        await this.administrarBalanceCVVend.click();
        await this.administrarBalanceCVVend.fill(valorAmpliacionCV);
        await this.administrarBalanceCVVend.press('Enter');
        await this.administrarBalanceCVVend.click();//Borrar?+++++++++++++++++++++
        await this.botonAmpliar.click();
        await this.inputObservacion.fill('Ampliacion CV ' + valorAmpliacionCV);
        await this.aceptarObservacion.click();
        await this.page.waitForEvent('download');
        //Screenshot del aumento de cupo venta del vendedor
        await testInfo.attach('AumentoCupoVenta', { // Attaach a screenshot to the test report.
            body: await this.page.screenshot({ path: 'screenshots/Repartos/AumentaVendCV.png', fullPage: true }),
            contentType: 'image/png'
        });
        await this.confirmarcionFinal.click();
        await this.page.waitForTimeout(3000);
    }

    async AumentaCupoAmpliacion(identificacion: string, valorAmpliacionCA: string, testInfo: any) {
        // Navega a la vista de administrar cupo vendedor
        await this.repartos.click();
        await this.pestanaAdministrarBalanceVend.click();
        //const mainFrame = this.page.locator('frame[name="leftFrame"]').contentFrame().locator('iframe[name="mainFrame"]').contentFrame();
        const mainFrame = this.mainFrame
        await this.page.waitForTimeout(3000);
        await this.tipoBalance.selectOption('CA');
        await this.page.waitForTimeout(3000);
        await this.buscador.click();
        await this.buscador.fill(identificacion);
        await this.page.waitForTimeout(3000);
        await this.buscador.press('Enter');
        // obtiene la fila visible
        await this.administrarBalanceCAVend.click();
        await this.administrarBalanceCAVend.fill(valorAmpliacionCA);
        await this.administrarBalanceCAVend.press('Enter');
        await this.administrarBalanceCAVend.click();
        await this.botonAmpliar.click();
        await this.inputObservacion.fill('Ampliacion CA ' + valorAmpliacionCA);
        await this.aceptarObservacion.click();
        await this.page.waitForEvent('download');
        //Screenshot del aumento de cupo venta del Vendedor
        await testInfo.attach('AumentoCupoAmpliacion', { // Attaach a screenshot to the test report.
            body: await this.page.screenshot({ path: 'screenshots/Repartos/AumentaVendCA.png', fullPage: true }),
            contentType: 'image/png'
        });
        await this.confirmarcionFinal.click();
        await this.page.waitForTimeout(3000);
    }

    async DisminuyeCupoVenta(identificacion: string, valorDisminucionCV: string, testInfo: any) {
        // Navega a la vista de administrar cupo Vendedor
        await this.repartos.click();
        await this.pestanaAdministrarBalanceVend.click();
        const mainFrame = this.mainFrame
        await this.page.waitForTimeout(3000);
        await this.buscador.click();
        await this.buscador.fill(identificacion);
        await this.page.waitForTimeout(3000);
        await this.buscador.press('Enter');
        // obtiene la fila visible
        await this.administrarBalanceCVVend.click();
        await this.administrarBalanceCVVend.fill(valorDisminucionCV);
        await this.administrarBalanceCVVend.press('Enter');
        await this.administrarBalanceCVVend.click();//Borrar?+++++++++++++++++++++
        await this.botonDisminuir.click();
        await this.inputObservacion.fill('Disminucion CV ' + valorDisminucionCV);
        await this.aceptarObservacion.click();
        await this.page.waitForEvent('download');
        //Screenshot del aumento de cupo venta del Vendedor
        await testInfo.attach('DisminuyeCupoVenta', { // Attaach a screenshot to the test report.
            body: await this.page.screenshot({ path: 'screenshots/Repartos/DisminuyeVendCV.png', fullPage: true }),
            contentType: 'image/png'
        });
        await this.confirmarcionFinal.click();
        await this.page.waitForTimeout(3000);
    }

    async DisminuyeCupoAmpliacion(identificacion: string, valorDisminucionCA: string, testInfo: any) {
        // Navega a la vista de administrar cupo Vendedor
        await this.repartos.click();
        await this.pestanaAdministrarBalanceVend.click();
        const mainFrame = this.mainFrame
        await this.page.waitForTimeout(3000);
        await this.tipoBalance.selectOption('CA');
        await this.page.waitForTimeout(3000);
        await this.buscador.click();
        await this.buscador.fill(identificacion);
        await this.page.waitForTimeout(3000);
        await this.buscador.press('Enter');
        // obtiene la fila visible
        await this.administrarBalanceCAVend.click();
        await this.administrarBalanceCAVend.fill(valorDisminucionCA);
        await this.administrarBalanceCAVend.press('Enter');
        await this.administrarBalanceCAVend.click();
        await this.botonDisminuir.click();
        await this.inputObservacion.fill('Disminuir CA ' + valorDisminucionCA);
        await this.aceptarObservacion.click();
        await this.page.waitForEvent('download');
        //Screenshot del aumento de cupo venta del Vendedor
        await testInfo.attach('DisminuirCupoAmpliacion', { // Attaach a screenshot to the test report.
            body: await this.page.screenshot({ path: 'screenshots/Repartos/DisminuyeVendCA.png', fullPage: true }),
            contentType: 'image/png'
        });
        await this.confirmarcionFinal.click();
        await this.page.waitForTimeout(3000);
    }


}