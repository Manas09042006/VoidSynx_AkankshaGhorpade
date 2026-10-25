<<<<<<< HEAD
# 🎙️ VoxTrace
### AI-Powered Speech Emotion Analysis for Cybercrime Investigations

VoxTrace is an AI-assisted audio analysis platform designed to help investigators examine speech recordings, identify potential vocal emotion patterns, and review timestamped predictions through an interactive dashboard.

By combining a modern web interface with a pretrained speech-emotion recognition model, VoxTrace transforms audio recordings into structured analysis results that can support further human investigation.

> **Important:** VoxTrace provides experimental emotion predictions, not proof of deception, intent, credibility, or guilt. Results require human review and independent corroboration.

---

## ✨ Key Features

- **🎧 Audio Upload:** Upload supported speech recordings for analysis.
- **🧠 AI-Powered Emotion Recognition:** Use a pretrained speech classification model to estimate vocal emotion categories.
- **⏱️ Timestamped Analysis:** Review predictions across audio segments.
- **📊 Interactive Dashboard:** Explore predicted emotion labels, segment counts, confidence scores, and analysis summaries.
- **📈 Emotion Timeline:** Visualize the distribution of predicted labels throughout a recording.
- **📄 Report Generation:** Export analysis summaries and segment predictions as a downloadable text report.
- **🛡️ Error Handling:** Handle unsupported file types, invalid recordings, and backend connection failures.
- **🖥️ Responsive Interface:** Navigate the landing page, audio upload workflow, processing screen, and analysis dashboard.

## 🎯 Problem Statement

Audio recordings can contain useful contextual information during cybercrime investigations. However, manually reviewing lengthy recordings can be time-consuming, and identifying moments that warrant further examination may be difficult.

VoxTrace explores how speech-emotion classification can help investigators organize recordings into timestamped segments and review possible vocal emotion patterns more efficiently.

### Our Approach

1. Upload an audio recording.
2. Preprocess and resample the audio.
3. Divide the recording into manageable segments.
4. Run each segment through a pretrained emotion classification model.
5. Collect predicted labels and model confidence scores.
6. Display the results in an interactive dashboard.
7. Export a report for further human review.

---

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Frontend | React |
| Programming Language | TypeScript |
| Build Tool | Vite |
| Icons | Lucide React |
| Styling | CSS |
| Backend API | Python, FastAPI |
| API Server | Uvicorn |
| Machine Learning | Hugging Face Transformers |
| Speech Processing | Librosa, SoundFile |
| Deep Learning | PyTorch |
| Emotion Recognition | `Dpngtm/wav2vec2-emotion-recognition` |

### Architecture

```text
                 ┌────────────────────────┐
                 │     VoxTrace UI        │
                 │   React + TypeScript   │
                 └───────────┬────────────┘
                             │
                             ▼
                 ┌────────────────────────┐
                 │     Audio Upload       │
                 │  File Validation       │
                 └───────────┬────────────┘
                             │ HTTP POST
                             ▼
                 ┌────────────────────────┐
                 │      FastAPI API       │
                 │   /analyze endpoint    │
                 └───────────┬────────────┘
                             │
                             ▼
                 ┌────────────────────────┐
                 │  Audio Preprocessing   │
                 │ Mono, 16 kHz Sampling  │
                 └───────────┬────────────┘
                             │
                             ▼
                 ┌────────────────────────┐
                 │ Pretrained Emotion     │
                 │ Classification Model   │
                 └───────────┬────────────┘
                             │
                             ▼
                 ┌────────────────────────┐
                 │ Segment Predictions    │
                 │ Labels + Scores + Time │
                 └───────────┬────────────┘
                             │ JSON Response
                             ▼
                 ┌────────────────────────┐
                 │  Analysis Dashboard    │
                 │ Timeline + Report      │
                 └────────────────────────┘
```

---

## 🚀 Getting Started

