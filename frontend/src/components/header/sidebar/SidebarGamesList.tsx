import Link from "next/link";
import { GiTwoCoins } from "react-icons/gi";
import { FaRegTimesCircle } from "react-icons/fa";


const games = [
    { name: "Roulette", icon: <FaRegTimesCircle /> },
    { name: "Coinflip", icon: <GiTwoCoins /> },
]

export default function SidebarGamesList() {
    return (
            <ul className="w-full flex flex-col gap-2 my-4 text-custom-gray-100">
                {games.map(game => (
                    <li key={game.name} className={`w-full flex bg-custom-gray-700 rounded p-3 ${game.name == 'Coinflip' && 'opacity-25'}`}>
                        <Link href="#" className="w-full px-2 flex items-center flex-row gap-2">
                            {game.icon}
                            <span>{game.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
    );
}