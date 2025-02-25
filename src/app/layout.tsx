import Navbar from "@/app/components/Navbar";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A comprehensive guide to Sid Meier's Civilization V, covering civilizations, units, resources, wonders, and more." />
        <meta name="keywords" content="Civilization V, Sid Meier, Civilization, Strategy, Game, Guide, Wiki, Units, Civilizations, Resources, Wonders" />
        <meta name="author" content="Prashaant" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo.png" type="image/x-icon" />
        <title>Civilization V Wiki</title>
      </head>
      <body className="min-h-screen bg-white text-[#222] font-sans leading-relaxed w-full flex">
        <Navbar />
        <main className="flex-1 p-8 lg:ml-0 xl:ml-60">
          {children}
        </main>
      </body>
    </html>
  );
}
