import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import './VacancyDetails.css';

export default function VacancyDetails() {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState(null);
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    api.get(`/vacancy/${id}`).then((res) => setVacancy(res.data));
  }, [id]);

  const sortResumes = async () => {
    const { data } = await api.get(`/vacancy/sort/${id}`);
    setSorted(data);
  };

  if (!vacancy) return <p>Загрузка…</p>;

  return (
    <div className="vacancy-container">
      <div className="vacancy-header">
        <h2>{vacancy.title}</h2>
        <p>{vacancy.location}</p>
        <p>{vacancy.description}</p>
        <p>Навыки: {vacancy.skills.map((s) => s.title).join(", ")}</p>
        <button className="btn" style={{ marginTop: "1rem" }} onClick={sortResumes}>
          Сортировка резюме
        </button>
      </div>

      {sorted.length > 0 && (
        <div className="match-list">
          <h3>Отсортированные резюме</h3>
          {sorted.map((item, idx) => (
            <div key={idx} className="match-item">
              <h4>{item.resume}</h4>
              <ProgressIndicator percentage={Math.round(item.avg_skill_score)} delta={0} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProgressIndicator({ percentage, delta }) {
  const totalBars = 30;
  const filledBars = Math.round((percentage / 100) * totalBars);

  return (
    <div className="progress-indicator">
      <div className="progress-header">
        <div>
          <h4>KPI Соответствие</h4>
          <p>На основе совпадения навыков</p>
        </div>
        <div className="progress-percent">
          <span className="percent-value">{percentage}%</span>
          <span className="delta">
            {delta > 0 ? `↗ ${delta}%` : `↘ ${Math.abs(delta)}%`} vs. previous
          </span>
        </div>
      </div>

      <div className="progress-bar">
        {[...Array(totalBars)].map((_, i) => (
          <div key={i} className={`bar-segment ${i < filledBars ? "filled" : ""}`} />
        ))}
      </div>
    </div>
  );
}
