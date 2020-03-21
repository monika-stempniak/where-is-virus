import API from "api";

export const getAllEvents = async () => {
  try {
    const response = await API.get("events");
    return response.data;
  } catch (error) {
    alert(error);
  }
};

export const confirmEvent = async params => {
  try {
    const response = await API.post("events/confirm", { ...params });
    return response;
  } catch (error) {
    alert(error);
  }
};

export const deleteEvent = async id => {
  try {
    const response = await API.delete(`events/${id}`);
    return response;
  } catch (error) {
    alert(error);
  }
};

export const addEvent = async params => {
  try {
    const response = await API.put("events", { ...params });
    return response;
  } catch (error) {
    alert(error);
  }
};
