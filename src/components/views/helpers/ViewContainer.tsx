function ViewContainer({ children }) {
  return (
    <div className="flex-auto bg-zinc-800 overflow-y-auto">
      {children}
    </div>
  );
}

export default ViewContainer;