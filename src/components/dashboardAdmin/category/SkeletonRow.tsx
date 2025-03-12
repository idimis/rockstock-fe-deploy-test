const SkeletonRow = () => (
  <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm animate-pulse">
    <div className="w-14 h-14 bg-gray-300 rounded-lg"></div>

    <div className="ml-4 space-y-2">
      <div className="h-4 w-32 bg-gray-300 rounded"></div>
      <div className="h-3 w-24 bg-gray-300 rounded"></div>
    </div>

    <div className="flex space-x-6">
      <div className="w-20 h-8 bg-gray-300 rounded-lg"></div>
      <div className="w-20 h-8 bg-gray-300 rounded-lg"></div>
    </div>
  </div>
);
export default SkeletonRow;