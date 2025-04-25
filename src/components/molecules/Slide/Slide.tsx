import { NextPage } from "next";
import Image from "next/image";

interface SlideProps {
  player_name?: string;
  image_url?: string;
}

const Slide: NextPage<SlideProps> = ({ player_name, image_url }) => {
  return (
    <div className="min-w-full h-full relative flex-shrink-0">
      <Image
        src={image_url ? `${image_url}` : "/images/billboard/Banner1.webp"}
        alt={`${player_name || "Default"} player image`}
        quality="100"
        fill={true}
        priority={true}
      />
    </div>
  );
};

export default Slide;