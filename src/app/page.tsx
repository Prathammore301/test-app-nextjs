import { BirthdaySection } from "@/components/experience/BirthdaySection";
import { CakeSection } from "@/components/experience/CakeSection";
import { EndingSection } from "@/components/experience/EndingSection";
import { FinalSection } from "@/components/experience/FinalSection";
import { FunnySection } from "@/components/experience/FunnySection";
import { IntroLoader } from "@/components/experience/IntroLoader";
import { IntroSection } from "@/components/experience/IntroSection";
import { LoveLetterSection } from "@/components/experience/LoveLetterSection";
import { MemorySection } from "@/components/experience/MemorySection";
import { MessageSection } from "@/components/experience/MessageSection";
import { SectionWrapper } from "@/components/experience/SectionWrapper";
import { getExperienceMedia } from "@/lib/public-media";

export default async function Home() {
  const {
    birthdayImages,
    birthdayPosterSrc,
    birthdayVideoSrc,
    funnyImages,
    memoryImages,
  } = await getExperienceMedia();

  return (
    <main className="relative isolate overflow-x-hidden bg-background text-foreground">
      <IntroLoader />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,128,203,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(145,104,255,0.14),transparent_34%),linear-gradient(180deg,#120814_0%,#09050f_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      </div>

      <SectionWrapper id="intro" panelClassName="max-w-xl">
        <IntroSection />
      </SectionWrapper>

      <SectionWrapper id="message" panelClassName="max-w-3xl">
        <MessageSection />
      </SectionWrapper>

      <SectionWrapper id="love-letter" panelClassName="max-w-3xl">
        <LoveLetterSection />
      </SectionWrapper>

      <SectionWrapper id="birthday-moments" panelClassName="max-w-5xl">
        <BirthdaySection birthdayImages={birthdayImages} />
      </SectionWrapper>

      <SectionWrapper id="funny-moments" panelClassName="max-w-5xl">
        <FunnySection funnyImages={funnyImages} />
      </SectionWrapper>

      <SectionWrapper id="memories" panelClassName="max-w-5xl">
        <MemorySection items={memoryImages} />
      </SectionWrapper>

      <SectionWrapper id="cake" panelClassName="max-w-3xl">
        <CakeSection
          birthdayPosterSrc={birthdayPosterSrc}
          birthdayVideoSrc={birthdayVideoSrc}
        />
      </SectionWrapper>

      <SectionWrapper id="final" panelClassName="max-w-2xl">
        <FinalSection />
      </SectionWrapper>

      <SectionWrapper id="ending" panelClassName="max-w-2xl">
        <EndingSection />
      </SectionWrapper>
    </main>
  );
}
