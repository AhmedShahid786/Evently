//? This is a server action
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

//? This function receives event obj from front-end and makes a POST request to add a new event to db
export const addEvent = async (eventObj) => {
  const url = `${process.env.BASE_URL}/api/events`;

  try {
    const addedEvent = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventObj),
    });

    if (addedEvent.ok) {
      //* If the request is successful, refresh the page
      console.log("Event added successfully");
      revalidatePath("/admin/events");
    } else {
      //* If the request fails, log an error message to the console
      console.log("Error in adding event to db");
    }
  } catch (err) {
    console.log("Failed to add event to db :", err.message);
  }
};

//? This function fetches all events from db and returns them
export const getEvents = async (category) => {
  let url;
  if (category) {
    url = `${process.env.BASE_URL}/api/events?category=${category}`;
  } else {
    url = `${process.env.BASE_URL}/api/events`;
  }

  try {
    let events = await fetch(url);
    events = await events.json();
    console.log("Events fetched from db");
    return events;
  } catch (err) {
    console.log("Failed to fetch events from db :", err.message);
  }
};

//? This function fetches a single event from db and returns it
export const getSingleEvent = async (eventId) => {
  let url = `${process.env.BASE_URL}/api/events/${eventId}`;

  try {
    let event = await fetch(url);
    if (event.ok) {
      event = await event.json();
      console.log("Single event fetched from db");
      return event;
    } else {
      redirect("/not-found");
    }
  } catch (err) {
    console.log("Failed to fetch single event from db =>", err.message);
  }
};

export const registerForEvent = async (eventId, userId) => {
  let url = `${process.env.BASE_URL}/api/events/${eventId}/going`;
  const register = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });

  if (register.ok) {
    revalidatePath(`/events/${eventId}`);
  } else {
    redirect("/not-found");
  }
};
