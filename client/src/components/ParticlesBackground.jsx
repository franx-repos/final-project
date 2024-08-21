import React, { useEffect } from "react";
import particles from "particlesjs";

const ParticlesBackground = () => {
  useEffect(() => {
    particles.init({
      // normal options
      selector: ".background",
      maxParticles: 160,
      color: "#5CBFBF",
      speed: 0.075,
      sizeVariations: 5,
      minDistance: 175,
      connectParticles: true,
      // options for breakpoints
      responsive: [
        {
          breakpoint: 1400,
          options: {
            maxParticles: 80,
            speed: 0.075,
            sizeVariations: 5,
            minDistance: 150,
            connectParticles: true,
          },
        },
        {
          breakpoint: 425,
          options: {
            maxParticles: 100,
            connectParticles: true,
          },
        },
        {
          breakpoint: 320,
          options: {
            maxParticles: 0, // disables particles.js
          },
        },
      ],
    });
  }, []);

  return <canvas className="background bg-white dark:bg-black fixed"></canvas>;
};

export default ParticlesBackground;
