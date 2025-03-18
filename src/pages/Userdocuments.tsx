import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Upload } from 'lucide-react';

export function Userdocuments() {
  const [documents, setDocuments] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [documentsUrl, setDocumentsUrl] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (type: 'documents' | 'photo') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      if (type === 'documents') {
        setDocuments(e.target.files[0]);
      } else {
        setPhoto(e.target.files[0]);
      }
    }
  };

  const handleUpload = async (type: 'documents' | 'photo') => {
    const file = type === 'documents' ? documents : photo;
    if (!file) {
      alert(`Please select a ${type} file first!`);
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const responseData = await axios({
        method: "post",
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
        }
      });
      
      const url = `https://gateway.pinata.cloud/ipfs/${responseData.data.IpfsHash}`;
      if (type === 'documents') {
        setDocumentsUrl(url);
      } else {
        setPhotoUrl(url);
      }
      setUploading(false);
    } catch (error: any) {
      console.error('Error uploading file:', error);
      setUploading(false);
      alert('Error uploading file: ' + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Verify Your Identity
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          Please upload your documents and photo for verification.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-8">
        {/* Documents Upload Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Upload Your Documents
          </h2>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload documents</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF, PNG, JPG (MAX. 10MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange('documents')}
                accept=".pdf,.png,.jpg"
              />
            </label>
          </div>

          {documents && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Selected documents: {documents.name}
            </p>
          )}

          <button
            type="button"
            onClick={() => handleUpload('documents')}
            disabled={uploading || !documents}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload Documents'}
          </button>

          {documentsUrl && (
            <div className="p-4 rounded-md bg-green-50 dark:bg-green-900">
              <p className="text-sm text-green-700 dark:text-green-200">
                Documents uploaded successfully!{' '}
                <a href={documentsUrl} target="_blank" rel="noreferrer" className="font-medium underline">
                  View Documents
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Photo Upload Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Upload Your Photo
          </h2>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload photo</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG (MAX. 5MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange('photo')}
                accept=".png,.jpg"
              />
            </label>
          </div>

          {photo && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Selected photo: {photo.name}
            </p>
          )}

          <button
            type="button"
            onClick={() => handleUpload('photo')}
            disabled={uploading || !photo}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </button>

          {photoUrl && (
            <div className="p-4 rounded-md bg-green-50 dark:bg-green-900">
              <p className="text-sm text-green-700 dark:text-green-200">
                Photo uploaded successfully!{' '}
                <a href={photoUrl} target="_blank" rel="noreferrer" className="font-medium underline">
                  View Photo
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
