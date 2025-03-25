import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { mockAPI } from '../services/mockData';

// For debugging
console.log('Dashboard component loaded');

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
    console.log('Dashboard useEffect running');
    console.log('userInfo:', userInfo);
    
    const fetchProjects = async () => {
      try {
        // Check if we're in development mode with mock data
        const isDevelopment = process.env.NODE_ENV === 'development';
        const useMockData = process.env.REACT_APP_USE_MOCK_DATA === 'true';
        
        if (isDevelopment && useMockData) {
          console.log('⚠️ Using mock data for projects');
          const data = await mockAPI.getProjects();
          console.log('Mock projects data:', data);
          setProjects(data);
          setLoading(false);
          return;
        }
        
        console.log('Fetching projects from API...');
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        };
        
        console.log('API URL:', process.env.REACT_APP_API_URL || 'http://localhost:53585/api');
        
        // Use the full URL for debugging
        const url = `${process.env.REACT_APP_API_URL || 'http://localhost:53585/api'}/projects`;
        console.log('Fetching from URL:', url);
        
        const { data } = await axios.get(url, config);
        console.log('Projects data received:', data);
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : 'Failed to fetch projects'
        );
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userInfo?.token]);

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