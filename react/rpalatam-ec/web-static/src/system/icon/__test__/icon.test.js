import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Icon from '../icon';

afterEach(cleanup);

test('<Icon />', () => {
  const { getByLabelText } = render(<Icon type="ios-add-circle" />);
  const svg = getByLabelText('ios-add-circle');
  expect(svg.className).toBe('is-icon');
});
