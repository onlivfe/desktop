import classNames from "classnames";
import { useEffect, useState } from "react";
import FriendGridBox from "./FriendGridBox";
import PlatformTag from "./subcomponents/PlatformTag";

function FriendInstanceGridBox({ instanceDetails, users }) {
  const [localUsers, setLocalUsers] = useState([]);

  useEffect(() => {
    setLocalUsers([...users].slice(Math.ceil(Math.random() * (users.length - 3)) + 3));
  }, []);

  return (
    <div className="flex flex-col bg-zinc-700 rounded-lg h-48 overflow-hidden drop-shadow-[0_0.1rem_0.25rem_rgba(0,0,0,0.3)] hover:drop-shadow-[0_0.1rem_0.5rem_rgba(255,150,0,0.4)]  duration-50 cursor-pointer">
      <div className="grid w-full h-14 grow-0 shrink-0">
        <div className="w-full bg-cover" style={{ backgroundImage: `url("https://picsum.photos/${Math.ceil(Math.random() * 50) + 400}")` }}>
          <div className="w-full h-full bg-black opacity-60" />
        </div>
        <div className="absolute place-self-center text-xl font-bold">
          {instanceDetails.name}
        </div>
        <PlatformTag platform={"neos"} />
      </div>
      <div className="grid gap-2 p-2 grid-cols-2 md:grid-cols-3 overflow-hidden">
        {!localUsers ? null : localUsers.map((user, i) => <FriendGridBox user={user} key={i} /> )}
      </div>
      <div className={classNames("absolute bottom-0 w-full bg-gradient-to-t from-zinc-800 to-transparent h-12", {
          "hidden": localUsers.length <= 6,
          "block md:hidden": localUsers.length > 6 && localUsers.length <= 9,
          "block": localUsers.length > 9
        })} />
    </div>
  )
}

export default FriendInstanceGridBox;