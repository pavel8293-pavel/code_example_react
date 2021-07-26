
import AuthorizationUser from '../models/AuthorizationUser';
import { USER_STORAGE_KEY } from '../constants';
import 'moment/locale/ru';

export const precision = 7;

const getPrettyCoords = (coords: Array<number> | null, index: number) => (coords ? Number(coords[index].toFixed(precision)) : null);

export const getPrettyLatitudeFromCoords = (coords: Array<number> | null) => getPrettyCoords(coords, 0);

export const getPrettyLongitudeFromCoords = (coords: Array<number> | null) => getPrettyCoords(coords, 1);

export const getPrettyGeoValue = (geoValue: number) => getPrettyCoords([geoValue], 0);

export const intersect = (arr1: Array<string>, arr2: Array<string>) => arr1.filter((entry) => arr2.indexOf(entry) !== -1);

export const hasRolesIntersection = (
  arr: Array<string> | undefined,
  currentUser: AuthorizationUser | undefined,
) => {
  if (arr?.length) {
    if (currentUser) {
      return intersect(arr, currentUser.roles).length > 0;
    }
    return false;
  }
  return true;
};

export const StorageService = {
  getUserData() {
    const storedItem = localStorage.getItem(USER_STORAGE_KEY);
    return storedItem ? JSON.parse(storedItem) : null;
  },

  setUserData(userData: AuthorizationUser) {
    const storedItem = JSON.stringify(userData);
    localStorage.setItem(USER_STORAGE_KEY, storedItem);
  },

  deleteUserData() {
    localStorage.removeItem(USER_STORAGE_KEY);
  },
};

export const getImageUrl = (url: string) => `${process.env.REACT_APP_DOMAIN_ADRESS_KEY}${url}`;