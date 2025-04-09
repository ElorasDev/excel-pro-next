import { NextPage } from "next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Make sure the Swiper styles are imported
import Image from "next/image";

interface TeamImages {
  id: string;
  alt: string;
  src: string;
}

interface SliderProps {
  teamImages: TeamImages[];
  spaceBetween?: number;
  slidesPerView?: number | { 640?: number; 768?: number; 1024?: number };
  autoplayDelay?: number;
  loop?: boolean;
}

const TeamSlider: NextPage<SliderProps> = ({ teamImages }) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
        }}
        navigation={false}
        pagination={false}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        speed={800}
        className="team-swiper py-4"
      >
        {[...teamImages, ...teamImages].slice(0, 12).map((image, index) => (
          <SwiperSlide key={`team-${index}`}>
<div className="rounded-lg overflow-hidden shadow-md">
  <Image
    src={image.src}
    alt={image.alt}
    width={500}
    height={300}
    className="w-full h-auto" // Responsive width, auto height
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
  />
</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TeamSlider;
