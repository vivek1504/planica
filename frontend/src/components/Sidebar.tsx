import React from 'react';
import Dashboard from '../assets/Dashboard.png';
import Newsfeed from '../assets/Newsfeed.png';
import Event from '../assets/Event.png';
import Calendar from '../assets/Calendar.png';
import Setting from '../assets/Setting.png';
import VendorList from '../assets/VendorList.png';
import EmployeeTask from '../assets/EmployeeTask.png';
import Planica from '../assets/planica.svg'

const Sidebar: React.FC = () => {
  return (
    <>
    <div className='ml-8 '>
    <div className="  flex items-center justify-start mt-8 pb-2">
        <img src={Planica} alt="planica icon" />
    </div>
    </div>

    <div className="bg-white pt-6 p-4 rounded-lg min-h-screen w-[230px] ml-8 shadow-md">
      <h2 className="text-lg font-semibold mb-2">HOME</h2>
      <ul>       
        <li className="flex items-center py-2 hover:bg-gray-100 rounded-md">
          <img src={Dashboard} alt="Dashboard Icon" className="text-gray-500 mr-2" />
          Dashboard
        </li>
        <li className="flex items-center py-2 hover:bg-gray-100 rounded-md">
          <img src={Newsfeed} alt="Newsfeed Icon" className="text-gray-500 mr-2 " />
          Newsfeed
        </li>
        <li className="flex items-center py-2 hover:bg-gray-100 rounded-md">
          <img src={Event} alt="Event Icon" className="text-gray-500 mr-2 " />
          Event
        </li>
        <li className="flex items-center py-2 hover:bg-gray-100 rounded-md">
          <img src={Calendar} alt="Calendar Icon" className="text-gray-500 mr-2" />
          Calendar
        </li>
        <li className="flex items-center py-2 hover:bg-gray-100 rounded-md">
          <img src={Setting} alt="Setting Icon" className="text-gray-500 mr-2 " />
          Setting
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2 mt-10">Team Mangement</h2>
      <ul>
        <li className="flex items-center py-2 hover:bg-gray-100 rounded-md">
          <img src={VendorList} alt="Vendorlist Icon" className="text-gray-500 mr-2 " />
          Vendor List
        </li>
        <li className="flex items-center py-2 hover:bg-gray-100 rounded-md">
          <img src={EmployeeTask} alt="Employeetask Icon" className="text-gray-500 mr-2 " />
          Employee Task
        </li>
      </ul>

    </div>
    </>
  );
};

export default Sidebar;
