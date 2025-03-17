const FullSkeleton = () => {
    return (
        <div className="space-y-4">
          {Array.from({ length: 1 }).map((_, index) => ( 
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col md:flex-row items-center space-y-4 md:space-x-6"
            >
              <div className="relative w-40 h-40 flex-shrink-0 bg-gray-300 rounded-lg"></div>
  
              <div className="flex-grow text-center md:text-left space-y-2 w-full">
                <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-5 bg-gray-300 rounded"></div>
                <div className="w-full h-10 bg-gray-200 rounded"></div>
              </div>
  
              <div className="flex items-center text-center gap-2">
                <div className="w-20 h-6 bg-gray-300 rounded"></div>
                <div className="w-10 h-6 bg-gray-400 rounded"></div>
              </div>
  
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded"></div>
                <div className="w-10 h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
    );
  };
  
  export default FullSkeleton;