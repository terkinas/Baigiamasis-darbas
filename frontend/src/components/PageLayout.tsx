import Footer from "./Footer";
import Header from "./Header";
import LiveChat from "./LiveChat";
import AuthenticationModal from "./modals/AuthenticationModal";

export default function PageLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    return (
      <>
        <Header />
        <main className="flex mx-auto z-0">
          <LiveChat />
          <div className="flex flex-col relative w-full">
            {children}
            <Footer />
          </div>
        </main>
        <AuthenticationModal />
      </>
    );
  }