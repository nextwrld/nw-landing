const HeroVisual = () => (
  <div className="hero-visual" aria-hidden="true">
    <div className="hero-visual-nodes">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="hero-visual-node" />
      ))}
    </div>
    <div className="hero-visual-core">
      <div className="hero-visual-core-inner">NEXT WRLD</div>
    </div>
    <div className="hero-visual-output">
      <div className="hero-visual-output-chip" />
      <div className="hero-visual-output-chip hero-visual-output-chip-fill" />
      <div className="hero-visual-output-chip" />
    </div>
  </div>
);

export default HeroVisual;
