import { FaChevronDown, FaInstagram, FaTwitter } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import LiveChatUsersCount from "./LiveChatUsersCount";

export default function LiveChatHeading() {
    return (
        <div className="flex flex-col gap-2">    
            <div className="flex justify-between items-center text-custom-red-500">
                <h1 className="text-sm text-custom-gray-100 p-2">Chat Rules</h1>
                <div className="flex gap-2">
                    <FaTwitter className="text-custom-gray-100" />
                    <FaInstagram className="text-custom-gray-100" />
                </div>
            </div>

            <div className="flex flex-col gap-2 font-light">
                <div className="flex justify-between items-center rounded w-full p-3 bg-custom-gray-700 text-sm text-custom-gray-100">

                    <div className="flex gap-1">
                        {/* <p className='text-custom-green-500'>EN</p> */}
                        <div>English Room</div>
                    </div>

                    <div className="flex gap-1 items-center">
                        <GoDotFill className="text-custom-green-500" />
                        {/* <p className="tracking-wider font-semibold">78</p> */}
                        <LiveChatUsersCount />
                        <FaChevronDown size={12} />
                    </div>

                </div>
            </div>
        </div>
    )
}