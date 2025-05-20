export function generarPlaca(): string {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let placa = '';
  
    for (let i = 0; i < 3; i++) {
      placa += letras.charAt(Math.floor(Math.random() * letras.length));
    }
  
    for (let i = 0; i < 3; i++) {
      placa += Math.floor(Math.random() * 10);
    }
  
    return placa;
  }

export function generarNumeroTelefonico(): string {
    const random7Digits = Math.floor(1000000 + Math.random() * 9000000);
    const base = '829';
    const cellNumber = `${base}${random7Digits}`;
    
    return cellNumber;

  }

export function generarNumeroContrato(): string {
    const random7Digits = Math.floor(1000000 + Math.random() * 9000000);
    const cellNumber = `${random7Digits}`;
    
    return cellNumber;

  }

export function generarChasis(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let chasis = '';
    for (let i = 0; i < 9; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      chasis += caracteres[randomIndex];
    }
    return chasis;
  }



export function generarCorreoElectronico(): string {
  const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const longitud = 10; // Longitud del nombre de usuario del correo
    let nombreUsuario = '';
    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        nombreUsuario += caracteres[indice];
    }
    const dominio = 'example.com'; // Puedes personalizar el dominio si lo necesitas
    return `${nombreUsuario}@${dominio}`;
}

export function generarNombreAleatorio(): string {
  const nombres = ['Ana', 'Luis', 'Carlos', 'María', 'Sofía', 'Pedro', 'Camila', 'José', 'Laura', 'Andrés'];
  return nombres[Math.floor(Math.random() * nombres.length)];
}

export function generarApellidoAleatorio(): string {
  const apellidos = ['Pérez', 'Gómez', 'Rodríguez', 'Martínez', 'López', 'Díaz', 'Torres', 'Ramírez', 'Morales', 'Fernández'];
  return apellidos[Math.floor(Math.random() * apellidos.length)];
}

export function generarDireccionAleatoria(): string {
  const calles = ['Calle 10', 'Av. Siempre Viva', 'Calle 45B', 'Carrera 7', 'Transversal 22', 'Diagonal 15', 'Calle 100', 'Av. El Dorado'];
  const calle = calles[Math.floor(Math.random() * calles.length)];
  const numero = Math.floor(Math.random() * 1000) + 1;
  return `${calle} #${numero}`;
}

export function generarDocumentoAleatorio() {
  // Documento de 8 a 10 dígitos (como una cédula o tarjeta de identidad en Colombia)
  const longitud = Math.floor(Math.random() * 3) + 8; // 8, 9 o 10 dígitos
  let documento = '';
  for (let i = 0; i < longitud; i++) {
      documento += Math.floor(Math.random() * 10);
  }
  return documento;
}
  
export function generarLoginDesdeNombre(nombreCompleto) {
  const nombreSanitizado = nombreCompleto
      .toLowerCase()
      .replace(/[^a-z\s]/g, '') // elimina caracteres especiales
      .trim()
      .split(' ');

  const nombre = nombreSanitizado[0] || 'user';
  const apellido = nombreSanitizado[1] || 'demo';
  const numero = Math.floor(Math.random() * 1000); // Número para hacerlo único

  return `${nombre}.${apellido}${numero}`;
}