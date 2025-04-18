import { fetchAllImages } from "@/services/getAllImages";
import AboutSection from "@/components/organisms/AboutSection/AboutSection";



const TeamGallery = async () => {

  const teamImages = await fetchAllImages();

  return (
    <section className="bg-white overflow-hidden">
          <AboutSection teamImages={teamImages} />
    </section>
  );
};

export default TeamGallery;
