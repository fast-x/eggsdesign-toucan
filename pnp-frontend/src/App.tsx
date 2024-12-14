import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import { ErrorFallback } from './components/ErrorFallback';
import FeedbackButton from './components/input/FeedbackButton';
import { useModalState } from './components/modal/Modal';
import ApproachesPage from './pages/ApproachesPage';
import ApproachPage from './pages/ApproachPage';
import ClientsPage from './pages/ClientsPage';
import EditPage from './pages/EditPage';
import EmployeePage from './pages/EmployeePage';
import EmployeesPage from './pages/EmployeesPage';
import ProjectPage from './pages/ProjectPage';
import ProjectsPage from './pages/ProjectsPage';
import { schemas } from './schemas/schemas';

const App: React.FC = () => {
  const [modalState] = useModalState();

  return (
    <React.StrictMode>
      <div aria-hidden={modalState}>
        <Router>
          <Helmet>
            <title>Yolk Dashboard</title>
          </Helmet>

          <AppHeader />

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Routes>
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/project/:id" element={<ProjectPage />} />
              <Route
                path="/projects/project/:id/edit"
                element={<EditPage schema={schemas.project} backUrl="/projects/project/:id" />}
              />
              <Route path="/projects/new" element={<EditPage schema={schemas.project} backUrl="/projects/" />} />
              <Route path="/people" element={<EmployeesPage />} />
              <Route path="/people/:id" element={<EmployeePage />} />
              <Route path="/people/:id/edit" element={<EditPage schema={schemas.employee} backUrl="/people/:id" />} />
              <Route path="/approaches" element={<ApproachesPage />} />
              <Route path="/approaches/approach/:id" element={<ApproachPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/" element={<Navigate to="/projects" replace />} />
            </Routes>
          </ErrorBoundary>
          <FeedbackButton />
        </Router>
      </div>
    </React.StrictMode>
  );
};

export default App;
