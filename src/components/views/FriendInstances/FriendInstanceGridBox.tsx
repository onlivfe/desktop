import PlatformTag from "./subcomponents/PlatformTag";

function FriendInstanceGridBox({ instanceDetails, users }) {
  return (
    <div className="bg-zinc-600 rounded-lg h-40 overflow-clip drop-shadow-[0_0.1rem_0.25rem_rgba(0,0,0,0.3)] hover:drop-shadow-[0_0.1rem_0.5rem_rgba(255,150,0,0.4)] duration-50 cursor-pointer">
      <div className="relative grid w-full h-14">
        <div className="w-full bg-cover" style={{ backgroundImage: `url("https://picsum.photos/${Math.ceil(Math.random() * 50) + 400}")` }}>
          <div className="w-full h-full bg-black opacity-60" />
        </div>
        <div className="absolute place-self-center text-xl font-bold">
          {instanceDetails.name}
        </div>
        <PlatformTag platform={"neos"} />
      </div>
      <div className="flex gap-4">
        
      </div>
    </div>
  )
}

export default FriendInstanceGridBox;