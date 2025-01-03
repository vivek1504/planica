import Q from '../assets/Q.png'
import Notification from '../assets/Notification.png'
import rect from '../assets/rect.png'
import AcEmp from '../assets/AcEmp.png'
import Graph from '../assets/graph.png'
import OngoingTask from './OngoingTask'

function Dashboard() {
  return (
    <>
    <div className='p-4 bg-gray-100  absolute rounded-2xl mt-10 right-[20px] w-[1100px]'>
       <div className='flex justify-between'>
       <div>
        <p className='text-lg'>Welcome,</p>
        <p className='text-2xl text-bold'>Abhijeet Verma</p>
        </div>
        <div className='flex'>           
                <img src={Q} alt="" className='w-20 h-20'/>
                <img src={Notification} alt="" className='w-20 h-20'/>
           
        </div>
       </div>


       <div className="grid grid-cols-4 gap-4">
             <div className='w-[250px] border-2 p-4 rounded-2xl'>
             <div className="flex justify-between">
                <p>Active Employee</p>
                <img src={rect} alt="" />
             </div>

             <div className='flex mt-5'>
                <img src={AcEmp} alt=""  className=' pr-3'/>
                <p className='text-3xl pt-2'>339</p>
             </div>
             </div>

             <div className='w-[250px] border-2 p-4 rounded-2xl'>
             <div className="flex justify-between">
                <p>Number Of Events</p>
                <img src={rect} alt="" />
             </div>

             <div className='flex mt-5'>
                <img src={AcEmp} alt=""  className=' pr-3'/>
                <p className='text-3xl pt-2'>339</p>
             </div>
             </div>

             <div className='w-[250px] border-2 p-4 rounded-2xl'>
             <div className="flex justify-between">
                <p>Active Employee</p>
                <img src={rect} alt="" />
             </div>

             <div className='flex mt-5'>
                <img src={AcEmp} alt=""  className=' pr-3'/>
                <p className='text-3xl pt-2'>339</p>
             </div>
             </div>

             <div className='w-[250px] border-2 p-4 rounded-2xl'>
             <div className="flex justify-between">
                <p>Active Employee</p>
                <img src={rect} alt="" />
             </div>

             <div className='flex mt-5'>
                <img src={AcEmp} alt=""  className=' pr-3'/>
                <p className='text-3xl pt-2'>339</p>
             </div>
             </div>

           </div>
           <div className="absolute right-0 w-[550px] h-[450px] mt-3">
            <img src={Graph} alt=""  />
            </div>

            <div className='absolute h-[600px] left-[-40px]'>
                <OngoingTask />
            </div>
        
        
    </div>
    </>
  )
}

export default Dashboard