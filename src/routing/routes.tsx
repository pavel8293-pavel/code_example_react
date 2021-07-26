import { ComponentType } from 'react';
import Admin from '../pages/admin';
import EditLocationPage from '../pages/editLocation';
import { adminRole, organizerRole } from '../constants';
import Dictionaries from '../pages/admin/dictionaries/Dictionaries';
import AdminGuard from '../guards/AdminGuard';
import AdminOrOrganizerGuard from '../guards/AdminOrOrganizerGuard';

interface RouteValue {
  path: string;
  name: string;
  component: ComponentType;
  rolesAllowed?: string[];
  guards?: any;
}

const Routes: { [key: string]: RouteValue } = {
  Admin: {
    path: '/admin',
    name: 'Администрирование',
    component: Admin,
    rolesAllowed: [adminRole, organizerRole],
    guards: AdminOrOrganizerGuard,
  },
  EditLocation: {
    path: '/admin/location/:id',
    name: 'Редактирование локации',
    component: EditLocationPage,
  },
  AdminDictionaries: {
    path: '/admin/dictionaries',
    name: 'Cправочники',
    component: Dictionaries,
    rolesAllowed: [adminRole],
    guards: AdminGuard,
  },
};

export default Routes;