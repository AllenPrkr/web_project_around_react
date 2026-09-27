# Around The U.S. — React

Migración a React y TypeScript del proyecto **Around The U.S.** de TripleTen. La aplicación muestra un perfil de usuario, una galería de lugares y ventanas emergentes reutilizables para editar el perfil, actualizar el avatar, agregar tarjetas y ampliar imágenes.

## Funcionalidades

- Renderizado del perfil y de tarjetas a partir de datos tipados.
- Componentes reutilizables para encabezado, contenido principal, pie de página, tarjetas y ventanas emergentes.
- Apertura y cierre de formularios mediante estado de React.
- Vista ampliada de las imágenes con su descripción.
- Diseño adaptable para escritorio y dispositivos móviles.

Los formularios y botones de las tarjetas son únicamente visuales en esta etapa; todavía no guardan cambios ni se conectan a una API.

## Tecnologías

- React
- TypeScript
- Vite
- CSS con metodología BEM
- ESLint

## Instalación y ejecución

Necesitas Node.js y npm instalados.

```bash
git clone git@github.com:AllenPrkr/web_project_around_react.git
cd web_project_around_react
npm install
npm run dev
```

Vite abrirá la aplicación automáticamente en `http://localhost:3000`.

## Scripts disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Comprueba TypeScript y genera la versión de producción
npm run lint     # Analiza el código
npm run preview  # Previsualiza la compilación de producción
```

## Estructura principal

```text
src/
├── blocks/       # Estilos BEM
├── components/   # Componentes React
│   ├── App.tsx
│   ├── Footer/
│   ├── Header/
│   └── Main/
│       ├── Card/
│       └── Popup/
├── images/       # Imágenes e iconos
├── types/        # Tipos e interfaces compartidos
├── vendor/       # Fuentes y normalización CSS
├── index.css
└── main.tsx
```

## Autor

[AllenPrkr](https://github.com/AllenPrkr)
