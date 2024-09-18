
import Link from "next/link";
// import Router from "next/router";
import PaymentsNavigation from "./Navigation";
import { usePathname } from "next/navigation";


export default function PaymentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <div className="w-full lg:max-w-[calc(100vw-16rem)] px-4 py-10 md:p-10">



        <div className="mx-auto">
        {/* <div className="max-w-7xl mx-auto"> */}

        
        <PaymentsNavigation />

        {children}
        </div>

    </div>
  );
}