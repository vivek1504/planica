import React from 'react';
import Q from '../assets/Q.png'
import Notification from '../assets/Notification.png'
import Events from '../assets/Events.png'
import Search from '../assets/Search.png'
import Frame from '../assets/Frame.png'

interface TaskProps {
  title: string;
  status: string;
  subTask: string;
  progress: number;
  dueDate: string;
}

const Task: React.FC<TaskProps> = ({
  title,
  status,
  subTask,
  progress,
  dueDate,
}) => {
  return (
    <div className="bg-white rounded-lg w-[430px] shadow-md p-4 mb-4">
        
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-purple-500 text-white rounded-full p-2 mr-2">
            Ag
          </div>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <div className="flex items-center">
          <img
            src="https://www.flaticon.com/free-icons/user"
            alt="User Icon"
            className="w-6 h-6 mr-2"
          />
          <img
            src="https://www.flaticon.com/free-icons/user"
            alt="User Icon"
            className="w-6 h-6"
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-gray-600">
          <div>
            <p className="font-bold">Status</p>
            <p>{status}</p>
          </div>
          <div>
            <p className="font-bold">Sub task</p>
            <p>{subTask}</p>
          </div>
          <div>
            <p className="font-bold">Progress</p>
            <p>{progress}%</p>
          </div>
          <div>
            <p className="font-bold">Due Date</p>
            <p>{dueDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OngoingTask: React.FC = () => {
  const tasks: TaskProps[] = [
    { title: 'Task 1', status: 'In Progress', subTask: 'Subtask 1', progress: 50, dueDate: '2023-10-15' },
    { title: 'Task 2', status: 'Completed', subTask: 'Subtask 2', progress: 100, dueDate: '2023-10-10' },
    { title: 'Task 3', status: 'Not Started', subTask: 'Subtask 3', progress: 0, dueDate: '2023-10-20' },
  ];

  return (
    <div className="absolute left-20 bottom-0 w-[480px] p-6 border-2 rounded-2xl overflow-hidden">

        <div className='flex justify-between w-[470px] px-4 pb-2'>
       <div className='flex'>
        <span className='pr-4 pt-1'>
            <img src={Events} alt="" className='h-12 w-12' />
        </span>
        <span>
        <p className='text-lg text-bold'>On Going Task</p>
        <p className='text-sm '>High Priority task to be completed</p>
        </span>
        </div>
        <div className='flex gap-1 absolute right-4'>           
                <img src={Search} alt="" className='h-10 w-10'/>
                <img src={Frame} alt="" className='h-10 w-10'/>
           
        </div>
       </div>

      {tasks.map((task, index) => (
        <Task
          key={index}
          title={task.title}
          status={task.status}
          subTask={task.subTask}
          progress={task.progress}
          dueDate={task.dueDate}
        />
      ))}
    </div>
  );
};

export default OngoingTask;