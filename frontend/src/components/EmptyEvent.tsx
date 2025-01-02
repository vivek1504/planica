import Events from "../assets/events.png";
import NoEvents from "../assets/NoEvents.png";

function EmptyEvent() {
  return (
    <>
    <div className="p-6 bg-gray-100 relative rounded-2xl right-[60px] w-[1050px]">
      <div className="bg-white rounded-lg shadow p-4">
        <header className="flex items-center justify-between mb-4">
          <div className="flex">
            <img src={Events} alt="Event icon" className="w-14 h-14" />
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
        </header>
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search events"
            className="w-[500px] p-2 border border-gray-300 rounded-2xl"
            aria-label="Search events"
          />
          <select
            className="p-2 w-[150px] border border-gray-300 rounded-2xl"
            aria-label="Sort by date"
          >
            <option>Date</option>
          </select>
          <select
            className="p-2 w-[150px] border border-gray-300 rounded-2xl"
            aria-label="Filter by category"
          >
            <option>Category</option>
          </select>
          <select
            className="p-2 w-[150px] border border-gray-300 rounded-2xl"
            aria-label="Filter by task"
          >
            <option>Task</option>
          </select>
        </div>
      </div>

      <div className="p-6 text-center">
        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className="mb-4 bg-gray-100 p-4 rounded-full">
            <img src={NoEvents} alt="" />
          </div>
          {/* Text */}
          <p className="text-sm font-medium text-gray-500">
            No Favourite
          </p>
          <p className="text-xs text-gray-400">
            You haven't marked any favorite
          </p>
        </div>
      </div>
    </div>

    </>

    
  );
}

export default EmptyEvent;
