import { RouletteProvider } from "@/context/games/rouletteContext";



export default function RouletteLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
      {/* roulette current object provider */}
        <RouletteProvider>
          {children}
        </RouletteProvider>
      </>
    );
  }