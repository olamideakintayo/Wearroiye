export type CatalogueImage = {
  src: string;
  alt: string;
};

export type CollectionVariant = {
  slug: string;
  number: string;
  name: string;
  shortName: string;
  story: string;
  price: { currency: "NGN"; amountMinor: 3_000_000 };
  sizes: readonly ["L", "XL"];
  availability: "in_stock";
  heroImage: CatalogueImage;
  gallery: readonly CatalogueImage[];
  enquiryMessage: string;
};

export type PurchaseAction =
  | { kind: "whatsapp"; phoneE164: "2349032592825" }
  | { kind: "checkout"; checkoutUrl: string };

const image = (folder: string, prefix: string, index: number, alt: string): CatalogueImage => ({
  src: `/media/${folder}/${prefix}-${String(index).padStart(2, "0")}.jpg`,
  alt,
});

const cuffedAlts = [
  "Back view of the Wearroiye cuffed long sleeve on the railway platform",
  "Woman styling the cuffed long sleeve beside the platform line",
  "Three models showing the front and embroidered back of the cuffed piece",
  "Two models in cuffed long sleeves against the station wall",
  "Front and back styling of the cuffed long sleeve",
  "Group back view showing the Dreams Turned Reality embroidery",
  "Three models wearing the cuffed variation in warm evening light",
  "Full group portrait in the cuffed long sleeve",
  "Close editorial portrait showing front and back details",
  "Two models presenting the cuffed silhouette",
  "Behind-the-scenes view of the embroidered cuffed back",
  "Solo portrait in the cuffed long sleeve",
  "Full-length platform portrait in the cuffed piece",
];

const freeCuffAlts = [
  "Layered group portrait in the free-cuff long sleeve",
  "Front and back view of the relaxed free-cuff silhouette",
  "Models showing the rose mark and Dreams Turned Reality back",
  "Three-person editorial portrait in the free-cuff variation",
  "Close group composition showing the free-cuff fit",
  "Back embroidery and front rose mark on the free-cuff piece",
  "Two models styling the free-cuff long sleeve with shorts",
  "Platform wall portrait in the free-cuff variation",
  "Full-length railway platform styling of the free-cuff piece",
  "Two models in relaxed free-cuff silhouettes",
  "Couple portrait beneath the station canopy",
  "Front and back styling on the railway platform",
  "Full-length pair portrait in the free-cuff variation",
  "Editorial pair portrait in the free-cuff long sleeve",
];

const shortSleeveAlts = [
  "Three models in the Wearroiye short sleeve beside a freight train",
  "Group portrait showing the short sleeve silhouette",
  "Front view of three short sleeve looks",
  "Back embroidery on the short sleeve beside the railway track",
  "Two models walking in short sleeve pieces under the station canopy",
  "Three-person short sleeve editorial portrait",
  "Relaxed group styling of the short sleeve variation",
  "Back view of two short sleeve looks on the platform",
  "Front and back short sleeve styling beneath the station clock",
  "Solo full-length portrait in the short sleeve",
  "Back embroidery detail in the short sleeve variation",
  "Solo trackside portrait in the Wearroiye short sleeve",
];

const makeGallery = (folder: string, prefix: string, alts: string[]) =>
  alts.map((alt, index) => image(folder, prefix, index + 1, alt));

export const variants: readonly CollectionVariant[] = [
  {
    slug: "cuffed-long-sleeve",
    number: "01",
    name: "Cuffed Long Sleeve",
    shortName: "Cuffed",
    story: "A composed silhouette for the moments when intention becomes visible.",
    price: { currency: "NGN", amountMinor: 3_000_000 },
    sizes: ["L", "XL"],
    availability: "in_stock",
    heroImage: image("cuffed-long-sleeve", "cuffed", 7, cuffedAlts[6]),
    gallery: makeGallery("cuffed-long-sleeve", "cuffed", cuffedAlts),
    enquiryMessage: "the Cuffed Long Sleeve from Dreams Turned Reality",
  },
  {
    slug: "free-cuff-long-sleeve",
    number: "02",
    name: "Free-Cuff Long Sleeve",
    shortName: "Free cuff",
    story: "Freedom in the finish. Quiet structure with room to become.",
    price: { currency: "NGN", amountMinor: 3_000_000 },
    sizes: ["L", "XL"],
    availability: "in_stock",
    heroImage: image("free-cuff-long-sleeve", "free-cuff", 6, freeCuffAlts[5]),
    gallery: makeGallery("free-cuff-long-sleeve", "free-cuff", freeCuffAlts),
    enquiryMessage: "the Free-Cuff Long Sleeve from Dreams Turned Reality",
  },
  {
    slug: "short-sleeve",
    number: "03",
    name: "Short Sleeve",
    shortName: "Short sleeve",
    story: "The essential expression of the drop: simple, grounded, complete.",
    price: { currency: "NGN", amountMinor: 3_000_000 },
    sizes: ["L", "XL"],
    availability: "in_stock",
    heroImage: image("short-sleeve", "short-sleeve", 2, shortSleeveAlts[1]),
    gallery: makeGallery("short-sleeve", "short-sleeve", shortSleeveAlts),
    enquiryMessage: "the Short Sleeve from Dreams Turned Reality",
  },
] as const;

export const whatsappAction: PurchaseAction = {
  kind: "whatsapp",
  phoneE164: "2349032592825",
};

export const findVariant = (slug: string) => variants.find((variant) => variant.slug === slug);

export const formatPrice = (amountMinor: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amountMinor / 100);

export const buildWhatsAppHref = (variant: CollectionVariant, size: "L" | "XL") => {
  const message = `Hello Wearroiye, I’m interested in ${variant.enquiryMessage}, size ${size}. Is it available?`;
  return `https://wa.me/${whatsappAction.kind === "whatsapp" ? whatsappAction.phoneE164 : ""}?text=${encodeURIComponent(message)}`;
};
