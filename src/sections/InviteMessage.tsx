import Reveal from "../components/Reveal";
import { wedding } from "../config";

export default function InviteMessage() {
  return (
    <section className="relative px-6 py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f2c4d0]/25 to-transparent" />
      <Reveal className="mx-auto flex max-w-lg flex-col items-center text-center">
        <p className="font-display text-sm tracking-[0.35em] text-[#f2c4d0]/90">
          {wedding.verse.blessing}
        </p>
        <div className="mt-6 h-px w-20 bg-gradient-to-r from-transparent via-[#f2c4d0]/40 to-transparent" />

        {/* Dual Couple Portraits */}
        <div className="relative mt-9 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-lg">
          {/* Photo 1: Custom Illustration */}
          <div className="relative group flex flex-col items-center">
            <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-[#c45a7a]/35 via-[#f2c4d0]/25 to-[#c9a86a]/35 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-[#f2c4d0]/35 bg-[#2a1830]/90 p-2 shadow-[0_20px_45px_rgba(0,0,0,0.45)] ring-1 ring-[#f2c4d0]/20 w-full aspect-[4/5]">
              <img
                src="./assets/couple-illustration.jpg"
                alt={`${wedding.groomFull} & ${wedding.brideFull} Illustration`}
                className="h-full w-full rounded-[1.4rem] object-cover object-top transition duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Photo 2: Real Couple Photo */}
          <div className="relative group flex flex-col items-center">
            <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-[#c9a86a]/35 via-[#f2c4d0]/25 to-[#c45a7a]/35 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-[#f2c4d0]/35 bg-[#2a1830]/90 p-2 shadow-[0_20px_45px_rgba(0,0,0,0.45)] ring-1 ring-[#f2c4d0]/20 w-full aspect-[4/5]">
              <img
                src="./assets/couple-photo.jpg"
                alt={`${wedding.groomFull} & ${wedding.brideFull} Photo`}
                className="h-full w-full rounded-[1.4rem] object-cover object-top transition duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
        
        <p className="mt-9 font-display text-[1.15rem] leading-[1.65] text-[#faf3eb]/90 sm:text-[1.3rem]">
          Together with their families, request the honour of your auspicious presence and blessings on the auspicious wedding ceremony of
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-6 rounded-3xl border border-[#f2c4d0]/15 bg-gradient-to-b from-[#3a2240]/60 to-[#2a1830]/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          {/* Groom Block */}
          <div className="flex flex-col items-center gap-1.5">
            <h3 className="font-script text-4xl sm:text-5xl text-[#faf3eb]">
              {wedding.groomFull}
            </h3>
            <p className="font-display text-xs sm:text-[13px] tracking-[0.18em] text-[#e8dcc8]/85 uppercase">
              ({wedding.groomParents})
            </p>
          </div>

          {/* Weds Divider */}
          <div className="flex items-center gap-4 w-full justify-center">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#f2c4d0]/30" />
            <span className="font-script text-3xl sm:text-4xl text-[#f2c4d0] px-2 italic">
              weds
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#f2c4d0]/30" />
          </div>

          {/* Bride Block */}
          <div className="flex flex-col items-center gap-1.5">
            <h3 className="font-script text-4xl sm:text-5xl text-[#faf3eb]">
              {wedding.brideFull}
            </h3>
            <p className="font-display text-xs sm:text-[13px] tracking-[0.18em] text-[#e8dcc8]/85 uppercase">
              ({wedding.brideParents})
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
