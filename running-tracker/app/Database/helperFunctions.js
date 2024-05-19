import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase"; // Assuming you have configured Firebase
import { getWeekNumber, getCurrentMonth } from "../utils";

export const fetchAggregate = async (userId) => {
  const aggregateRef = doc(db, "users", userId, "aggregate", "aggregateData");
  try {
    // Get the current data in the aggregate document
    const docSnapshot = await getDoc(aggregateRef);
    let currentData = null;

    if (docSnapshot.exists()) {
      currentData = docSnapshot.data();
    }
    return currentData;
  } catch (error) {
    console.error("Error updating aggregate document:", error);
    return null;
  }
};

export const updateAggregate = async (userId, data) => {
  const aggregateRef = doc(db, "users", userId, "aggregate", "aggregateData");
  let newWeek = false,
    newMonth = false,
    newYear = false;
  try {
    // Get the current data in the aggregate document
    const docSnapshot = await getDoc(aggregateRef);
    let currentData = {};

    if (docSnapshot.exists()) {
      currentData = docSnapshot.data();
    }

    if (currentData?.lastUpdatedWeek) {
      newWeek = currentData?.lastUpdatedWeek != getWeekNumber();
    } else {
      newWeek = true;
    }

    if (currentData?.lastUpdatedMonth) {
      newMonth = currentData?.lastUpdatedMonth != getCurrentMonth();
    } else {
      newMonth = true;
    }

    if (currentData?.lastUpdatedYear) {
      newYear = currentData?.lastUpdatedYear != new Date().getFullYear();
    } else {
      newYear = true;
    }

    // Update the current data by adding the new values
    const updatedData = {};
    if (!newWeek) {
      updatedData.totalWeekDistance =
        currentData.totalWeekDistance + data.totalWeekDistance;
      updatedData.totalWeekTime =
        currentData.totalWeekTime + data.totalWeekTime;
    } else {
      updatedData.totalWeekTime = data.totalWeekTime;
      updatedData.totalWeekDistance = data.totalWeekDistance;
      updatedData.lastUpdatedWeek = getWeekNumber();
    }

    if (!newMonth) {
      updatedData.totalMonthDistance =
        currentData.totalMonthDistance + data.totalMonthDistance;
      updatedData.totalMonthTime =
        currentData.totalMonthTime + data.totalMonthTime;
    } else {
      updatedData.totalMonthTime = data.totalMonthTime;
      updatedData.totalMonthDistance = data.totalMonthDistance;
      updatedData.lastUpdatedMonth = getCurrentMonth();
    }

    if (!newYear) {
      updatedData.totalYearDistance =
        currentData.totalYearDistance + data.totalYearDistance;
      updatedData.totalYearTime =
        currentData.totalYearTime + data.totalYearTime;
    } else {
      updatedData.totalYearTime = data.totalYearTime;
      updatedData.totalYearDistance = data.totalYearDistance;
      updatedData.lastUpdatedYear = new Date().getFullYear();
    }

    // Set the updated data in the aggregate document
    if (docSnapshot.exists()) {
      await updateDoc(aggregateRef, updatedData);
    } else {
      await setDoc(aggregateRef, updatedData);
    }

    console.log("Aggregate document updated successfully");
    return { success: true };
  } catch (error) {
    console.error("Error updating aggregate document:", error);
    return { success: false, error: error.message };
  }
};
