import React from 'react';
import Favourite from '../assets/Favourites.png'

interface TaskCardProps {
  title: string;
  description: string;
  progress: number;
  category: string;
  members: string[];
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, progress, category, members }) => {
  return (
    <div className="relative bg-white border border-gray-300 rounded-lg shadow p-4 w-full max-w-xs">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-yellow-500 text-lg">⭐</span>
      </div>
      <p className="text-gray-500 text-sm mt-2">{description}</p>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm text-gray-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-purple-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className='flex justify-between'>
      <div className="flex items-center mt-4">
        <div className="flex -space-x-2">
          {members.map((member, index) => (
            <img
              key={index}
              src={member}
              alt="member"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
        </div>
        <button className="ml-2 text-gray-500 border rounded-full w-8 h-8 flex items-center justify-center">
          +
        </button>
      </div>
        <div className="mt-4">
        <span className="text-sm bg-purple-100 text-purple-500 px-2 py-1 rounded-full">
          {category}
        </span>
        </div>
        </div>
    </div>
  );
};

const Favorites: React.FC = () => {
  const tasks = [
    {
      title: 'Wedding Wonderland',
      description:
        'From venue selection to flawless execution, we ensure every detail of your wedding is picture-perfect. Let us handle the stress while you cherish the joy.',
      progress: 81,
      category: 'Wedding',
      members: [
        'https://via.placeholder.com/32',
        'https://via.placeholder.com/32',
        'https://via.placeholder.com/32',
      ],
    },
    {
      title: 'Wedding Wonderland',
      description:
        'From venue selection to flawless execution, we ensure every detail of your wedding is picture-perfect. Let us handle the stress while you cherish the joy.',
      progress: 81,
      category: 'Wedding',
      members: [
        'https://via.placeholder.com/32',
        'https://via.placeholder.com/32',
        'https://via.placeholder.com/32',
      ],
    },
    {
      title: 'Wedding Wonderland',
      description:
        'From venue selection to flawless execution, we ensure every detail of your wedding is picture-perfect. Let us handle the stress while you cherish the joy.',
      progress: 81,
      category: 'Wedding',
      members: [
        'https://via.placeholder.com/32',
        'https://via.placeholder.com/32',
        'https://via.placeholder.com/32',
      ],
    },
  ];

  return (
    <div className="absolute right-[100px] p-6 bg-gray-100 rounded-2xl mt-8">
        <div className='flex'>
            <img src={Favourite} alt="" className='p-4' />
            <div>
                <h1 className="text-xl font-bold pt-2">Favorites</h1>
                <p className="text-gray-600 text-sm mt-1">High priority task to be completed</p>
            </div>
      </div>
      <div className="mt-6 flex gap-5 flex-wrap">
        {tasks.map((task, index) => (
          <TaskCard key={index} {...task} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
