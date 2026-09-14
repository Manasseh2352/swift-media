export default function AboutView() {
  return (
    <section className="view active">
      <div className="about-wrap">
        <div className="hero-eyebrow">About the studio</div>
        <h1>Started as a group chat. Still runs like one.</h1>
        <p>
          SwiftMedia began as a handful of friends who kept getting asked to shoot each
          other&apos;s side projects. A few years and a few hundred jobs later, it&apos;s
          a small working studio — same people, same habit of saying yes to interesting
          work.
        </p>
        <p>
          We keep teams small on purpose: one point of contact, one crew who actually
          shows up on set, no handoffs between departments that don&apos;t talk to each
          other.
        </p>

        <div className="skills">
          <div className="skill">
            <h3>Photography</h3>
            <p>Portraits, product, editorial and event coverage, shot and edited in-house.</p>
          </div>
          <div className="skill">
            <h3>Videography</h3>
            <p>Brand films, launch content, social cuts and full event coverage.</p>
          </div>
          <div className="skill">
            <h3>Design</h3>
            <p>Print, signage, layout and editorial design for physical and digital spaces.</p>
          </div>
          <div className="skill">
            <h3>Branding</h3>
            <p>Identity systems built to survive contact with real-world use.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
