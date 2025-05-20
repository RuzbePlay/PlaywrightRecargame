import { test, expect } from '@playwright/test';
import { LoginPage } from '../../helpers/LoginPage';
import { Seguros } from '../../pages/ventas/Seguros';


test('Segurito24', async ({ page }) => {
    const usuario = 'Peach.vend';
    const contrasena = '112233';
    const loginPage = new LoginPage(page);

    
    // Iniciar sesión
    await loginPage.inicioSesionVentas(usuario, contrasena);

    //Nota: Falta organizar las asersiones de los seguros (pasarlas aqui)
    // Realiza varios pagos de segurito24 y las valida en el Historial de ventas
    const seguros = new Seguros(page);
    await seguros.Segurito24(test.info()); 

});