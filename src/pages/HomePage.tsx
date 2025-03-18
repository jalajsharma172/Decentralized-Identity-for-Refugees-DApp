import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Key, Database, FileCheck, Mail } from 'lucide-react';

export function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Secure Digital Identity</span>
          <span className="block text-indigo-600 dark:text-indigo-400">for Refugees</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Empowering refugees with blockchain-based digital identities. Secure, private, and always accessible.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              to="/register"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Register Identity
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Link
              to="/userdocuments"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Verify Identity
            </Link>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Our platform leverages cutting-edge blockchain technology to provide secure and private digital identities.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">Blockchain Security</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400 text-center">
                Your identity is secured by blockchain technology, making it immutable and tamper-proof.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Key className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">Zero-Knowledge Proofs</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400 text-center">
                Verify your identity without revealing sensitive information using ZKP technology.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Database className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">IPFS Storage</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400 text-center">
                Documents are stored securely on IPFS, ensuring availability and redundancy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Quick Links
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-0.5 md:grid-cols-3 lg:mt-8">
            <Link
              to="/docs"
              className="col-span-1 flex justify-center py-8 px-8 bg-white dark:bg-gray-700"
            >
              <FileCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
              <span className="text-gray-900 dark:text-white">Documentation</span>
            </Link>
{/* ✔ Prevents Fake Identities: Only verified users can claim identity-related services.
✔ Decentralized but Trustworthy: NGOs & governments can trust blockchain-stored IDs.
✔ ZKPs Ensure Privacy: Users don’t need to reveal full personal data—only proof of verification. */}

            <Link
              to="/faq"
              className="col-span-1 flex justify-center py-8 px-8 bg-white dark:bg-gray-700"
            >
              <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
              <span className="text-gray-900 dark:text-white">FAQ</span>
            </Link>
            <Link
              to="/contact"
              className="col-span-1 flex justify-center py-8 px-8 bg-white dark:bg-gray-700"
            >
              <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
              <span className="text-gray-900 dark:text-white">Contact</span>
            </Link>
          </div>
        </div>  
      </div>
    </div>
  );
}