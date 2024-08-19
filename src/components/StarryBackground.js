import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import treesImage from "../assets/bg-trees.png";

const twinkle = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const shoot = keyframes`
  0% { transform: translateX(0) translateY(0); opacity: 1; }
  70% { opacity: 1; }
  100% { transform: translateX(300px) translateY(300px); opacity: 0; }
`;

const Sky = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(#16161d, #1f1f3a, #3b2f4a);
  overflow: hidden;
`;

const Star = styled.div`
  position: absolute;
  background: #fff;
  border-radius: 50%;
  animation: ${twinkle} ${(props) => props.duration}s infinite;
  ${(props) => `
    width: ${props.size}px;
    height: ${props.size}px;
    top: ${props.top}%;
    left: ${props.left}%;
  `}
`;

const ShootingStar = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: #fff;
  animation: ${shoot} 3s linear forwards;
  ${(props) => `
    top: ${props.top}%;
    left: ${props.left}%;
  `}
`;

const TreeLine = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background-image: url(${treesImage});
  background-repeat: repeat-x;
  background-position: bottom;
  background-size: auto 100%;
`;

const StarryBackground = () => {
  const [stars] = useState(() =>
    Array.from({ length: 200 }, () => ({
      size: Math.random() * 3 + 1,
      top: Math.random() * 75,
      left: Math.random() * 100,
      duration: (Math.random() * 3 + 2).toFixed(2),
    }))
  );

  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShootingStars((prev) => [
        ...prev,
        {
          id: Date.now(),
          top: Math.random() * 75,
          left: Math.random() * 100,
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (shootingStars.length > 0) {
      const timeout = setTimeout(() => {
        setShootingStars((prev) => prev.slice(1));
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [shootingStars]);

  return (
    <>
      <Sky>
        {stars.map((star, index) => (
          <Star key={index} {...star} />
        ))}
        {shootingStars.map((star) => (
          <ShootingStar key={star.id} top={star.top} left={star.left} />
        ))}
      </Sky>
      <TreeLine />
    </>
  );
};

export default StarryBackground;
