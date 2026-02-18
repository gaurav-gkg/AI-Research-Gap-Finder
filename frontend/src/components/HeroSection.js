import React from "react";

function HeroSection() {
  return (
    <div className="hero-section anim-hero">
      <h1 className="hero-title">
        <span style={{ color: "var(--text-pri)" }}>Find Research </span>
        <span className="animated-gradient-text">Gaps Instantly</span>
      </h1>
      <p className="hero-subtitle">
        Upload any academic paper and I'll identify unexplored areas, missing
        evaluations, and future research opportunities.
      </p>
    </div>
  );
}

export default HeroSection;
