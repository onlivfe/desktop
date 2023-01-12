import { useState } from "react";
import { FriendListing } from "./subcomponents";
import { User } from "./subcomponents/FriendListing";

function RightSidebar() {
  const [friends, setFriends] = useState<User | any>((new Array(10)).fill({ name: "best frand!", status: "online" }));

  return (
    <div className="overflow-hidden bg-zinc-900 min-w-[18rem] max-w-[24rem] h-full resize-x rtl border-l-2 border-zinc-600">
      <div className="overflow-y-auto ltr h-full">
        <div className="bg-zinc-800 font-semibold text-2xl py-2 pl-4 mb-1">
          Friends
        </div>
        <div>
          <StatusSection>
            <StatusHeader count={friends.length}>Online</StatusHeader>
            {!friends ? "no friends" : friends.map((user, i) => {
              return (
                <div key={i} className="py-[0.3rem] px-3">
                  <FriendListing user={user} />
                </div>
              );
            })}
          </StatusSection>
          <StatusSection>
            <StatusHeader count={friends.length}>Offline</StatusHeader>
            {!friends ? "no friends" : friends.map((user, i) => {
              return (
                <div key={i} className="py-[0.3rem] px-3">
                  <FriendListing user={{ name: user.name, status: "offline" }} />
                </div>
              );
            })}
          </StatusSection>
          
        </div>
      </div>
    </div>
  )
}

export default RightSidebar;

function StatusHeader({ children, count }) {
  return <div className="pl-4 py-1"><span className="font-semibold">{children}</span>&nbsp;-&nbsp;{count}</div>
}

function StatusSection({ children }) {
  return <div className="pt-1">{children}</div>
}