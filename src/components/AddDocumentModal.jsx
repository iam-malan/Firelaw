import React from 'react';

const AddDocumentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const uploadSingleDocument = () => {
    // Implement upload single document logic
  };

  const uploadMultipleDocuments = () => {
    // Implement upload multiple documents logic
  };

  const createFromTemplate = () => {
    // Implement create from template logic
  };

  const startBlankPage = () => {
    // Implement start blank page logic
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>How would you like to add your document?</h2>
        <div className="document-option" onClick={uploadSingleDocument}>
          <img src="upload-single-icon.png" alt="Upload Single Document" />
          <p>Upload a single document</p>
        </div>
        <div className="document-option" onClick={uploadMultipleDocuments}>
          <img src="upload-multiple-icon.png" alt="Upload Multiple Documents" />
          <p>Upload multiple documents</p>
        </div>
        <div className="document-option" onClick={createFromTemplate}>
          <img src="template-icon.png" alt="Create from Template" />
          <p>Create from template</p>
        </div>
        <div className="document-option" onClick={startBlankPage}>
          <img src="blank-page-icon.png" alt="Start with a Blank Page" />
          <p>Start with a blank page</p>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentModal;
