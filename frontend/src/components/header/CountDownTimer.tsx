import { useEffect, useState } from 'react';

const RewardCountdown = ({ lastRewardTimestamp }: {
    lastRewardTimestamp: number;
}) => {
  // Time in milliseconds (24 hours = 86400000 ms)
  const REWARD_INTERVAL = 24 * 60 * 60 * 1000;

  // State to hold the time left
  const [timeLeft, setTimeLeft] = useState(REWARD_INTERVAL);

  // Function to calculate the time difference
  const calculateTimeLeft = () => {
    const currentTime = new Date().getTime(); // Get current time in ms
    const lastRewardTime = new Date(lastRewardTimestamp).getTime(); // Convert last reward timestamp to ms
    const nextRewardTime = lastRewardTime + REWARD_INTERVAL;
    return nextRewardTime - currentTime;
  };

  useEffect(() => {
    // Initialize time left when component mounts
    setTimeLeft(calculateTimeLeft());

    // Update the countdown every second
    const timer = setInterval(() => {
      const remainingTime = calculateTimeLeft();
      if (remainingTime <= 0) {
        clearInterval(timer);
        setTimeLeft(0); // Reward can now be claimed
      } else {
        setTimeLeft(remainingTime);
      }
    }, 1000);

    // Clean up the timer when component unmounts
    return () => clearInterval(timer);
  }, [lastRewardTimestamp]);

  // Helper function to format time into HH:MM:SS
  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className=' max-w-full overflow-hidden'>
      {timeLeft > 0 ? (
        <p><span className='hidden md:inline'>Sekanti prizą atsiimti galėsi už: </span>
        <span className='inline md:hidden'>Reward in: </span>

            <span className='absolute ml-1'>{formatTime(timeLeft)}</span>
            <span className='invisible'>00:00:10</span>
        </p>
      ) : (
        <p>Prizas paruoštas! Atsiimk dabar!</p>
      )}
    </div>
  );
};

export default RewardCountdown;
