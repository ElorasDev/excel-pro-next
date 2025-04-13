import { NextPage } from "next";
import { notFound } from "next/navigation";
import { programs } from "@/components/organisms/SummeryPrograms/data";
import ProgramDetails from "@/components/template/Program/ProgramDetails/ProgramDetails";

interface ProgramPageProps {
  params: { slug: string };
}

const ProgramPage: NextPage<ProgramPageProps> = ({ params }) => {
  const decodedSlug = decodeURIComponent(params.slug).replace(/–/g, "-");

  const normalize = (str: string): string =>
    str
      .toLowerCase()
      .replace(/\s*–\s*/g, '-')
      .replace(/\s*-\s*/g, '-')
      .replace(/\s+/g, '');

  if (!/^u\d+-u\d+$/i.test(decodedSlug)) {
    return notFound(); // 404 page
  }

  // Find the program based on the slug
  const program = programs.find(p => normalize(p.ageGroup) === normalize(decodedSlug));

  if (!program) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-36 lg:py-28 md:py-28 sm:py-36">
        <ProgramDetails 
        program={program}
        decodedSlug={decodedSlug}
        />
    </main>
  );
};

export default ProgramPage;
