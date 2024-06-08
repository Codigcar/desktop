import { FC, ReactNode } from 'react';

interface IProps {
  children: any;
  condition: boolean | undefined;
}

export const RenderIf: FC<IProps> = ({ children, condition }) => {
  return condition ? children : null;
};
