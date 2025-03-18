const MutationJournalItemSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-center bg-gray-100 p-8 rounded-lg shadow-sm w-full gap-6 animate-pulse">
      <div className="flex flex-col space-y-2">
        <div className="h-5 w-40 bg-gray-300 rounded" />
        <div className="h-6 w-48 bg-gray-400 rounded" />
        <div className="h-4 w-36 bg-gray-300 rounded" />
        <div className="h-5 w-24 bg-gray-300 rounded" />
        <div className="h-4 w-60 bg-gray-300 rounded" />
      </div>

      <div className="text-center w-full flex flex-col space-y-2">
        <div className="h-5 w-40 bg-gray-300 rounded mx-auto" />
        <div className="h-5 w-40 bg-gray-300 rounded mx-auto" />
        <div className="h-4 w-52 bg-gray-300 rounded mx-auto" />
        <div className="h-4 w-40 bg-gray-300 rounded mx-auto" />
      </div>

      <div className="flex flex-col items-end space-y-2">
        <div className="h-6 w-32 bg-gray-400 rounded" />
        <div className="h-4 w-28 bg-gray-300 rounded" />
        <div className="flex space-x-4">
          <div className="h-10 w-20 bg-gray-400 rounded" />
          <div className="h-10 w-20 bg-gray-400 rounded" />
        </div>
      </div>
    </div>
  );
};

export default MutationJournalItemSkeleton;