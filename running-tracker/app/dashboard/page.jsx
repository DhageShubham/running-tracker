"use client";
import { SimpleGrid } from "@chakra-ui/react";

import { useState } from "react";
import InputCard from "../components/InputCard.jsx";
import { weekdays } from "../constants/weekdays.js";
//import { entries } from "./constants/entries.js";
import { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../Database/firebase";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { useAuth } from "@clerk/nextjs";

import ShowCard from "../components/ShowCard.jsx";
export default function Home() {
  const { isSignedIn, sessionId, userId } = useAuth();

  const [entries, setEntries] = useState([]);
  const [aggregateEntries, setAggregateEntries] = useState({});

  const currentDate = new Date();
  const start = startOfWeek(currentDate);
  const end = endOfWeek(currentDate);

  const startDateString = format(start, "dd/MM/yyyy");
  const endDateString = format(end, "dd/MM/yyyy");

  const currentMonthName = new Date().toLocaleString("en", { month: "long" });

  /*TODO: do calculations for year card */

  const [docs] = useCollection(
    query(
      collection(db, "users", userId, "running_data"),
      where("id", ">=", startDateString),
      where("id", "<=", endDateString)
    )
  );

  useEffect(() => {
    if (!docs) return;
    const entries = docs?.docs.map((doc) => ({
      day: doc.data().day,
      distance: doc.data().distance,
      time: doc.data().time,
      speed: doc.data().speed,
    }));

    setEntries(entries);
  }, [docs]);

  const aggregateDataQuery = collection(db, "users", userId, "aggregate");
  const [aggregateSnapshots] = useCollection(aggregateDataQuery);

  useEffect(() => {
    if (!aggregateSnapshots) return;

    const aggregateEntries = aggregateSnapshots.docs.map((doc) =>
      doc.data()
    )[0];
    if (aggregateEntries) {
      aggregateEntries.avgWeekSpeed = (
        aggregateEntries?.totalWeekDistance / aggregateEntries?.totalWeekTime
      ).toFixed(2);
      aggregateEntries.avgMonthSpeed = (
        aggregateEntries?.totalMonthDistance / aggregateEntries?.totalMonthTime
      ).toFixed(2);
      aggregateEntries.avgYearSpeed = (
        aggregateEntries?.totalYearDistance / aggregateEntries?.totalYearTime
      ).toFixed(2);
    }

    setAggregateEntries(aggregateEntries);
  }, [aggregateSnapshots, docs]);

  const showDaysCards = entries.map((entry) => {
    return {
      key: entry.day,
      weekday: entry.day,
      cardColor: weekdays[entry.day]?.color,
      inputColor: weekdays[entry.day]?.inputColor,
      planetURL: weekdays[entry.day]?.planetURL,
      distance: entry.distance,
      time: entry.time,
      speed: entry.speed,
    };
  });

  const cards = showDaysCards.map((day) => (
    <ShowCard
      key={day.key}
      weekday={day.weekday}
      cardColor={day.cardColor}
      inputColor={day.inputColor}
      planetURL={day.planetURL}
      distRec={day.distance}
      timeRec={day.time}
      speedRec={day.speed}
    />
  ));
  return (
    <SimpleGrid
      spacing={2}
      templateColumns="repeat(auto-fill, minmax(200px, 280px))"
      justifyContent="center"
      marginBlockEnd="60px"
    >
      <InputCard />
      {aggregateEntries?.totalWeekDistance && cards.length > 0 ? (
        <ShowCard
          key="This Week"
          weekday="This Week"
          cardColor="#CAD8F3"
          inputColor="#B4C9EF"
          planetURL="https://media.tenor.com/RtwD0nqrD5wAAAAj/jimmy-spinner.gif"
          distRec={aggregateEntries?.totalWeekDistance}
          timeRec={aggregateEntries?.totalWeekTime}
          speedRec={aggregateEntries?.avgWeekSpeed}
        />
      ) : null}
      {aggregateEntries?.totalMonthDistance ? (
        <ShowCard
          key={currentMonthName}
          weekday={currentMonthName}
          cardColor="#FEE7D6"
          inputColor="#FDDDC5"
          planetURL="https://media.tenor.com/RtwD0nqrD5wAAAAj/jimmy-spinner.gif"
          distRec={aggregateEntries?.totalMonthDistance}
          timeRec={aggregateEntries?.totalMonthTime}
          speedRec={aggregateEntries?.avgMonthSpeed}
        />
      ) : null}
      {aggregateEntries?.totalYearDistance ? (
        <ShowCard
          key="2024"
          weekday="2024"
          cardColor="#B2F7EF"
          inputColor="#CDFAF5"
          planetURL="https://media.tenor.com/x1eW6Z7pMnIAAAAj/animated-man-running.gif"
          distRec={aggregateEntries?.totalYearDistance}
          timeRec={aggregateEntries?.totalYearTime}
          speedRec={aggregateEntries?.avgYearSpeed}
        />
      ) : null}
      {cards}
    </SimpleGrid>
  );
}
