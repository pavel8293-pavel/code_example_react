import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import 'jest-canvas-mock';
import {
  render, fireEvent, cleanup, screen, waitFor
} from '@testing-library/react';
import Location from './Locations';
import LocationService from '../../services/main/location.service';
import mock from './mock';
import AreatroutTable from '../areatrout-table/areatrout-table';
import LocationData from '../../models/LocationData';
import CountryCell from './table/CountryCell';
import CoordinateCell from './table/CoordinateCell';

const columns = [
  {
    displayName: 'Название локации',
    fieldName: 'name',
  },
  {
    displayName: 'Описание',
    fieldName: 'description',
    render: ({ description }: LocationData) => (
      <div>{description}</div>
    ),
  },
  {
    displayName: 'Страна',
    fieldName: 'countryId',
    render: (data: LocationData) => <CountryCell data={data} />,
  },
  {
    displayName: 'Координаты',
    fieldName: 'longitude',
    render: (data: LocationData) => <CoordinateCell data={data} />,
  },
];

afterEach(cleanup);

test('add-button should open a modal window', async () => {
  jest.spyOn(LocationService, 'get').mockResolvedValue(mock);
  render(
    <BrowserRouter>
      <Location />
    </BrowserRouter>
  );
  await waitFor(() => {
    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);
    expect(screen.getByText('Добавить локацию')).toBeVisible();
  });
});

test('get location request works', async () => {
  const mockRequest = jest.spyOn(LocationService, 'get').mockResolvedValue(mock);
  render(
    <BrowserRouter>
      <Location />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(mockRequest).toHaveBeenCalled();
  });
});

test('mock data is rendered in the table', () => {
  render(<AreatroutTable columns={columns} rows={mock} />);
  mock.forEach((data) => expect(screen.getByText(data.name)).toBeInTheDocument());
});