Follow these steps to run VoxTrace locally.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) and npm
- [Python](https://www.python.org/downloads/) compatible with your installed PyTorch and Transformers versions
- Git
- A modern web browser

The pretrained model may require a substantial initial download and additional disk space for its dependencies.

### 1. Clone the Repository

```bash
git clone https://github.com/Manas09042006/VoidSynx_AkankshaGhorpade.git
cd VoidSynx_AkankshaGhorpade
```

If your VoxTrace project is in a separate repository, use that repository's URL instead.

### 2. Install Frontend Dependencies

From the project root:

```bash
npm install
```

### 3. Create the Python Backend Environment

Open a second terminal from the project root:

```bash
cd backend
python -m venv .venv
```

Activate the environment on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, you can use the virtual environment's Python executable directly instead.

### 4. Install Backend Dependencies

If `backend/requirements.txt` is present:

```bash
python -m pip install -r requirements.txt
```

The requirements file should include:

```text
fastapi
uvicorn[standard]
python-multipart
transformers==4.48.3
torch
librosa
soundfile
```

Use compatible Python, PyTorch, and Transformers versions for your environment.

### 5. Start the Backend

From the `backend` directory:

```bash
python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

The API will be available at:

- Health check: http://127.0.0.1:8000/health
- Interactive API documentation: http://127.0.0.1:8000/docs

Wait for the pretrained model to finish loading before uploading audio.

### 6. Start the Frontend

Open another terminal in the frontend project root:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually:

http://localhost:5173

Keep both frontend and backend processes running while testing.

---

## 🔌 API Reference

### Health Check

**Endpoint:** `GET /health`

Checks whether the backend model has finished loading.

Example response:

```json
{
  "status": "ready",
  "model": "Dpngtm/wav2vec2-emotion-recognition"
}
```

### Analyze Audio

**Endpoint:** `POST /analyze`

**Content type:** `multipart/form-data`

**Form field:** `file`

Supported extensions in the current backend implementation:

- WAV
- MP3
- M4A
- FLAC

The current implementation limits uploaded files to 50 MB. Actual decoding support can depend on installed audio libraries and FFmpeg availability.

Example request using Python:

```python
import requests

with open("sample.wav", "rb") as audio_file:
    response = requests.post(
        "http://127.0.0.1:8000/analyze",
        files={"file": audio_file},
        timeout=180,
    )

response.raise_for_status()
print(response.json())
```

Example response structure:

```json
{
  "filename": "sample.wav",
  "duration_seconds": 10.0,
  "sample_rate": 16000,
  "model": "Dpngtm/wav2vec2-emotion-recognition",
  "demo": false,
  "segments": [
    {
      "start": 0.0,
      "end": 5.0,
      "emotion": "Neutral",
      "confidence": 0.82,
      "scores": [
        {
          "label": "Neutral",
          "score": 0.82
        },
        {
          "label": "Happy",
          "score": 0.08
        }
      ]
    }
  ],
  "notice": "Predictions estimate vocal emotion and require human review."
}
```

*The values above are illustrative examples of the response format, not measured model output.*

---

## 📁 Project Structure

The following is the intended structure. Adjust filenames if your local project differs.

```text
VoxTrace/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .venv/
│
├── public/
│   ├── logoV.png
│   └── Background.png
│
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── voxtraceApi.ts
│   ├── UploadAudio.tsx
│   ├── ProcessingPage.tsx
│   ├── ProcessingPage.css
│   ├── AnalysisDashboard.tsx
│   └── AnalysisDashboard.css
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

Do not commit the `.venv` directory, local environment files containing secrets, or large temporary audio files.

---

## 🧠 How Emotion Analysis Works

VoxTrace uses a pretrained speech-emotion classification model rather than training a new model from scratch.

The intended processing workflow is:

1. **Audio ingestion:** Receive the uploaded recording through the backend API.
2. **Audio preprocessing:** Decode the recording, convert it to mono, and resample it to 16 kHz.
3. **Segmentation:** Divide the audio into five-second chunks.
4. **Classification:** Obtain emotion label scores for each eligible chunk.
5. **Aggregation:** Record the top predicted label, its score, and the segment timestamps.
6. **Visualization:** Display segment predictions and summarize their frequency in the frontend.
7. **Reporting:** Export the available predictions and analysis metadata.

The current implementation skips chunks shorter than one second. Consequently, a short trailing portion of a recording may not appear in the results.

### Understanding Confidence Scores

A confidence score represents the model's reported score for a predicted label. It should not be interpreted as the probability that a person is telling the truth or that an investigation hypothesis is correct.

Model performance may vary with language, recording quality, background noise, speaking style, and domain differences between training data and real-world recordings.

---

## 🔐 Privacy and Security

VoxTrace is a prototype intended for local development and evaluation.

- Audio is sent to the locally running backend when using the default configuration.
- The current backend uses temporary files for audio processing and removes them after the request completes.
- Uploaded audio is not intended to be retained as a case archive.
- The local API configuration is not a production security boundary.
- Do not upload sensitive investigative recordings to an unapproved environment.

Before deployment, implement authentication, authorization, secure transport, rate limiting, audit logging, controlled retention, and appropriate access policies. Review all dependencies and data-handling requirements before processing real case material.

---

## ⚠️ Current Limitations

- **Emotion estimates only:** Results are model predictions and may be incorrect.
- **No deception detection:** The system does not determine whether someone is lying.
- **No automatic transcription:** The current API does not return recognized speech.
- **No persistent case management:** A database-backed case history is not implemented by the described workflow.
- **No guaranteed real-time processing:** Inference time depends on recording length and available hardware.
- **Language limitations:** Model suitability depends on its training data and supported language.
- **Illustrative timeline bars:** Bar heights are visual placeholders, while colors are associated with the predicted labels.
- **Local development configuration:** Additional security and deployment work is required before public use.

---

## 🗺️ Future Enhancements

Potential improvements include:

- Integrate speech-to-text transcription with timestamp alignment.
- Add audio playback and segment navigation.
- Display detailed emotion-score distributions for every segment.
- Implement case management with database persistence.
- Add secure investigator authentication and role-based access.
- Improve the timeline using actual audio waveform data.
- Add evaluation metrics and confidence calibration using a representative validation dataset.
- Support configurable segmentation and longer recordings.
- Add controlled report export to PDF.
- Evaluate robustness across languages, accents, recording conditions, and relevant real-world audio.

These are proposed enhancements, not claims that the features are already implemented.

---

## 👥 Team

**Project:** VoxTrace

**Repository:** [VoidSynx_AkankshaGhorpade](https://github.com/Manas09042006/VoidSynx_AkankshaGhorpade)

Add the final team member names, roles, and contribution details here.

---

## 📚 References

- [Hugging Face Transformers](https://huggingface.co/docs/transformers/index)
- [Pretrained VoxTrace emotion model](https://huggingface.co/Dpngtm/wav2vec2-emotion-recognition)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Librosa Documentation](https://librosa.org/doc/latest/index.html)
- [PyTorch Documentation](https://pytorch.org/docs/stable/index.html)

---

## 📄 License

Choose and add an appropriate open-source license before publicly distributing the project. Until a license is added, do not assume others have permission to reuse, modify, or redistribute the code.

---

<p align="center">
  <strong>VoxTrace</strong><br />
  Turning speech recordings into structured signals for human review.
</p>
=======
>>>>>>> 712f4edc514aa2ed6832ebbf6e4eaddad64086dc


