import classNames from "classnames";
import { userAgent } from "next/server";

export interface User {
  name: string,
  status: "online" | "offline"
}

function FriendListing({ user: { name, status } }: { user: User }) {
  return (
    <div className="relative flex w-full h-12 bg-zinc-800 hover:bg-slate-800 rounded-md overflow-hidden cursor-pointer">
      <div className={classNames("absolute", { "bg-zinc-900 w-full h-full opacity-50": status === "offline" })} />
      <div className="h-full bg-zinc-700 shrink-0 grow-0">
        <img className="bg-cover h-full" src={`https://picsum.photos/${Math.ceil(Math.random() * 50) + 400}`} />
      </div>
      <div className="ml-2 mt-[0.2rem] truncate text-sm">
        {name}
      </div>
    </div>
  );
}

export default FriendListing;