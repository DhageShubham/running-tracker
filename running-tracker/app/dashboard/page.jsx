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

import ShowCard from "../components/ShowCard.jsx";
export default function Home() {
  const [entries, setEntries] = useState([]);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const currentDate = new Date();
  const start = startOfWeek(currentDate);
  const end = endOfWeek(currentDate);

  const startDateString = format(start, "dd/MM/yyyy");
  const endDateString = format(end, "dd/MM/yyyy");
  let totalWeekDistance = entries.reduce((a, b) => a + +b.distance, 0);
  let totalWeekTime = entries.reduce((a, b) => a + +b.time, 0);
  let averageSpeed = totalWeekDistance / totalWeekTime;
  const currentMonthName = new Date().toLocaleString("en", { month: "long" });

  /*TODO: do calculations for year card */

  const [docs, loading, error] = useCollection(
    query(
      collection(db, "users", "shubham_dhage", "running_data"),
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
      templateColumns="repeat(auto-fill, minmax(200px, 250px))"
      justifyContent="center"
    >
      <InputCard />
      <ShowCard
        key="This Week"
        weekday="This Week"
        cardColor="#CAD8F3"
        inputColor="#B4C9EF"
        planetURL="https://media.tenor.com/RtwD0nqrD5wAAAAj/jimmy-spinner.gif"
        distRec={totalWeekDistance}
        timeRec={totalWeekTime}
        speedRec={averageSpeed}
      />
      <ShowCard
        key={currentMonthName}
        weekday={currentMonthName}
        cardColor="#FEE7D6"
        inputColor="#FDDDC5"
        planetURL="https://media.tenor.com/RtwD0nqrD5wAAAAj/jimmy-spinner.gif"
        distRec={totalWeekDistance}
        timeRec={totalWeekTime}
        speedRec={averageSpeed}
      />
      <ShowCard
        key="2024"
        weekday="2024"
        cardColor="#B2F7EF"
        inputColor="#CDFAF5"
        planetURL="https://media.tenor.com/x1eW6Z7pMnIAAAAj/animated-man-running.gif"
        distRec={totalWeekDistance}
        timeRec={totalWeekTime}
        speedRec={averageSpeed}
      />
      {cards}
    </SimpleGrid>
  );
}
