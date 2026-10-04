// 1. Definimos la estructura de los datos que vienen de la API
interface RawUser {
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
  };
}

// 2. Definimos la estructura limpia que nos pide el profesor
interface User {
  name: string;
  email: string;
  username: string;
  city: string;
}

// 3. Funcion para hacer el fetch y transformar los datos con .map()
async function obtenerUsuarios(): Promise<User[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data: RawUser[] = await response.json();

    // Creamos el nuevo arreglo solo con lo que necesitamos
    const usuariosLimpios: User[] = data.map((user: RawUser): User => {
      return {
        name: user.name,
        email: user.email,
        username: user.username,
        city: user.address.city, // Buscamos city dentro de address
      };
    });

    return usuariosLimpios;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
}

// 4. Función para ejecutar y mostrar en pantalla
async function ejecutar() {
  const usuarios = await obtenerUsuarios();

  console.log('--- RESULTADO REQUERIDO ---');
  console.log(usuarios);

  // BONUS: Filtrar correos que terminen en .biz o .org
  const usuariosFiltrados = usuarios.filter(
    (user) => user.email.endsWith('.biz') || user.email.endsWith('.org')
  );

  console.log('\n--- BONUS: USUARIOS CON EMAIL .BIZ O .ORG ---');
  console.log(usuariosFiltrados);
}

// Ejecutamos el código
ejecutar();
