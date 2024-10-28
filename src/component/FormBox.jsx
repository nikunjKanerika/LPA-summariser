import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaEnvelope, FaEdit } from 'react-icons/fa';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Setting workerSrc
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js`;

const FormBox = ({ email, setEmail, pdfName, setPdfName, rules, setRules }) => {
  const [pdfError, setPdfError] = useState('');
  const [pdfStatusClass, setPdfStatusClass] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRules, setModalRules] = useState(rules); // Separate state for modal rules
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        try {
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          const numPages = pdf.numPages;
          if (numPages > 20) {
            setPdfError('PDF exceeds the maximum page limit of 20 pages.');
            setPdfName('');
            setPdfStatusClass('bg-red-200 text-red-600');
            toast.error('Upload Error: PDF exceeds the maximum page limit of 20 pages.');
          } else {
            setPdfError('');
            setPdfName(file.name);
            setPdfStatusClass('bg-green-200 text-green-600');
            console.log("PDF Name set to:", file.name); // Debugging log
          }
        } catch (error) {
          setPdfError('Error reading the PDF file. Please upload a valid PDF.');
          setPdfName('');
          setPdfStatusClass('bg-red-200 text-red-600');
          toast.error('Error reading the PDF file. Please upload a valid PDF.');
          console.error('Error loading PDF:', error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleChange = (e) => {
    setModalRules(e.target.value); // Update modal state directly
  };

  const handleResult = () => {
    navigate('/result');
  };

  const isButtonDisabled = !email || !pdfName || modalRules.trim().length === 0; // Use modalRules for validation

  const openModal = () => {
    setModalRules(rules); // Set the modal rules to the current rules
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form className="relative mt-5 p-4 w-10/12 max-w-8xl mx-auto bg-white rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Upload Your PDF and Enter Rules</h2>

        <div className="flex justify-between mb-4 space-x-4 h-full">
          <div className="w-1/2 flex flex-col justify-between shadow-lg">
            <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer ${pdfStatusClass} transition-all`}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaCloudUploadAlt className="w-8 h-8 mb-4 text-blue-500" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PDF (Max. 20 pages)</p>
                {pdfName && <p className='text-sm bg-green-300'>{pdfName}</p>}
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
            </label>
            {pdfError && <p className="mt-1 text-red-500 text-sm">{pdfError}</p>}
          </div>

          <div className="w-1/2 flex flex-col justify-between p-4 rounded-lg shadow-lg">
            <div className="flex flex-col">
              <div className='flex space-x-2'><FaEnvelope className="text-blue-500 mb-2" size={24} />
              <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-700">Enter Email</label></div>
              <input
                type="email"
                id="email"
                value={email}
                className="bg-white border border-gray-300 rounded-lg p-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="name@kanerika.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mb-4 relative">
          <div className="flex items-center justify-between mb-4">
            <label htmlFor="rules" className="block mb-2 text-2xl font-medium text-gray-700">Rules</label>
            <FaEdit className="text-blue-500 cursor-pointer" size={28} onClick={openModal} />
          </div>
          <textarea
            id="rules"
            value={modalRules} // Use modalRules for displaying current value
            onChange={handleChange} // Update modal state directly
            placeholder="Type your rules here..."
            className="w-full h-80 p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            style={{ overflowY: modalRules.length > 0 ? 'auto' : 'hidden' }}
          />
        </div>

        <button
          type="button"
          onClick={handleResult}
          disabled={isButtonDisabled}
          className={`w-full p-3 text-lg font-semibold text-white bg-blue-600 rounded-lg transition ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          Generate the Summary
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Edit Rules</h2>
            <textarea
              id="rules-modal"
              value={modalRules} // Bind to modalRules state
              onChange={(e) => setModalRules(e.target.value)} // Update modal state
              placeholder="Type your rules here..."
              className="w-full h-40 p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => {
                  setRules(modalRules); // Update the main rules state with modalRules
                  closeModal();
                }}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormBox;
