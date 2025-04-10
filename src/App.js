import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ResumesList from "./components/ResumesList";
import ResumeDetails from "./components/ResumeDetails";
import VacancyList from "./components/VacancyList";
import VacancyDetails from "./components/VacancyDetails";
import VacancyCreate from "./components/VacancyCreate";
import UploadResume from "./components/UploadResume";
import "./App.css"

export default function App() {
  return (
    <Router>
      <header>
        <div className="container header-inner">
          <h1 className="logo">Sandbox</h1>
          <nav className="nav">
            <Link className="nav-link" to="/">Резюме</Link>
            <Link className="nav-link" to="/vacancies">Вакансии</Link>
            <Link className="nav-link" to="/vacancies/new">Новая вакансия</Link>
            <Link className="nav-link" to="/upload">Загрузить резюме</Link>
          </nav>
        </div>
      </header>


      <main className="container">
        <Routes>
          <Route path="/" element={<ResumesList />} />
          <Route path="/resumes/:id" element={<ResumeDetails />} />
          <Route path="/upload" element={<UploadResume />} />
          <Route path="/vacancies" element={<VacancyList />} />
          <Route path="/vacancies/new" element={<VacancyCreate />} />
          <Route path="/vacancies/:id" element={<VacancyDetails />} />
        </Routes>
      </main>
    </Router>
  );
}
