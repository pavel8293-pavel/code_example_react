import Country from '../../models/countries/Country';
import { client, processError } from '../http';

const url = '/api/Countries/';

const CountryService = {
  async get() {
    try {
      const response = await client.get<Country[]>(url);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async post(country: Country) {
    try {
      const response = await client.post<Country>(url, country);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async put(country: Country) {
    try {
      const response = await client.put<Country>(url + country.id, country);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async delete(id: number) {
    try {
      const response = await client.delete<Country>(url + id);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },
};

export default CountryService;