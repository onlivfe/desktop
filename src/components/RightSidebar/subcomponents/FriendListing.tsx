import classNames from "classnames";
import { userAgent } from "next/server";
import { useEffect, useState } from "react";
import StatusPill, { Platform } from "./StatusPill";

export interface User {
  name: string,
  status: "online" | "offline"
}

function FriendListing({ user: { name, status } }: { user: User }) {
  const [platformsStatus, setPlatformsStatus] = useState<Platform[] | undefined>([]);
  const [statusRender, setStatusRender] = useState(null);

  useEffect(() => {
    let tempPlatformsStatus = [];

    for (let i = 0; i < 3; i++) {
      if (Math.ceil(Math.random() * 100) < (100 / ((i * 3) + 1))) tempPlatformsStatus.push(Platform[Math.floor(Math.random() * 3)]);
    }

    setPlatformsStatus(tempPlatformsStatus);
    setStatusRender(renderStatus(tempPlatformsStatus));
  }, []);

  return (
    <div className={classNames("relative flex w-full h-12 hover:bg-slate-800 rounded-md overflow-hidden cursor-pointer", {
      "opacity-30": status === "offline"
    })}>
      {/* <div className={classNames("absolute", { "bg-zinc-900 w-full h-full": status === "offline" })} /> */}

      {/* <div className="absolute bottom-1 right-1 flex">
        {!platformsStatus || status === "offline" ? null : platformsStatus.map((platformName, i) => {
          return <StatusPill platform={platformName} key={i} />
        })}
      </div> */}

      <div className="h-full bg-zinc-700 shrink-0 grow-0 overflow-hidden rounded-md">
        <img className="bg-cover h-full" src={`https://picsum.photos/${Math.ceil(Math.random() * 50) + 400}`} />
      </div>
      <div className="flex flex-col ml-3">
        <div className="mt-[0.2rem] truncate text-sm">
          {name}
        </div>
        <div className="text-zinc-400 text-xs mt-1">
          {status !== "offline" ? statusRender : null}
        </div>
      </div>
    </div>
  );
}

export default FriendListing;

function renderStatus(platformsStatus) {
  // will be inherited better later from APIs
  const current = Math.random() > 0.5 ? "Online" : "Away";

  if (platformsStatus.length === 1) return `${platformsStatus[0]} - ${current}`;
  if (platformsStatus.length > 1) return "Multiple Platforms";
  return "FUNNY STATUS CATCH";
}