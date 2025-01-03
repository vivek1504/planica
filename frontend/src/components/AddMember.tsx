import React, { useState } from 'react';

const AddMember: React.FC = () => {
  const [fullName, setFullName] = useState<string>('Enter Name');
  const [email, setEmail] = useState<string>('name2002@gmail.com');
  const [designation, setDesignation] = useState<string>('Select a category');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ fullName, email, designation });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-purple-200 text-purple-600 rounded-full p-2">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Add a member</h1>
            <p className="text-sm text-gray-500">High priority task to be completed</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
              Designation
            </label>
            <select
              id="designation"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option>Select a category</option>
              <option>Manager</option>
              <option>Developer</option>
              <option>Designer</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
              onClick={() => {
                setFullName('Enter Name');
                setEmail('name2002@gmail.com');
                setDesignation('Select a category');
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMember;