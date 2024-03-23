export default function LinearLoading() {
  return (
    <div className="w-full">
      <div className="h-1.5 w-full bg-blue-100 overflow-hidden">
        <div className="animate-progress w-full h-full bg-blue-500 origin-left-right"></div>
      </div>
    </div>
  );
}
