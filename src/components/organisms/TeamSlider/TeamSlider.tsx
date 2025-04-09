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
            <div className="rounded-lg overflow-hidden shadow-md h-52 sm:h-60 md:h-64 lg:h-72">
              <div className="relative h-full w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TeamSlider;
