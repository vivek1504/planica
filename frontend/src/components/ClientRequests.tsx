import { useState } from 'react';
import chat from '../assets/chat.png';

interface ClientRequest {
  title: string;
  description: string;
}

const clientRequests: ClientRequest[] = [
  {
    title: 'Arrange Extra Flower decoration',
    description: 'Ismu Aiyat Hklayat',
  },
  {
    title: 'Arrange Extra Flower decoration',
    description: 'Ismu Aiyat Hklayat',
  },
  {
    title: 'Arrange Extra Flower decoration',
    description: 'Ismu Aiyat Hklayat',
  },
];

const ClientRequestList = () => {
  const [selectedRequest, setSelectedRequest] = useState<ClientRequest | null>(
    null
  );

  const handleRequestClick = (request: ClientRequest) => {
    setSelectedRequest(request);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 w-[500px]">
      <div className="flex justify-between items-center mb-4">

      <div className="flex">
            <img src={chat} alt="" className="w-14 h-14" />
            <div className="pl-4 pt-1">
                <h1 className="text-lg font-semibold">Client Request</h1>
                <p className="text-sm text-gray-500">
                projects complete per month basic on trends
                </p>
            </div>
          </div>

               <div className="relative inline-block">
          <select className="appearance-none border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option value="latest">Latest</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <ul className="space-y-4"> {clientRequests.map((request, index) => (
          <li
            key={index}
            className="p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => handleRequestClick(request)}
          >
            <h3 className="text-lg font-semibold">{request.title}</h3>
            <p className="text-gray-600">{request.description}</p>
          </li>
        ))}
      </ul>
      {selectedRequest && (
        <div className="mt-6 p-4 border border-gray-300 rounded-md">
          <h3 className="text-lg font-semibold">Selected Request</h3>
          <p className="text-gray-600">{selectedRequest.title}</p>
          <p className="text-gray-500">{selectedRequest.description}</p>
        </div>
      )}
    </div>
  );
};

export default ClientRequestList;