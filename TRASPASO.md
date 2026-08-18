# Traspaso de contexto — Sitio web Green Prod & Sustainable

> Documento para retomar el trabajo en una sesión nueva. Resume el estado del
> proyecto, las decisiones tomadas y lo que queda pendiente.
> Última actualización: commit `2498a58`.
>
> Entre `6016a3d` (la actualización anterior de este documento) y `ee06ff2`
> hubo ~44 commits sin traspaso al día: tipografía y hero achicados para
> celular, restauración del video del hero a máxima calidad, galería de
> campo y sección de equipo, Sostenibilidad movida al final, nueva foto de
> productos y cinta de aliados, y — en el commit de hoy — el nuevo titular
> del hero, "¿Quiénes Somos?", el reorden de secciones y las tres piezas de
> la sección 4 más abajo. Si algo de la sección 5 (decisiones antiguas) no
> coincide con el código actual, confiar en el código.

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
Hero id="inicio"                     (titular cinético + video de fondo -palta/lluvia- + polen + parallax)
  ↓ ServicesBento id="soluciones"    (foto de productos + placa blanca "Certificado por: Senasa y Kiwa")
  ↓ MissionVision id="mision-vision" (video agrícola de fondo + 2 tarjetas de vidrio)
  ↓ Partners id="aliados"            (Alianzas Estratégicas, cinta de logos)
  ↓ Products id="productos"          (5 tarjetas de adelanto + botón "Ver catálogo" → /catalogo)
  ↓ FieldGallery id="campo"          (carrusel de fotos del campo, fondo ink)
  ↓ Team                             (Equipo Greenprod)
  ↓ SustainabilityHighlight id="compromiso"  (foto con parallax + lista, "Nuestro Compromiso")
  ↓ News id="casos-exito"            (sigue "Próximamente")
  ↓ Video                            ("Nuestra Esencia", sigue "Próximamente")
  ↓ ReachMap id="cobertura"          (mapa real del Perú interactivo "GreenProd llegó hasta")
```

`/[lang]/catalogo/page.tsx` ya no es la página "en construcción" genérica:
ahora es una sección por categoría con sus productos reales, desde el
diccionario `Catalog.categories` (`{ slug, name, products }`). Los marcadores
de foto se quitaron: mientras no haya fotos reales, cada línea muestra su
nombre dentro del recuadro verde y debajo la lista de sus productos.

Los `id` existen porque el menú "Inicio" del navbar salta a cada sección con
anclas (`/es#soluciones`, etc.). Hay `scroll-padding-top` global en
`app/globals.css` para que el navbar fijo no tape el título al llegar.

> `ValorizationFlow` (el diagrama del 95% que tenía el hero) **se eliminó**
> a pedido del usuario junto con el rediseño del navbar (commit
> `bea14c4`). El texto del hero conserva la mención al 95% de
> aprovechamiento; solo se quitó la pieza visual.

### Productos, catálogo y GreenProd llegó hasta (commits `ee06ff2`…`c12983f`)

A pedido del usuario:

- **`ProductsSection`** (inicio): una entrada por línea de producto, con
  el nombre de la línea en el recuadro verde y sus productos debajo; cada
  una lleva a `/[lang]/catalogo/<slug>`. Antes eran 13 tarjetas, luego 5
  de adelanto con marcador de foto punteado; hoy no hay marcadores de foto.
- **`/[lang]/catalogo`**: página nueva con las categorías reales de
  producto (ver dict `Catalog.categories`), a la espera de fotos y fichas
  técnicas reales.
- **`ReachMapSection`** (ver también §4.1): geografía real, con los 25
  departamentos y las 12 ciudades en sus coordenadas reales. Cada pin
  crece y se pone verde al pasar el mouse. Incluye el logo blanco, el
  código QR real (`public/images/home/qr-greenprod.jpg`, el usuario lo
  dejó en su carpeta de Descargas) y los iconos de Facebook e Instagram
  (no se agregó TikTok: no está confirmado si la empresa tiene cuenta).
