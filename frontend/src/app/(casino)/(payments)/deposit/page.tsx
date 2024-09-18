// import { FaBitcoin } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { FaBitcoin } from "react-icons/fa6";
import { RiVisaLine } from "react-icons/ri";


export default function DepositPage() {

    return (
        <main>
            <div className="w-full lg:max-w-[calc(100vw-16rem)] py-10">
                <div className="max-w-9xl mx-auto flex flex-col gap-6">
                    

                <div className="[&>h4]:text-white [&>h4]:pb-3 [&>h4]:text-lg">
                    <h4>Cash <span className="text-custom-gray-400">{'('}maintenance{')'}</span></h4>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 
                        [&>li]:rounded text-custom-gray-100 [&>li]:gap-2 [&>li]:hover:cursor-pointer">
                            <li className="opacity-50 flex flex-col gap-1 justify-center items-center aspect-square
                            bg-gradient-to-b from-[#322e34] from-1% via-custom-gray-700 via-70% to-custom-gray-700 to-100% shadow-lg
                            hover:brightness-110 transition duration-300">
                                {/* <FaBitcoin className="text-5xl text-custom-orange-500" /> */}
                                <div className="flex ">
                                    <RiVisaLine className="text-5xl text-custom-gray-300" />
                                    <Image className="object-contain" src="/images/payments/mastercard.png" alt="Mastercard" width={50} height={50} />
                                </div>
                                <div className="text-center">
                                <span>Credit Card</span>
                                <p className="text-xs text-custom-gray-400">Checkout</p>
                                </div>
                            </li>

                            <li className="opacity-50 flex flex-col gap-1 justify-center items-center aspect-square
                            bg-gradient-to-b from-[#212731] from-1% via-custom-gray-700 via-70% to-custom-gray-700 to-100% shadow-lg
                            hover:brightness-110 transition duration-300">
                                {/* <FaBitcoin className="text-5xl text-custom-orange-500" /> */}

                                <Image className="object-contain" src="/images/payments/paypal.png" alt="Mastercard" width={50} height={50} />
                              
                                <div className="text-center">
                                <span>Paypal</span>
                                <p className="text-xs text-custom-gray-400">Kinguin, G2A</p>
                                </div>
                            </li>
                        </ul>
                </div>

                <div className="[&>h4]:text-white [&>h4]:pb-2 [&>h4]:text-lg">
                    <h4>Cryptocurrencies</h4>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 
                        [&>li]:rounded text-custom-gray-100 [&>li]:gap-2 [&>li]:hover:cursor-pointer
                        [&>a]:rounded text-custom-gray-100 [&>a]:gap-2 [&>a]:hover:cursor-pointer">
                            <Link href="/deposit/bitcoin"  className="flex flex-col gap-1 justify-center items-center aspect-square
                            bg-gradient-to-b from-[#322a24] from-1% via-custom-gray-700 via-70% to-custom-gray-700 to-100% shadow-lg
                            hover:brightness-110 transition duration-300">
                                {/* <FaBitcoin className="text-5xl text-custom-orange-500" /> */}
                                <Image src="/images/payments/bitcoin.png" alt="Bitcoin" width={50} height={50} />
                                <div className="text-center">
                                <span>Bitcoin</span>
                                <p className="text-xs text-custom-gray-400">Bitcoin network</p>
                                </div>
                            </Link>
                            <Link href="/deposit/litecoin" className="flex flex-col gap-1 justify-center items-center aspect-square 
                            bg-gradient-to-b from-[#212731] from-1% via-custom-gray-700 via-70% to-custom-gray-700 to-100% shadow-lg
                            hover:brightness-110 transition duration-300">
                                {/* <FaBitcoin className="text-5xl " /> */}
                                <Image src="/images/payments/litecoin.png" alt="Litecoin" width={50} height={50} />
                                <div className="text-center">
                                <span>Litecoin</span>
                                <p className="text-xs text-custom-gray-400">Litecoin network</p>
                                </div>
                            </Link>

                        </ul>
                </div>

                </div>
            </div>
        </main>
    );
}