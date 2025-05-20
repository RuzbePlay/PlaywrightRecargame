import { test, expect } from '@playwright/test';
import { LoginPage } from '../../helpers/LoginPage';
import { Facturas } from '../../pages/ventas/Facturas';


test('PagoFactura', async ({ page }) => {
    const usuario = 'Peach.vend';
    const contrasena = '112233';
    const loginPage = new LoginPage(page);

    
    // Iniciar sesión
    await loginPage.inicioSesionVentas(usuario, contrasena);

    //Nota: Falta organizar las asersiones de las facturas (pasarlas aqui)
    // Realiza varios pagos de facturas y las valida en el Historial de ventas
    const facturas = new Facturas(page);
    await facturas.Facturas(test.info()); 

});