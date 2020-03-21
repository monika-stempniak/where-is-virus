import axios from "axios";
import { GOOGLE_MAPS } from "shared/constants";

export const getGeocodingData = async params => {
  try {
    const response = await axios.get(
      `${GOOGLE_MAPS.GEOCODING_API_URL}${params}&key=${GOOGLE_MAPS.GEOCODING_API_KEY}`
    );
    return response.data;
  } catch (error) {
    alert(error);
  }
};
