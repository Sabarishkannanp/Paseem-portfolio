import ProofGrid from "@/components/ProofGrid";
import SectionHeading from "@/components/SectionHeading";
import { proofs } from "@/data/proof";
import { findPublicFile } from "@/lib/public-file";

/** "Proof in Performance": screenshot / video evidence per channel. */
export default function Proof() {
  const items = proofs.map((p) => {
    const file = findPublicFile(`/proof/${p.slug}`, ["mp4", "webm", "webp", "png", "jpg", "jpeg"]);
    return { ...p, file, video: !!file && /\.(mp4|webm)$/.test(file) };
  });
  return (
    <section id="proof" data-build-section aria-labelledby="proof-title" className="border-t border-line bg-[linear-gradient(180deg,#07090F,#0A0D15)]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32">
        <SectionHeading id="proof-title" eyebrow="Screenshots from live accounts" lines={["Proof in", "performance"]} />
        <ProofGrid items={items} />
      </div>
    </section>
  );
}
