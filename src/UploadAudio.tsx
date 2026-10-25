
import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import {
  AudioLines,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  ChartNoAxesCombined,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileAudio,
  FileText,
  FolderClock,
  Home,
  LogOut,
  Menu,
  ShieldCheck,
  Trash2,
  UploadCloud,
  UserRound,
  X,
} from "lucide-react";
import "./UploadAudio.css";

type Props = {
  onBack?: () => void;
  onAnalyze?: (file: File) => void;
};

const navigation = [
  { label: "Home", icon: Home, page: "home" },
  { label: "Upload Audio", icon: FileAudio, page: "upload" },
  { label: "Analysis", icon: ChartNoAxesCombined, page: "analysis" },
  { label: "Case History", icon: FolderClock, page: "history" },
  { label: "Reports", icon: FileText, page: "reports" },
];

const MAX_SIZE = 50 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".mp3", ".wav", ".m4a"];

export default function UploadAudio({
  onBack,
  onAnalyze,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [analystMenu, setAnalystMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const validateFile = (selected: File) => {
    const extension = selected.name
      .slice(selected.name.lastIndexOf("."))
      .toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setError("Unsupported format. Choose an MP3, WAV, or M4A file.");
      return;
    }

    if (selected.size > MAX_SIZE) {
      setError("File exceeds 50 MB. Choose a smaller recording.");
      return;
    }

    if (selected.size === 0) {
      setError("This file is empty. Choose another recording.");
      return;
    }

    setError("");
    setFile(selected);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) validateFile(selected);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const selected = event.dataTransfer.files?.[0];
    if (selected) validateFile(selected);
  };

  const handleAnalyze = () => {
    if (!file) {
      setError("Upload an audio recording before continuing.");
      return;
    }

    if (onAnalyze) {
      onAnalyze(file);
    } else {
      setError(
        "The upload is ready. Connect your Python analysis backend to continue."
      );
    }
  };

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <main className="vt-app">
      <aside className={`vt-sidebar ${mobileMenu ? "vt-sidebar-open" : ""}`}>
        <a
          className="vt-brand"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            onBack?.();
          }}
        >
          <span className="vt-brand-icon">
            <AudioLines size={25} />
          </span>
          <span>
            Vox<span>Trace</span>
          </span>
        </a>

        <div className="vt-workspace-label">WORKSPACE</div>

        <nav className="vt-navigation" aria-label="Main navigation">
          {navigation.map(({ label, icon: Icon, page }) => (
            <button
              key={page}
              className={`vt-nav-item ${page === "upload" ? "active" : ""}`}
              onClick={() => {
                setMobileMenu(false);
                if (page === "home") onBack?.();
                else if (page !== "upload") {
                  setError(`${label} page is the next module to implement.`);
                }
              }}
              aria-current={page === "upload" ? "page" : undefined}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {page === "upload" && <span className="vt-active-indicator" />}
            </button>
          ))}
        </nav>

        <div className="vt-sidebar-bottom">
          <div className="vt-security-note">
            <ShieldCheck size={19} />
            <div>
              <strong>Secure workspace</strong>
              <span>Investigator access</span>
            </div>
          </div>

          <button className="vt-profile" onClick={() => setAnalystMenu(!analystMenu)}>
            <span className="vt-avatar">A</span>
            <span className="vt-profile-info">
              <strong>Analyst</strong>
              <small>Investigator account</small>
            </span>
            <ChevronDown size={16} />
          </button>

          {analystMenu && (
            <div className="vt-profile-menu">
              <button onClick={() => setAnalystMenu(false)}>
                <UserRound size={16} /> Account
              </button>
              <button onClick={() => setAnalystMenu(false)}>
                <LogOut size={16} /> Sign out
              </button>
            </div>
          )}
        </div>
      </aside>

      {mobileMenu && (
        <button
          className="vt-mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <section className="vt-main">
        <header className="vt-topbar">
          <div className="vt-topbar-left">
            <button
              className="vt-mobile-menu"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Toggle navigation"
            >
              {mobileMenu ? <X size={21} /> : <Menu size={21} />}
            </button>

            <button className="vt-back-button" onClick={onBack}>
              <ArrowLeft size={16} />
              <span>Home</span>
            </button>
            <span className="vt-breadcrumb-divider">/</span>
            <span className="vt-current-page">Upload Audio</span>
          </div>

          <div className="vt-topbar-right">
            <span className="vt-status-dot" />
            <span>Workspace ready</span>
            <span className="vt-top-avatar">A</span>
          </div>
        </header>

        <div className="vt-content">
          <div className="vt-page-heading">
            <div>
              <div className="vt-eyebrow">
                <span className="vt-eyebrow-dot" />
                AUDIO INVESTIGATION
              </div>
              <h1>Upload Call Recording</h1>
              <p>
                Upload an audio file to analyze vocal emotion patterns.
              </p>
            </div>

            <div className="vt-encrypted-label">
              <ShieldCheck size={16} />
              <span>Secure workflow</span>
            </div>
          </div>

          <div className="vt-progress">
            <div className="vt-progress-step current">
              <span>1</span>
              <div>
                <strong>Upload</strong>
                <small>Add your recording</small>
              </div>
            </div>
            <div className="vt-progress-line" />
            <div className="vt-progress-step">
              <span>2</span>
              <div>
                <strong>Analyze</strong>
                <small>Process audio</small>
              </div>
            </div>
            <div className="vt-progress-line" />
            <div className="vt-progress-step">
              <span>3</span>
              <div>
                <strong>Review</strong>
                <small>Inspect findings</small>
              </div>
            </div>
          </div>

          <section className="vt-upload-card">
            <div className="vt-card-heading">
              <div className="vt-heading-icon">
                <UploadCloud size={21} />
              </div>
              <div>
                <h2>Audio source</h2>
                <p>Select a recording for your investigation.</p>
              </div>
              <span className="vt-step-label">STEP 01</span>
            </div>

            <input
              ref={inputRef}
              className="vt-file-input"
              type="file"
              accept=".mp3,.wav,.m4a,audio/mpeg,audio/wav,audio/mp4"
              onChange={handleInput}
            />

            <div
              className={`vt-dropzone ${dragging ? "is-dragging" : ""} ${file ? "has-file" : ""}`}
              onDragEnter={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setDragging(false);
                }
              }}
              onDrop={handleDrop}
            >
              <div className="vt-upload-icon">
                {file ? <CheckCircle2 size={32} /> : <UploadCloud size={35} />}
              </div>

              <h3>{file ? "Recording selected" : "Drag and drop your audio file"}</h3>
              <p>
                {file
                  ? "Your file passed the basic format and size checks."
                  : "Drop your recording here, or browse your computer"}
              </p>

              {!file && (
                <button
                  type="button"
                  className="vt-browse-button"
                  onClick={() => inputRef.current?.click()}
                >
                  Browse files
                </button>
              )}

              <div className="vt-format-hint">
                <FileAudio size={15} />
                <span>MP3, WAV, M4A</span>
                <span className="vt-hint-separator">•</span>
                <span>Maximum 50 MB</span>
              </div>
            </div>

            {file && (
              <div className="vt-file-card">
                <div className="vt-file-icon">
                  <FileAudio size={23} />
                </div>
                <div className="vt-file-details">
                  <strong title={file.name}>{file.name}</strong>
                  <span>{formatSize(file.size)} · Ready for analysis</span>
                  <div className="vt-file-progress">
                    <span />
                  </div>
                </div>
                <span className="vt-file-check">
                  <Check size={15} />
                </span>
                <button
                  type="button"
                  className="vt-remove-file"
                  onClick={() => {
                    setFile(null);
                    setError("");
                  }}
                  aria-label="Remove selected audio"
                  title="Remove file"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            )}

            {error && (
              <div className="vt-error" role="alert">
                <X size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="vt-upload-footer">
              <div className="vt-privacy-note">
                <ShieldCheck size={17} />
                <span>Your recording is not sent to a server by this page alone.</span>
              </div>

              <button
                className="vt-analyze-button"
                onClick={handleAnalyze}
                disabled={!file}
              >
                <BrainCircuit size={18} />
                Analyze Audio
                <ArrowRight size={17} />
              </button>
            </div>
          </section>

          <div className="vt-info-grid">
            <div className="vt-info-card">
              <div className="vt-info-icon purple">
                <BrainCircuit size={19} />
              </div>
              <div>
                <strong>AI-assisted analysis</strong>
                <p>Review predicted vocal emotion patterns.</p>
              </div>
            </div>

            <div className="vt-info-card">
              <div className="vt-info-icon blue">
                <Clock3 size={19} />
              </div>
              <div>
                <strong>Timeline-based review</strong>
                <p>Locate moments that may need closer inspection.</p>
              </div>
            </div>
          </div>

          <footer className="vt-footer">
            <span>VOXTRACE <span className="vt-footer-separator">/</span> INVESTIGATION WORKSPACE</span>
            <span>Model predictions require human review.</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
