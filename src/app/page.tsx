'use client';
import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


export default function Home() {

  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction =1;


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: globalThis.document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 0.25,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-=300px",
    })
  }, [])

  const animation = () => {

    if (xPercent <= -100) {
      xPercent = 0;
    }

    if (xPercent > 0) {
      xPercent = -100;
    }
    
    gsap.set(firstText.current, {xPercent: xPercent})
    gsap.set(secondText.current, {xPercent: xPercent})
    xPercent += 0.1 * direction;
    requestAnimationFrame(animation);
  }

  return (
    <main className="main">
        <Image 
        fill={true}
        src="/images/Nicklaus.png"
        alt="Image of Nicklaus"
      />
      
      <div className="sliderContainer">
        <div ref={slider} className="slider">
          <p ref={firstText}>Software Developer - </p>
          <p ref={secondText}>Software Developer - </p>
        </div>
      </div>
    </main>
  );
}
