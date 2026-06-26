import Hero from "@/components/Hero";
import AppsShowcase from "@/components/AppsShowcase";

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <AppsShowcase />
    </main>
  );
}
