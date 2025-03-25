import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    cloudPath: '',
    cloudProvider: 'dropbox'
  });

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        };

        const { data } = await axios.get('/api/projects', config);
        setProjects(data);
        setLoading(false);
      } catch (error) {
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : 'Failed to fetch projects'
        );
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userInfo.token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value
    });
  };

  const createProjectHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post('/api/projects', newProject, config);
      setProjects([...projects, data]);
      setShowCreateForm(false);
      setNewProject({
        name: '',
        cloudPath: '',
        cloudProvider: 'dropbox'
      });
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Failed to create project'
      );
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Projects</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancel' : 'Create New Project'}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showCreateForm && (
        <div className="form-container">
          <h2>Create New Project</h2>
          <form onSubmit={createProjectHandler}>
            <div className="form-group">
              <label htmlFor="name">Project Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProject.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cloudPath">Cloud Path</label>
              <input
                type="text"
                id="cloudPath"
                name="cloudPath"
                value={newProject.cloudPath}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cloudProvider">Cloud Provider</label>
              <select
                id="cloudProvider"
                name="cloudProvider"
                value={newProject.cloudProvider}
                onChange={handleInputChange}
                required
              >
                <option value="dropbox">Dropbox</option>
                <option value="google">Google Drive</option>
                <option value="onedrive">OneDrive</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Project
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <div className="empty-state">
          <p>You don't have any projects yet.</p>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateForm(true)}
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <h3>{project.name}</h3>
              <p>
                <strong>Cloud Provider:</strong> {project.cloudProvider}
              </p>
              <p>
                <strong>Path:</strong> {project.cloudPath}
              </p>
              <p>
                <strong>Created:</strong>{' '}
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
              <Link to={`/projects/${project._id}`} className="btn btn-primary">
                View Project
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;