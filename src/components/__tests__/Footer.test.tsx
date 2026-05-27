/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Footer from '../main/Footer';

afterEach(cleanup);

it('has link for MET on instagram', () => {
  const { getByLabelText } = render(<Footer />);
  expect(getByLabelText('MET på Instagram').getAttribute('href')).toEqual(
    'https://www.instagram.com/yrbilder/',
  );
});
