
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  Circle,
  FileAudio,
  FileText,
  FolderOpen,
  Home,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import "./ProcessingPage.css";

type ProcessingPageProps = {
  file: File;
  onBack: () => void;
  onComplete?: () => void;
};

const steps = [
  "Preprocessing audio",
  "Segmenting into time chunks",
  "Running emotion analysis",
  "Generating timeline and insights",
  "Finalizing results",
];

const navigation = [
  { label: "Home", icon: Home },
  { label: "Upload Audio", icon: FileAudio },
  { label: "Analysis", icon: BarChart3 },
  { label: "Case History", icon: FolderOpen },
  { label: "Reports", icon: FileText },
];

export default function ProcessingPage({
  file,
  onBack,
  onComplete,
}: ProcessingPageProps) {
  const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((previousProgress) => {
        if (previousProgress >= 100) {
          return 100;
        }

        return Math.min(previousProgress + 1, 100);
      });
    }, 120);

    return () => {
      window.clearInterval(timer);
    };
  }, [file]);

  const completedSteps = Math.min(
    steps.length,
    Math.floor(progress / 20)
  );

  const formatSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <main className="vp-app">
      <aside className="vp-sidebar">
        
<a
  className="vp-brand"
  href="#home"
  aria-label="VoxTrace home"
  onClick={(event) => {
    event.preventDefault();
    onBack();
  }}
>
  <img
    src="/logoV.png"
    alt="VoxTrace"
    className="vp-brand-image"
  />
</a>


        <div className="vp-section-label">WORKSPACE</div>

        <nav className="vp-navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className={`vp-nav-item ${
                label === "Upload Audio" ? "active" : ""
              }`}
              onClick={() => {
                if (label === "Home") {
                  onBack();
                }
              }}
            >
              <Icon size={17} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="vp-sidebar-bottom">
          <div className="vp-security">
            <ShieldCheck size={18} />
            <div>
              <strong>Secure workspace</strong>
              <span>Investigator access</span>
            </div>
          </div>

          <div className="vp-analyst">
            <span className="vp-avatar">A</span>
            <div>
              <strong>Analyst</strong>
              <span>Investigator</span>
            </div>
          </div>
        </div>
      </aside>

      <section className="vp-main">
        <header className="vp-topbar">
          <div className="vp-breadcrumb">
            <button type="button" onClick={onBack}>
              Home
            </button>
            <span>/</span>
            <span>Upload Audio</span>
            <span>/</span>
            <strong>Processing</strong>
          </div>

          <div className="vp-top-user">
            <span className="vp-online-dot" />
            <span>Analyst</span>
            <span className="vp-avatar">A</span>
          </div>
        </header>

        <div className="vp-content">
          <div className="vp-heading">
            <span className="vp-eyebrow">
              <span className="vp-eyebrow-dot" />
              AUDIO INVESTIGATION
            </span>

            <h1>
              {progress === 100
                ? "Processing Complete"
                : "Analyzing Audio..."}
            </h1>

            <p>
              {progress === 100
                ? "The demo processing sequence has finished."
                : "Our analysis workflow is processing the audio and checking each stage."}
            </p>
          </div>

          <section className="vp-processing-card">
            <div
              className={`vp-progress-ring ${
                progress === 100 ? "complete" : ""
              }`}
              style={
                {
                  "--progress": `${progress * 3.6}deg`,
                } as CSSProperties
              }
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Processing progress"
            >
              <div className="vp-ring-inner">
                {progress === 100 ? (
                  <CheckCircle2 size={35} />
                ) : (
                  <>
                    <strong>{progress}%</strong>
                    <span>PROCESSING</span>
                  </>
                )}
              </div>
            </div>

            <div className="vp-progress-caption">
              <span className="vp-caption-dot" />
              {progress === 100
                ? "All demo stages completed"
                : "Please keep this page open"}
            </div>

            <div className="vp-checklist">
              {steps.map((step, index) => {
                const done = index < completedSteps;

                const active =
                  index === completedSteps && progress < 100;

                return (
                  <div
                    className={`vp-check-row ${
                      done ? "done" : active ? "current" : ""
                    }`}
                    key={step}
                  >
                    <span className="vp-step-icon">
                      {done ? (
                        <Check size={13} />
                      ) : active ? (
                        <Loader2
                          size={15}
                          className="vp-spinner"
                        />
                      ) : (
                        <Circle size={13} />
                      )}
                    </span>

                    <span className="vp-step-label">{step}</span>

                    <span className="vp-step-status">
                      {done
                        ? "Complete"
                        : active
                          ? "Running"
                          : "Pending"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="vp-file-summary">
              <span className="vp-file-icon">
                <FileAudio size={19} />
              </span>

              <div className="vp-file-info">
                <strong title={file.name}>{file.name}</strong>
                <span>
                  {formatSize(file.size)} · Selected recording
                </span>
              </div>

              {progress === 100 ? (
                <CheckCircle2
                  size={20}
                  className="vp-file-success"
                />
              ) : (
                <Loader2
                  size={19}
                  className="vp-file-loading"
                />
              )}
            </div>

            {progress === 100 && (
              <div className="vp-demo-notice">
                <ShieldCheck size={16} />
                <span>
                  Demo complete. Actual emotion results require
                  the Python analysis backend.
                </span>
              </div>
            )}

            <div className="vp-actions">
              <button
                type="button"
                className="vp-back-action"
                onClick={onBack}
              >
                Back
              </button>

              <button
                type="button"
                className="vp-next-action"
                disabled={progress < 100}
                onClick={onComplete}
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </section>

          <footer className="vp-footer">
            <span>
              VOXTRACE / INVESTIGATION WORKSPACE
            </span>

            <span>
              <ShieldCheck size={13} />
              AI predictions require human review
            </span>
          </footer>
        </div>
      </section>
    </main>
  );
}
