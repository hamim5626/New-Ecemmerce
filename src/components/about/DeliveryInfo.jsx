import Image from "next/image";
import fsdelivery from "../../../public/fsdelivery.svg"
import shield from "../../../public/shield.svg"
import returnp from "../../../public/returnp.svg"


const DeliveryInfo = () => {
    const deliveryInfo = [
        {
          title: "Fast & Secure Delivery",
          icon: fsdelivery
        },
        {
          title: "100% Guarantee on Product",
          icon: shield
        },
        {
          title: "24 Hour Return policy",
          icon: returnp
        } 
      ]
    return(
        <div className="max-w-[1147px] px-4 mx-auto mt-20 md:mt-[120px]">
            <div className="grid md:grid-cols-3 gap-4 md:gap-20">
                {deliveryInfo.map((item, index) => (
                    <div key={index} className="pt-[60px] pb-[60px] px-[50px] flex flex-col justify-center bg-[#F8DAB0] items-center border">
                        <Image src={item.icon} alt={item.title} className="w-[60px] h-[60px] md:w-[120px] md:h-[120px]" />
                        <h3 className="text-xl md:text-2xl font-bold text-center font-inter text-heading mt-[22px]">{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DeliveryInfo;