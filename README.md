# Around The U.S. — React

Aplicación web interactiva para crear y compartir una colección de lugares. Cada usuario puede consultar su perfil, publicar tarjetas con una imagen, marcar lugares como favoritos y administrar el contenido que le pertenece.

Este proyecto es la migración a **React y TypeScript** de *Around The U.S.*, desarrollado como parte del programa de Desarrollo Web de TripleTen. Además de reproducir la interfaz original, el proyecto busca aplicar una arquitectura basada en componentes, comunicación asíncrona con una API REST, formularios controlados, validación y pruebas automatizadas.

## ¿Por qué se desarrolló?

El objetivo académico del proyecto es transformar una página estática en una aplicación de una sola página (SPA) cuyos datos provienen de un servidor. Con esta migración se practican problemas comunes del desarrollo frontend moderno:

- dividir una interfaz en componentes reutilizables;
- mantener sincronizados el estado de React y los datos remotos;
- gestionar operaciones asíncronas y sus posibles errores;
- validar información antes de enviarla;
- crear interacciones accesibles mediante teclado;
- comprobar los flujos principales con pruebas automatizadas.

## ¿Para qué sirve?

La aplicación funciona como una galería personal de viajes o lugares de interés. Permite:

- consultar el nombre, la descripción y el avatar del usuario;
- editar los datos del perfil;
- actualizar el avatar mediante la URL de una imagen;
- agregar una tarjeta con título e imagen;
- ampliar la imagen de cualquier tarjeta;
- dar o quitar **Me gusta**;
- eliminar únicamente las tarjetas creadas por el usuario actual;
- recibir mensajes de carga, confirmación o error durante cada operación.

Los cambios no se guardan solamente en el navegador: las acciones se envían a la API de TripleTen y la interfaz se actualiza con la respuesta del servidor.

## Vista general del funcionamiento

Cuando la aplicación inicia, solicita en paralelo el perfil y la lista de tarjetas. `App` conserva estos datos en el estado principal y los distribuye a los demás componentes. Las acciones del usuario llaman al cliente de la API y, si la respuesta es correcta, actualizan el estado para volver a renderizar la interfaz.

```text
Usuario
   ↓
Componentes y formularios React
   ↓
Manejadores definidos en App
   ↓
Cliente HTTP (src/utils/api.ts)
   ↓
API REST de TripleTen
   ↓
Respuesta → actualización del estado → nueva interfaz
```

El contexto `CurrentUserContext` comparte el usuario actual y las operaciones relacionadas con los formularios sin tener que pasar esas propiedades por todos los niveles de componentes.

## Funcionalidades principales

### Perfil

- Carga los datos del usuario desde el servidor.
- Permite cambiar el nombre y la descripción.
- Permite actualizar el avatar mediante una URL HTTP o HTTPS.
- Refleja los cambios cuando la API confirma la operación.

### Tarjetas

- Obtiene la galería inicial desde la API.
- Inserta las tarjetas nuevas al inicio de la lista.
- Muestra el botón de eliminación solo en las tarjetas propias.
- Solicita confirmación antes de eliminar una tarjeta.
- Sincroniza el estado de **Me gusta** con el servidor.
- Abre cada fotografía en una vista ampliada.

### Formularios y estados asíncronos

- Usa formularios controlados por React.
- Comprueba campos obligatorios, longitudes permitidas y URLs válidas.
- Muestra errores asociados a cada campo.
- Deshabilita el botón mientras se procesa una solicitud para evitar envíos duplicados.
- Informa al usuario cuando una acción termina o falla.
- Ofrece un botón para reintentar si la carga inicial no se completa.

### Accesibilidad

- Los botones incluyen nombres accesibles con `aria-label`.
- Las ventanas emergentes se anuncian como diálogos modales.
- El foco permanece dentro del diálogo mientras está abierto.
- Al cerrar una ventana, el foco vuelve al elemento que la abrió.
- Las ventanas pueden cerrarse con `Escape`, con el botón de cierre o al hacer clic en el fondo.
- Los errores y mensajes de estado utilizan roles accesibles.

### Diseño adaptable

Los estilos están organizados con la metodología BEM y se adaptan a pantallas de escritorio y dispositivos móviles. Se utiliza la fuente Inter y una normalización CSS para mantener una apariencia consistente entre navegadores.

## Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
| --- | --- |
| React 19 | Componentes, estado, efectos y contexto |
| TypeScript | Tipado de propiedades, formularios y respuestas de la API |
| Vite | Servidor de desarrollo y compilación de producción |
| CSS y BEM | Estilos, diseño adaptable y organización de clases |
| Fetch API | Comunicación con el servicio REST |
| Vitest | Ejecución de pruebas unitarias y de integración |
| Testing Library | Pruebas basadas en la interacción del usuario |
| ESLint | Análisis estático y consistencia del código |

## Requisitos previos

