/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Footer from '../Footer';

afterEach(cleanup);

it('has link for MET on twitter', () => {
  const { getByTestId } = render(<Footer />);
  expect(getByTestId('twitter-button').getAttribute('href')).toEqual(
    'https://twitter.com/Meteorologene',
  );
});
