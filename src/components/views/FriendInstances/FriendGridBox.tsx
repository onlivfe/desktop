function FriendGridBox({ user }) {
  if (!user) return null;

  return (
    <div className="flex w-full h-8 bg-zinc-800 rounded-md overflow-hidden">
      <div className="h-full w-8 bg-zinc-700 shrink-0 grow-0">
        <img className="bg-cover h-full" src={`https://picsum.photos/${Math.ceil(Math.random() * 50) + 400}`} />
      </div>
      <div className="ml-2 mt-[0.4rem] pr-2 truncate text-sm font-light">
        {user.name}
      </div>
    </div>
  )
}

export default FriendGridBox;