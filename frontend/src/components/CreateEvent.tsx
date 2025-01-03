import React, { useState } from 'react';

const CreateEvent: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('2024-01-01');
  const [startTime, setStartTime] = useState<string>('10:00');
  const [endDate, setEndDate] = useState<string>('2024-01-28');
  const [endTime, setEndTime] = useState<string>('18:00');
  const [location, setLocation] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number | ''>('');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-600">Create an Event</h2>
          <p className="text-sm text-gray-600">High priority task to be completed</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b mb-6">
          <button className="text-purple-600 border-b-2 border-purple-600 pb-2">Description</button>
          <button className="text-gray-500 pb-2">Details</button>
          <button className="text-gray-500 pb-2">Assignment</button>
        </div>

        {/* Date and Time */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date and Time</label>
            <div className="flex space-x-2">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-1/2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="text-gray-600 text-sm focus:outline-none w-full"
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-1/2">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="text-gray-600 text-sm focus:outline-none w-full"
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-2">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-1/2">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="text-gray-600 text-sm focus:outline-none w-full"
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-1/2">
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="text-gray-600 text-sm focus:outline-none w-full"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              placeholder="Enter your Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-600 text-sm focus:outline-none"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Guest</label>
            <input
              type="number"
              placeholder="Number of guests"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value ? parseInt(e.target.value) : '')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-600 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between mt-6">
          <button className="text-gray-500 text-sm">Back</button>
          <div className="space-x-2">
            <button className="text-gray-600 border border-gray-300 rounded-lg px-4 py-2 text-sm">Cancel</button>
            <button className="bg-purple-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-purple-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;