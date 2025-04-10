import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import './ResumesList.css'

export default function ResumesList() {
  const [resumes, setResumes] = useState([]);

  const fetchResumes = async () => {
    const { data } = await api.get("/resumes/");
    setResumes(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete resume?")) return;
    await api.delete(`/resumes/${id}`);
    fetchResumes();
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div>
      <h2>Все резюме</h2>
      <div className="grid grid-2">
        {resumes.map((r) => (
          <div key={r.id} className="card">
            <h3>{r.fullname}</h3>
            <p>{r.location}</p>
            <p>Навыки: {r.skills.map((s) => s.title).join(", ")}</p>
            <div style={{ marginTop: "0.5rem" }}>
              <button className="btn btn-danger" onClick={() => handleDelete(r.id)}>
                Удалить
              </button>{" "}
              <Link className="btn" to={`/resumes/${r.id}`}>
                Подробности
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
