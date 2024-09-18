
export const metadata = {
    title: "Betitfy | Contact & Support - We're Here to Help",
    description: "For any support, inquiries or questions, please contact us via live-chat or email. Our support team responds to all questions within 48 hours."
};

export default function ContactPage() {
    return (
        <div className="w-full lg:max-w-[calc(100vw-16rem)] px-4 py-10 md:p-10 text-custom-gray-100">
            <div className="w-full flex flex-col gap-6">
                <h4 className="text-xl md:text-3xl">Contact & Support</h4>
                <hr  />
                <p className="text-custom-gray-400">For any support, inquiries or questions, please contact us via live-chat or email. Our support team responds to all questions within 48 hours. <br /> <br />

                Before submitting a support ticket, first check if you find the answer to your question here: <span className="underline text-custom-green-500 cursor-pointer">Frequently Asked Questions</span><br /> <br />

                We have real-time live chat support agents. Average response time in live chat - 15 min, but a response may take longer due to occasional heavy traffic.
                </p>

                <button className="w-fit p-3 px-6 bg-custom-gray-800 text-custom-green-500 border border-1 border-custom-green-500 rounded hover:bg-custom-gray-700 cursor-not-allowed">Open Live Chat</button>

                




                <p className="text-custom-gray-400">For any inquiries or questions, please contact us via email at <span className="text-custom-green-500">
                    <a href="mailto:support@gmail.com">
                        support@gmail.com</a>
                    </span>
                </p>


                <div className="w-full h-10 bg-custom-orange-500 bg-opacity-10 flex flex-row gap-3 items-center">
                    <span className="h-full w-1 bg-custom-orange-500 rounded"></span>
                    <h4 className="text-sm text-custom-orange-500">Livechat is temporarely disabled, please contact us via email for now.</h4>
                </div> 


            </div>
        </div>
    )
}