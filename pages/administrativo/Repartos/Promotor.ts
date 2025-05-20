import { Page } from '@playwright/test';
import { generarDireccionAleatoria, generarNumeroTelefonico, generarDocumentoAleatorio, generarLoginDesdeNombre } from '../../../helpers/utils';
import { faker } from '@faker-js/faker'


export class Promotor {
    readonly page: Page;
    private identificacion: string;
    private nombre: string;
    private apellido: string;
    private login: string;
    private direccion: string;
    private cellNumber: string;
    private planLiquidacion: string;
    private padreSubdistribuidorFullName: string;

    constructor(page : Page) {
        this.page = page;
        this.identificacion = generarDocumentoAleatorio();
        this.nombre = faker.person.firstName(),
        this.apellido = faker.person.lastName(),
        this.login = generarLoginDesdeNombre(this.nombre + this.apellido),
        this.direccion = generarDireccionAleatoria(),
        this.cellNumber = generarNumeroTelefonico(),
        this.planLiquidacion = 'plan 14 mayo' //El plan de liquidación se esta quemando el mismo para cada promotor
        this.padreSubdistribuidorFullName = ''; 
    }

    async registrarPromotor(subdistribuidorFullName: string, testInfo: any) {
        // Navegar y realizar el registro del promotor
        await this.page.locator('frame[name="leftFrame"]').contentFrame().getByText('Repartos', { exact: true }).waitFor();
        await this.page.locator('frame[name="leftFrame"]').contentFrame().getByText('Repartos', { exact: true }).click();
        await this.page.locator('frame[name="leftFrame"]').contentFrame().getByRole('link', { name: '| Promotor' }).click();
        await this.page.mouse.click(0, 0);
        //const subdNombre = subdistribuidor.getNombre();
        const mainFrame = this.page.locator('frame[name="leftFrame"]').contentFrame().locator('iframe[name="mainFrame"]').contentFrame();
        this.padreSubdistribuidorFullName = subdistribuidorFullName;
        await mainFrame.locator('#lstUsuarioPadre').selectOption(subdistribuidorFullName);
        await this.page.waitForTimeout(1000);
        await mainFrame.locator('#txtIdentificacion').fill(this.identificacion);
        await this.page.waitForTimeout(1000);
        await mainFrame.locator('#txtPrimerNombre').fill(this.nombre);
        await this.page.waitForTimeout(1000);
        await mainFrame.locator('#txtPrimerApellido').fill(this.apellido);
        await this.page.waitForTimeout(1000);
        await mainFrame.locator('#txtLogin').fill(this.login);
        await mainFrame.locator('#txtDireccion').fill(this.direccion);
        await mainFrame.locator('#txtTelefono').fill(this.cellNumber);
        await mainFrame.locator('#lstPlanLiquidacion').selectOption(this.planLiquidacion);
        await mainFrame.getByText('Guardar').click();
        await this.page.waitForTimeout(3000);
        //Screenshot de la creación del promotor
        await testInfo.attach('RegistrarPromotor', { // Attaach a screenshot to the test report.
            body: await this.page.screenshot({path: 'screenshots/Repartos/CreaProm.png',fullPage: true }),
            contentType: 'image/png'
        });
        await mainFrame.getByRole('button', { name: 'Aceptar' }).click();
    }

    async buscaIDPromEnTabla() {
        const mainFrame = this.page.locator('frame[name="leftFrame"]').contentFrame().locator('iframe[name="mainFrame"]').contentFrame();  
        await mainFrame.locator('#lstUsuarioPadre').selectOption(this.padreSubdistribuidorFullName);
        await mainFrame.locator('#txtSearchOperador').click();
        await mainFrame.locator('#txtSearchOperador').fill(this.identificacion);
        await mainFrame.locator('#txtSearchOperador').press('Enter');
        const visibleRow = await mainFrame.locator('#resultado tbody tr:not([style*="display: none"])').first();
        const identificacion = await visibleRow.locator('td').nth(1).innerText();

        return identificacion;

    }

    getNombre(): string {
        return this.nombre;
    }
    
    getApellido(): string {
        return this.apellido;
    }

    getLogin(): string {
        return this.login;
    }

    getIdentificacion(): string {
        return this.identificacion;
    }

    getPlanLiquidacion(): string {
        return this.planLiquidacion;
    }

    getPadreSubdistribuidorFullName(): string {
        return this.padreSubdistribuidorFullName;
    }

    

};