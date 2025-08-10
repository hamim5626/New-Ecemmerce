"use client";

import Image from "next/image";
import Mackup1 from "../../public/mazkup1.png";
import Mackup2 from "../../public/mackup2.png";
import Mackup3 from "../../public/mackup3.png";

export default function Empower() {
  return (
    <div className="pt-24 container">
      <div className="py-[120px]">
        <h3 className="text-center text-neutral-900 text-lg md:text-xl font-normal font-kaiseiHarunoUmi">
          Empower your skin care
        </h3>

        <h2 className="text-neutral-900 text-3xl md:text-5xl font-normal font-prata flex flex-wrap justify-center items-center gap-4 mt-6 mb-4 text-center">
          <span>The harmony between powerful</span>
          <div className="w-16 h-16 md:w-24 md:h-24 relative rounded-full overflow-hidden border border-white">
            <Image
              src={Mackup1}
              alt="Mackup1"
              fill
              sizes="(max-width: 768px) 64px, 96px"
            />
          </div>
          <span>high-performance ingredier</span>
        </h2>

        <h2 className="text-neutral-900 text-3xl md:text-5xl font-normal font-prata flex flex-wrap justify-center items-center gap-4 text-center">
          <div className="w-16 h-16 md:w-24 md:h-24 relative rounded-full overflow-hidden border border-white">
            <Image
              src={Mackup2}
              alt="Mackup2"
              fill
              sizes="(max-width: 768px) 64px, 96px"
            />
          </div>
          <span>and exceptionally simple</span>
          <div className="w-16 h-16 md:w-24 md:h-24 relative rounded-full overflow-hidden border border-white">
            <Image
              src={Mackup3}
              alt="Mackup3"
              fill
              sizes="(max-width: 768px) 64px, 96px"
            />
          </div>
          <span>Skincare routines.</span>
        </h2>
      </div>
    </div>
  );
}
