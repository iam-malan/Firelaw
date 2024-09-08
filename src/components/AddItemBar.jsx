import React from 'react';

const AddItemBar = () => {
  const items = [
    { name: 'Event', icon: 'event-icon.png' },
    { name: 'Document', icon: 'document-icon.png' },
    { name: 'Task', icon: 'task-icon.png' },
    { name: 'Lead', icon: 'lead-icon.png' },
    { name: 'Contact', icon: 'contact-icon.png' },
    { name: 'Case', icon: 'case-icon.png' },
    { name: 'Message', icon: 'message-icon.png' },
    { name: 'Time Entry', icon: 'time-entry-icon.png' },
    { name: 'Expense', icon: 'expense-icon.png' },
    { name: 'Invoice', icon: 'invoice-icon.png' },
    { name: 'Note', icon: 'note-icon.png' },
  ];

  return (
    <div className="add-item-bar">
      <h3>Add Item</h3>
      <div className="item-buttons">
        {items.map((item, index) => (
          <button key={index} className="item-button">
            <img src={item.icon} alt={item.name} />
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AddItemBar;
