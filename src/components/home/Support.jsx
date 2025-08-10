import Image from "next/image";

const Support = () => {
  return (
    <div className="bg-heading py-20 mb-[160px]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-14 md:gap-[116px]">
          <div className="flex flex-col items-center gap-[14px] md:w-[387px] text-center">
            <Image
              src="/fastdelivery.svg"
              alt="delivery"
              width={100}
              height={100}
            />

            <h3 className="text-white text-[26px] font-inter uppercase font-bold bg-primary px-[14px] py-2">
              Free shipping
            </h3>
            <p className="text-white text-[18px] font-inter">
              Enjoy free shipping on all order - Over 20 KD
            </p>
          </div>
          <div className="flex flex-col items-center gap-[14px] md:w-[387px] text-center">
            <Image src="/support.svg" alt="support" width={100} height={100} />
            <h3 className="text-white text-[26px] font-inter uppercase font-bold bg-primary px-[14px] py-2">
              24/7 SUPPORT
            </h3>
            <p className="text-white text-[18px] font-inter tracking-[0.18px]">
              Our team is available 24/7 to help with any questions or concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
