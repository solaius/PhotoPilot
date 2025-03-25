import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [mediaAssets, setMediaAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCollaboratorForm, setShowCollaboratorForm] = useState(false);
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const [collaboratorRole, setCollaboratorRole] = useState('viewer');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        };

        const { data: projectData } = await axios.get(`/api/projects/${id}`, config);
        setProject(projectData);

        const { data: mediaData } = await axios.get(`/api/media/project/${id}`, config);
        setMediaAssets(mediaData);

        setLoading(false);
      } catch (error) {
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : 'Failed to fetch project details'
        );
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id, userInfo.token]);

  const handleStatusChange = async (mediaId, newStatus) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.put(`/api/media/${mediaId}/status`, { status: newStatus }, config);

      // Update local state
      setMediaAssets(
        mediaAssets.map((media) =>
          media._id === mediaId ? { ...media, status: newStatus } : media
        )
      );
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Failed to update media status'
      );
    }
  };

  const addCollaboratorHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      // In a real app, we would need to get the userId from the email
      // For now, we'll just use a placeholder
      const userId = '60d0fe4f5311236168a109ca'; // Placeholder

      await axios.post(
        `/api/projects/${id}/collaborators`,
        { userId, role: collaboratorRole },
        config
      );

      // Refresh project data
      const { data } = await axios.get(`/api/projects/${id}`, config);
      setProject(data);

      setShowCollaboratorForm(false);
      setCollaboratorEmail('');
      setCollaboratorRole('viewer');
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Failed to add collaborator'
      );
    }
  };

  if (loading) {
    return <p>Loading project details...</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!project) {
    return <div className="alert alert-danger">Project not found</div>;
  }

  return (
    <div className="project-details">
      <div className="project-header">
        <h1>{project.name}</h1>
        <div className="project-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setShowCollaboratorForm(!showCollaboratorForm)}
          >
            {showCollaboratorForm ? 'Cancel' : 'Add Collaborator'}
          </button>
          <button className="btn btn-primary">Sync with Cloud</button>
        </div>
      </div>

      <div className="project-info">
        <p>
          <strong>Cloud Provider:</strong> {project.cloudProvider}
        </p>
        <p>
          <strong>Path:</strong> {project.cloudPath}
        </p>
        <p>
          <strong>Owner:</strong> {project.owner.name} ({project.owner.email})
        </p>
      </div>

      {showCollaboratorForm && (
        <div className="form-container">
          <h2>Add Collaborator</h2>
          <form onSubmit={addCollaboratorHandler}>
            <div className="form-group">
              <label htmlFor="email">Collaborator Email</label>
              <input
                type="email"
                id="email"
                value={collaboratorEmail}
                onChange={(e) => setCollaboratorEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={collaboratorRole}
                onChange={(e) => setCollaboratorRole(e.target.value)}
                required
              >
                <option value="viewer">Viewer</option>
                <option value="commenter">Commenter</option>
                <option value="editor">Editor</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Collaborator
            </button>
          </form>
        </div>
      )}

      <div className="collaborators">
        <h2>Collaborators</h2>
        {project.collaborators && project.collaborators.length > 0 ? (
          <ul className="collaborator-list">
            {project.collaborators.map((collab) => (
              <li key={collab._id} className="collaborator-item">
                <div className="collaborator-info">
                  <p>
                    <strong>{collab.userId.name}</strong> ({collab.userId.email})
                  </p>
                  <p>Role: {collab.role}</p>
                </div>
                <button className="btn btn-danger btn-sm">Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No collaborators yet.</p>
        )}
      </div>

      <div className="media-assets">
        <h2>Media Assets</h2>
        {mediaAssets.length === 0 ? (
          <p>No media assets found. Sync with cloud to import photos.</p>
        ) : (
          <div className="media-grid">
            {mediaAssets.map((media) => (
              <div key={media._id} className="media-card">
                <img
                  src={`https://via.placeholder.com/300x200?text=${media.filename}`}
                  alt={media.filename}
                />
                <div className="media-info">
                  <p>{media.filename}</p>
                  <div className="media-status">
                    <span className={`badge badge-${media.status}`}>{media.status}</span>
                  </div>
                  <div className="media-actions">
                    <select
                      value={media.status}
                      onChange={(e) => handleStatusChange(media._id, e.target.value)}
                    >
                      <option value="good">Good</option>
                      <option value="change">Change</option>
                      <option value="delete">Delete</option>
                      <option value="archived">Archived</option>
                    </select>
                    <button className="btn btn-sm btn-primary">AI Caption</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;