import Image from "next/image";
import { Button } from "../../atoms/Button/Button";
import AvatarGroup from "../../molecules/AvatarGroup/AvatarGroup";

const HeroSection: React.FC = () => {
  // List of avatar images representing members.
  const members = [
    { src: "/images/person/avatars/Avatar1.png", alt: "Member 1" },
    { src: "/images/person/avatars/Avatar2.png", alt: "Member 2" },
    { src: "/images/person/avatars/Avatar3.png", alt: "Member 3" },
    { src: "/images/person/avatars/Avatar4.png", alt: "Member 4" },
    { src: "/images/person/avatars/Avatar5.png", alt: "Member 5" },
  ];
  return (
    <div className="relative bg-white p-6 rounded-lg shadow-sm w-full max-w-6xl mx-auto overflow-hidden">
      {/* Background image for larger screens */}
      <div className="absolute right-0 top-0 h-full w-1/2 hidden md:block">
        <Image src="/images/other/training.png" width={500} height={400} alt="Soccer training" className="w-full h-full object-cover rounded-r-lg" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
      </div>
      <div className="relative z-10 flex flex-col gap-4 md:w-3/4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Excel Pro Academy, Where Champions Are Made!</h1>
        <p className="text-gray-600 mt-2 md:max-w-lg">
          Train with the best, compete at the highest level, and unlock your full potential with Excel Pro Academy.
        </p>
        {/* Action buttons and avatar group */}
        <div className="flex items-center gap-4 mt-2 flex-wrap">
          <Button variant="white" className="rounded-xl">View programs</Button>
          <Button variant="primary" className="rounded-xl">Join now</Button>
          <AvatarGroup members={members} extraCount={500} />
        </div>
      </div>
      {/* Mobile-only image */}
      <div className="mt-6 md:hidden rounded-lg overflow-hidden">
        <Image src="/images/other/training.png" width={400} height={200} alt="Soccer training" className="w-full h-48 object-cover" />
      </div>
    </div>
  );
};
export default HeroSection;