const EmptyMyJoiningEvent = () => {
  return (
    <div>
      /* Empty State */
      <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
        <div className="text-5xl mb-4">📅</div>

        <h2 className="text-xl font-bold text-gray-800">
          No Joined Events Yet!
        </h2>

        <p className="text-gray-500 mt-2">You haven't joined any events yet.</p>
      </div>
    </div>
  );
};

export default EmptyMyJoiningEvent;
