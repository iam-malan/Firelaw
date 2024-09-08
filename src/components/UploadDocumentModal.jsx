// UploadDocumentModal.jsx
import React, { useState } from 'react';

const UploadDocumentModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    caseLink: '',
    docName: '',
    assignedDate: new Date().toISOString().split('T')[0],
    tags: '',
    description: '',
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Upload One Document</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="case-link">Case Link</label>
          <input 
            type="text" 
            id="case-link" 
            name="caseLink" 
            value={formData.caseLink}
            onChange={handleInputChange}
          />

          <label htmlFor="doc-name">Doc. Name</label>
          <input 
            type="text" 
            id="doc-name" 
            name="docName"
            value={formData.docName}
            onChange={handleInputChange}
          />

          <label htmlFor="assigned-date">Assigned Date</label>
          <input 
            type="date" 
            id="assigned-date" 
            name="assignedDate"
            value={formData.assignedDate}
            onChange={handleInputChange}
          />

          <label htmlFor="tags">Tags</label>
          <input 
            type="text" 
            id="tags" 
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
          />

          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>

          <button type="submit">Upload New Document</button>
        </form>
      </div>
    </div>
  );
};

export default UploadDocumentModal;
