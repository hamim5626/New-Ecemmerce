import React from 'react';
import Carousel, {
  Slider,
  SliderContainer,
  ThumsSlider,
} from '@/components/ui/carousel';
import Image from 'next/image';

function ProductGallery({ gallery: imgPreview }) {
  console.log("gallery-----------", imgPreview);

  return (
    <div className="">
      <Carousel className="relative" options={{ loop: false }}>
        <SliderContainer className="gap-2">
          {imgPreview.map((item, index) => (
            <Slider
              key={index}
              className="xl:h-[700px] sm:h-[350px] h-[300px] w-full"
              thumnailSrc={item.image_path ? item.image_path : ""}
            >
              <Image
                src={item.image_path ? item.image_path : ""}
                width={1400}
                height={800}
                alt="image"
                className="h-full object-cover rounded-lg w-full"
              />
            </Slider>
          ))}
        </SliderContainer>
        
        {/* Pass the same images to ThumsSlider */}
        <ThumsSlider>
          {imgPreview.map((item, index) => (
            <div key={index} className="thumbnail-item">
              <Image
                src={item.image_path ? item.image_path : ""}
                width={100}
                height={100}
                alt={`Thumbnail ${index}`}
                className="h-full object-cover rounded-lg w-full"
              />
            </div>
          ))}
        </ThumsSlider>
      </Carousel>
    </div>
  );
}

export default ProductGallery;