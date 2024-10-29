import CookieBanner from "@/components/banner/CookieBanner";
import PageLayout from "@/components/PageLayout";
import { ModalProvider } from "@/context/modalContext";
import { SocketProvider } from "@/context/socketContext";
import { UserProvider } from "@/context/userContext";
import { WindowProvider } from "@/context/windowContext";

export default function CasinoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserProvider>
        <SocketProvider>
          <WindowProvider>
            <ModalProvider>
              <PageLayout>
                {children}
                <CookieBanner />
              </PageLayout>
            </ModalProvider>
          </WindowProvider>
        </SocketProvider>
      </UserProvider>
    </>
  );
}