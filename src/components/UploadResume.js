import { useState, useEffect } from "react";
import api from "../api";
import './UploadResume.css';

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [vacancies, setVacancies] = useState([]);
  const [vacancyId, setVacancyId] = useState("");

  useEffect(() => {
    api.get("/vacancy/").then((res) => setVacancies(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post("/upload_pdf", formData, {
      params: { vacancy_id: vacancyId || null },
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert(`Server responded: ${data}`);
    setFile(null);
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit} className="upload-form-modern">
        <h2 className="upload-title">📄 Загрузка резюме</h2>

        <div className="custom-file-input">
          <label htmlFor="fileUpload">
            {file ? (
              <div className="file-preview">
                <span>📎 {file.name}</span>
              </div>
            ) : (
              <div className="placeholder">
                <span>Нажмите, чтобы выбрать PDF файл</span>
              </div>
            )}
          </label>
          <input
            id="fileUpload"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <select
          className="vacancy-select-modern"
          value={vacancyId}
          onChange={(e) => setVacancyId(e.target.value)}
        >
          <option value="">-- Без вакансии --</option>
          {vacancies.map((v) => (
            <option key={v.id} value={v.id}>
              {v.title}
            </option>
          ))}
        </select>

        <button type="submit" className="upload-btn-modern">
          🚀 Загрузить
        </button>
      </form>
    </div>
  );
}
