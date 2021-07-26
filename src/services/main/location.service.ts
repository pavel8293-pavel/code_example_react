import LocationData from '../../models/locations/LocationData';
import Location from '../../models/locations/Location';
import { client, processError } from '../http';

const url = '/api/Locations/';

const LocationService = {
  async get() {
    try {
      const response = await client.get<LocationData[]>(url);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async getById(id: number) {
    try {
      const response = await client.get<Location>(url + id);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async post(location: Location) {
    try {
      const response = await client.post<Location>(url, location);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async put(location: Location) {
    try {
      const response = await client.put<Location>(url + location.id, location);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async delete(id: number) {
    try {
      const response = await client.delete<Location>(url + id);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },
};

export default LocationService;