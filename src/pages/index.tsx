import { LeftSidebar, RightSidebar } from "components";
import { FriendInstances } from "components/views";

function Home() {
  return (
    <div className="flex h-screen overflow-clip">
      <LeftSidebar />
      <FriendInstances />
      <RightSidebar />
    </div>
  )
}

export default Home;