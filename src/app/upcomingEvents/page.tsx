import UpcomingEventCard from "./upcomingsCard";

const UpcomingEventPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-events`);
  const upcomingData = await res.json();
  console.log(upcomingData);
  return (
    <div>
      <UpcomingEventCard upcomingData={upcomingData}></UpcomingEventCard>
    </div>
  );
};

export default UpcomingEventPage;
