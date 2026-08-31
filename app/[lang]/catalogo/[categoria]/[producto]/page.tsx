import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Download, FileText, Lock, ShieldAlert } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';
import Reveal from '@/components/shared/Reveal';
import BoxedLabel from '@/components/shared/BoxedLabel';
import ProductPhoto from '@/components/shared/ProductPhoto';
import AddToCartButton from '@/components/shared/AddToCartButton';
import { documentosDe, formatearSoles, precioDe } from '@/lib/tienda';

interface Producto {
  slug: string;
  name: string;
  informacion?: string;
  funcion?: string;
}

interface Categoria {
  slug: string;
  name: string;
  products: Producto[];
}

/** Una página por producto: foto, información, función y sus dos documentos. */
export function generateStaticParams() {
  return (esMessages.Catalog.categories as Categoria[]).flatMap((cat) =>
    cat.products.flatMap((prod) =>
      ['es', 'en'].map((lang) => ({ lang, categoria: cat.slug, producto: prod.slug }))
    )
  );
}

export default async function FichaProducto({
  params,
}: {
  params: Promise<{ lang: string; categoria: string; producto: string }>;
}) {
  const { lang, categoria, producto } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const p = dictionary.Product;
  const cat = (dictionary.Catalog.categories as Categoria[]).find((x) => x.slug === categoria);
  const item = cat?.products.find((x) => x.slug === producto);

  if (!cat || !item) notFound();

  const precio = precioDe(item.slug);
  const docs = documentosDe(item.slug);
  const otros = cat.products.filter((x) => x.slug !== item.slug);

  const documentos = [
    {
      Icono: FileText,
      titulo: p.sheetTitle,
      descripcion: p.sheetDesc,
      archivo: docs.fichaTecnica,
    },
    {
      Icono: ShieldAlert,
      titulo: p.safetyTitle,
      descripcion: p.safetyDesc,
      archivo: docs.hojaSeguridad,
    },
  ];

  return (
    <div className="bg-paper min-h-screen py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal preset="fadeIn">
          <Link
            href={`/${lang}/catalogo/${cat.slug}`}
            className="text-ink/50 hover:text-gp-green mb-10 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {p.backToLine}: {cat.name}
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[42rem_1fr] lg:gap-14">
          <Reveal preset="rootScale">
            <ProductPhoto
              id={item.slug}
              name={item.name}
              sizes="(max-width: 1024px) 100vw, 672px"
              pendingLabel={p.photoPending}
            />
          </Reveal>

          <div className="space-y-8">
            <Reveal group gap={0.1}>
              <Reveal preset="child">
                <Link href={`/${lang}/catalogo/${cat.slug}`} className="inline-block">
                  <BoxedLabel size="sm">{cat.name}</BoxedLabel>
                </Link>
              </Reveal>
              <Reveal preset="child">
                <h1 className="font-display text-ink mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                  {item.name}
                </h1>
              </Reveal>
              <Reveal preset="child">
                <p className="text-ink/70 mt-2 text-lg font-semibold">
                  {precio === null ? dictionary.Checkout.pendingPrice : formatearSoles(precio)}
                </p>
              </Reveal>
              <Reveal preset="child">
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <AddToCartButton
                    id={item.slug}
                    name={item.name}
                    href={`/catalogo/${cat.slug}/${item.slug}`}
                    addLabel={dictionary.Navbar.cart_add}
                    addedLabel={dictionary.Navbar.cart_added}
                  />
                  <Link
                    href={`/${lang}/contacto`}
                    className="border-line-warm/60 text-ink hover:border-gp-green hover:text-gp-green rounded-full border-2 px-6 py-3 text-sm font-bold transition-colors"
                  >
                    {p.askAdvisor}
                  </Link>
                </div>
              </Reveal>
            </Reveal>

            <Reveal preset="growUp" className="space-y-6">
              <section>
                <h2 className="font-display text-ink mb-2 text-lg font-semibold">{p.infoTitle}</h2>
                {/* El texto lo da la empresa (Word e infografía de productos).
                    Mientras un producto no lo tenga, se muestra el aviso. */}
                {item.informacion ? (
                  <p className="text-ink/70 text-sm leading-relaxed">{item.informacion}</p>
                ) : (
                  <p className="text-ink/50 text-sm italic">{p.infoPending}</p>
                )}
              </section>

              <section>
                <h2 className="font-display text-ink mb-2 text-lg font-semibold">{p.useTitle}</h2>
                {item.funcion ? (
                  <p className="text-ink/70 text-sm leading-relaxed">{item.funcion}</p>
                ) : (
                  <p className="text-ink/50 text-sm italic">{p.usePending}</p>
                )}
              </section>
            </Reveal>
          </div>
        </div>

        <Reveal group gap={0.08} className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {documentos.map(({ Icono, titulo, descripcion, archivo }) => (
            <Reveal key={titulo} preset="child">
              <div className="border-line-warm/40 flex h-full items-start gap-4 rounded-2xl border bg-white/60 p-5">
                <span className="bg-gp-green/10 text-gp-green flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                  <Icono className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-ink text-base font-bold">{titulo}</h3>
                  <p className="text-ink/60 mt-0.5 text-sm">{descripcion}</p>
                  {archivo ? (
                    <a
                      href={archivo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gp-blue hover:text-gp-green mt-3 inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      {p.download}
                    </a>
                  ) : (
                    <span className="text-ink/35 mt-3 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
                      <Lock className="h-3.5 w-3.5" />
                      {p.docPending}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </Reveal>

        {otros.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-ink mb-5 text-xl font-semibold">{p.otherProducts}</h2>
            <Reveal
              group
              gap={0.06}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            >
              {otros.map((otro) => (
                <Reveal key={otro.slug} preset="child">
                  <Link
                    href={`/${lang}/catalogo/${cat.slug}/${otro.slug}`}
                    className="group border-line-warm/40 hover:border-gp-green/60 block rounded-2xl border bg-white/60 p-3 transition-colors"
                  >
                    <ProductPhoto
                      id={otro.slug}
                      name={otro.name}
                      sizes="(max-width: 640px) 50vw, 260px"
                    />
                    <p className="text-ink group-hover:text-gp-green mt-3 flex items-center justify-between gap-1 text-sm font-bold transition-colors">
                      {otro.name}
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </p>
                  </Link>
                </Reveal>
              ))}
            </Reveal>
          </section>
        )}
      </div>
    </div>
  );
}