- La placa "Certificado por: Senasa y Kiwa" de `ServicesBento` pasó a ser
  un solo recuadro verde con el texto corto "Certificado por:" en letra
  blanca + ambos logos sueltos al lado, en vez del titular grande sobre la
  foto. Los logos van sin realce: el halo blanco que llevaba el de SENASA
  se leía como un resto de recorte.

### 4.1 El mapa de "GreenProd llegó hasta" — cómo está armado

Los datos viven en `lib/peru-map-data.ts` y **no se calculan en runtime**:
los genera un script a partir de los límites departamentales del INEI
(github.com/juaneladio/peru-geojson, dominio público), con proyección
equirectangular. Reglas que costó afinar y conviene no romper:

- **El relleno del país se arma concatenando las mismas 26 piezas
  departamentales** que se dibujan como líneas divisorias
  (`PERU_DEPT_PATHS.join(' ')`). Antes el relleno venía de otra fuente y
  se salía de las líneas. No volver a meter un contorno nacional aparte.
- **El rótulo va siempre DEBAJO de su línea guía**, que es una polilínea:
  sale del pin, llega al costado del mapa (`railX`) y sigue en horizontal
  a lo ancho del rótulo (`blockW`).
- **El texto crece hacia afuera del mapa**, nunca hacia adentro: a la
  izquierda `text-anchor="end"`, a la derecha `"start"`. Tenerlo al revés
  fue lo que hacía que Chanchamayo se viera encimado sobre el país.
- **`railX` se calcula midiendo el borde del país en toda la franja que
  ocupa el rótulo**, no solo a la altura de su línea: el país se ensancha
  hacia abajo y si no, la esquina inferior del texto lo pisa.
- **`blockW` sale de medir el texto REAL en el navegador**
  (`getComputedTextLength`) al tamaño con que se dibuja (14px el nombre,
  11px la región). Si se cambia el tamaño o un nombre, hay que volver a
  medir y regenerar; si no, el reparto deja de ser fiable.
- **Por debajo de `lg` los rótulos se ocultan** y los nombres pasan a una
  lista HTML a 13px: dentro del mapa quedarían en ~4px en celular. Ahí el
  SVG se agranda al 145% dentro de un contenedor con `overflow-hidden` y
  se corre al 46.2% (no al 50%) para centrar **el país**, no el lienzo
  —que es más ancho del lado del rótulo largo de Junín.

Verificado sobre el DOM ya renderizado (no solo en el script): los 12
rótulos quedan debajo de su línea, ninguno pisa a otro, ninguno toca el
relleno del país (`isPointInFill`) y ninguno se sale del lienzo.

**Pendiente del usuario:** ver §7.

---

### 4.2 El flujo de compra (carrito, catálogo y `/pago`)

```
/catalogo  o  /catalogo/<linea>      cada producto con su precio y "Agregar al carrito"
  ↓ CartDrawer                       líneas, cantidades y total; botón "Continuar la compra"
  ↓ /[lang]/pago                     CheckoutForm: datos del comprador + método de pago
  ↓ WhatsApp                         el pedido completo le llega al asesor
```

**Todo el lado comercial sale de `lib/tienda.ts`**: la tabla `PRECIOS`, el
formateo en soles, el total del pedido y la lista de métodos de pago.

- **`PRECIOS` está vacía a propósito.** La empresa todavía no fijó la lista.
  Mientras esté vacía, cada producto dice "A cotizar" y el total dice "Por
  confirmar". Al cargarla (`'gp-trich': 45`), los precios y el total aparecen
  solos en el catálogo, el carrito y la página de pago: no hay que tocar
  ningún componente. La clave es el nombre del producto en minúsculas, lo
  que devuelve `idDeProducto()`.
