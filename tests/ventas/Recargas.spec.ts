import { test, expect } from '@playwright/test';
import { LoginPage } from '../../helpers/LoginPage';
import { Recargas } from '../../pages/ventas/Recargas';


test('TodasLasRecargas', async ({ page }) => {
    const usuario = 'Peach.vend';
    const contrasena = '112233';
    const loginPage = new LoginPage(page);

    
    // Iniciar sesión
    await loginPage.inicioSesionVentas(usuario, contrasena);

    //Nota: Falta organizar las asersiones de la recarga nacional (pasarlas aqui)
    // Realiza varias ventas de recargas nacionales, internacionales y de energia, ademas valida las ventas en el Historial de ventas
    const recargas = new Recargas(page);
    await recargas.RecargasNacionales(test.info()); 
    await recargas.RecargasInternacionales(test.info());
    await recargas.RecargasEnergia(test.info());

});