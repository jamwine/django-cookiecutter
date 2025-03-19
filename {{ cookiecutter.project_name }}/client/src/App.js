import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <h1 className="h4">Welcome to {process.env.REACT_APP_PROJECT_NAME || '{{ cookiecutter.project_name }}'}</h1>
      </header>

      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h2 className="display-5 fw-bold">Project Services</h2>
          <p className="col-md-8 fs-4">Access various services of your application:</p>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <ServiceCard
          title="Django Admin"
          description="Access the admin interface"
          url="http://localhost:8000/admin"
          icon="🔐"
        />
        <ServiceCard
          title="API Documentation"
          description="View API endpoints documentation"
          url="http://localhost:8000/redoc"
          icon="📚"
        />
        <ServiceCard
          title="Jupyter Notebooks"
          description="Interactive Python development"
          url="http://localhost:8890"
          icon="📓"
        />
        <ServiceCard
          title="Flower"
          description="Monitor Celery tasks"
          url="http://localhost:5555"
          icon="🌸"
        />
        <ServiceCard
          title="MailHog"
          description="Email testing interface"
          url="http://localhost:8025"
          icon="📧"
        />
      </div>
    </div>
  );
}

function ServiceCard({ title, description, url, icon }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <div className="display-6 mb-3">{icon}</div>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Access
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
