import Image from "next/image";
import coco1 from "../../../public/coconut.png"
import coco2 from "../../../public/coconut2.png"
const SectionBanner = ({ title }) => {
    return (
        <div
            className="pt-[74px]"
            style={{
                background: "linear-gradient(93deg, #F1FAFE 5.22%, #F8DAB0 100.04%)"
            }}
        >
           <div className="grid grid-cols-3 justify-center items-center">
            <div className="">
                <Image className="" src={coco1} alt="coco1" />
            </div>
            <div className="flex flex-col justify-center items-center gap-6 -mt-20">
                <h1 className="text-[24px] md:text-[48px] font-prate text-heading tracking-[1.44px] text-center">{title}</h1>
                <span className="text-heading font-inter text-[14px] md:text-[16px] font-semibold text-center"><span className="md:pr-[35px]">Home</span> | <span className="md:pl-[35px]">{title}</span></span>
            </div>
            <div className="flex justify-end">
                <Image src={coco2} alt="coco2" />
            </div>
           </div>
        </div>
    );
};

export default SectionBanner;