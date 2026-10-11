# Around The U.S. — React

Migración a React y TypeScript del proyecto **Around The U.S.** de TripleTen. La aplicación muestra un perfil de usuario, una galería de lugares y ventanas emergentes reutilizables para editar el perfil, actualizar el avatar, agregar tarjetas y ampliar imágenes.

## Funcionalidades

- Carga del perfil y de las tarjetas desde la API.
- Edición validada del perfil y del avatar.
- Creación y eliminación confirmada de tarjetas propias.
- Gestión de Me gusta con actualización inmediata de la interfaz.
- Mensajes visibles de carga, éxito y error.
- Ventanas emergentes accesibles: cierre con `Escape`, control del foco y navegación con teclado.
- Diseño adaptable para escritorio y dispositivos móviles.
- Pruebas automatizadas de validación, formularios y ventanas emergentes.

## Tecnologías

- React 19
- TypeScript
- Vite
- Vitest y Testing Library
- CSS con metodología BEM
- ESLint

## Instalación y ejecución

Necesitas Node.js 22 o una versión posterior y npm.

```bash
git clone git@github.com:AllenPrkr/web_project_around_react.git
cd web_project_around_react
npm install
cp .env.example .env.local
npm run dev
```

En Windows puedes copiar la configuración con:

```powershell
Copy-Item .env.example .env.local
```

Vite abrirá la aplicación automáticamente en `http://localhost:3000`.

## Configuración de la API

El archivo `.env.local` permite configurar la API sin modificar el código:

```env
VITE_API_BASE_URL=https://around-api.es.tripleten-services.com/v1
VITE_API_TOKEN=tu-token-de-api
```

Si no se crea el archivo, el proyecto conserva la URL y el token de práctica incluidos como valores predeterminados. Las variables `VITE_*` se incorporan al código del navegador, por lo que no deben usarse para secretos privados.

## Scripts disponibles

```bash
npm run dev        # Inicia el servidor de desarrollo
npm run build      # Comprueba TypeScript y genera producción
npm run lint       # Analiza el código
npm test           # Ejecuta todas las pruebas una vez
npm run test:watch # Ejecuta las pruebas en modo interactivo
npm run preview    # Previsualiza la compilación
```

Antes de publicar, ejecuta:

```bash
npm run lint
npm test
npm run build
```

En PowerShell, si la política de ejecución impide usar `npm`, ejecuta los mismos comandos con `npm.cmd`.

## Estructura principal

```text
src/
├── blocks/       # Estilos BEM
├── components/   # Componentes React
├── contexts/     # Contexto global del usuario
├── hooks/        # Validación y estados asíncronos reutilizables
├── images/       # Imágenes e iconos
├── interfaces/   # Interfaces de datos y del contexto
├── types/        # Reexportaciones de tipos compartidos
├── utils/        # Cliente de API y reglas de validación
├── vendor/       # Fuentes y normalización CSS
├── index.css
└── main.tsx

tests/            # Pruebas automatizadas
```

## Autor

[AllenPrkr](https://github.com/AllenPrkr)
