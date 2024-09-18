import Link from "next/link";
import { DepositButton, SignInButton, WithdrawButton } from "./SidebarClientComponents";
import SidebarGamesList from "./SidebarGamesList";
import SidebarLayout from "./SidebarLayout";
import { FaInstagram } from "react-icons/fa";

const generalLinks = [
    { name: "Fairness", path: "/fairness" },
    { name: "Referrals", path: "/referrals" },
    { name: "About", path: "/about" },
    // { name: "Daily coins", path: "/daily-coins" },
]

export default function Sidebar() {
    return (
        <div className="p-4 z-50">

            {/* deposit/withdraw/signin */}
            <div className="w-full bg-custom-gray-700">
                <div className="flex flex-col gap-3 p-4 text-sm">
                    <div className="flex justify-around gap-2">
                        {/* client component */}
                        <DepositButton />
                        <WithdrawButton />
                    </div>
                    {/* client component */}
                    <SignInButton />
                </div>
            </div>

            {/* games list */}
            <SidebarGamesList />

            {/* general links */}
            <ul className="w-full px-2 text-custom-gray-400">
                {generalLinks.map(link => (
                    <li key={link.name} className="w-full flex rounded p-2">
                        <Link href={link.path} className="w-full px-2 flex items-center flex-row gap-2">
                            <span>{link.name}</span>
                        </Link>
                    </li>
                ))}

            <li key={"Daily coins"} className="w-full flex rounded p-2">
                        <Link href="#" className="w-full px-2 opacity-50 flex items-center flex-row gap-2">
                            <span>{"Daily coins"}</span>
                        </Link>
                    </li>
            </ul>

            {/* language */}
            {/* <div className="w-full flex justify-center gap-2 mt-4">
                <span className="text-custom-gray-400">Language:</span>
                <span className="text-custom-gray-100">EN</span>
                </div> */}

            <div className="w-full px-2">
                <div className="flex justify-center gap-2 mt-4 text-xs">
                    <span className="text-custom-gray-400">Language:</span>
                    <span className="text-custom-green-500">EN</span>
                </div>

                {/* <a target="_blank" href="https://instagram.com/" rel="noopener noreferrer" >
                    <div className="flex justify-center gap-2 mt-4 text-xs">
                        <span className="text-custom-gray-400">Follow us:</span>
                        <span className="text-custom-green-500"><FaInstagram className="text-lg" /></span>
                    </div>
                </a> */}
            </div>

            
        </div>
    );
}