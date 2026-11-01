import UpcomingEventCard from "./upcomingsCard";


const UpcomingEventPage = async() => {
  const res = await fetch("http://localhost:5000/upcoming-events ")
  const upcomingData = await res.json();
  console.log(upcomingData)
  return (
    <div>
      <UpcomingEventCard upcomingData={upcomingData}></UpcomingEventCard>
    </div>
  )
}

export default UpcomingEventPage
