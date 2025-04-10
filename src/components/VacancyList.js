import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import './VacancyList.css'

export default function VacancyList() {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    api.get("/vacancy/").then((res) => setVacancies(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete vacancy?")) return;
    await api.delete(`/vacancy/${id}`);
    setVacancies(vacancies.filter((v) => v.id !== id));
  };

  return (
    <div>
      <h2>Вакансии</h2>
      <div className="grid grid-2">
        {vacancies.map((v) => (
          <div key={v.id} className="card">
            <h3>{v.title}</h3>
            <p>{v.location}</p>
            <p>{v.description}</p>
            <p>Навыки: {v.skills.map((s) => s.title).join(", ")}</p>
            <div style={{ marginTop: "0.5rem" }}>
              <Link className="btn" to={`/vacancies/${v.id}`}>Подробности</Link>{" "}
              <button className="btn btn-danger" onClick={() => handleDelete(v.id)}>
              Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}