- **`/[lang]/pago` no se indexa** (`robots: { index: false }`): sin carrito
  detrás siempre se vería vacía.
- **El cobro en línea todavía no existe.** No hay pasarela contratada, así
  que `CheckoutForm` no cobra: arma el pedido —productos, total, datos del
  comprador, tipo de comprobante y el medio con el que quiere pagar— y lo
  manda por WhatsApp. Encima del botón hay un aviso que lo dice con todas
  sus letras, para que nadie crea que ya pagó.
- **Nunca se piden datos de tarjeta en este formulario**, ni se pedirán:
  cuando entre la pasarela, esos datos se teclean en el formulario de la
  pasarela, no en el nuestro. Es lo que evita tener que cumplir PCI-DSS.

**Para encender el cobro real** hacen falta, en este orden:

1. Cuenta de comercio en una pasarela. **Culqi** (recomendada: cubre tarjeta,
   Yape y Plin en un solo contrato, se activa en 1-3 días, sin mensualidad)
   o **Izipay** (conviene si además quieren POS físico en planta). Ambas
   rondan el 3.44% + IGV por transacción nacional. Requiere RUC, cuenta
   bancaria de la empresa y firma del representante legal: **lo abre la
   empresa, no se puede hacer desde acá**.
2. La llave secreta **como secreto de Cloudflare**, nunca en el repositorio.
   La llave pública puede ir como variable pública.
3. Cargar `PRECIOS`.
4. Reemplazar el `window.open` de WhatsApp en `CheckoutForm.enviar()` por la
   llamada a la pasarela. Es el único punto que cambia.

Falta además decidir shipping (hoy solo se avisa que se calcula según el
destino), el mínimo de compra y la emisión de boleta/factura por SUNAT.

---

### 4.3 Ficha de producto, cookies y suscripción

**Cada producto tiene su página**: `/[lang]/catalogo/<linea>/<producto>`
(por ejemplo `/es/catalogo/bioinsecticidas/gp-bauver`). Trae la foto, la
información, la función, la ficha técnica y la hoja de seguridad, más el
precio, el botón de compra y los otros productos de la misma línea. Se llega
desde el menú, el catálogo, la página de la línea y el buscador.

Para eso los productos del diccionario dejaron de ser un texto suelto y
pasaron a ser `{ slug, name }`. El `slug` es el nombre en minúsculas
(`gp-bauver`) y sirve de tres cosas a la vez: URL de la ficha, clave del
carrito y clave de las tablas de `lib/tienda.ts`.

**Las tres tablas de `lib/tienda.ts` funcionan igual entre sí**: vacías
mientras la empresa no entregue el material, y con el sitio ya preparado
para el día que llegue.

| Tabla        | Qué falta                    | Dónde van los archivos     |
| ------------ | ---------------------------- | -------------------------- |
| `PRECIOS`    | La lista de precios          | —                          |
| `FOTOS`      | La foto de cada producto     | `public/images/productos/` |
| `DOCUMENTOS` | Ficha técnica y hoja de seg. | `public/documentos/`       |

Mientras falten, la ficha muestra "Foto próximamente" y "Documento
próximamente" en vez de un enlace roto, y los textos de Información y
Función dicen que están en preparación. **Esos dos textos los tiene que
escribir la empresa**: describir por cuenta propia lo que hace un bioinsumo
sería inventarle la etiqueta a un producto agrícola registrado.

**Aviso de cookies** (`CookieBanner` + `lib/consentimiento.ts`). Distingue
las necesarias —carrito e idioma, no se pueden apagar— de las de medición,
que solo se activan si la persona acepta. Las tres salidas pesan lo mismo en
pantalla: aceptar todo no está más a mano que aceptar lo mínimo. La decisión
se guarda en localStorage con fecha y caduca al año.

**Suscripción a novedades** (`NewsletterForm`, en el pie). Va **aparte** del
aviso de cookies, y no por capricho:

