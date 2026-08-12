# Traspaso de contexto — Sitio web Green Prod & Sustainable

> Documento para retomar el trabajo en una sesión nueva. Resume el estado del
> proyecto, las decisiones tomadas y lo que queda pendiente.
> Última actualización: commit `6016a3d`.

---

## 1. Lo esencial

| Dato          | Valor                                                                                 |
| ------------- | ------------------------------------------------------------------------------------- |
| Repositorio   | `GreenProdANDSustainable/WebPage-Main-Principal-Informativa` (rama `main`)            |
| Carpeta local | `C:\Users\juanr\Downloads\WebPage-Main-Principal-Informativa-main`                    |
| Web en vivo   | https://pag-web.gerencia-9cb.workers.dev                                              |
| Stack         | Next.js 15 (App Router, i18n `/[lang]` es·en) · Tailwind v4 · TypeScript · Motion v12 |
| Despliegue    | Automático a Cloudflare Workers (OpenNext) en cada push a `main`                      |
| Empresa       | Economía circular agroindustrial en Nuevo Chimbote, Áncash, Perú                      |

**Público objetivo: agricultores, mayoritariamente desde el celular.** Esto manda
en cada decisión: peso de las descargas, legibilidad y tamaño de letra.

### Comandos

```bash
npm run dev          # desarrollo
npm run lint -- --max-warnings=0
npm run typecheck
npm run test:coverage
npm run build
```

> **Nunca ejecutar `npm run build` con el servidor de desarrollo encendido:**
> ambos escriben en `.next/` y la caché se corrompe. Si pasa: parar el servidor,
> `rm -rf .next` y reiniciar.

---

## 2. Reglas de trabajo que pidió el usuario

1. **Subir siempre al terminar.** No pedir permiso para modificar ni desplegar.
2. **No cambiar textos ni rutas de imágenes existentes** salvo que lo pida.
3. **Perfección responsive**: debe verse impecable en PC _y_ celular.
4. Antes de cada commit: `format`, `lint --max-warnings=0`, `typecheck`, `test`, `build`.
5. **No tocar el token de Cloudflare.**
6. Idioma de trabajo: español.

---

## 3. Sistema de movimiento (`lib/motion.ts`)

El lenguaje de animación nace del rubro: crecimiento orgánico, flujo y ciclo.

- **Curvas propias**: `growth` (gesto por defecto), `sprout` (con sobrepaso), `flow`.
- **Variantes**: `growUp`, `fadeIn`, `slideInLeft/Right`, `rootScale`, `stagger()`.
- **Reglas**: solo se anima `transform` y `opacity`; todo revela una vez
  (`viewport.once`); menos partículas en pantallas chicas.
- **Accesibilidad**: `MotionProvider` envuelve la app con
  `MotionConfig reducedMotion="user"`, así **toda** animación respeta la
  preferencia del sistema sin repetir la comprobación en cada componente.

### Componentes reutilizables (`components/shared/`)

| Componente       | Para qué sirve                                                      |
| ---------------- | ------------------------------------------------------------------- |
| `Reveal`         | Revelado al hacer scroll; `group` + hijos `preset="child"` encadena |
| `KineticHeading` | Titulares que se escriben palabra por palabra                       |
| `Marquee`        | Cinta de texto en movimiento continuo                               |
| `AmbientSpores`  | Polen en canvas sobre el hero; se pausa fuera de pantalla           |
| `GrowthProgress` | Avance de lectura como tallo que crece (solo en `lg+`)              |
| `TiltCard`       | Tarjeta que se inclina siguiendo el cursor                          |
| `ParallaxMedia`  | Imagen que se desplaza más lento que la página                      |
| `VideoBackdrop`  | Fondo de video encadenado con respeto por el ahorro de datos        |
| `PageTransition` | Transición entre páginas                                            |
| `WhatsAppIcon`   | Glifo oficial de WhatsApp (lucide no trae marcas)                   |

---

## 4. Estructura del inicio (`app/[lang]/page.tsx`)

```
Hero id="inicio"          (titular cinético + video de fondo -palta/lluvia- + polen + parallax)
  ↓ Marquee                (cinta con lo que hace la empresa)
  ↓ ServicesBento id="soluciones"      (5 líneas de negocio, retícula asimétrica con fotos)
  ↓ MissionVision id="mision-vision"   (video agrícola de fondo + 2 tarjetas de vidrio)
  ↓ SustainabilityHighlight id="compromiso"  (foto con parallax + lista)
  ↓ Partners id="aliados" · News id="casos-exito" · Video (los tres siguen "Próximamente")
```

Los `id` existen porque el menú "Inicio" del navbar salta a cada sección con
anclas (`/es#soluciones`, etc.). Hay `scroll-padding-top` global en
`app/globals.css` para que el navbar fijo no tape el título al llegar.

