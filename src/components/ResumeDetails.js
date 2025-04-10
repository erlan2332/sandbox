import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './ResumeDetails.css';
import api from "../api";

export default function ResumeDetails() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [hardKPI, setHardKPI] = useState(0);

  // 🔧 Временно фиксированный список требований
  const requiredHardSkills = ["Python", "FastAPI", "Docker", "PostgreSQL", "REST"];

  useEffect(() => {
    api.get(`/resumes/${id}`).then((res) => {
      setResume(res.data);

      const userHardSkills = res.data.skills
        .filter((s) => s.type === "HARD")
        .map((s) => s.title.toLowerCase());

      const matched = requiredHardSkills.filter((required) =>
        userHardSkills.includes(required.toLowerCase())
      );

      const matchPercent = Math.round((matched.length / requiredHardSkills.length) * 100);
      setHardKPI(matchPercent);
    });
  }, [id]);

  if (!resume) return <p className="loading">Загрузка...</p>;

  return (
    <div className="resume-details">
      <h2>{resume.fullname}</h2>
      <p>{resume.location}</p>

      <section className="kpi-section">
        <h3>Hard Skills KPI</h3>
        <ProgressIndicator percentage={hardKPI} delta={0} />
      </section>

      <h3>Навыки</h3>
      <div className="skills-grid">
        {resume.skills.map((skill, i) => (
          <div key={i} className="skill-card">
            <strong>{skill.title}</strong>
            <div className="skill-meta">Уровень: {skill.level} ({skill.type})</div>
          </div>
        ))}
      </div>

      <h3>Образование</h3>
      <ul className="timeline-section">
        {resume.educations.map((edu, i) => (
          <li key={i}>
            <strong>{edu.name}</strong><br />{edu.description}
          </li>
        ))}
      </ul>

      <h3>Опыт работы</h3>
      <ul className="timeline-section">
        {resume.experiences.map((exp, i) => (
          <li key={i}>
            <strong>{exp.name}</strong><br />{exp.description}
          </li>
        ))}
      </ul>
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
          <h4>Progress Indicator</h4>
          <p>На основе совпадения Hard Skills</p>
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
