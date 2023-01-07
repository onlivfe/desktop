import classNames from "classnames";
import { useEffect, useState } from "react";

function PlatformTag({ platform }) {
  const platforms = ["CVR", "NEOS", "VRC"];
  const [num, setNum] = useState(0);

  useEffect(() => { setNum(Math.floor(Math.random() * 2.9)) }, []);

  return (
    <div className={classNames("absolute top-0 right-0 px-2 mt-[-0.15rem] rounded-bl-lg font-semibold text-shadow-sm", {
      "bg-cvr": num === 0,
      "bg-neos": num === 1,
      "bg-vrc": num === 2
    })}>
      {platforms[num]}
    </div>
  )
}

export default PlatformTag;