import { FrameLocator, Locator, Page } from '@playwright/test';

export class AdministrarCupoProm {
    private page: Page;
    private repartos: Locator;
    private pestanaAdministrarBalanceProm: Locator;
    private mainFrame: FrameLocator;
    private tipoBalance: Locator;
    private buscador: Locator;
    private primerResultadoTabla: Locator;
    private administrarBalanceCVProm: Locator;
    private administrarBalanceCAProm: Locator;
    private botonAmpliar: Locator;
    private botonDisminuir: Locator;
    private inputObservacion: Locator;
    private aceptarObservacion: Locator;
    private confirmarcionFinal: Locator;



    constructor(page: Page) {
        this.page = page;
        this.repartos = this.page.locator('frame[name="leftFrame"]').contentFrame().getByText('Repartos', { exact: true });
        this.pestanaAdministrarBalanceProm = this.page.locator('frame[name="leftFrame"]').contentFrame().getByRole('link', { name: '| Administrar balance promotor' });
        //this.mainFrame = this.page.locator('frame[name="leftFrame"]').contentFrame().locator('iframe[name="mainFrame"]').contentFrame();
        this.mainFrame = this.page.frameLocator('frame[name="leftFrame"]').frameLocator('iframe[name="mainFrame"]');
        this.tipoBalance = this.mainFrame.locator('#lstTipoCupo');
        this.buscador = this.mainFrame.locator('#txtSearchOperador');
        this.primerResultadoTabla = this.mainFrame.locator('#resultado tbody tr:not([style*="display: none"])').first();
        this.administrarBalanceCVProm = this.primerResultadoTabla.locator('input[name="txtAmpliacionCupo"]');
        this.administrarBalanceCAProm = this.primerResultadoTabla.locator('input[name="txtAmpliacionCupoServicio"]');
        this.botonAmpliar = this.primerResultadoTabla.locator('.btnAmpliar');
        this.botonDisminuir = this.primerResultadoTabla.locator('.btnReducir');
        this.inputObservacion = this.mainFrame.getByRole('textbox', { name: 'Digite una observación' });
        this.aceptarObservacion = this.mainFrame.getByRole('button', { name: 'OK' });
        this.confirmarcionFinal = this.mainFrame.getByRole('button', { name: 'Aceptar' });
    }



    async AumentaCupoVenta(identificacion: string, valorAmpliacionCV: string, testInfo: any) {
        // Navega a la vista de administrar cupo subdistribuidor
        await this.repartos.click();
        await this.pestanaAdministrarBalanceProm.click();
        //const mainFrame = this.page.locator('frame[name="leftFrame"]').contentFrame().locator('iframe[name="mainFrame"]').contentFrame();
        const mainFrame = this.mainFrame
        await this.page.waitForTimeout(3000);
        await this.buscador.click();
        await this.buscador.fill(identificacion);
        await this.page.waitForTimeout(3000);
        await this.buscador.press('Enter');
        // obtiene la fila visible
        await this.administrarBalanceCVProm.click();
        await this.administrarBalanceCVProm.fill(valorAmpliacionCV);
        await this.administrarBalanceCVProm.press('Enter');
        await this.administrarBalanceCVProm.click();//Borrar?+++++++++++++++++++++
        await this.botonAmpliar.click();
        await this.inputObservacion.fill('Ampliacion CV ' + valorAmpliacionCV);
        await this.aceptarObservacion.click();
        await this.page.waitForEvent('download');
        //Screenshot del aumento de cupo venta del subdistribuidor
        await testInfo.attach('AumentoCupoVenta', { // Attaach a screenshot to the test report.
            body: await this.page.screenshot({ path: 'screenshots/Repartos/AumentaSubCV.png', fullPage: true }),
            contentType: 'image/png'
        });
        await this.confirmarcionFinal.click();
        await this.page.waitForTimeout(3000);
    }

