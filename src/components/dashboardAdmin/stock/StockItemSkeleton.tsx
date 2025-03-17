const StockItemSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-lg animate-pulse">
      <div className="space-y-4">
        {Array.from({ length: 1 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 gap-6 rounded-lg shadow-sm flex flex-col lg:flex-row items-center lg:space-x-6"
          >
            <div className="relative w-24 h-24 flex-shrink-0 bg-gray-300 rounded-lg"></div>

            <div className="flex-grow text-center lg:text-left space-y-2 w-full">
              <div className="w-2/3 lg:w-1/4 h-6 bg-gray-300 rounded mx-auto lg:mx-0 lg:-ml-8"></div>
              <div className="w-1/3 lg:w-2/5 h-4 bg-gray-300 rounded mx-auto lg:mx-0 lg:-ml-8"></div>
              <div className="w-1/3 lg:w-1/3 h-4 bg-gray-300 rounded mx-auto lg:mx-0 lg:-ml-8"></div>
              <div className="w-2/3 lg:w-2/5 h-4 bg-gray-300 rounded mx-auto lg:mx-0 lg:-ml-8"></div>
            </div>

            <div className="flex lg:ml-auto item-center space-x-4 lg:space-x-6 lg:mt-0">
              <div className="w-7 lg:w-36 h-7 lg:h-9 bg-gray-300 rounded"></div>
              <div className="w-7 lg:w-44 h-7 lg:h-9 bg-gray-300 rounded"></div>
              <div className="w-7 lg:w-24 h-7 lg:h-9 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default StockItemSkeleton;