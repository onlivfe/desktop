import { useState } from "react";
import FriendInstanceGridBox from "./FriendInstanceGridBox";

function FriendInstanceGrid() {
  const [worldInstances, setWorldInstances] = useState([{ name: "Best World!" },{ name: "Best World!" },{ name: "Best World!" },{ name: "Best World!" },{ name: "Best World!" },{ name: "Best World!" },{ name: "Best World!" },{ name: "Best World!" },{ name: "Best World!" },{ name: "Best World!" },{ name: "Best World!" },{ name: "Best World!" },{ name: "Best World!" },{ name: "Best World!" },{ name: "Best World!" }]);
  const [worldInstanceUsers, setWorldInstanceUsers] = useState([{ name: "Best Frand!" },{ name: "Best Frand!" },{ name: "Best Frand!" },{ name: "Best Frand!" },{ name: "Best Frand!" },{ name: "Best Frand!" },{ name: "Best Frand!" },{ name: "Best Frand!" },{ name: "Best Frandddddddddddddddddd!" },{ name: "Best Frand!" },{ name: "Best Frand!" },{ name: "Best Frand!" },{ name: "Best Frand!" },{ name: "Best Frand!" }])

  return (
    <ul role="list" className="grid gap-6 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
      {!worldInstances ? null : worldInstances.map((instance, i) => <FriendInstanceGridBox instanceDetails={instance} users={worldInstanceUsers} key={i} /> )}
    </ul>
  )
}

export default FriendInstanceGrid;