    async AumentaCupoAmpliacion(identificacion: string, valorAmpliacionCA: string, testInfo: any) {
        // Navega a la vista de administrar cupo subdistribuidor
        await this.repartos.click();
        await this.pestanaAdministrarBalanceProm.click();
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
        await this.administrarBalanceCAProm.click();
        await this.administrarBalanceCAProm.fill(valorAmpliacionCA);
        await this.administrarBalanceCAProm.press('Enter');
        await this.administrarBalanceCAProm.click();
        await this.botonAmpliar.click();
        await this.inputObservacion.fill('Ampliacion CA ' + valorAmpliacionCA);
        await this.aceptarObservacion.click();
        await this.page.waitForEvent('download');
        //Screenshot del aumento de cupo venta del subdistribuidor
        await testInfo.attach('AumentoCupoAmpliacion', { // Attaach a screenshot to the test report.
            body: await this.page.screenshot({ path: 'screenshots/Repartos/AumentaPromCA.png', fullPage: true }),
            contentType: 'image/png'
        });
        await this.confirmarcionFinal.click();
        await this.page.waitForTimeout(3000);
    }

    async DisminuyeCupoVenta(identificacion: string, valorDisminucionCV: string, testInfo: any) {
        // Navega a la vista de administrar cupo subdistribuidor
        await this.repartos.click();
        await this.pestanaAdministrarBalanceProm.click();
        const mainFrame = this.mainFrame
        await this.page.waitForTimeout(3000);
        await this.buscador.click();
        await this.buscador.fill(identificacion);
        await this.page.waitForTimeout(3000);
        await this.buscador.press('Enter');
        // obtiene la fila visible
        await this.administrarBalanceCVProm.click();
        await this.administrarBalanceCVProm.fill(valorDisminucionCV);
        await this.administrarBalanceCVProm.press('Enter');
        await this.administrarBalanceCVProm.click();//Borrar?+++++++++++++++++++++
        await this.botonDisminuir.click();
        await this.inputObservacion.fill('Disminucion CV ' + valorDisminucionCV);
        await this.aceptarObservacion.click();
        await this.page.waitForEvent('download');
        //Screenshot del aumento de cupo venta del promotor
        await testInfo.attach('DisminuyeCupoVenta', { // Attaach a screenshot to the test report.
            body: await this.page.screenshot({ path: 'screenshots/Repartos/DisminuyePromCV.png', fullPage: true }),
            contentType: 'image/png'
        });
        await this.confirmarcionFinal.click();
        await this.page.waitForTimeout(3000);
    }

    async DisminuyeCupoAmpliacion(identificacion: string, valorDisminucionCA: string, testInfo: any) {
        // Navega a la vista de administrar cupo promotor
        await this.repartos.click();
        await this.pestanaAdministrarBalanceProm.click();
        const mainFrame = this.mainFrame
        await this.page.waitForTimeout(3000);
        await this.tipoBalance.selectOption('CA');
        await this.page.waitForTimeout(3000);
        await this.buscador.click();
        await this.buscador.fill(identificacion);
        await this.page.waitForTimeout(3000);
        await this.buscador.press('Enter');
        // obtiene la fila visible
        await this.administrarBalanceCAProm.click();
        await this.administrarBalanceCAProm.fill(valorDisminucionCA);
        await this.administrarBalanceCAProm.press('Enter');
        await this.administrarBalanceCAProm.click();
        await this.botonDisminuir.click();
        await this.inputObservacion.fill('Disminuir CA ' + valorDisminucionCA);
        await this.aceptarObservacion.click();
        await this.page.waitForEvent('download');
        //Screenshot del aumento de cupo venta del promotor
        await testInfo.attach('DisminuirCupoAmpliacion', { // Attaach a screenshot to the test report.
            body: await this.page.screenshot({ path: 'screenshots/Repartos/DisminuyePromCA.png', fullPage: true }),
            contentType: 'image/png'
        });
        await this.confirmarcionFinal.click();
        await this.page.waitForTimeout(3000);
    }


}