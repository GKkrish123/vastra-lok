import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Title from "./Title";
import { carouselData } from "./carouselData";

export function AppleCarouselDemo() {
  const cards = carouselData.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full pt-16 pb-8">
        <div className='text-center py-8 text-3xl'>
            <Title text1={'EXPLORE'} text2={'CATEGORIES'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Where trends meet tradition — explore clothing made to stand out.
            </p>
        </div>
      <Carousel items={cards} />
    </div>
  );
}
