import { CheckIcon } from '@radix-ui/react-icons';
import React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => void;
};

const Checkbox: React.FC<Props> = ({ label, checked, id, onChange }) => {
  return (
    <>
      <CheckboxLabel htmlFor={id}>
        <CheckboxButton role="checkbox" aria-checked={checked} checked={checked} onClick={onChange}>
          {checked && <CheckIcon color="White" height={20} width={20} />}
        </CheckboxButton>
        {label}
      </CheckboxLabel>
      <CheckboxInput aria-hidden="true" type="checkbox" id={id} name={id} onChange={onChange} checked={checked} />
    </>
  );
};

export default Checkbox;

const CheckboxButton = styled.button<{ checked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 20px;
  height: 20px;
  border: solid 2.5px #bcc6cc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  margin-right: 15px;

  ${(props) =>
    props.checked === true &&
    css`
      background-color: #bcc6cc;
    `}
`;

const CheckboxInput = styled.input`
  display: none;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 85%;
`;
