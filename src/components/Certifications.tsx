import CertGrid from "@/components/CertGrid";
import SectionHeading from "@/components/SectionHeading";
import { certs } from "@/data/certs";
import { publicFileExists } from "@/lib/public-file";

export default function Certifications() {
  const items = certs.map((c) => {
    const src = `/certs/${c.slug}.jpg`;
    return { ...c, src, hasImage: publicFileExists(src) };
  });
  return (
    <section
      id="certifications"
      data-build-section
      aria-labelledby="certs-title"
      className="border-t border-line bg-[linear-gradient(180deg,#07090F,#0A0D15)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32">
        <SectionHeading id="certs-title" eyebrow="Certifications & training" lines={["Certified"]} />
        <CertGrid items={items} />
      </div>
    </section>
  );
}
