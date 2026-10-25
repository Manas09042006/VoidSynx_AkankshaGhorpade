
import { useState, } from "react";
import {
  AudioLines,
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Clock3,
  Download,
  FileAudio,
  FileText,
  FolderClock,
  Home,
  LayoutGrid,
  ShieldCheck,
  Waves,
} from "lucide-react";
import "./AnalysisDashboard.css";

type AnalysisDashboardProps = {
  file: File;
  onBack: () => void;
};

type Tab = "Overview" | "Emotion Timeline" | "Key Segments" | "Transcript";

const tabs: Tab[] = [
  "Overview",
  "Emotion Timeline",
  "Key Segments",
  "Transcript",
];

const emotions = [
  { name: "Neutral", color: "#8bb9ff" },
  { name: "Fear", color: "#f5c957" },
  { name: "Anger", color: "#ff5c79" },
  { name: "Distress", color: "#a65bff" },
  { name: "Nervousness", color: "#20dca5" },
];

const bars = Array.from({ length: 100 }, (_, i) => {
  const shape =
    Math.abs(Math.sin(i * 0.47) * Math.cos(i * 0.19)) *
    (0.45 + Math.abs(Math.sin(i * 0.11)) * 0.75);

  const color =
    i < 15 ? emotions[0].color :
    i < 27 ? emotions[1].color :
    i < 36 ? emotions[2].color :
    i < 47 ? emotions[0].color :
    i < 60 ? emotions[3].color :
    i < 70 ? emotions[0].color :
    i < 87 ? emotions[4].color :
    emotions[0].color;

  return {
    height: 12 + shape * 72,
    color,
  };
});

