"use client";

import React, { useState, useMemo } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Utensils,
  Sparkles,
  FileDown,
  Search,
  ChevronRight,
  Star,
  Wine,
  Flame,
  Leaf,
  Fish,
  Info,
  Calendar,
  Navigation,
  Menu as MenuIcon,
  X,
  CheckCircle2,
} from "lucide-react";
import {
  RESTAURANT_INFO,
  GALLERY_PHOTOS,
  MENU_CATEGORIES,
  ALLERGEN_LEGEND,
  GUEST_REVIEWS,
  MenuItem,
} from "@/data/menuData";

export default function DueFratelliPage() {
  const [activeCategory, setActiveCategory] = useState<string>("vorspeisen");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<"alle" | "empfehlung" | "vegetarisch" | "fisch">("alle");
  const [showAllergens, setShowAllergens] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<(typeof GALLERY_PHOTOS)[0] | null>(null);

  const selectedCategoryObj = useMemo(
    () => MENU_CATEGORIES.find((c) => c.id === activeCategory) || MENU_CATEGORIES[0],
    [activeCategory]
  );

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const sourceItems: (MenuItem & { categoryTitle?: string })[] = q
      ? MENU_CATEGORIES.flatMap((cat) =>
          cat.items.map((item) => ({ ...item, categoryTitle: cat.title }))
        )
      : selectedCategoryObj.items;

    return sourceItems.filter((item) => {
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.number && item.number.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (activeFilter === "empfehlung") return item.tags?.includes("empfehlung");
      if (activeFilter === "vegetarisch") return item.tags?.includes("vegetarisch");
      if (activeFilter === "fisch") return item.tags?.includes("fisch");
      return true;
    });
  }, [searchQuery, selectedCategoryObj, activeFilter]);

  const groupedItems = useMemo(() => {
    const groups: { title: string; items: (MenuItem & { categoryTitle?: string })[] }[] = [];
    for (const item of filteredItems) {
      const groupName = searchQuery.trim()
        ? item.categoryTitle || "Speisen"
        : item.subCategory || selectedCategoryObj.title;
      const existing = groups.find((g) => g.title === groupName);
      if (existing) {
        existing.items.push(item);
      } else {
        groups.push({ title: groupName, items: [item] });
      }
    }
    return groups;
  }, [filteredItems, searchQuery, selectedCategoryObj]);

  return (
    <div className="min-h-screen bg-espresso-950 text-cream-50">
      {/* Top Info Bar */}
      <div className="border-b border-gold-500/20 bg-espresso-900/90 text-xs text-cream-200">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-gold-400 font-medium">
              <MapPin className="h-3.5 w-3.5" />
              Hauptstraße 34 • Im historischen Rathaus, 16547 Birkenwerder
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-cream-200/80">
              <Clock className="h-3.5 w-3.5 text-gold-400" />
              Di–Do & So: 12:00–14:30 & 17:00–22:00 • Fr–Sa: 12:00–14:30 & 17:00–23:00 Uhr (Mo Ruhetag)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={RESTAURANT_INFO.phoneHref}
              className="inline-flex items-center gap-1.5 font-semibold text-gold-300 hover:text-gold-400 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              Tischreservierung: {RESTAURANT_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-gold-500/20 bg-espresso-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/50 bg-espresso-900 text-gold-400 shadow-inner">
              <span className="font-serif text-xl font-bold tracking-wider">DF</span>
            </div>
            <div>
              <span className="block font-serif text-2xl font-bold tracking-wide text-cream-50 group-hover:text-gold-300 transition-colors">
                DUE FRATELLI
              </span>
              <span className="block text-[11px] uppercase tracking-[0.22em] text-gold-400">
                Ratskeller Birkenwerder
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-cream-100">
            <a href="#ueber-uns" className="hover:text-gold-400 transition-colors">
              Ratskeller & Ambiente
            </a>
            <a href="#spezialitaeten" className="hover:text-gold-400 transition-colors">
              Impressionen
            </a>
            <a href="#speisekarte" className="hover:text-gold-400 transition-colors">
              Speisekarte
            </a>
            <a href="#oeffnungszeiten" className="hover:text-gold-400 transition-colors">
              Öffnungszeiten & Kontakt
            </a>
          </nav>

          {/* Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/menu/Speisekarte_Due_Fratelli_Birkenwerder.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-espresso-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold-300 hover:border-gold-400 hover:bg-espresso-800 transition-all"
            >
              <FileDown className="h-3.5 w-3.5" />
              Speisekarte PDF
            </a>
            <a
              href={RESTAURANT_INFO.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-espresso-950 shadow-lg shadow-gold-500/20 hover:brightness-110 transition-all"
            >
              <Phone className="h-3.5 w-3.5" />
              Tisch reservieren
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex lg:hidden items-center justify-center rounded-lg border border-gold-500/30 p-2 text-gold-300 hover:bg-espresso-900"
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-gold-500/20 bg-espresso-900 px-4 py-5 lg:hidden">
            <div className="flex flex-col gap-3 text-sm font-medium">
              <a
                href="#ueber-uns"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-cream-100 hover:text-gold-400"
              >
                Ratskeller & Ambiente
              </a>
              <a
                href="#spezialitaeten"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-cream-100 hover:text-gold-400"
              >
                Kulinarische Impressionen
              </a>
              <a
                href="#speisekarte"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-cream-100 hover:text-gold-400"
              >
                Interaktive Speisekarte
              </a>
              <a
                href="#oeffnungszeiten"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-cream-100 hover:text-gold-400"
              >
                Öffnungszeiten & Anfahrt
              </a>
              <div className="mt-2 flex flex-wrap gap-3 pt-3 border-t border-gold-500/20">
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-espresso-950"
                >
                  <Phone className="h-4 w-4" />
                  {RESTAURANT_INFO.phone}
                </a>
                <a
                  href="/menu/Speisekarte_Due_Fratelli_Birkenwerder.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-500/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gold-300"
                >
                  <FileDown className="h-4 w-4" />
                  PDF Karte
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="top" className="relative overflow-hidden border-b border-gold-500/20 py-14 sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(212, 175, 106, 0.35), transparent 45%), radial-gradient(circle at 80% 60%, rgba(184, 74, 50, 0.25), transparent 50%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-espresso-900/90 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-300">
                <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                Italian Food Experience • Ratskeller Birkenwerder
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-cream-50">
                Echte italienische Kulinarik im historischen{" "}
                <span className="italic font-normal text-gold-400">Ratskeller Birkenwerder</span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-cream-200/90">
                Willkommen im <strong className="text-cream-50">Due Fratelli</strong> – wo gelebte
                italienische Gastfreundschaft auf traditionelle Familienrezepte zweier Brüder trifft.
                Genießen Sie hausgemachte Pasta, edle Fisch- und Fleischgerichte vom Grill, knusprige
                Steinofenpizza sowie feine Dolci und Eisspezialitäten im stilvollen Gewölbe unseres
                Ratskellers.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#speisekarte"
                  className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-espresso-950 shadow-xl shadow-gold-500/20 hover:brightness-110 transition-all"
                >
                  <Utensils className="h-4 w-4" />
                  Speisekarte entdecken
                </a>
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="inline-flex items-center gap-2.5 rounded-full border border-gold-400/50 bg-espresso-900/80 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-gold-300 hover:border-gold-400 hover:bg-espresso-800 transition-all"
                >
                  <Phone className="h-4 w-4 text-gold-400" />
                  Reservieren: {RESTAURANT_INFO.phone}
                </a>
              </div>

              {/* Key Trust Badges */}
              <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-3 border-t border-gold-500/20">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-gold-400 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
                      Historischer Standort
                    </p>
                    <p className="text-sm text-cream-100">Hauptstraße 34, 16547 Birkenwerder</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-gold-400 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
                      Öffnungszeiten (Mo Ruhetag)
                    </p>
                    <p className="text-sm text-cream-100">
                      Di–Do & So: 12:00–14:30 & 17:00–22:00 Uhr
                    </p>
                    <p className="text-xs text-gold-300 mt-0.5">
                      Fr–Sa: 12:00–14:30 & 17:00–23:00 Uhr
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Wine className="h-5 w-5 shrink-0 text-gold-400 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
                      La Dolce Vita
                    </p>
                    <p className="text-sm text-cream-100">Weine, Spritz, Dolci & Eiscafé</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Photo Collage using Real Uploaded Dish Photos */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="group relative overflow-hidden rounded-2xl border border-gold-500/30 bg-espresso-900 shadow-2xl">
                    <img
                      src="/images/linguine-frutti-di-mare.jpg"
                      alt="Linguine Frutti di Mare – Due Fratelli Birkenwerder"
                      className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                        Nr. 45 • Primi Piatti
                      </span>
                      <p className="font-serif text-lg font-bold text-cream-50">
                        Linguine Frutti di Mare
                      </p>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-2xl border border-gold-500/30 bg-espresso-900 shadow-2xl">
                    <img
                      src="/images/due-fratelli-salat.jpg"
                      alt="Due Fratelli Salat mit Avocado und Parmesan"
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                        Nr. 6 • Insalate
                      </span>
                      <p className="font-serif text-lg font-bold text-cream-50">
                        Due Fratelli Salat
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <div className="group relative overflow-hidden rounded-2xl border border-gold-500/30 bg-espresso-900 shadow-2xl">
                    <img
                      src="/images/lammkronen-grill.jpg"
                      alt="Gegrillte Lammkronen mit Rosmarinkartoffeln"
                      className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                        Nr. 83 • Vom Grill
                      </span>
                      <p className="font-serif text-lg font-bold text-cream-50">
                        Lammkronen
                      </p>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-2xl border border-gold-500/30 bg-espresso-900 shadow-2xl">
                    <img
                      src="/images/tortina-al-cioccolato.jpg"
                      alt="Tortina al Cioccolato mit Vanilleeis"
                      className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                        Nr. 111 • Dolci
                      </span>
                      <p className="font-serif text-lg font-bold text-cream-50">
                        Tortina al Cioccolato
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Ratskeller Ambiance Section */}
      <section id="ueber-uns" className="border-b border-gold-500/20 bg-espresso-900/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold">
                Benvenuti a Birkenwerder • Unsere Philosophie
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50 leading-tight">
                Zwei Brüder, eine Leidenschaft – im Herzen des historischen Ratskellers
              </h2>
              <p className="text-cream-200/90 leading-relaxed">
                Unser Name <strong className="text-gold-300">„Due Fratelli“</strong> steht für zwei
                Brüder, die ihre tiefe Leidenschaft für die originale italienische Küche mit Ihnen
                teilen. Direkt im traditionsreichen Ratskeller des Rathauses Birkenwerder (Hauptstraße
                34) verbinden wir historischen Charme mit mediterraner Lebensfreude.
              </p>
              <p className="text-cream-200/90 leading-relaxed">
                Unter der Leitung von <strong className="text-cream-50">Arges Keputa</strong> und
                unserem Küchenteam bereiten wir jedes Gericht täglich frisch für Sie zu: von feinen
                Antipasti wie <em>Carpaccio di Manzo</em> und <em>Vitello Tonnato</em> über
                hausgemachte Steinpilz-Ravioli und Meeresfrüchte-Pasta bis hin zu zartem Entrecôte,
                Lammkronen, Dorade vom Grill und traditioneller Steinofenpizza mit Büffelmozzarella.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {RESTAURANT_INFO.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-xl border border-gold-500/20 bg-espresso-950/70 px-4 py-3 text-sm text-cream-100"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Culinary Pillar Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-gold-500/25 bg-espresso-950/90 p-6 shadow-xl">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400">
                  <Utensils className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-cream-50 mb-2">
                  Frische Pasta & Risotto
                </h3>
                <p className="text-sm text-cream-200/80 leading-relaxed">
                  Ob Linguine Frutti di Mare, Steinpilz-Ravioli in Trüffelsahnesauce oder Safran-Risotto
                  mit Garnelen – zubereitet nach original italienischer Tradition.
                </p>
              </div>

              <div className="rounded-2xl border border-gold-500/25 bg-espresso-950/90 p-6 shadow-xl">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400">
                  <Flame className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-cream-50 mb-2">
                  Fleisch, Fisch & Pizza
                </h3>
                <p className="text-sm text-cream-200/80 leading-relaxed">
                  Rosa gebratene Lammkronen, Saltimbocca alla Romana, gegrillte Dorade sowie knusprige
                  Pizzen mit echtem Büffelmozzarella.
                </p>
              </div>

              <div className="rounded-2xl border border-gold-500/25 bg-espresso-950/90 p-6 shadow-xl">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400">
                  <Wine className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-cream-50 mb-2">
                  Aperitivo & Weinkultur
                </h3>
                <p className="text-sm text-cream-200/80 leading-relaxed">
                  Starten Sie mit unserem Haus-Aperitif <em>Due Fratelli Spritz</em> (Limoncello,
                  Prosecco & Tonic), Aperol Spritz oder einem Glas Primitivo & Pinot Grigio.
                </p>
              </div>

              <div className="rounded-2xl border border-gold-500/25 bg-espresso-950/90 p-6 shadow-xl">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-cream-50 mb-2">
                  Dolci & Eisspezialitäten
                </h3>
                <p className="text-sm text-cream-200/80 leading-relaxed">
                  Hausgemachtes Tiramisu, warmes Schokoladensoufflé, Crème Brûlée, klassische
                  italienische Eisbecher und heißer Affogato al Caffè.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Showcase of Authentic Uploaded Restaurant Photos */}
      <section id="spezialitaeten" className="border-b border-gold-500/20 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold mb-2">
                Frisch aus unserer Küche • Echte Einblicke
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50">
                Unsere Empfehlungen des Hauses
              </h2>
            </div>
            <p className="max-w-md text-sm text-cream-200/80">
              Alle Speisen werden in unserer Küche im Ratskeller Birkenwerder frisch angerichtet.
              Klicken Sie auf ein Gericht für eine vergrößerte Ansicht.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setLightboxImage(photo)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-gold-500/25 bg-espresso-900/80 shadow-xl transition-all hover:-translate-y-1 hover:border-gold-400/60"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-espresso-950/85 border border-gold-400/40 px-3 py-1 text-[11px] font-semibold text-gold-300">
                    {photo.menuNumber}
                  </div>
                  <div className="absolute top-3 right-3 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-espresso-950 shadow">
                    {photo.price}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold mb-1">
                    {photo.category}
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-cream-50 mb-2 group-hover:text-gold-300 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-cream-200/80">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Speisekarte Section */}
      <section id="speisekarte" className="border-b border-gold-500/20 bg-espresso-900/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold mb-2">
              La Nostra Carta • Originalgetreue Speisekarte
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-cream-50 mb-4">
              Unsere Speisekarte & Getränke
            </h2>
            <p className="text-sm sm:text-base text-cream-200/85">
              Wählen Sie eine Kategorie oder durchsuchen Sie unsere gesamte Karte nach Ihrem
              Lieblingsgericht. Sie können die vollständige Karte auch jederzeit als PDF herunterladen.
            </p>
          </div>

          {/* Search & Dietary Filter Controls */}
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Gericht, Nummer oder Zutat suchen (z.B. Trüffel, Burrata, 45)..."
                className="w-full rounded-full border border-gold-500/30 bg-espresso-900 py-2.5 pl-10 pr-9 text-sm text-cream-50 placeholder:text-cream-200/50 focus:border-gold-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-cream-200/70 hover:text-gold-300"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: "alle", label: "Alle Speisen", icon: Utensils },
                  { id: "empfehlung", label: "Empfehlungen", icon: Star },
                  { id: "vegetarisch", label: "Vegetarisch", icon: Leaf },
                  { id: "fisch", label: "Fisch & Meeresfrüchte", icon: Fish },
                ] as const
              ).map((f) => {
                const Icon = f.icon;
                const active = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveFilter(f.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all ${
                      active
                        ? "bg-gold-500 text-espresso-950 shadow"
                        : "border border-gold-500/30 bg-espresso-900/80 text-cream-100 hover:border-gold-400/60"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {f.label}
                  </button>
                );
              })}

              <a
                href="/menu/Speisekarte_Due_Fratelli_Birkenwerder.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/50 bg-espresso-900 px-3.5 py-2 text-xs font-semibold text-gold-300 hover:bg-espresso-800"
              >
                <FileDown className="h-3.5 w-3.5" />
                Original PDF-Karte
              </a>
            </div>
          </div>

          {/* Category Tabs */}
          {!searchQuery.trim() && (
            <div className="mb-10 flex items-center gap-2 overflow-x-auto pb-2">
              {MENU_CATEGORIES.map((category) => {
                const isSelected = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`group shrink-0 rounded-2xl border px-5 py-3 text-left transition-all ${
                      isSelected
                        ? "border-gold-400 bg-gradient-to-br from-gold-500/25 to-espresso-900 text-cream-50 shadow-lg"
                        : "border-gold-500/20 bg-espresso-900/60 text-cream-200 hover:border-gold-500/40 hover:text-cream-50"
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-gold-400">
                      {category.italianTitle}
                    </span>
                    <span className="font-serif text-lg font-bold">{category.title}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Active Category Banner */}
          {!searchQuery.trim() && (
            <div className="mb-8 rounded-2xl border border-gold-500/25 bg-espresso-900/80 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-gold-400 font-semibold">
                  {selectedCategoryObj.italianTitle}
                </span>
                <h3 className="font-serif text-3xl font-bold text-cream-50">
                  {selectedCategoryObj.title}
                </h3>
                <p className="text-sm text-cream-200/80 mt-1">{selectedCategoryObj.subtitle}</p>
              </div>
              <div className="text-xs text-cream-200/70 shrink-0">
                Alle Preise inkl. gesetzl. MwSt.
              </div>
            </div>
          )}

          {/* Menu Items List */}
          {groupedItems.length === 0 ? (
            <div className="rounded-2xl border border-gold-500/20 bg-espresso-900/60 p-12 text-center">
              <p className="font-serif text-2xl text-cream-100 mb-2">
                Keine passenden Einträge gefunden
              </p>
              <p className="text-sm text-cream-200/70 mb-4">
                Bitte passen Sie Ihre Suche oder den ausgewählten Filter an.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("alle");
                }}
                className="rounded-full bg-gold-500 px-5 py-2 text-xs font-bold uppercase tracking-wider text-espresso-950"
              >
                Filter zurücksetzen
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {groupedItems.map((group) => (
                <div key={group.title}>
                  {groupedItems.length > 1 && (
                    <div className="mb-4 flex items-center gap-4">
                      <h4 className="font-serif text-2xl font-bold text-gold-300">{group.title}</h4>
                      <div className="h-px flex-1 bg-gold-500/20" />
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {group.items.map((item, idx) => (
                      <div
                        key={`${item.number || item.name}-${idx}`}
                        className="group relative flex flex-col justify-between rounded-2xl border border-gold-500/20 bg-espresso-950/85 p-5 transition-all hover:border-gold-400/50 hover:bg-espresso-900/90"
                      >
                        <div className="flex items-start gap-4">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-20 w-20 shrink-0 rounded-xl object-cover border border-gold-500/30"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-3">
                              <div className="flex items-baseline gap-2 flex-wrap">
                                {item.number && (
                                  <span className="inline-flex items-center justify-center rounded-md bg-gold-500/15 px-2 py-0.5 text-xs font-bold text-gold-400">
                                    Nr. {item.number}
                                  </span>
                                )}
                                <h5 className="font-serif text-xl font-bold text-cream-50 group-hover:text-gold-300 transition-colors">
                                  {item.name}
                                </h5>
                              </div>
                              <span className="shrink-0 font-serif text-xl font-bold text-gold-400">
                                {item.price}
                              </span>
                            </div>

                            {item.description && (
                              <p className="mt-1.5 text-sm leading-relaxed text-cream-200/80">
                                {item.description}
                              </p>
                            )}

                            {/* Badges & Allergens */}
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              {item.tags?.includes("empfehlung") && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-gold-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-gold-300">
                                  <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
                                  Empfehlung
                                </span>
                              )}
                              {item.tags?.includes("vegetarisch") && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/90 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                                  <Leaf className="h-3 w-3" />
                                  Vegetarisch
                                </span>
                              )}
                              {item.tags?.includes("scharf") && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-terracotta-600/30 border border-terracotta-500/40 px-2.5 py-0.5 text-[11px] font-medium text-amber-200">
                                  <Flame className="h-3 w-3 text-terracotta-500" />
                                  Pikant
                                </span>
                              )}
                              {item.tags?.includes("alkoholfrei") && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-sky-950/80 border border-sky-500/30 px-2.5 py-0.5 text-[11px] font-medium text-sky-200">
                                  Alkoholfrei
                                </span>
                              )}
                              {item.allergens && item.allergens.length > 0 && (
                                <span
                                  title="Allergene & Zusatzstoffe"
                                  className="text-[11px] text-cream-200/50"
                                >
                                  Allergene: [{item.allergens.join(", ")}]
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Allergen & Additive Legend Accordion */}
          <div className="mt-10 rounded-2xl border border-gold-500/20 bg-espresso-950/80 p-5">
            <button
              type="button"
              onClick={() => setShowAllergens(!showAllergens)}
              className="flex w-full items-center justify-between text-left text-sm font-semibold text-gold-300"
            >
              <span className="inline-flex items-center gap-2">
                <Info className="h-4 w-4 text-gold-400" />
                Hinweise zu Allergenen & Zusatzstoffen gemäß Lebensmittelinformationsverordnung (LMIV)
              </span>
              <span className="text-xs uppercase tracking-wider text-cream-200/70">
                {showAllergens ? "Ausblenden ▲" : "Anzeigen ▼"}
              </span>
            </button>

            {showAllergens && (
              <div className="mt-4 border-t border-gold-500/20 pt-4">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 text-xs text-cream-200/80">
                  {ALLERGEN_LEGEND.map((a) => (
                    <div key={a.code} className="flex items-baseline gap-2">
                      <span className="inline-block min-w-[24px] font-bold text-gold-400">
                        [{a.code}]
                      </span>
                      <span>{a.label}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-cream-200/60">
                  Bei Fragen zu Allergenen oder Unverträglichkeiten berät Sie unser Service-Team im
                  Ratskeller Birkenwerder jederzeit gerne persönlich.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Guest Testimonials */}
      <section className="border-b border-gold-500/20 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold mb-2">
              Gästestimmen • Birkenwerder
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50">
              Was unsere Gäste über das Due Fratelli sagen
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {GUEST_REVIEWS.map((review, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-gold-500/20 bg-espresso-900/70 p-6 shadow-lg"
              >
                <div>
                  <div className="mb-3 flex items-center gap-1 text-gold-400">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-gold-400" />
                    ))}
                  </div>
                  <p className="text-sm italic leading-relaxed text-cream-100">
                    „{review.quote}“
                  </p>
                </div>
                <div className="mt-5 border-t border-gold-500/15 pt-3">
                  <p className="font-serif text-lg font-bold text-cream-50">{review.author}</p>
                  <p className="text-xs text-gold-400">{review.badge}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opening Hours, Reservation & Location Section */}
      <section id="oeffnungszeiten" className="py-16 sm:py-24 bg-espresso-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Opening Hours Card */}
            <div className="lg:col-span-5 rounded-3xl border border-gold-500/30 bg-espresso-950 p-7 sm:p-9 shadow-2xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-400 font-semibold mb-2">
                <Clock className="h-4 w-4" />
                Unsere Öffnungszeiten
              </div>
              <h3 className="font-serif text-3xl font-bold text-cream-50 mb-6">
                Wann wir für Sie da sind
              </h3>

              <div className="divide-y divide-gold-500/15">
                {RESTAURANT_INFO.openingHours.map((entry) => (
                  <div
                    key={entry.day}
                    className="flex items-center justify-between py-3 text-sm"
                  >
                    <span className="font-medium text-cream-100">{entry.day}</span>
                    <span
                      className={
                        entry.isClosed
                          ? "rounded-full bg-terracotta-600/30 border border-terracotta-500/40 px-3 py-0.5 text-xs font-semibold text-amber-200"
                          : "font-semibold text-gold-300"
                      }
                    >
                      {entry.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-gold-500/20 bg-espresso-900/80 p-4 text-xs text-cream-200/85 leading-relaxed">
                <strong className="text-gold-300 block mb-1">Hinweis für Gruppen & Feiern:</strong>
                Planen Sie eine Geburtstagsfeier, Konfirmation, Hochzeit oder ein Geschäftsessen im
                historischen Ratskeller? Sprechen Sie uns gerne telefonisch an!
              </div>
            </div>

            {/* Reservation & Address Card */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-gold-500/30 bg-gradient-to-br from-espresso-900 via-espresso-950 to-espresso-900 p-7 sm:p-9 shadow-2xl">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-400 font-semibold">
                  <Calendar className="h-4 w-4" />
                  Tischreservierung & Anfahrt
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50">
                  Reservieren Sie Ihren Tisch im Ratskeller Birkenwerder
                </h3>

                <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed">
                  Für eine schnelle und persönliche Tischreservierung erreichen Sie uns während
                  unserer Öffnungszeiten direkt telefonisch. Wir freuen uns darauf, Sie im Due
                  Fratelli begrüßen zu dürfen!
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                  <div className="rounded-2xl border border-gold-500/25 bg-espresso-950/90 p-5">
                    <p className="text-xs uppercase tracking-wider text-gold-400 font-semibold mb-1">
                      Telefonische Reservierung
                    </p>
                    <a
                      href={RESTAURANT_INFO.phoneHref}
                      className="font-serif text-2xl sm:text-3xl font-bold text-cream-50 hover:text-gold-300 transition-colors block"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                    <p className="mt-1 text-xs text-cream-200/70">
                      Direktwahl ins Restaurant ({RESTAURANT_INFO.phoneInternational})
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gold-500/25 bg-espresso-950/90 p-5">
                    <p className="text-xs uppercase tracking-wider text-gold-400 font-semibold mb-1">
                      Adresse & Standort
                    </p>
                    <p className="font-serif text-2xl font-bold text-cream-50">
                      {RESTAURANT_INFO.address.street}
                    </p>
                    <p className="text-sm text-cream-100">
                      {RESTAURANT_INFO.address.zip} {RESTAURANT_INFO.address.city}
                    </p>
                    <p className="mt-1 text-xs text-gold-300">
                      Im historischen Rathaus Birkenwerder
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 pt-6 border-t border-gold-500/20">
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-espresso-950 shadow-lg hover:brightness-110 transition-all"
                >
                  <Phone className="h-4 w-4" />
                  Jetzt anrufen: {RESTAURANT_INFO.phone}
                </a>
                <a
                  href={RESTAURANT_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-espresso-950 px-5 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-300 hover:bg-espresso-800 transition-all"
                >
                  <Navigation className="h-4 w-4" />
                  Route planen (Google Maps)
                </a>
                <a
                  href={RESTAURANT_INFO.googleShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cream-200/80 hover:text-gold-300"
                >
                  Google-Profil ansehen
                  <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold-500/20 bg-espresso-950 py-12 text-xs text-cream-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-serif text-2xl font-bold text-cream-50">
                DUE FRATELLI – Ratskeller Birkenwerder
              </p>
              <p className="mt-1 text-cream-200/80">
                Inhaber: {RESTAURANT_INFO.owner} • {RESTAURANT_INFO.address.street},{" "}
                {RESTAURANT_INFO.address.zip} {RESTAURANT_INFO.address.city} • Tel.{" "}
                {RESTAURANT_INFO.phone}
              </p>
              <p className="mt-1 text-cream-200/70">
                Öffnungszeiten: Di–Do & So 12:00–14:30 & 17:00–22:00 Uhr • Fr–Sa 12:00–14:30 & 17:00–23:00 Uhr (Mo Ruhetag)
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <a href="#ueber-uns" className="hover:text-gold-300">
                Über uns
              </a>
              <a href="#spezialitaeten" className="hover:text-gold-300">
                Impressionen
              </a>
              <a href="#speisekarte" className="hover:text-gold-300">
                Speisekarte
              </a>
              <a
                href="/menu/Speisekarte_Due_Fratelli_Birkenwerder.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-300"
              >
                Speisekarte (PDF)
              </a>
              <a href="#oeffnungszeiten" className="hover:text-gold-300">
                Öffnungszeiten & Kontakt
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-gold-500/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p>
              © {new Date().getFullYear()} Due Fratelli – Ratskeller Birkenwerder. Alle Rechte
              vorbehalten.
            </p>
            <p>Buon Appetito im historischen Rathaus Birkenwerder!</p>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal for Dish Photos */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-950/90 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full overflow-hidden rounded-3xl border border-gold-400/40 bg-espresso-900 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-espresso-950/80 p-2 text-cream-50 hover:text-gold-300"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-h-[65vh] w-full object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                  {lightboxImage.menuNumber} • {lightboxImage.category}
                </span>
                <span className="font-serif text-2xl font-bold text-gold-400">
                  {lightboxImage.price}
                </span>
              </div>
              <h4 className="font-serif text-3xl font-bold text-cream-50 mb-2">
                {lightboxImage.title}
              </h4>
              <p className="text-sm text-cream-200/85">{lightboxImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
