import Events from "../assets/Events.png"
import client from "../assets/client.png"
import Task from "../assets/Task.png"
import plus from "../assets/plus.png"


 const TaskCreation = () => {

  return (
    <>
     <div className="absolute right-10 top-[30px] p-6 bg-gray-100 rounded-2xl w-[1150px] min-h-screen">
      <div className="bg-white rounded-lg shadow p-4">
        <header className="flex items-center justify-between mb-4">
          <div className="flex">
            <img src={Events} alt="Event icon" className="w-14 h-14" />
            <div className="pl-4 pt-1">
              <h1 className="text-lg font-semibold">Ambani's Wedding</h1>
              <p className="text-sm text-gray-500">
                High priority task to be completed
              </p>
            </div>
          </div>
          <button className=" text-white px-4 py-2 rounded-2xl border-2">
            <span className="flex">
                <img src={client} alt="" className="pr-2 w-7 h-6"/>
                <p className="text-black">Invite Client</p>
            </span>
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
        <div className="flex flex-col  w-[1000px] items-center">
          {/* Icon */}
          <div className="grid grid-cols-4 gap-4">
          <div className="m-2 ">
            <div className="bg-white p-2 mb-4 flex rounded-2xl border-2">
                    <img src={plus} alt="" className="pr-2 "/>
                    <p className="pt-1 text-gray-700">Not Started</p>

            </div>
          <div className="mb-4 border-2 bg-white p-4 rounded-2xl">
            <img src={Task} alt="" />
                <p className="text-sm font-medium text-black">
                 No Task Found
                </p>
                <p className="text-xs text-gray-600">
                  No Task Found in which are not started
                </p>
          </div>
          </div>

          <div className="m-2 ">
            <div className="bg-white p-2 mb-4 flex rounded-2xl border-2">
                    <img src={plus} alt="" className="pr-2 "/>
                    <p className="pt-1 text-gray-700">Not Started</p>

            </div>
          <div className="mb-4 border-2 bg-white p-4 rounded-2xl">
            <img src={Task} alt="" />
                <p className="text-sm font-medium text-black">
                 No Task Found
                </p>
                <p className="text-xs text-gray-600">
                  No Task Found in which are not started
                </p>
          </div>
          </div>

          <div className="m-2 ">
            <div className="bg-white p-2 mb-4 flex rounded-2xl border-2">
                    <img src={plus} alt="" className="pr-2 "/>
                    <p className="pt-1 text-gray-700">Not Started</p>

            </div>
          <div className="mb-4 border-2 bg-white p-4 rounded-2xl">
            <img src={Task} alt="" />
                <p className="text-sm font-medium text-black">
                 No Task Found
                </p>
                <p className="text-xs text-gray-600">
                  No Task Found in which are not started
                </p>
          </div>
          </div>

          <div className="m-2 ">
            <div className="bg-white p-2 mb-4 flex rounded-2xl border-2">
                    <img src={plus} alt="" className="pr-2 "/>
                    <p className="pt-1 text-gray-700">Not Started</p>

            </div>
          <div className="mb-4 border-2 bg-white p-4 rounded-2xl">
            <img src={Task} alt="" />
                <p className="text-sm font-medium text-black">
                 No Task Found
                </p>
                <p className="text-xs text-gray-600">
                  No Task Found in which are not started
                </p>
          </div>
          </div>
         
             


          </div>
        </div>
      </div>
      
      </div>

    </>
  )
}

export default TaskCreation;