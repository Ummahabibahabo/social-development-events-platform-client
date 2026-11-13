const Loading = () => {
  return (
    <div className="py-10 space-y-8 animate-pulse">
      {/* Top Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-2.5 w-full sm:w-auto">
          <div className="h-4 w-32 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-64 bg-gray-200 rounded-xl"></div>
          <div className="h-4 w-80 max-w-full bg-gray-200 rounded-md"></div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="loading loading-spinner loading-md text-[#123D32]"></span>
          <span className="text-sm font-semibold text-gray-500">Loading events...</span>
        </div>
      </div>

      {/* 6 Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs"
          >
            {/* Image Skeleton */}
            <div className="h-52 w-full bg-gray-200"></div>

            {/* Card Content Skeleton */}
            <div className="p-5 sm:p-6 space-y-3.5">
              {/* Title */}
              <div className="h-5 w-3/4 bg-gray-200 rounded-md"></div>

              {/* Date & Location */}
              <div className="space-y-2">
                <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded-md"></div>
              </div>

              {/* Description */}
              <div className="space-y-1.5 pt-1">
                <div className="h-3.5 w-full bg-gray-200 rounded-md"></div>
                <div className="h-3.5 w-4/5 bg-gray-200 rounded-md"></div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="h-3.5 w-20 bg-gray-200 rounded-md"></div>
                <div className="h-9 w-28 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
