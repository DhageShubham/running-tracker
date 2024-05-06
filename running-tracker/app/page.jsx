"use client";
import { SimpleGrid } from "@chakra-ui/react";

import { useState } from "react";
import InputCard from "./components/InputCard";
import { weekdays } from "./constants/weekdays.js";
import { entries } from "./constants/entries.js";

import ShowCard from "./components/ShowCard";
export default function Home() {
  const [endDate, setEndDate] = useState(new Date());

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const showDaysCards = weekdays.filter((day) =>
    entries.hasOwnProperty(day.day)
  );
  const TodayEntry = weekdays.filter((day) => day.day == today);
  const cards = showDaysCards.map((day) => (
    <ShowCard
      key={day.day}
      weekday={day.day}
      cardColor={day.color}
      inputColor={day.inputColor}
      planetURL={day.planetURL}
      distRec={entries[day.day].distance}
      timeRec={entries[day.day].time}
      speedRec={entries[day.day].speed}
    />
  ));
  return (
    <SimpleGrid
      spacing={2}
      templateColumns="repeat(auto-fill, minmax(200px, 250px))"
    >
      <InputCard />
      {cards}
    </SimpleGrid>
  );
}
