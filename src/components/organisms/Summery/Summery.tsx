import PrimaryIcon from '@/components/atoms/Icons/primaryIcons/PrimaryIcon';
import Link from 'next/link';

const Summary = () => {
  return (
    <div className="lg:p-28 py-8 px-4 w-full bg-[#F9F9F9]">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Excel Pro Academy</h2>
        <p className="text-gray-600 mb-4">
          Excel Pro is the largest Iranian-Based soccer academy in Toronto, managed by former Persepolis Fc player, Reza Abedian. At Excel Pro Soccer Academy, we have been training youths from age 6 all the way to 18 years old.
        </p>
        <Link href="/about" className="inline-flex items-center text-gray-700 hover:text-primary text-lg font-semibold transition-all duration-300 justify-center group">
          Learn more 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M5 12h16" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <PrimaryIcon 
          number="+500" 
          text="Student" 
          variant="dark"
          icon="/icons/football_player.png" 
        />
        <PrimaryIcon
          number="+18" 
          text="Years of experience"
          variant="dark"
          width={150}
          height={150}
          icon="/icons/trophy.png" 
        />
        <PrimaryIcon
          number="+5" 
          text="Coaches"
          variant="dark" 
          icon="/icons/Coaches.png" 
        />
        <PrimaryIcon
          number="+10" 
          text="Awards"
          variant="dark" 
          icon="/icons/cup.png" 
        />
      </div>
    </div>
  );
};

export default Summary;
