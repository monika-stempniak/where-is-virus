import API from "api";

export const getAllEvents = async () => {
  try {
    const response = await API.get("events");
    return response.data;
  } catch (error) {
    alert(error);
  }
};

export const updateEvents = async params => {
  try {
    const response = await API.post("events", { params });
    return response;
  } catch (error) {
    alert(error);
  }
};
