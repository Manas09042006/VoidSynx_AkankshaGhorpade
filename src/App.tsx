
import {
  AudioLines,
  ArrowRight,
  BrainCircuit,
  Crosshair,
  FileAudio,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import "./App.css";

const features = [
  { icon: FileAudio, label: <>Upload<br />Audio</> },
  { icon: BrainCircuit, label: <>AI Analysis</> },
  { icon: Crosshair, label: <>Emotion<br />Timeline</> },
  { icon: FileText, label: <>Investigator<br />Insights</> },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="landing-page" id="home">
      <div className="landing-frame">
        <header className="navbar">
          <a className="logo" href="#home" aria-label="VoxTrace home">
            <span className="logo-icon">
              <AudioLines size={29} strokeWidth={1.8} />
            </span>
            <span>
              Vox<span className="logo-accent">Trace</span>
            </span>
          </a>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
            <button onClick={() => goTo("features")}>Features</button>
            <button onClick={() => goTo("how-it-works")}>How It Works</button>
            <button onClick={() => goTo("about")}>About</button>
          </nav>

          <button className="nav-cta" onClick={() => goTo("get-started")}>
            Get Started <ArrowRight size={15} />
          </button>
        </header>

        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="live-dot" />
              AI-POWERED SPEECH ANALYSIS
            </div>

            <h1>
              Turn
              <br />
              Voices <span className="white-word">into</span>
              <br />
              <span className="gradient-text">Actionable Insights</span>
            </h1>

            <p className="hero-description">
              AI-powered speech emotion analysis to assist
              <br className="desktop-break" />
              cybercrime investigators in identifying key
              <br className="desktop-break" />
              moments in audio recordings.
            </p>

            <div className="hero-buttons" id="get-started">
              <button
                className="primary-button"
                onClick={() => goTo("upload")}
              >
                Get Started <ArrowRight size={19} />
              </button>

              <button
                className="secondary-button"
                onClick={() => goTo("how-it-works")}
              >
                Learn More
              </button>
            </div>

            <div className="feature-strip" id="features">
              {features.map(({ icon: Icon, label }, index) => (
                <button
                  className="feature-item"
                  key={index}
                  onClick={() =>
                    goTo(index === 0 ? "upload" : "how-it-works")
                  }
                >
                  <span className="feature-icon">
                    <Icon size={25} strokeWidth={1.6} />
                  </span>
                  <span className="feature-label">{label}</span>
                </button>
              ))}
            </div>
          </div>

                    <div className="hero-visual" aria-hidden="true">
            <div className="visual-glow" />

            <div className="waveform">
              {Array.from({ length: 65 }, (_, i) => {
                const wave =
                  Math.abs(Math.sin(i * 0.42) * Math.cos(i * 0.16)) *
                  (0.65 + Math.abs(Math.sin(i * 0.09)) * 0.8);

                return (
                  <span
                    className="wave-bar"
                    key={i}
                    style={{
                      height: `${12 + wave * 90}px`,
                      animationDelay: `${i * 16}ms`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <div className="bottom-line" />

        <section className="upload-anchor" id="upload">
          <span className="upload-anchor-icon">
            <FileAudio size={23} />
          </span>
          <div>
            <strong>Ready to analyze a recording?</strong>
            <p>Start your audio investigation with VoxTrace.</p>
          </div>
          <button
            onClick={() =>
              alert("Audio upload will be connected in the next development step.")
            }
          >
            Upload Audio <ArrowRight size={16} />
          </button>
        </section>

        <section className="hidden-anchor" id="how-it-works">
          VoxTrace analyzes audio recordings to help investigators review
          possible vocal emotion patterns. Model predictions require human
          interpretation and are not proof of guilt or intent.
        </section>

        <section className="hidden-anchor" id="about">
          VoxTrace is an AI-assisted audio analysis concept for cybercrime
          investigation workflows.
        </section>
      </div>
    </main>
  );
}