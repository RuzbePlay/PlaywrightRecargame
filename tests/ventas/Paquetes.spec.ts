import { test, expect } from '@playwright/test';
import { LoginPage } from '../../helpers/LoginPage';
import { Paquetes } from '../../pages/ventas/Paquetes';


test('TodosLosPaquetes', async ({ page }) => {
    const usuario = 'Peach.vend';
    const contrasena = '112233';
    const loginPage = new LoginPage(page);

    
    // Iniciar sesión
    await loginPage.inicioSesionVentas(usuario, contrasena);

    //Nota: Falta organizar las asersiones de los paquetes (pasarlas aqui)
    // Realiza varias ventas de paquetes nacionales e Internacionales y las valida en el Historial de ventas
    const recargas = new Paquetes(page);
    await recargas.PaquetesNacionales(test.info()); 
    await recargas.PaquetesInternacionales(test.info());

});