> `ValorizationFlow` (el diagrama del 95% que tenía el hero) **se eliminó**
> a pedido del usuario junto con el rediseño del navbar (commit
> `bea14c4`). El texto del hero conserva la mención al 95% de
> aprovechamiento; solo se quitó la pieza visual.

---

## 5. Decisiones importantes (y por qué)

### Tipografía

El usuario pidió **Leelawadee UI**, que es propiedad de Microsoft y **no se puede
auto-hospedar**: en celulares y Mac nunca se vería. Se incrustó **Selawik**
(alternativa libre de Microsoft, visualmente equivalente) vía `next/font/local`.
Orden: `'Leelawadee UI', var(--font-selawik), system-ui`.

> Ojo con Tailwind v4: elimina del CSS final cualquier variable `--font-*`
> personalizada que no coincida con una clase literal. Por eso los valores van
> directos en `--font-sans/mono/display` dentro de `@theme`, sin variables
> intermedias. Además `selawik.variable` va en `<html>`, no en `<body>`,
> porque `--font-sans` se declara en `:root`.

### Despliegue (fallo ya resuelto — no repetir)

Instalar `framer-motion` por separado **rompió el despliegue durante días**:
npm rehizo el árbol y dejó fuera `esbuild`, que `@opennextjs/cloudflare`
necesita. El job de calidad pasaba en verde y solo moría el deploy.

> **`framer-motion` NO debe declararse en `package.json`**: ya viene como
> dependencia de `motion`. Importar siempre desde `motion/react`.
> Si el deploy vuelve a fallar, comprobar que `"node_modules/esbuild"` sigue
> en `package-lock.json`.

### Asistente de IA

La clave vive **solo en el servidor** (`GEMINI_API_KEY`), en la ruta
`app/api/chat`. El componente solo hace `fetch('/api/chat')`.
**Pendiente del usuario:** cargar el secreto en Cloudflare
(Workers & Pages → `pag-web` → Settings → Variables and Secrets).
Sin él, el asistente responde con un mensaje amable de "no disponible".
Modelo configurable con `GEMINI_MODEL` (por defecto `gemini-2.5-flash`).

### Video de Misión y Visión

Tres clips (`public/videos/agro-*.mp4`, ~4 MB en total, licencia libre para uso
comercial) que se funden en bucle: germinación → riego → cosecha.
`VideoBackdrop` **no los descarga** si la conexión pide ahorrar datos o si se
pidió menos movimiento; en ese caso queda la foto de portada.

### Carniprod

Línea **discontinuada**. Se eliminó por completo: tarjeta, página, menú, logo y
claves de los diccionarios. No reintroducir.

### Navbar ampliado y carrito de compras (commit `bea14c4`)

El usuario pidió replicar un mockup de referencia: navbar con mega-menú,
fondo verde tipo "pastilla" al pasar el mouse por cualquier link o
dropdown (`pillClass` en `Navbar.tsx`), y un carrito de compras.

- **Menú**: Inicio (anclas al home), Nosotros, Productos y Servicios,
  Sostenibilidad (ahora también dropdown, con Indicadores de Impacto y
  Certificaciones), Clientes, Certificaciones, Contacto.
- **"Nuestra Capacidad"**, **"Indicadores de Impacto"** y
  **"Certificaciones"** son secciones nuevas con el componente compartido
  `ComingSoon` (mismo patrón punteado que ya usaban Aliados/Casos de
  Éxito) — **a propósito no se activó** `CertificationsSection` ni
  `ImpactStatsSection` con datos, porque esa decisión sigue pendiente
  (ver §7) y esas cifras no se pueden inventar.
- **Carrito** (`lib/cart-context.tsx`, `CartDrawer.tsx`,
  `AddToCartButton.tsx`): persiste en `localStorage` vía
  `useSyncExternalStore` (mismo patrón que `VideoBackdrop`, para no romper
  la hidratación). Tiene botón "Agregar al carrito" en las 5 líneas reales
  de producto/servicio (Balik, Ceprobio, Planta, Proveeduría, Proyectos).

  > **Importante — el usuario pidió pago real con tarjeta, pero eso no
  > está construido todavía.** Hoy no hay precios reales de ningún
  > producto (las páginas siguen con Lorem ipsum) ni una pasarela de pago
  > conectada (Culqi/MercadoPago/etc. necesitan que el usuario cree la
  > cuenta y entregue las claves, igual que con `GEMINI_API_KEY`). Como
  > no se pueden inventar precios, el carrito hoy cierra con **"Solicitar
  > cotización por WhatsApp"** (arma el mensaje con los productos y
  > cantidades). Cuando haya precios reales y una cuenta de pago, hay que
  > reemplazar ese botón por el checkout real.

### Video del hero (commit `6016a3d`)