> Una cookie solo guarda un dato para este sitio. **No puede leer el correo
> de nadie ni alcanzar sus otras cuentas.** Aceptar cookies no es, ni puede
> ser, una autorización para mandar publicidad: para eso la persona tiene
> que dejar su correo y marcar una casilla que diga qué va a recibir, y la
> casilla arranca desmarcada porque una premarcada no vale como
> consentimiento (Ley 29733).

Todavía no hay servicio de envío conectado. La suscripción le llega al
asesor por WhatsApp; al contratar Mailchimp, Brevo o similar, lo único que
cambia es el envío dentro de `NewsletterForm`.

**Política de privacidad** en `/[lang]/privacidad`, enlazada desde el aviso
y desde el pie. Describe lo que el sitio hace de verdad, pero **falta que la
revise un abogado** y completar el RUC y el número de inscripción del banco
de datos personales ante la Autoridad Nacional de Protección de Datos
Personales. La propia página lo advierte arriba.

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
- **El hero usa `min-h-screen`: con este método, la captura NUNCA muestra
  nada debajo del hero**, porque el alto de la captura es igual al
  `--window-size` y el hero ya ocupa esa misma altura completa (100vh).
  No sirve agrandar `--window-size` para "bajar más": el hero crece con
  la ventana y se lo sigue comiendo todo.
- **Navegar con ancla (`http://localhost:3000/es#seccion`) para saltar
  más abajo da una captura rota** (navbar fantasma, huecos en blanco):
  probado el 2026-08-17, no se encontró la causa exacta ni una bandera
  de Chrome que lo arregle. Cuando se necesite ver algo debajo del hero,
  usar `get_page_text` / `read_page` / JS (`scrollIntoView` +
  `getComputedStyle`) para verificar contenido y estructura — es
  fiable — y no insistir con capturas de pantalla para esas secciones.

---

## 7. Pendientes

### Depende del usuario (bloqueado)

- [ ] **Clave de Gemini** como secreto en Cloudflare (ver §5).
- [ ] **Confirmar la ubicación del mapa**: está centrado en «AA.HH. Tres
      Estrellas, Nuevo Chimbote» (deducido). Si el pin no es exacto, hace falta
      el enlace de Google Maps del local.
- [ ] **Enlace de LinkedIn** (se quitó el icono para no dejarlo muerto; ya están
      Facebook e Instagram).
- [x] ~~Código QR para "GreenProd llegó hasta"~~ — resuelto: el usuario dejó el
      archivo en su carpeta de Descargas, se copió a
      `public/images/home/qr-greenprod.jpg` (commit `c12983f`).
- [x] ~~El mapa de "GreenProd llegó hasta": contorno a mano, sin divisiones,
      etiquetas amontonadas y relleno saliéndose de las líneas~~ — resuelto en tres pasadas (`381c46b`, `1501643`,
      `b5ca8f5`): los 25 departamentos como líneas internas (fuente INEI vía
      juaneladio/peru-geojson) + mapa a mayor escala para que las etiquetas
      del norte no se encimen + pin tipo marcador (gota oscura con punto
      verde) + el relleno se arma concatenando las mismas 26 piezas
      departamentales en vez de un contorno nacional de otra fuente, así es
      geométricamente imposible que quede por fuera de las líneas. Datos en
      `lib/peru-map-data.ts`. Pendiente que el usuario confirme que las 12
      ubicaciones quedaron bien — confirmado por el usuario (commit `a7b4942`).
