import styles from './WhyStreamside.module.css';

const pillars = [
  { icon: '🌊', title: 'Clear Systems', desc: 'Built for your business. No confusion, no surprises.' },
  { icon: '🤝', title: 'Real Partnership', desc: "We're in your corner — approachable and on your side." },
  { icon: '📊', title: 'Sustainable Growth', desc: 'Better decisions. Better numbers. Stronger future.' },
];

export default function WhyStreamside() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <span className={styles.eyebrow}>Why Streamside</span>
            <h2 className={styles.title}>Grow with the Flow</h2>
            <p className={styles.desc}>
              We believe bookkeeping should flow as smoothly as your business. With the right systems and support, you'll have clarity, control, and the confidence to move forward.
            </p>
            <div className={styles.pillars}>
              {pillars.map(p => (
                <div key={p.title} className={styles.pillar}>
                  <div className={styles.pillarIcon}>{p.icon}</div>
                  <div>
                    <div className={styles.pillarTitle}>{p.title}</div>
                    <div className={styles.pillarDesc}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.badge}>BUILT FOR VANCOUVER ISLAND</div>
            <img
              src="./sec.png"
              alt="Vancouver Island nature"
              className={styles.img}
            />
            <p className={styles.caption}>
              Proudly supporting contractors, trades, and service business owners across Vancouver Island with bookkeeping that makes sense.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
