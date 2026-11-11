import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductExperience } from "@/components/product-experience";
import { findVariant, formatPrice, variants } from "@/src/content/catalogue";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return variants.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const variant = findVariant(slug);
  if (!variant) return {};

  return {
    title: variant.name,
    description: `${variant.story} ${formatPrice(variant.price.amountMinor)}. Available in Large and Extra Large.`,
    openGraph: {
      title: `${variant.name} — Wearroiye`,
      description: variant.story,
      images: [{ url: variant.heroImage.src, alt: variant.heroImage.alt }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const variant = findVariant(slug);
  if (!variant) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wearroiye.vercel.app";
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: variant.name,
    image: variant.gallery.map((photo) => `${baseUrl}${photo.src}`),
    description: variant.story,
    brand: { "@type": "Brand", name: "Wearroiye" },
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: "30000",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/catalogue/${variant.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }}
      />
      <ProductExperience variant={variant} />
    </>
  );
}