- [x] ~~El catálogo mostraba una sola tarjeta por categoría~~ — resuelto
      (`a7b4942`): cada categoría lista sus productos reales, dato de
      `Catalog.categories` en `messages/es.json` y `en.json`
      (`{ slug, name, products }`). Lista vigente, la que dictó el usuario:
      Biofungicidas (GP-Trich, GP-Trichobac, GP-Subtix), Bioinsecticidas
      (GP-Bauver, GP-Meta, GP-Thuring, GP-Warduo), Bionematicida (GP-Lilax),
      Biofertilizante (GP-Bio), Bioestimulante (GP-Megafort) y Coadyuvantes
      (GP-Clean, GP-Oil) — seis líneas, no siete: Aceite Agrícola y Jabón
      Potásico dejaron de ser categorías y pasaron a ser los dos productos
      de Coadyuvantes.
- [ ] **Confirmar Biofertilizante vs. Bioestimulante**: el usuario dictó
      GP-Bio como biofertilizante y GP-Megafort como bioestimulante, pero
      los envases que se ven en la foto del inicio
      (`public/images/home/productos-campo.webp`) dicen lo contrario —
      "gp≈megafort · BIOFERTILIZANTE MULTIFUNCIONAL" y "gp≈bio ·
      BIOESTIMULANTE". Está puesto como lo pidió el usuario; si el envase
      manda, es intercambiar los dos productos en `Catalog.categories`.
- [ ] **Fotos reales de cada producto** — el hueco ya está hecho en el menú,
      el catálogo y la ficha. Van a `public/images/productos/` y se anotan en
      `FOTOS` (`lib/tienda.ts`). Ver §4.3.
- [ ] **Ficha técnica y hoja de seguridad de cada producto** (PDF) — la ficha
      de producto ya tiene su sitio y hoy dice "documento próximamente". Van a
      `public/documentos/` y se anotan en `DOCUMENTOS`.
- [ ] **Textos de Información y Función de cada producto** — los tiene que
      escribir la empresa. No se inventan: es la etiqueta de un producto
      agrícola registrado.
- [ ] **Servicio de envío de correos** (Mailchimp, Brevo o similar) para que
      la suscripción del pie mande sola las novedades. Hoy le llega al asesor
      por WhatsApp.
- [ ] **Revisión legal de la política de privacidad** (`/[lang]/privacidad`) y
      completar el RUC y el número de inscripción del banco de datos
      personales.
- [ ] **Confirmar si se agrega TikTok** a los sociales de "GreenProd llegó
      hasta" (el mockup del usuario lo mostraba junto a Facebook e Instagram)
      y, de ser así, el enlace de la cuenta.
- [ ] **Contenido real de las páginas de producto**: siguen con texto
      _Lorem ipsum_ y fotos de `picsum.photos`.
- [ ] **Fotos y video propios** de planta, productos y equipo, para reemplazar
      el material de stock.
- [ ] Decidir si se activan las secciones ya diseñadas pero apagadas:
      `CertificationsSection`, `ImpactStatsSection`, `ValuesSection`,
      `SustainabilitySection`. **Impacto necesita cifras reales** (no inventar).
- [ ] Contenido para Aliados, Casos de Éxito y Video corporativo
      (hoy los tres dicen "Próximamente").
- [ ] **Términos y Condiciones**: siguen apuntando a `#`. La Política de
      Privacidad ya existe en `/[lang]/privacidad` (pendiente de revisión legal).
- [ ] **Formulario de contacto**: no envía nada. Falta decidir a dónde llegan
      los mensajes.
- [ ] **Pago real del carrito** — el flujo de compra ya está armado
      (catálogo con "Agregar al carrito" → carrito con total → `/pago` con
      datos del comprador y elección entre tarjeta, Yape, Plin y
      transferencia). Falta solo lo que depende de la empresa: **abrir la
      cuenta de comercio** (Culqi o Izipay) y pasar las llaves, y **la lista
      de precios**. Los pasos exactos están en §4.2. Hasta entonces el
      pedido se cierra por WhatsApp y el aviso en pantalla deja claro que no
      se está cobrando.
- [ ] **Lista de precios por producto** para cargar en `PRECIOS`
      (`lib/tienda.ts`). Hoy está vacía y todo dice "A cotizar".
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
