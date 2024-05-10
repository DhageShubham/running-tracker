import { startOfMonth, getDate, getDay, format } from "date-fns";

export const getWeekNumber = () => {
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const firstDayOfWeek = getDay(firstDayOfMonth);
  const currentDay = getDate(currentDate);
  const weekNumberOfFirstWeek = Math.ceil((firstDayOfWeek + currentDay) / 7);

  return 3;
};

export const getCurrentMonth = () => {
  const currentDate = new Date();
  const currentMonth = format(currentDate, "MMMM");
  return currentMonth;
};
