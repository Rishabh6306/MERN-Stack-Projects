import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { uploadFile } from './APICall';

function FileSystem() {
  const [file, setFile] = useState();
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const fileUploadRef = useRef();
  const linkRef = useRef();

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const UploadFile = () => {
    fileUploadRef.current.click();
  };

  const handleFileUpload = async () => {
    try {
      if (file) {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);

        const response = await uploadFile(data);
        setResult(response?.path);
        fileUploadRef.current.value = null;
      }
    } catch (error) {
      console.log('Server response:', error.response);
    }
  };

  const copyToClipboard = async () => {
    try {
      const linkInput = linkRef.current;
      await navigator.clipboard.writeText(linkInput.value);
      console.log('Link copied to clipboard:', linkInput.value);
      setCopied(true);

      // Hide the "Copied" message after 1 second
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error) {
      console.error('Unable to copy link to clipboard:', error);
    }
  };

  const downloadFile = () => {
    if (result) {
      // Create a temporary anchor element
      const downloadLink = document.createElement('a');

      // Set the href attribute with the file download link
      downloadLink.href = result;

      // Specify the download attribute with the desired file name
      downloadLink.download = 'downloaded_file';

      // Append the anchor element to the body
      document.body.appendChild(downloadLink);

      // Trigger a click event on the anchor element
      downloadLink.click();

      // Remove the anchor element from the body
      document.body.removeChild(downloadLink);
    }
  };

  useEffect(() => {
    handleFileUpload();
  }, [file]);

  return (
    <div
      className='bg-violet-600 flex justify-center items-center h-screen'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="bg-slate-300 flex flex-col gap-4 justify-center items-center p-4 sm:p-10 rounded-2xl">
        <h1 className='font-bold text-2xl sm:text-4xl'>File Sharing WebApp</h1>
        <p>Upload and share the download link</p>
        <button className='bg-sky-600 text-white p-3 sm:py-4 sm:px-6 my-4 rounded-xl' onClick={UploadFile}>
          Upload File
        </button>
        <input
          type="file"
          ref={fileUploadRef}
          className='hidden'
          onChange={handleFileInputChange}
        />
        <div>
          <input
            type="text"
            value={result}
            ref={linkRef}
            className='hidden'
            readOnly
          />
          <Link
            to={result}
            className={`${!result ? 'hidden' : 'break-words pointer-events-none text-green-800 font-medium border-2 text-[0.6rem] sm:text-xl border-gray-500 rounded-md p-3'
              }`}
          >
            {result}
          </Link>
        </div>
        <div className={`${!result ? 'hidden' : 'block'}`}>
          <button
            onClick={copyToClipboard}
            className='bg-blue-500 text-white py-2 px-4 rounded-md ml-2'
          >
            {(copied) ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={downloadFile}
            className='bg-green-500 text-white py-2 px-4 rounded-md ml-2'
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileSystem;