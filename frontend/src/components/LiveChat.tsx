import { FaChevronDown, FaInstagram, FaTwitter } from "react-icons/fa";
import LiveChatForm from "./livechat/LiveChatForm";
import LiveChatLayout from "./livechat/LiveChatLayout";
import { GoDotFill } from "react-icons/go";
import LiveChatHeading from "./livechat/LiveChatHeading";
import LiveChatMessages from "./livechat/LiveChatMessages";

export default function LiveChat() {

    return (
        <>
            <LiveChatLayout>
                <div className="flex flex-col gap-2 h-full justify-between">
                    
                    {/* livechat heading */}
                    <LiveChatHeading />

                    {/* livechat messages */}
                    <LiveChatMessages />

                    {/* livechat form */}
                    <LiveChatForm />


                </div>

            </LiveChatLayout>
        </>
    )
}