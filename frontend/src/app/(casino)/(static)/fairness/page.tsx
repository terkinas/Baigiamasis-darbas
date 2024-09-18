export const metadata = {
    "title": "Betitfy | Provably Fair Betting",
}

export default function FairnessPage() {
    return (
      <div className="w-full w-max-full lg:max-w-[calc(100vw-16rem)] px-4 py-10 md:p-10 text-custom-gray-100">
              <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-semibold">Provably Fair</h1>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                  <p className="text-sm text-custom-gray-400">The following is a guide on how to verify the fairness of our games.</p>
                  <p className="text-sm text-custom-gray-400">We use a <span className="text-custom-gray-100">cryptographic</span> hash function to generate a seed that is used choose the winning number. The seed is encrypted and sent to the player. The player can then decrypt the seed and verify that the game was fair.</p>
                  <p className="text-sm text-custom-gray-400">The player can also generate their own seed and compare it to the seed that was sent to them to verify that the game was fair.</p>
              </div>
              <div className="mt-4 py-6">
                  <h2 className="text-lg font-semibold">How to Verify the Fairness of Our Games</h2>
                  <ol className="list-decimal list-inside mt-2 flex flex-col gap-2">
                      <li className="text-sm text-custom-gray-400">Click on the Provably Fair button on the game page.</li>
                      <li className="text-sm text-custom-gray-400">The server will generate a seed and encrypt it using a public key.</li>
                      <li className="text-sm text-custom-gray-400">The server will send the encrypted seed to the player.</li>
                      <li className="text-sm text-custom-gray-400">The player can decrypt the seed using their private key.</li>
                      <li className="text-sm text-custom-gray-400">The player can then verify that the seed matches the seed that was used to shuffle the deck of cards or choose the winning number.</li>
                  </ol>
              </div>
              <div className="mt-4">
                  <h2 className="text-lg font-semibold">How to Generate Your Own Seed</h2>
                  <ol className="list-decimal list-inside mt-2 flex flex-col gap-2">
                      <li className="text-sm text-custom-gray-400">Click on the Provably Fair button on the game page.</li>
                      <li className="text-sm text-custom-gray-400">The server will generate a seed and encrypt it using a public key.</li>
                      <li className="text-sm text-custom-gray-400">The server will send the encrypted seed to the player.</li>
                      <li className="text-sm text-custom-gray-400">The player can generate their own seed.</li>
                      <li className="text-sm text-custom-gray-400">The player can then compare their seed to the seed that was sent to them to verify that the game was fair.</li>
                  </ol>
              </div>
  
  
              <div className="mt-4">
                  <h2 className="text-lg font-semibold">Roulette technical details</h2>
                  <ol className="list-decimal list-inside mt-2 flex flex-col gap-2">
                      <h5 className="text-sm text-custom-gray-400">Our system generates the result for each round by using the <span className="text-custom-gray-100">SHA-256</span> hash of 3 separate inputs.</h5>
                      <li className="text-sm text-custom-gray-400">The <span className="text-custom-gray-100">{"'"}public seed{"'"}</span> is a concatenation of 5 pairs of random numbers, 01 to 39, generated daily.</li>
                      <li className="text-sm text-custom-gray-400">The <span className="text-custom-gray-100">{"'"}server seed{"'"}</span> is a <span className="text-custom-gray-100">SHA-256</span> hash of 16 cryptographically secure random bytes, generated at the same time as the public seed.</li>
                      <li className="text-sm text-custom-gray-400"><span className="text-custom-gray-100">Round ID</span></li>
                      <p className="text-sm text-custom-gray-400">Players can replicate any past roll by using the code below. Please note that you should use the unhashed (not hashed) server seed with the script</p>
                  </ol>
  
                  <pre className="bg-custom-gray-700 px-6 text-xs text-custom-green-500 mt-6 overflow-y-scroll">
                      {
                          `
  $server_seed = "15x3e04a4241ca1b2048cc3b3b844e479f2bd9c23a870628072ee98fd144a2jt2";
  $public_seed = "384112512743";
  $round = "1000";
  $hash = hash('sha256', $server_seed . "-" . $public_seed . "-" . $round);
  $roll = hexdec(substr($hash, 0, 8)) % 15;
  if ($roll == 0) $roll_colour = 'green';
  elseif ($roll >= 1 and $roll <= 7) $roll_colour = 'red';
  elseif ($roll >= 8 and $roll <= 14) $roll_colour = 'black';
  
  echo("Roll: $roll\nColour: $roll_colour");
                          `
                      }
                  </pre>
  
                  <p className="text-custom-gray-400 py-4 text-sm">
                      You can execute code straight from your browser with tools such as this PHP code.
                  </p>
              </div>
  
  
  
  
          </div>
    );
  }