- [Node.js](https://nodejs.org/) 22 o posterior.
- npm, incluido con Node.js.
- Git para clonar el repositorio.
- Un token válido de la API de TripleTen si se desea reemplazar la configuración de práctica incluida en el proyecto.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone git@github.com:AllenPrkr/web_project_around_react.git
   cd web_project_around_react
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre `http://localhost:3000` si el navegador no se abre automáticamente.

> El archivo de variables de entorno es opcional porque el proyecto incluye una configuración de práctica. Si copias `.env.example`, debes reemplazar `tu-token-de-api` por un token válido; dejar ese texto sin modificar provocará un error de autorización.

## Configuración de la API

Para usar otra URL o credencial, crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_API_BASE_URL=https://around-api.es.tripleten-services.com/v1
VITE_API_TOKEN=tu-token-real
```

En macOS o Linux puedes partir del ejemplo con:

```bash
cp .env.example .env.local
```

En PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Después de modificar las variables, reinicia el servidor de Vite. Las variables con el prefijo `VITE_` se incorporan al código que recibe el navegador, por lo que no deben contener secretos de producción.

### Operaciones consumidas

| Método | Ruta | Acción |
| --- | --- | --- |
| `GET` | `/users/me` | Obtener el perfil actual |
| `PATCH` | `/users/me` | Actualizar nombre y descripción |
| `PATCH` | `/users/me/avatar` | Actualizar el avatar |
| `GET` | `/cards` | Obtener todas las tarjetas |
| `POST` | `/cards` | Crear una tarjeta |
| `DELETE` | `/cards/:cardId` | Eliminar una tarjeta propia |
| `PUT` | `/cards/:cardId/likes` | Agregar Me gusta |
| `DELETE` | `/cards/:cardId/likes` | Quitar Me gusta |

El cliente HTTP centraliza la URL base, los encabezados, la serialización JSON y la conversión de respuestas fallidas en mensajes de error.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia Vite en modo desarrollo y abre el navegador |
| `npm run build` | Comprueba TypeScript y genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la compilación de producción |
| `npm run lint` | Analiza el proyecto con ESLint |
| `npm test` | Ejecuta todas las pruebas una vez |
| `npm run test:watch` | Mantiene Vitest activo durante el desarrollo |

En PowerShell, si la política de ejecución impide usar `npm`, se pueden ejecutar los mismos comandos con `npm.cmd`.

## Pruebas

La suite automatizada cubre tanto funciones aisladas como flujos completos:

- reglas de campos obligatorios, longitudes y URLs;
- visualización de errores y bloqueo de formularios inválidos;
- prevención de envíos duplicados mientras una petición está pendiente;
- carga y edición del perfil;
- creación, marcado y eliminación de tarjetas;
- apertura y cierre accesible de las ventanas emergentes;
- devolución del foco al cerrar un diálogo.

Para ejecutar todas las comprobaciones antes de entregar o publicar:

```bash
npm run lint
npm test
npm run build
```

## Estructura del proyecto

```text
web_project_around_react/
├── public/                    # Recursos públicos y favicon
├── src/
│   ├── blocks/               # Estilos CSS organizados con BEM
│   ├── components/           # Componentes de interfaz
│   │   ├── App.tsx           # Estado principal y operaciones de negocio
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Main/             # Perfil, tarjetas y ventanas emergentes
│   ├── contexts/             # Contexto del usuario actual
│   ├── hooks/                # Validación y acciones asíncronas reutilizables
│   ├── images/               # Imágenes e iconos de la interfaz
│   ├── interfaces/           # Contratos TypeScript de los datos
│   ├── types/                # Punto común de exportación de tipos
│   ├── utils/                # Cliente de API y reglas de validación
│   ├── vendor/               # Fuentes y normalización CSS
│   ├── index.css             # Importación general de estilos
│   └── main.tsx              # Punto de entrada de React
├── tests/                    # Pruebas automatizadas
├── .env.example              # Ejemplo de configuración local
├── vite.config.ts            # Configuración del servidor de desarrollo
└── vitest.config.ts          # Configuración del entorno de pruebas
```

## Decisiones de implementación

- **Estado central en `App`:** el perfil y las tarjetas se mantienen en el ancestro común para que todas las acciones trabajen con una única fuente de verdad.
- **Contexto para el usuario:** evita pasar datos y manejadores manualmente por componentes que no los utilizan.
- **Cliente de API independiente:** separa la comunicación HTTP de la presentación y facilita sustituir o probar el servicio.
- **Hooks personalizados:** `useFormValidation` reutiliza las reglas de validación y `useAsyncAction` estandariza carga y errores en acciones asíncronas.
- **Ventana emergente reutilizable:** un solo componente gestiona la accesibilidad, el cierre y el foco; su contenido cambia según la acción seleccionada.
- **Actualización tras confirmar la API:** el estado local solo cambia cuando el servidor responde correctamente, evitando mostrar como guardada una operación fallida.

## Solución de problemas frecuentes

### La aplicación muestra un error al cargar

Comprueba la conexión a internet, la URL de la API y el valor de `VITE_API_TOKEN`. Si acabas de cambiar `.env.local`, reinicia `npm run dev`.

### Las imágenes no aparecen

La URL debe ser pública, comenzar con `http://` o `https://` y apuntar a un recurso que el navegador pueda cargar.

### El puerto 3000 está ocupado

Detén el proceso que usa ese puerto o cambia la propiedad `server.port` en `vite.config.ts`.

### La compilación falla

Ejecuta `npm install` para confirmar que las dependencias están completas y después revisa por separado `npm run lint`, `npm test` y `npm run build` para identificar el origen.

## Posibles mejoras

- Incorporar autenticación y separar los datos por sesión.
- Añadir paginación o carga progresiva de tarjetas.
- Mostrar el número de Me gusta de cada publicación.
- Añadir pruebas de errores de red y recuperación.
- Publicar una versión de demostración continua.

## Autor

[AllenPrkr](https://github.com/AllenPrkr)

## Licencia

Proyecto educativo desarrollado para TripleTen. No se ha definido una licencia de distribución.
