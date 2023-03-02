import { useEffect } from "react";
import FriendInstanceGrid from "../FriendInstances/FriendInstanceGrid";

function ViewContainer({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="flex-auto h-screen bg-zinc-800 overflow-hidden">
      <div className="text-3xl h-20 font-bold py-4 px-8 bg-zinc-900">{title}</div>
      <div className="px-8 pb-8 overflow-y-auto pt-6">
        {children}
      </div>
    </div>
  );
}

export default ViewContainer;