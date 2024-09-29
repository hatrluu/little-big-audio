import React, { useState } from 'react';
import Mirt from 'react-mirt';
import 'react-mirt/dist/css/react-mirt.css';
import './Audio.css';

const Audio = () => {
    const [audioFile, setAudioFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAudioFile(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setAudioFile(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleConvert = () => {
        // Implement audio conversion logic here
        alert('Convert audio file');
    };

    const handleTrim = () => {
        // Implement audio trimming logic here
        alert('Trim audio file');
    };

    return (
        <div>
            <h1>Audio File Processor</h1>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ border: '2px dashed #ccc', padding: '20px', marginBottom: '20px', position: 'relative' }}
            >
                <p>Drag and drop an audio file here, or click to select a file</p>
                <input type="file" accept="audio/*" onChange={handleFileChange} />
                {audioFile && (
                    <button
                        onClick={() => { setAudioFile(null); }}
                        className='clear-btn'
                    >
                        <i className="bi bi-x-circle" style={{ fontSize: '1.5rem', color: '#ff0000' }}></i>
                    </button>
                )}
            </div>
            {audioFile && (
                <div>
                    <Mirt file={audioFile} />
                    <div>
                        <button onClick={handleConvert}>Convert</button>
                        <button onClick={handleTrim}>Trim</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Audio;