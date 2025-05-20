import { test, expect } from '@playwright/test';
import { LoginPage } from '../../helpers/LoginPage';
import { Subdistribuidor } from '../../pages/administrativo/Repartos/Subdistribuidor';
import { AdministrarCupoSub } from '../../pages/administrativo/Repartos/AdministrarCupoSub';
import { AdministrarCupoProm } from '../../pages/administrativo/Repartos/AdministrarCupoProm';
import { AdministrarCupoVend } from '../../pages/administrativo/Repartos/AdministrarCupoVend';
import { Promotor } from '../../pages/administrativo/Repartos/Promotor';
import { Vendedor } from '../../pages/administrativo/Repartos/Vendedor'; 


//Crea una red de usuarios y aumenta sus cupos.
test('CreacionDeLaRed', async ({ page }) => {
    const usuario = 'admin';
    const contrasena = '112233';
    const loginPage = new LoginPage(page);

    
    // Iniciar sesión
    await loginPage.inicioSesionAdministrativo(usuario, contrasena);


    // Crear y registrar un subdistribuidor
    const subdistribuidor = new Subdistribuidor(page);
    await subdistribuidor.registrarSubdistribuidor(test.info());

    //Aserción (verificación) de la creación correcta del subdistribuidor 
    const idSubEnTabla = await subdistribuidor.buscaIDSubEnTabla();
    console.log('EXPECT: \n Subdistribuidor creado:', subdistribuidor.getIdentificacion(), '\n',
                'Subdistribuidor en la tabla:', idSubEnTabla);               
    expect(idSubEnTabla.trim()).toBe(subdistribuidor.getIdentificacion().trim());

    // Acceder a las propiedades del subdistribuidor
    console.log('Nombre Subdistribuidor:', subdistribuidor.getNombre());
    console.log('Login:', subdistribuidor.getLogin());
    console.log('Identificación:', subdistribuidor.getIdentificacion());

    //Ampliar y disminuir cupos del subdistribuidor 
    const identificacionSub = await subdistribuidor.getIdentificacion();
    const valorAmpliacionCVSub = '20';
    const valorAmpliacionCASub = '10';
    const valorDisminucionCVSub = '10';
    const valorDisminucionCASub = '5';
    const administrarCupoSub = new AdministrarCupoSub(page);
    
    await administrarCupoSub.AumentaCupoVenta(identificacionSub, valorAmpliacionCVSub, test.info());
    await administrarCupoSub.AumentaCupoAmpliacion(identificacionSub, valorAmpliacionCASub, test.info());
    await administrarCupoSub.DisminuyeCupoVenta(identificacionSub, valorDisminucionCVSub, test.info());
    await administrarCupoSub.DisminuyeCupoAmpliacion(identificacionSub, valorDisminucionCASub, test.info());
    

    //NOTA: todo el test completo fallaria porque el subdistribuidor nuevo (apenas creado) no tiene
    // planes de liquidación creados y al crear un promotor es necesario asignarle un plan de liquidación del padre.

    // Crear y registrar un promotor
    const promotor = new Promotor(page);
    await promotor.registrarPromotor('Andrea Rossy Romero', test.info()); //full name es el nombre y apellido concatenados
    //await promotor.registrarPromotor(subdistribuidor.getNombre() + ' ' + subdistribuidor.getApellido());

    //Aserción (verificación) de la creación correcta del promotor 
    const idPromEnTabla = await promotor.buscaIDPromEnTabla();
    console.log('EXPECT: \n Promotor creado:', promotor.getIdentificacion(), '\n',
                'Promotor en la tabla:', idPromEnTabla);               
    expect(idPromEnTabla.trim()).toBe(promotor.getIdentificacion().trim());

    // Acceder a las propiedades del promotor
    console.log('Nombre Promotor:', promotor.getNombre());
    console.log('Login:', promotor.getLogin());
    console.log('Identificación:', promotor.getIdentificacion());

    //Aumentar y disminuir cupos del promotor
    const identificacionProm = await promotor.getIdentificacion();
    const valorAmpliacionCVProm = '20';
    const valorAmpliacionCAProm = '10';
    const valorDisminucionCVProm = '10';
    const valorDisminucionCAProm = '5';
    const administrarCupoProm = new AdministrarCupoProm(page);

    await administrarCupoProm.AumentaCupoVenta(identificacionProm, valorAmpliacionCVProm, test.info());
    await administrarCupoProm.AumentaCupoAmpliacion(identificacionProm, valorAmpliacionCAProm, test.info());
    await administrarCupoProm.DisminuyeCupoVenta(identificacionProm, valorDisminucionCVProm, test.info());
    await administrarCupoProm.DisminuyeCupoAmpliacion(identificacionProm, valorDisminucionCAProm, test.info());



    // Crear y registrar un vendedor
    const vendedor = new Vendedor(page);
    await vendedor.registrarVendedor('Andrea Promotor', test.info()); //full name es el nombre y apellido concatenados
    //await vendedor.registrarVendedor(promotor.getNombre() + ' ' + promotor.getApellido());

    //Aserción (verificación) de la creación correcta del vendedor 
    const idVendEnTabla = await vendedor.buscaIDVendEnTabla();
    console.log('EXPECT: \n Vendedor creado:', vendedor.getIdentificacion(), '\n',
                'Vendedor en la tabla:', idVendEnTabla);               
    expect(idVendEnTabla.trim()).toBe(vendedor.getIdentificacion().trim());

    // Acceder a las propiedades del promotor
    console.log('Nombre Vendedor:', vendedor.getNombre());
    console.log('Login:', vendedor.getLogin());
    console.log('Identificación:', vendedor.getIdentificacion());

    //Aumentar y disminuir cupos del promotor
    const identificacionVend = await vendedor.getIdentificacion();
    const valorAmpliacionCVVend = '20';
    const valorAmpliacionCAVend = '10';
    const valorDisminucionCVVend = '10';
    const valorDisminucionCAVend = '5';
    const administrarCupoVend = new AdministrarCupoVend(page);

    await administrarCupoVend.AumentaCupoVenta(identificacionVend, valorAmpliacionCVVend, test.info());
    await administrarCupoVend.AumentaCupoAmpliacion(identificacionVend, valorAmpliacionCAVend, test.info());
    await administrarCupoVend.DisminuyeCupoVenta(identificacionVend, valorDisminucionCVVend, test.info());
    await administrarCupoVend.DisminuyeCupoAmpliacion(identificacionVend, valorDisminucionCAVend, test.info());
   
    







});