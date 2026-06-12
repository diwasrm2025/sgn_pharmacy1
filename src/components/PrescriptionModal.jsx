import React, { useState, useRef } from 'react';
import '../styles/Modals.css';

const PrescriptionModal = ({ isOpen, onClose, showToastMsg }) => {
  const [file, setFile] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientContact, setPatientContact] = useState('');
  const [notes, setNotes] = useState('');
  const [deliverySpeed, setDeliverySpeed] = useState('standard');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile({ name: droppedFile.name, size: (droppedFile.size / 1024).toFixed(1) });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile({ name: selectedFile.name, size: (selectedFile.size / 1024).toFixed(1) });
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload your prescription first.");
      return;
    }

    setUploading(true);
    setProgress(0);

    // Simulate file upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            setIsSubmitted(true);
            showToastMsg(<span><i className="ti ti-circle-check"></i> Prescription submitted successfully!</span>);
          }, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const resetForm = () => {
    setFile(null);
    setPatientName('');
    setPatientAge('');
    setPatientContact('');
    setNotes('');
    setDeliverySpeed('standard');
    setIsSubmitted(false);
    setProgress(0);
    setUploading(false);
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={resetForm}>
      <div className="modal-container prescription-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={resetForm} aria-label="Close Prescription"><i className="ti ti-x"></i></button>

        {!isSubmitted ? (
          <>
            <div className="prescription-header">
              <h2>Upload Prescription</h2>
              <p>Upload a photo of your prescription. Our pharmacists will review it and deliver medicines to your doorstep.</p>
            </div>

            <form className="prescription-form" onSubmit={handleSubmit}>
              <div 
                className="upload-dropzone" 
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                />
                <i className="ti ti-cloud-upload"></i>
                <h5>Drag and drop prescription here</h5>
                <p>Supports PNG, JPG, or PDF (Max 5MB)</p>

                {file && (
                  <div className="uploaded-file-preview">
                    <span>
                      <i className="ti ti-file-text"></i> {file.name} ({file.size} KB)
                    </span>
                    <button type="button" onClick={removeFile}>Remove</button>
                  </div>
                )}
              </div>

              {uploading && (
                <div style={{ marginTop: '-8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px', fontWeight: '600' }}>
                    <span>Uploading files...</span>
                    <span>{progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.15s ease' }}></div>
                  </div>
                </div>
              )}

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="pname">Patient Name *</label>
                  <input 
                    type="text" 
                    id="pname" 
                    placeholder="Enter full name" 
                    required 
                    value={patientName} 
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="page">Patient Age *</label>
                  <input 
                    type="number" 
                    id="page" 
                    placeholder="Enter age" 
                    required 
                    min="1"
                    max="120"
                    value={patientAge} 
                    onChange={(e) => setPatientAge(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="pcontact">Contact Number *</label>
                  <input 
                    type="tel" 
                    id="pcontact" 
                    placeholder="10-digit mobile number" 
                    required 
                    pattern="[0-9]{10}"
                    value={patientContact} 
                    onChange={(e) => setPatientContact(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pspeed">Preferred Delivery Speed</label>
                  <select 
                    id="pspeed" 
                    value={deliverySpeed} 
                    onChange={(e) => setDeliverySpeed(e.target.value)}
                  >
                    <option value="standard">Standard Delivery (24 Hours)</option>
                    <option value="express">Express Delivery (3-4 Hours)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pnotes">Special Notes for Pharmacist (Optional)</label>
                <textarea 
                  id="pnotes" 
                  rows="3" 
                  placeholder="Example: Call before preparing order, substitute with generic equivalents where possible..."
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="prescription-submit-btn" 
                disabled={uploading || !file}
                style={{ opacity: (!file || uploading) ? 0.6 : 1, cursor: (!file || uploading) ? 'not-allowed' : 'pointer' }}
              >
                <i className="ti ti-circle-check"></i> 
                {uploading ? 'Uploading...' : 'Submit Prescription'}
              </button>
            </form>
          </>
        ) : (
          <div className="success-screen">
            <div className="success-icon">
              <i className="ti ti-check"></i>
            </div>
            <h3>Prescription Submitted!</h3>
            <p>We have received your prescription and details for <strong>{patientName}</strong>. Our certified pharmacist will verify the prescription and call you at <strong>{patientContact}</strong> within 15 minutes to confirm the medicines and payment details.</p>
            <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px', width: '100%', textAlign: 'left', fontSize: '13px' }}>
              <div style={{ marginBottom: '6px' }}><strong>Ref ID:</strong> RX-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div style={{ marginBottom: '6px' }}><strong>Delivery:</strong> {deliverySpeed === 'express' ? 'Express (3-4 Hours)' : 'Standard (24 Hours)'}</div>
              {notes && <div><strong>Instructions:</strong> {notes}</div>}
            </div>
            <button className="success-close-btn" onClick={resetForm}>Back to Homepage</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionModal;
