import React from 'react';
import { useRef } from "react";
import { useState } from 'react';
import axios from 'axios';
import { Upload } from 'lucide-react';
// import { useWeb3Context } from "../context/useWeb3Context";

export function RegisterPage() {
  
  //   const {web3State} = useWeb3Context()
  //   const {contractInstance} = web3State;
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const [error, setError] = React.useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleVoterRegistration = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const name = nameRef.current?.value;
      const age = ageRef.current?.value;
      const gender = genderRef.current?.value;
      if (!name || !age || !gender) {
        setError(true);
        return;
      }
      setError(false);
      console.log(name, age, gender);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file first!');
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
      setFileUrl(url);
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
          Register Identity
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          Fill in the details below to register your digital identity.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-8">
        {/* Personal Information Form */}
        <form onSubmit={handleVoterRegistration} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
                <input
                  type="text"
                  ref={nameRef}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your full name"
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Age
                <input
                  type="number"
                  ref={ageRef}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your age"
                  min="18"
                  max="120"
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Gender
                <select
                  ref={genderRef}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Please fill in all the required fields.
            </p>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>

        {/* Document Upload Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
             Upload Your Passport Size Photo
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF, PNG, JPG or GIF (MAX. 10MB)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.gif"
                />
              </label>
            </div>

            {file && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Selected file: {file.name}
              </p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={uploading || !file}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </button>

            {fileUrl && (
              <div className="p-4 rounded-md bg-green-50 dark:bg-green-900">
                <p className="text-sm text-green-700 dark:text-green-200">
                  File uploaded successfully!{' '}
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline"
                  >
                    View File
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
