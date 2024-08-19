import React from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import treesImage from "../assets/bg-trees.png";

const GlobalStyle = createGlobalStyle`
  :root {
    --twinkle-duration: 4s;
  }
  
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const twinkle = keyframes`
  25% {
    opacity: 0;
  }
`;

const comet = keyframes`
  0%, 40% {
    transform: translateX(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  60%, 100% {
    transform: translateX(-100vmax);
    opacity: 0;
  }
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const StarsWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(#16161d, #1f1f3a, #3b2f4a);
  overflow: hidden;
`;

const Stars = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: ${twinkle} var(--twinkle-duration) ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: calc(var(--twinkle-duration) * -0.33);
  }
  &:nth-child(3) {
    animation-delay: calc(var(--twinkle-duration) * -0.66);
  }
`;

const Star = styled.circle`
  fill: white;

  &:nth-child(3n) {
    opacity: 0.8;
  }
  &:nth-child(7n) {
    opacity: 0.6;
  }
  &:nth-child(13n) {
    opacity: 0.4;
  }
  &:nth-child(19n) {
    opacity: 0.2;
  }
`;

const Comet = styled.ellipse`
  transform-origin: center center;
  animation: ${comet} 10s linear infinite;

  &.comet-b {
    animation-delay: -3.3s;
  }

  &.comet-c {
    animation-delay: -5s;
  }
`;

const TreeLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background-image: url(${treesImage});
  background-repeat: repeat-x;
  background-position: bottom;
  background-size: auto 100%;
`;

const StarryBackground = () => {
  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      cx: `${Math.round(Math.random() * 10000) / 100}%`,
      cy: `${Math.round(Math.random() * 10000) / 100}%`,
      r: Math.round((Math.random() + 0.5) * 10) / 10,
    }));
  };

  return (
    <>
      <GlobalStyle />
      <BackgroundWrapper>
        <StarsWrapper>
          {[0, 1, 2].map((_, index) => (
            <Stars key={index} preserveAspectRatio="none">
              {generateStars(200).map((star, i) => (
                <Star key={i} {...star} />
              ))}
            </Stars>
          ))}
          <svg width="100%" height="100%" preserveAspectRatio="none">
            <defs>
              <radialGradient id="comet-gradient" cx="0" cy=".5" r="0.5">
                <stop offset="0%" stopColor="rgba(255,255,255,.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <g transform="rotate(-135)">
              <Comet
                className="comet-a"
                fill="url(#comet-gradient)"
                cx="0"
                cy="0"
                rx="150"
                ry="2"
              />
            </g>
            <g transform="rotate(20)">
              <Comet
                className="comet-b"
                fill="url(#comet-gradient)"
                cx="100%"
                cy="0"
                rx="150"
                ry="2"
              />
            </g>
            <g transform="rotate(300)">
              <Comet
                className="comet-c"
                fill="url(#comet-gradient)"
                cx="40%"
                cy="100%"
                rx="150"
                ry="2"
              />
            </g>
          </svg>
        </StarsWrapper>
        <TreeLine />
      </BackgroundWrapper>
    </>
  );
};

export default StarryBackground;
