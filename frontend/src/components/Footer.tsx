import Image from "next/image";
import Link from "next/link";
import { BiBitcoin } from "react-icons/bi";
import { FaDiscord, FaInstagram } from "react-icons/fa6";
import { PiTreeStructure } from "react-icons/pi";
import { RiVisaLine } from "react-icons/ri";
import { TbCurrencyLitecoin } from "react-icons/tb";


export default function Footer() {
    return (
        <footer className="bg-custom-gray-800 bg-custom-gray-700 border-t border-custom-gray-600 text-white py-4 pt-12 mt-12 md:mt-0">

            <div className="flex flex-col gap-12 px-6 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row-reverse gap-12 max-w-3xl mx-auto">

                    <div className="flex flex-row text-sm gap-6">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-lg">About</h4>
                            <Link href="/about" className="text-custom-gray-400">About</Link>
                            <Link href="/contact" className="text-custom-gray-400">Contact</Link>
                            <Link href="/fairness" className="text-custom-gray-400">Fairness</Link>
                            <Link href="/privacy" className="text-custom-gray-400 whitespace-nowrap">Privacy Policy</Link>
                            <Link href="/" className="text-custom-gray-400 whitespace-nowrap">Terms and Conditions</Link>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h4 className="text-lg">Community</h4>
                            {/* <a href="#" className="text-custom-gray-400">Discord</a>
                            <a href="#" className="text-custom-gray-400">Instagram</a> */}
                            <div className="flex gap-2">
                                <a href="#" className="text-custom-gray-400 text-lg p-2 bg-custom-gray-900 rounded border border-custom-gray-600 shadow-lg"><FaDiscord /></a>
                                <a href="https://www.instagram.com/betitfy/" target="_blank" className="text-custom-gray-400 text-lg p-2 bg-custom-gray-900 rounded border border-custom-gray-600 shadow-lg"><FaInstagram  /></a>

                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Image src="/images/logos/full-logo.png" width={110} height={5} alt="logo" />
                        
                        <p className="text-xs text-custom-gray-400">
                        Betitfy Global Ltd. is a fully licensed and regulated entity, ensuring that we adhere to the strictest standards of fairness and security. Our licensing details reflect our commitment to providing a trustworthy and transparent betting environment. <br /> <br />
                        To ensure the security and integrity of your transactions, Betitfy partners with SafePay Solutions Ltd., located at Infinity Tower, Level 5, Suite 2, Financial District, Singapore (Company Registration No. SG876543). This partnership allows us to handle payments efficiently and securely, providing you with peace of mind as you enjoy our platform.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between">
                    <p className="text-xs text-custom-gray-400 text-center">© 2021 Betitfy. All rights reserved</p>
                    <ul className="flex flex-row items-center gap-3">
                            <li className=""> <Image src="/svg/trustpilot-1.svg" width={105} height={30} alt="logo" /> </li>
                            <li className="border border-custom-gray-600 rounded p-1 px-2"> <span className="text-custom-gray-400 text-sm">18+</span> </li>
                            <li className=""> <PiTreeStructure className="text-lg text-custom-gray-400 " /> </li>
                            
                            <li className="flex"> <RiVisaLine className="text-5xl text-custom-gray-300 " /> <Image className="object-contain opacity-75" src="/images/payments/mastercard.png" width={40} height={5} alt="logo" /> </li>
                            {/* <li className="opacity-75"> <Image src="/images/payments/mastercard.png" width={40} height={5} alt="logo" /> </li> */}
                            {/* <li> <Image src="/images/payments/paypal.png" width={30} height={5} alt="logo" /> </li> */}
                    </ul>
                </div>

            </div>
        </footer>
    );
}