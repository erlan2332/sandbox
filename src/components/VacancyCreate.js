import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import './VacancyCreate.css';

export default function VacancyCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState([""]);

  const handleAddSkill = () => setSkills([...skills, ""]);
  const handleSkillChange = (value, idx) => {
    setSkills(skills.map((s, i) => (i === idx ? value : s)));
  };
  const handleRemoveSkill = (idx) => setSkills(skills.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      location,
      description,
      salary,
      skills: skills.filter(Boolean).map((s) => ({ title: s })),
      resumes: [],
    };
    await api.post("/vacancy_post", payload);
    navigate("/vacancies");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Создание вакансии</h2>
      <form onSubmit={handleSubmit} className="vacancy-form">
        <label>Заголовок</label>
        <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Локация</label>
        <input className="input-field" value={location} onChange={(e) => setLocation(e.target.value)} />

        <label>Описание</label>
        <textarea
          className="input-field"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Зарплата</label>
        <input className="input-field" value={salary} onChange={(e) => setSalary(e.target.value)} />

        <label>Навыки</label>
        {skills.map((s, idx) => (
          <div key={idx} className="skill-input-group">
            <input
              className="input-field"
              value={s}
              onChange={(e) => handleSkillChange(e.target.value, idx)}
              placeholder="Название навыка"
            />
            <button type="button" className="remove-btn" onClick={() => handleRemoveSkill(idx)}>×</button>
          </div>
        ))}

        <button type="button" className="add-skill-btn" onClick={handleAddSkill}>
          + Добавить навык
        </button>

        <button type="submit" className="submit-btn">
           Сохранить вакансию
        </button>
      </form>
    </div>
  );
}
