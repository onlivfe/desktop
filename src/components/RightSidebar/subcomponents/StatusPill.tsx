import classNames from "classnames";

export enum Platform { "NEOS", "CVR", "VRC" }

function StatusPill({ platform }: { platform:  Platform }) {
  const randomMath = Math.random();

  return (
    <div className={classNames("text-xs ml-1 px-1 rounded-sm", {
      "bg-green-700": randomMath < 0.33,
      "bg-orange-700": randomMath < 0.75 && randomMath >= 0.33,
      "bg-red-700": randomMath < 1 && randomMath >= 0.75
    })}>{platform}</div>
  );
}

export default StatusPill;