export default function AnalysisDashboard({
  file,
  onBack,
}: AnalysisDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  const downloadDemoReport = () => {
    const report = [
      "VOXTRACE - DEMONSTRATION REPORT",
      "================================",
      `File: ${file.name}`,
      `File size: ${formatSize(file.size)}`,
      "",
      "Status: DEMO ONLY",
      "No actual speech emotion model has processed this recording.",
      "The displayed waveform and emotion categories are illustrative.",
      "Do not use this report as evidence or as an investigative finding.",
    ].join("\n");

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "VoxTrace-Demo-Report.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="ad-app">
      <aside className="ad-sidebar">
        <button className="ad-brand" onClick={onBack} aria-label="Back to VoxTrace">
          <img src="/logoV.png" alt="VoxTrace" />
        </button>

        <div className="ad-nav-heading">WORKSPACE</div>

        <nav className="ad-navigation">
          {[
            { label: "Home", icon: Home },
            { label: "Upload Audio", icon: FileAudio },
            { label: "Analysis", icon: BarChart3 },
            { label: "Case History", icon: FolderClock },
            { label: "Reports", icon: FileText },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`ad-nav-item ${label === "Analysis" ? "active" : ""}`}
              onClick={() => {
                if (label === "Home" || label === "Upload Audio") onBack();
              }}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="ad-sidebar-bottom">
          <div className="ad-security">
            <ShieldCheck size={17} />
            <span>Secure workspace</span>
          </div>
          <div className="ad-user">
            <span className="ad-avatar">A</span>
            <span>
              <strong>Analyst</strong>
              <small>Investigator</small>
            </span>
          </div>
        </div>
      </aside>

      <section className="ad-main">
        <header className="ad-topbar">
          <div className="ad-breadcrumb">
            <button onClick={onBack}>Home</button>
            <span>/</span>
            <span>Analysis</span>
            <span>/</span>
            <strong>Dashboard</strong>
          </div>

          <div className="ad-user-top">
            <span className="ad-online" />
            Analyst
            <span className="ad-avatar">A</span>
          </div>
        </header>

        <div className="ad-content">
          <div className="ad-case-header">
            <div>
              <div className="ad-eyebrow">
                <span />
                INVESTIGATION WORKSPACE
              </div>
              <h1>Analysis Dashboard</h1>
              <p className="ad-filename" title={file.name}>
                <FileAudio size={15} />
                {file.name}
              </p>
              <p className="ad-file-size">{formatSize(file.size)} · Current session</p>
            </div>

            <button className="ad-download" onClick={downloadDemoReport}>
              <Download size={16} />
              Download Report
            </button>
          </div>

          <div className="ad-demo-banner">
            <ShieldCheck size={17} />
            <span>
              <strong>Demo preview:</strong> emotion categories and waveform
              below are illustrative, not model predictions.
            </span>
          </div>

          <div className="ad-tabs" role="tablist" aria-label="Analysis sections">
            {tabs.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                className={activeTab === tab ? "selected" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Overview" && (
            <>
              <div className="ad-stat-grid">
                <article className="ad-stat-card">
                  <span className="ad-stat-icon purple">
                    <Clock3 size={25} />
                  </span>
                  <div>
                    <strong>--:--</strong>
                    <span>Total Duration</span>
                  </div>
                </article>

                <article className="ad-stat-card">
                  <span className="ad-stat-icon blue">
                    <LayoutGrid size={25} />
                  </span>
                  <div>
                    <strong>--</strong>
                    <span>Analyzed Segments</span>
                  </div>
                </article>

                <article className="ad-stat-card">
                  <span className="ad-stat-icon violet">
                    <AudioLines size={25} />
                  </span>
                  <div>
                    <strong>--</strong>
                    <span>Detected Emotions</span>
                  </div>
                </article>
              </div>

              <section className="ad-panel">
                <div className="ad-panel-heading">
                  <div>
                    <h2>Audio Emotion Timeline</h2>
                    <p>Illustrative waveform preview</p>
                  </div>
                  <span className="ad-demo-chip">DEMO</span>
                </div>

                <div className="ad-waveform">
                  {bars.map((bar, index) => (
                    <span
                      key={index}
                      style={{
                        height: `${bar.height}px`,
                        background: bar.color,
                      }}
                    />
                  ))}
                </div>

                <div className="ad-time-labels">
                  <span>00:00</span>
                  <span>Illustrative timeline</span>
                  <span>--:--</span>
                </div>

                <div className="ad-legend">
                  {emotions.map((emotion) => (
                    <span key={emotion.name}>
                      <i style={{ background: emotion.color }} />
                      {emotion.name}
                    </span>
                  ))}
                </div>
              </section>

              <section className="ad-panel ad-empty-panel">
                <div className="ad-empty-icon">
                  <Waves size={23} />
                </div>
                <div>
                  <h2>Model results will appear here</h2>
                  <p>
                    Connect the Python speech-emotion model to populate
                    real segments, predictions and timestamps.
                  </p>
                </div>
              </section>
            </>
          )}

          {activeTab === "Emotion Timeline" && (
            <section className="ad-panel ad-tab-panel">
              <div className="ad-empty-icon"><Waves size={25} /></div>
              <h2>Emotion Timeline</h2>
              <p>
                Actual timestamped emotion predictions will appear here
                after the audio has been processed by the Python model.
              </p>
            </section>
          )}

          {activeTab === "Key Segments" && (
            <section className="ad-panel ad-tab-panel">
              <div className="ad-empty-icon"><Clock3 size={25} /></div>
              <h2>Key Audio Segments</h2>
              <p>
                Important audio intervals, playback controls and model
                confidence scores will appear here when real results are available.
              </p>
            </section>
          )}

          {activeTab === "Transcript" && (
            <section className="ad-panel ad-tab-panel">
              <div className="ad-empty-icon"><FileText size={25} /></div>
              <h2>Audio Transcript</h2>
              <p>
                No transcript has been generated. Speech-to-text integration
                is required to display recognized words and timestamps.
              </p>
            </section>
          )}

          <footer className="ad-footer">
            <span>VOXTRACE / ANALYSIS WORKSPACE</span>
            <span><CheckCircle2 size={13} /> Human review required</span>
          </footer>

          <button className="ad-back-button" onClick={onBack}>
            <ArrowLeft size={15} /> Back
          </button>
        </div>
      </section>
    </main>
  );
}
