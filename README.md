# Portfolio

Sitio estático con Astro 6, MDX y contenido en español, gallego e inglés.

## Desarrollo

Instala [mise](https://mise.jdx.dev/getting-started.html) y, desde este repositorio:

```bash
mise trust
mise install
mise run setup
mise run dev
```

`mise.toml` fija Node 24.21.0 y su npm incluido (11.19.0). `setup` ejecuta
`npm ci` con el lockfile existente. Astro sirve en `http://localhost:4321`.
El contenido del CV se descarga del repositorio `jrmougan/cv`: tanto el arranque
como la compilación necesitan acceso a GitHub.

| Comando | Acción |
| --- | --- |
| `mise run setup` | Instalar dependencias desde el lockfile |
| `mise run dev` | Servidor de desarrollo |
| `mise run check` | Compilar para validar contenido y rutas |
| `mise run build` | Generar `dist/` |
| `mise run preview` | Previsualizar la compilación |

No hay una suite independiente de tests o lint; `check` es actualmente el build.
CI utiliza las mismas herramientas y esa misma comprobación.

## Orca y worktrees

En cada checkout nuevo ejecuta `mise trust` y `mise run setup`. El comando de
preparación para un hook de Orca es `mise run setup` (tras confiar en el repo).
No depende de que el shell tenga Node activado; sí requiere `mise` en `PATH`.
Para dos servidores simultáneos, asigna otro puerto al segundo:

```bash
mise run dev -- --port 4322
```

Los comandos npm originales siguen disponibles, por ejemplo
`mise exec -- npm run astro -- --help`.
