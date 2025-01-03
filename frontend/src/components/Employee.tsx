import React from 'react';
import Events from '../assets/Events.png';
import plus from '../assets/plus.png';

interface Member {
  fullName: string;
  email: string;
  designation: string;
  taskAssigned: string;
  status: 'Active' | 'Inactive';
}

const members: Member[] = [
  {
    fullName: 'Corey Carder',
    email: 'ccarder@gmail.com',
    designation: 'Staff',
    taskAssigned: '13/13',
    status: 'Inactive',
  },
  {
    fullName: 'Corey Carder',
    email: 'ccarder@gmail.com',
    designation: 'Staff',
    taskAssigned: '13/13',
    status: 'Active',
  },
  {
    fullName: 'Corey Carder',
    email: 'ccarder@gmail.com',
    designation: 'Staff',
    taskAssigned: '13/13',
    status: 'Active',
  },
  {
    fullName: 'Corey Carder',
    email: 'ccarder@gmail.com',
    designation: 'Staff',
    taskAssigned: '13/13',
    status: 'Active',
  },
  {
    fullName: 'Corey Carder',
    email: 'ccarder@gmail.com',
    designation: 'Staff',
    taskAssigned: '13/13',
    status: 'Active',
  },
  {
    fullName: 'Corey Carder',
    email: 'ccarder@gmail.com',
    designation: 'Staff',
    taskAssigned: '13/13',
    status: 'Active',
  },
  
  // Add more members as needed
];

const MemberTable: React.FC = () => {
  return (
    <div className="flex absolute mt-14 right-20 flex-col w-[1100px]">
        
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex">
            <img src={Events} alt="" className="w-14 h-14" />
            <div className="pl-4 pt-1">
                <h1 className="text-lg font-semibold">All Events</h1>
                <p className="text-sm text-gray-500">
                    High priority task to be completed
                </p>
            </div>
          </div>
          <button className="bg-[#6B10EA] text-white px-4 py-2 rounded-2xl hover:bg-purple-700">
            <div className="flex">
                <img src={plus} alt="" className='pr-2'/>
                <p className='pt-1'>Create Member</p>
            </div>
          </button>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search events"
            className="w-[500px] p-2 border border-gray-300 rounded-2xl"
          />
          <select className="p-2 w-[150px]  border border-gray-300 rounded-2xl">
            <option>Date</option>
          </select>
          <select className="p-2 w-[150px]  border border-gray-300 rounded-2xl">
            <option>Category</option>
          </select>
          <select className="p-2 w-[150px]  border border-gray-300 rounded-2xl">
            <option>Task</option>
          </select>
        </div>
        </div>
      
      <div className='p-6 border-2 rounded-2xl mt-8'>
        <table className="w-full text-left table-auto border-collapse">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="py-2 text-black">Full Name</th>
              <th className="py-2 text-black">Email</th>
              <th className="py-2 text-black">Designation</th>
              <th className="py-2 text-black">Task Assigned</th>
              <th className="py-2 text-black">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-200"
              >
                <td className="py-3">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-${index}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                      htmlFor={`checkbox-${index}`}
                      className="ms-2 text-sm font-medium text-black"
                    >
                      {member.fullName}
                    </label>
                  </div>
                </td>
                <td className="py-3 flex items-center gap-2">
                  <h4 className="font-semibold">{member.email}</h4>
                </td>
                <td className="py-3 text-black font-semibold">
                  <div className="flex w-16 h-6 justify-center items-center rounded-xl bg-purple-200">
                    <h4>{member.designation}</h4>
                  </div>
                </td>
                <td className="py-3 text-black font-semibold">
                  {member.taskAssigned}
                </td>
                <td className="py-3">
                  <div
                    className={`inline-flex items-center px-2 py-1 font-bold rounded-md ${
                      member.status === 'Active'
                        ? 'bg-green-200 text-green-900'
                        : 'bg-red-200 text-red-900'
                    }`}
                  >
                    {member.status}
                  </div>
                </td>
                <td className="py-3">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberTable;
