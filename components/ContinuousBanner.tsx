"use client";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";

function ContinuousBanner() {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  return (
    <Carousel
      slideGap="xs"
      withIndicators
      height={300}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <Carousel.Slide>
        <Image radius="md" h={300} fit="cover" alt="" src={"/banner.jpg"} />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image radius="md" h={300} alt="" fit="cover" src={"/banner.jpg"} />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image radius="md" alt="" h={300} fit="cover" src={"/banner.jpg"} />
      </Carousel.Slide>
    </Carousel>
  );
}

export default ContinuousBanner;
