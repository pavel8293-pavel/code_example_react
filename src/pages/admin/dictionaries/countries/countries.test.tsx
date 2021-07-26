import React from 'react';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import {
  render, fireEvent, cleanup, screen, waitFor
} from '@testing-library/react';
import Countries from './countries';
import CountryService from '../../services/main/country.service';
import mock from './mock';
import AreatroutTable from '../areatrout-table/areatrout-table';

const columns = [
  {
    displayName: 'Название страны',
    fieldName: 'name',
  },
];

afterEach(cleanup);

test('add-button should open a modal window', async () => {
  jest.spyOn(CountryService, 'get').mockResolvedValue(mock);
  render(<Countries />);
  await waitFor(() => {
    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);
    expect(screen.getByText('Добавить страну')).toBeVisible();
  });
});

test('get countries request works', async () => {
  const mockRequest = jest.spyOn(CountryService, 'get').mockResolvedValue(mock);
  render(<Countries />);
  await waitFor(() => {
    expect(mockRequest).toHaveBeenCalled();
  });
});

test('mock data is rendered in the table', () => {
  render(<AreatroutTable columns={columns} rows={mock} />);
  mock.forEach((data) => expect(screen.getByText(data.name)).toBeInTheDocument());
});