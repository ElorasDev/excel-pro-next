import { NextPage } from "next";
import Image from "next/image";

interface SlideProps {
  imageSrc: string;
  playerName: string;
}

const Slide: NextPage<SlideProps> = ({ imageSrc, playerName }) => {
  return (
    <div className="min-w-full h-full relative flex-shrink-0">
      <Image
        src={imageSrc}
        alt={`${playerName} player image`}
        quality="100"
        fill={true}
      />
    </div>
  );
};

export default Slide;
