import React, { useEffect } from "react";

const ParticlesBackground = () => {
  useEffect(() => {
    Particles.init({
      // normal options
      selector: ".background",
      maxParticles: 160,
      color: "#5CBFBF",
      speed: 0.05,
      sizeVariations: 5,
      minDistance: 175,
      connectParticles: true,
      // options for breakpoints
      responsive: [
        {
          breakpoint: 768,
          options: {
            maxParticles: 200,
            color: "#5CBFBF",
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

  return (
    <canvas
      className="background"
      // style={{ position: "absolute", width: "100%", height: "100%" }}
    ></canvas>
  );
};

export default ParticlesBackground;
