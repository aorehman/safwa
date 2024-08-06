import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedCount = ({ value }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const animation = async () => {
      let frame = 0;
      const totalFrames = 120;
      const increment = (value - animatedValue) / totalFrames;

      const update = () => {
        setAnimatedValue((prev) => prev + increment);
        frame++;

        if (frame < totalFrames) {
          requestAnimationFrame(update);
        }
      };

      update();
    };

    animation();

    return () => setAnimatedValue(value);
  }, []);

  return <motion.span>{Math.floor(animatedValue)}</motion.span>;
};

export default AnimatedCount;
