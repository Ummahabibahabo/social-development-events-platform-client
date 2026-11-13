import { headers } from "next/headers";
import { auth } from "../lib/auth";

import MyJoiningCard from "./myjoiningCard";
import { getTokenFromServer } from "../lib/getTokenFromServer";

const MyJoiningEvent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;
  const token = await getTokenFromServer();
  const res = await fetch(`http://localhost:5000/join-event/${email}`, {});

  const myJoinEventData = await res.json();

  return (
    <section className=" bg-gray-50 py-12 px-4 md:px-8">
      <MyJoiningCard myJoinEventData={myJoinEventData}></MyJoiningCard>
    </section>
  );
};

export default MyJoiningEvent;
