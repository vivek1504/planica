import Event from "../components/Event"
import Favourites from "../components/Favourites"
import Fav from "../components/Fav"

function EventManagement() {
  return (
    <>
     <div className="relative">
        <div className="">
            {/* <Favourites /> */}
            <Fav />
        </div>
        <div className="absolute right-10 top-[400px]">
            <Event />
        </div>
     </div>
    </>
  )
}

export default EventManagement