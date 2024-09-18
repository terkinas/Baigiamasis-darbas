export default function AboutPage() {
  return (
    <div className="w-full lg:max-w-[calc(100vw-16rem)] px-4 py-10 md:p-10 text-custom-gray-100">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">About Betitfy</h1>
            </div>
            <div className="mt-4 flex flex-col gap-2">
                <p className="text-sm text-custom-gray-400">Welcome to Betitfy – Betting Made Simple and Fun!</p>
                <p className="text-sm text-custom-gray-400">At Betitfy, we believe that the world of online betting should be accessible, exciting, and straightforward. Our mission is to provide a user-friendly platform where both new and seasoned bettors can enjoy a seamless and enjoyable betting experience.</p>
            </div>
            <div className="mt-4 py-6">
                <h2 className="text-lg font-semibold">Who We Are</h2>
                <ul className=" mt-2 flex flex-col gap-2">
                    <li className="text-sm text-custom-gray-400">Betitfy is operated by StellarBet Limited B.V., a company dedicated to offering top-notch online betting services. Licensed and regulated by the laws of Curaçao under license number 7043/JAZ, we ensure that our platform meets the highest standards of fairness and security.</li>
                </ul>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">What We Offer</h2>
                <ul className=" mt-2 flex flex-col gap-2">
                    <li className="text-sm text-custom-gray-400">Our platform features a wide variety of betting options, including thrilling games like roulette, coinflip, match betting, and case battles. We pride ourselves on offering clear and straightforward betting options, making it easy for you to place your bets and enjoy the excitement of potential big wins.</li>
                </ul>
            </div>

            <div className="mt-4 py-6">
                  <h2 className="text-lg font-semibold">Why Choose Betitfy</h2>
                  <ol className="list-decimal list-inside mt-2 flex flex-col gap-2">
                      <li className="text-sm text-custom-gray-100">User-Friendly Experience:<span className="text-custom-gray-400"> Our intuitive platform is designed to make betting easy and enjoyable for everyone.</span></li>
                      <li className="text-sm text-custom-gray-100">Provably Fair:<span className="text-custom-gray-400"> We use advanced technology to ensure that all our games are fair and transparent. You can bet with confidence, knowing that every outcome is unbiased and secure.</span></li>
                      <li className="text-sm text-custom-gray-100">Secure Transactions:<span className="text-custom-gray-400"> Your security is our priority. We employ state-of-the-art security measures to protect your personal information and ensure safe transactions.</span></li>
                      <li className="text-sm text-custom-gray-100">24/7 Support:<span className="text-custom-gray-400"> Our dedicated support team is available around the clock to assist you with any questions or issues you may have. Reach out to us via live chat, email, or phone – we’re here to help!</span></li>
                      <li className="text-sm text-custom-gray-100">Community and Fun:<span className="text-custom-gray-400"> Join a vibrant community of bettors who share your passion for the game. At Betitfy, we foster a fun and engaging environment where you can enjoy the thrill of betting.</span></li>
                  </ol>
              </div>


            <div className="mt-4">
                <h2 className="text-lg font-semibold">Our Commitment</h2>
                <ol className="list-decimal list-inside mt-2 flex flex-col gap-2">
                    <p className="text-sm text-custom-gray-400">We are committed to providing a responsible betting environment. Betitfy promotes responsible gambling practices and offers tools and resources to help you stay in control. Our goal is to ensure that betting remains a fun and enjoyable activity for all our users.</p>
                </ol>

            </div>

            <div className="mt-4">
                <h2 className="text-lg font-semibold">Join Us Today!</h2>
                <ol className="list-decimal list-inside mt-2 flex flex-col gap-2">
                    <p className="text-sm text-custom-gray-400">Become a part of the Betitfy community and discover why betting has never been this simple and fun. Whether you’re here for the thrill of the game or the chance to win big, Betitfy is your go-to destination for online betting.</p>
                </ol>

            </div>



        </div>
  );
}