// import { useState } from 'react';
import chat from '../assets/chat.png';

// interface ClientRequest {
//   title: string;
//   description: string;
// }

// const clientRequests: ClientRequest[] = [
//   {
//     title: 'Arrange Extra Flower decoration',
//     description: 'Ismu Aiyat Hklayat',
//   },
//   {
//     title: 'Arrange Extra Flower decoration',
//     description: 'Ismu Aiyat Hklayat',
//   },
//   {
//     title: 'Arrange Extra Flower decoration',
//     description: 'Ismu Aiyat Hklayat',
//   },
// ];

const ClientRequestList = () => {
  // const [selectedRequest, setSelectedRequest] = useState<ClientRequest | null>(
  //   null
  // );

  // const handleRequestClick = (request: ClientRequest) => {
  //   setSelectedRequest(request);
  // };

  return (
    <>
    <div className="bg-white absolute right-[30px] top-80 rounded-md shadow-md p-4 w-[500px]">
      <div className="flex justify-between items-center mb-4">

      <div className="flex">
            <img src={chat} alt="" className="w-14 h-14" />
            <div className="pl-4 pt-1">
                <h1 className="text-lg font-semibold">Client Request</h1>
                <p className="text-sm text-gray-500">
                Projects complete per month basic on trends
                </p>
            </div>

            <div className="relative inline-block">
          <select className="appearance-none border border-gray-300 rounded-md px-6 py-4 text-sm">
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
          

          </div>

          <div className="flex mt-10">
            <img src={chat} alt="" className="w-14 h-14" />
            <div className="pl-4 pt-1">
                <h1 className="text-lg font-semibold">Client Request</h1>
                <p className="text-sm text-gray-500">
                Projects complete per month basic on trends
                </p>
            </div>
          </div>
          </div>

              

    
    </>
  );
};

export default ClientRequestList;