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
        <Image
          radius="md"
          h={300}
          fit="cover"
          alt=""
          src={
            "https://images.unsplash.com/photo-1696928634052-41aa345ef686?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          }
        />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          radius="md"
          h={300}
          alt=""
          fit="cover"
          src={
            "https://images.unsplash.com/photo-1696928634052-41aa345ef686?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          }
        />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          radius="md"
          alt=""
          h={300}
          fit="cover"
          src={
            "https://images.unsplash.com/photo-1696928634052-41aa345ef686?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          }
        />
      </Carousel.Slide>
    </Carousel>
  );
}

export default ContinuousBanner;
