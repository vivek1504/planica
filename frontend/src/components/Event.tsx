import React from "react";
import Events from "../assets/Events.png";

const Event: React.FC = () => {
  const events = [
    {
      id: 1,
      name: "Text Ed Sheeran: +=x India Tour 2025",
      dueDate: "Jan 24",
      category: "CONCERT",
      task: "21/25",
      lastUpdate: "2 days ago",
    },
    {
      id: 2,
      name: "Da Vinci Genius",
      dueDate: "Jan 18",
      category: "EXHIBITION",
      task: "9/10",
      lastUpdate: "Today",
    },
    {
      id: 3,
      name: "Ambani’s Wedding",
      dueDate: "Feb 2",
      category: "WEDDING",
      task: "9/10",
      lastUpdate: "Today",
    },
    {
      id: 4,
      name: "Startup Investors Forum",
      dueDate: "Jan 1",
      category: "SEMINAR",
      task: "13/13",
      lastUpdate: "-",
    },
    {
      id: 5,
      name: "Startup Investors Forum",
      dueDate: "Dec 31",
      category: "SEMINAR",
      task: "10/10",
      lastUpdate: "-",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 relative rounded-2xl mt-10 right-[20px] w-[1100px]">
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
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            Create Event
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
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Events</th>
              <th className="p-2">Due Date</th>
              <th className="p-2">Category</th>
              <th className="p-2">Task</th>
              <th className="p-2">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="p-2 flex items-center gap-2">
                  <input type="checkbox" />
                  {event.name}
                </td>
                <td className="p-2">{event.dueDate}</td>
                <td className="p-2">
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                    {event.category}
                  </span>
                </td>
                <td className="p-2">{event.task}</td>
                <td className="p-2">{event.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Event;
