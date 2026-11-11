import Link from "next/link";

export default function NotFound() {
  return (
    <main className="next-piece">
      <p>This part of the garden has not grown yet.</p>
      <Link href="/">Return to Wearroiye <span>↗</span></Link>
    </main>
  );
}
