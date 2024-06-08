import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { toMatchDiffSnapshot } from 'snapshot-diff';

import { CustomInputComponent } from '../index';

expect.extend({ toMatchDiffSnapshot });

const setupEmail = () => {
  const component = render(
    <CustomInputComponent
      name="email"
      type="email"
      label="Correo electrónico"
      ariaLabelledby="email-input"
    />
  );
  const label = component.getByText('Correo electrónico');
  const input = component.getByLabelText('email-input');
  return {
    label,
    input,
    ...component,
  };
};

afterEach(cleanup);

test('should render label and input', () => {
  const { label, input } = setupEmail();
  expect(label).toBeTruthy();
  expect(input).toBeTruthy();
});

test('should not be valid', () => {
  const { input } = setupEmail();
  expect(input.value).toBe('');
  fireEvent.change(input, { target: { value: 'emailnotvalid' } });
  expect(input.validity.valid).toBeFalsy();
});

test('should be valid', () => {
  const { input } = setupEmail();
  expect(input.value).toBe('');
  fireEvent.change(input, { target: { value: 'email@company.com' } });
  expect(input.validity.valid).toBeTruthy();
});

test('should change the icon when I click on see password', () => {
  const { getByTestId, asFragment } = render(
    <CustomInputComponent
      name="password"
      type="password"
      label="Contraseña"
      ariaLabelledby="password-input"
    />
  );
  const firstRender = asFragment();
  const button = getByTestId('toogleIconPass');

  fireEvent.click(button);
  expect(firstRender).toMatchDiffSnapshot(asFragment());
});
