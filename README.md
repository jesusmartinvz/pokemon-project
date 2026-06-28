# Pokemon Project

Aplicación web desarrollada con React que consume la PokéAPI, que permite listar, buscar, filtrar y guardar Pokémon favoritos en el navegador.

## Requisitos

- Node.js 18 o superior
- npm

## Stack utilizado

- React 19 + TypeScript
- Vite
- React Router DOM v6
- CSS Modules
- lucide-react

## Funcionalidades implementadas

- Listado paginado de Pokemones.
- Tarjetas detallada con imagen, nombre y tipo/s
- Búsqueda por nombre sobre el resultado obtenido del listado.
- Filtrado por tipo de pokemon usando el endpoint `/type`.
- Vista detallada por pokemón
- Lista de favoritos con persistencia en localStorage.
- Estados de carga y error.
- Diseño responsivo.
- Skeleton loading en lista y detalle

## API utilizada

La aplicación consume la [PokéAPI](https://pokeapi.co):

```
GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
GET https://pokeapi.co/api/v2/pokemon/{id_o_nombre}
GET https://pokeapi.co/api/v2/type
GET https://pokeapi.co/api/v2/type/{nombre}
```

Para el listado principal se usa el endpoint paginado de Pokémon.
Para el detalle se consulta cada Pokémon por nombre.
Para el filtro por tipo se obtiene primero la lista de tipos y luego los Pokémon asociados al tipo seleccionado.

## Instalación y ejecución local

Clona el repositorio:

```bash
git clone <url-del-repositorio>
```

Ingresa a la carpeta del proyecto:

```bash
cd pokemon-project
```

Instala las dependencias:

```bash
npm install
```

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Luego abre en el navegador la URL que aparece en la terminal. Normalmente será `http://localhost:5173`.

## Scripts disponibles

```bash
npm run dev      # Ejecuta la aplicación en modo desarrollo
npm run build    # Genera la versión de producción en /dist
npm run preview  # Previsualiza la build de producción localmente
npm run lint     # Ejecuta ESLint para revisar el código
```

## Estructura del proyecto

```
src/
├── api/          # Llamadas HTTP a la PokéAPI
├── mappers/      # Transformación de respuestas de la API a tipos internos
├── hooks/        # Custom hooks (usePokemonList, useFavorites, useTypeFilter)
├── components/   # Componentes reutilizables
├── pages/        # Páginas de la aplicación
└── types/        # Tipos TypeScript
```

## Decisiones técnicas

**Componentes reutilizables:**

La interfaz se dividió en componentes pequeños siguiendo la idea base de Atomic Design: construir pantallas a partir de piezas simples, reutilizables y fáciles de mantener.

Por ejemplo:

- `TypeLabel` funciona como una pieza pequeña de UI.
- `SearchBox` y `TypeFilter` agrupan controles simples.
- `PokemonCard` combina imagen, nombre, tipos y acción de favorito.
- `PokemonList` compone varias tarjetas.
- Las páginas como `HomePage`, `PokemonDetailPage` y `FavoritesPage` solo ensamblan componentes y conectan la lógica necesaria.

Esta separación permite reutilizar componentes, mantener archivos más pequeños y evitar mezclar demasiada lógica visual dentro de una sola página.

**Separación API / mapper:** Las funciones dentro de `api/` se encargan únicamente de realizar las llamadas HTTP y manejar errores de respuesta. La transformación de los datos recibidos desde la PokéAPI se realiza en `mappers/`. Esto permite separar la estructura externa de la API del modelo interno usado por la aplicación.

**CSS Modules:** Se eligió CSS Modules para mantener los estilos separados por componente, evitando conflictos de nombres de clases sin agregar una librería adicional de estilos.

**lucide-react:** Se utilizó para manejar íconos de forma ligera y consistente dentro de la interfaz.

**Sin estado global:** `useState` y `useEffect` son suficientes para la escala del proyecto. No se utilizaron librerías como Redux o Zustand porque el alcance del reto puede construirse correctamente con `useState`, `useEffect` y hooks personalizados.

**TypeScript:** Se utilizó TypeScript para tipar las respuestas de la API, los datos internos y las props de los componentes. Esto ayuda a detectar errores durante el desarrollo y mejora la claridad del código.

**Hooks personalizados:** La lógica reutilizable se separó en hooks personalizados: `usePokemonList`, `useFavorites` y `useTypeFilter`. Esto permite mantener las páginas más limpias y separar la lógica de carga de datos.
