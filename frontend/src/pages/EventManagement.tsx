import Event from "../components/Event";
import Favourites from "../components/Favourites";
import Sidebar from "../components/Sidebar";

function EventManagement() {
  return (
    <>
      <div className="relative">
        <div className="">
          <Favourites />
        </div>
        <div className="absolute right-10 top-[400px]">
          <Event />
        </div>
        <div>
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default EventManagement;
