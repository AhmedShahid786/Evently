//? This is a server action
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { uploadImage } from "./upload";

//? This function receives event-form data from front-end and makes a POST request to add a new event to db
export const addEventToDb = async (formData) => {
  const url = `${process.env.BASE_URL}/api/events`;

  const thumbnailUrl = await uploadImage(formData);

  const eventObj = {
    title: formData.get("title"),
    description: formData.get("description"),
    thumbnail: thumbnailUrl,
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    lat: Number(formData.get("lat")),
    long: Number(formData.get("long")),
    address: formData.get("address"),
    category: formData.get("category"),
    createdBy: formData.get("createdBy"),
  };

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

//? This function fetches all events or events related to a category from db and returns them in response
export const getEvents = async (category) => {
  let url;
  if (category) {
    url = `${process.env.BASE_URL}/api/events?category=${category}`;
  } else {
    url = `${process.env.BASE_URL}/api/events`;
  }

  try {
    let events = await fetch(url, { cache: "no-cache" });
    events = await events.json();
    console.log("Events fetched from db");
    return events;
  } catch (err) {
    console.log("Failed to fetch events from db :", err.message);
  }
};

//? This function receives eventId as parameter, fetches a single event against that eventId from db and returns it in repsonse
export const getSingleEvent = async (eventId) => {
  let url = `${process.env.BASE_URL}/api/events/${eventId}`;

  try {
    let event = await fetch(url, { cache: "no-store" });
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

//? This function recieves eventId and userId as parameter and registers the user against that userId in event attendees
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

//? This event receives eventId as parameter, deletes the event against that eventId and returns the deleted event in response
export const deleteEventFromDb = async (eventId) => {
  let url = `${process.env.BASE_URL}/api/events/${eventId}`;

  try {
    let deletedEvent = await fetch(url, { method: "DELETE" });
    deletedEvent = await deletedEvent.json();

    if (deletedEvent.event) {
      return { success: true, event: deletedEvent.event };
    } else {
      return { success: false, err: deletedEvent.err };
    }
  } catch (err) {
    return { success: false, err: "Oops, something went wrong" };
  }
};

//? This function receives event-form data from front-end and makes a PUT request to update the event in db
export const updateEventInDb = async (formData, eventId) => {
  const url = `${process.env.BASE_URL}/api/events/${eventId}`;
  // console.log("formData ===========>>>>>>>>>>", formData);
  try {
    const thumbnailUrl = await uploadImage(formData);

    const eventObj = {
      title: formData.get("title"),
      description: formData.get("description"),
      thumbnail: thumbnailUrl,
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      lat: Number(formData.get("lat")),
      long: Number(formData.get("long")),
      address: formData.get("address"),
      category: formData.get("category"),
    };

    const updatedEventRes = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventObj),
    });

    if (updatedEventRes.event) {
      revalidatePath(`${process.env.BASE_URL}/admin/events/${eventId}`);
      return { success: true, event: updatedEventRes.event };
    } else {
      console.log(updateEventInDb.err);
      return { success: false, err: updatedEventRes.err };
    }
  } catch (err) {
    console.log("caught err ================>>>>>>>>>>>>>>>>>", err);
    return { success: false, err: "Oops, something went wrong" };
  }
};
