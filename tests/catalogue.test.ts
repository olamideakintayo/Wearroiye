import { describe, expect, it } from "vitest";
import { buildWhatsAppHref, formatPrice, variants } from "../src/content/catalogue";

describe("Wearroiye catalogue", () => {
  it("contains the three launch variations and every supplied photograph", () => {
    expect(variants).toHaveLength(3);
    expect(variants.map((variant) => variant.gallery.length)).toEqual([13, 14, 12]);
    expect(new Set(variants.flatMap((variant) => variant.gallery.map((image) => image.src))).size).toBe(39);
  });

  it("uses the launch price, sizes, and availability consistently", () => {
    for (const variant of variants) {
      expect(variant.price).toEqual({ currency: "NGN", amountMinor: 3_000_000 });
      expect(variant.sizes).toEqual(["L", "XL"]);
      expect(variant.availability).toBe("in_stock");
      expect(formatPrice(variant.price.amountMinor)).toContain("30,000");
    }
  });

  it("builds a WhatsApp enquiry with the product and selected size", () => {
    const href = buildWhatsAppHref(variants[0], "XL");
    expect(href).toContain("https://wa.me/2349032592825");
    expect(decodeURIComponent(href)).toContain("Cuffed Long Sleeve");
    expect(decodeURIComponent(href)).toContain("size XL");
  });
});