`public/videos/hero-avocado.mp4` (~11 MB, hojas de palta bajo lluvia,
Pixabay Content License — uso comercial libre, autor
MaliAroestiPhotography). Reemplaza la foto fija del hero vía
`VideoBackdrop`. Se eligió la variante "tiny" de Pixabay (no la de máxima
calidad, ~68 MB) por el público que entra desde el celular.

---

## 6. Verificación en este entorno (importante)

El panel de navegador integrado **no compone fotogramas** (`document.hidden`
siempre `true`), así que:

- Las **capturas fallan** y las animaciones basadas en `requestAnimationFrame`
  quedan congeladas a mitad.
- **Las mediciones del DOM sí son fiables**, pero solo después de
  `resize_window` (si no, `innerWidth` vale 0).

**Método que funciona:** capturar con Chrome headless.

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu `
  --hide-scrollbars --autoplay-policy=no-user-gesture-required `
  --window-size=1280,2900 --virtual-time-budget=16000 `
  --screenshot="salida.png" "http://localhost:3000/es"
```

- Añadir `--force-prefers-reduced-motion` para ver el **estado final** ya armado.
- **Las capturas en ancho de móvil salen recortadas: es un artefacto del
  headless, no un desbordamiento real.** Comprobar siempre midiendo
  `scrollWidth === clientWidth` en el navegador tras `resize_window`.

---

## 7. Pendientes

### Depende del usuario (bloqueado)

- [ ] **Clave de Gemini** como secreto en Cloudflare (ver §5).
- [ ] **Confirmar la ubicación del mapa**: está centrado en «AA.HH. Tres
      Estrellas, Nuevo Chimbote» (deducido). Si el pin no es exacto, hace falta
      el enlace de Google Maps del local.
- [ ] **Enlace de LinkedIn** (se quitó el icono para no dejarlo muerto; ya están
      Facebook e Instagram).
- [ ] **Contenido real de las páginas de producto**: siguen con texto
      _Lorem ipsum_ y fotos de `picsum.photos`.
- [ ] **Fotos y video propios** de planta, productos y equipo, para reemplazar
      el material de stock.
- [ ] Decidir si se activan las secciones ya diseñadas pero apagadas:
      `CertificationsSection`, `ImpactStatsSection`, `ValuesSection`,
      `SustainabilitySection`. **Impacto necesita cifras reales** (no inventar).
- [ ] Contenido para Aliados, Casos de Éxito y Video corporativo
      (hoy los tres dicen "Próximamente").
- [ ] Textos legales (Política de Privacidad y Términos van a `#`).
- [ ] **Formulario de contacto**: no envía nada. Falta decidir a dónde llegan
      los mensajes.
- [ ] **Pago real del carrito**: crear cuenta en una pasarela de pago
      (Culqi recomendado para Perú) y dar las claves; y precios reales por
      producto. Hasta entonces el carrito cierra por WhatsApp (ver §5).
- [ ] **Confirmar certificaciones reales**: `Home.certifications` en los
      diccionarios ya lista ISO 9001, ISO 14001, HACCP y "Certificación
      Orgánica" — hay que confirmar que la empresa las tiene de verdad
      antes de activar `CertificationsSection` (afirmar una certificación
      que no se tiene es un problema serio, no solo estético).

### Técnico

- [ ] `/images/sustainability-bg.jpg` no existe; lo referencia
      `SustainabilitySection` (hoy sin usar).
- [ ] Archivo suelto `&1` de 0 bytes en la raíz (error de consola). Se puede borrar.
- [ ] Riesgo conocido y asumido: el contenido con `initial={{opacity:0}}` depende
      de que cargue el JS. Es el patrón que ya traía el proyecto.

---

## 8. Datos de la empresa (ya en el sitio)

- **Dirección**: Av. Uno Mz. 1 Lote 1, Bloque "E", AA.HH. Tres Estrellas,
  módulos 6, 12 y 13 — Nuevo Chimbote, Áncash.
- **Teléfono y WhatsApp**: +51 919 514 085 · **Horario**: L–V 8am–6pm
- **Correos**: contacto@greenprod.pe · ventas@greenprod.pe
- **Redes**: facebook.com/greenprodsustainable · instagram.com/greenprodsustainable
- **Paleta**: verde `#6dbe51` · azul `#2475ba` · ink `#14170f` · husk `#eae4d3` · paper `#f6f4ec`

---

## 9. Trabajos entregados aparte del sitio

En `C:\Users\juanr\Downloads\`:

- `JImenezLayzaNathalyJimenez_IF.pdf` — trabajo de Psicología Educativa
  (programa preventivo contra el bullying, UTP). **Aviso: el diagnóstico
  situacional que incluye es plausible pero inventado**, porque no se tenía el
  original; hay que reemplazarlo antes de entregarlo.
- `Informe_Tecnico_WebGreenProd.pdf` — informe de cambios del sitio.
- `Checklist_WebGreenProd.pdf` — checklist de información pendiente.
