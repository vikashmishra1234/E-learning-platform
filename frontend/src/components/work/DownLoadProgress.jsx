import React, { useState } from 'react';

const DownLoadProgress = ({ fileName }) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownloadClick = async () => {
    try {
      setErrorMessage('');
      const response = await fetch(`https://colleges-notes-websites.onrender.com/pdf?fileName=${fileName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }

      const totalBytes = response.headers.get('Content-Length');
     
      let downloadedBytes = 0;
      const reader = response.body.getReader();

      const updateProgress = () => {
        const progress = Math.round((downloadedBytes / totalBytes) * 100);
        setDownloadProgress(progress);
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        downloadedBytes += value.length;
        updateProgress();
      }

      setDownloadProgress(0); // Download completed, reset progress
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setErrorMessage('Error downloading PDF. Please try again later.');
      setDownloadProgress(0); // Reset progress on error
    }
  };

  return (
    <div style={{paddingTop:"10px"}} >
      <a
        href={`https://colleges-notes-websites.onrender.com/pdf?fileName=${fileName}`}
        download={fileName}
        className="btn btn-primary"
        onClick={handleDownloadClick}
        id='download-btn'
      >
        Download
      </a>
      {downloadProgress > 0 && (
        <div>
          <progress value={downloadProgress} max="100" aria-label="Download Progress" />
          {downloadProgress}%
        </div>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

export default DownLoadProgress;