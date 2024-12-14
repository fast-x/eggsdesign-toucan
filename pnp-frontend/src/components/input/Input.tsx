import React from 'react';
import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '../styles';
import LoadingIndicator from '../LoadingIndicator';
import { Heading3 } from '../Typography';
import chevronIcon from '../../assets/icon_chevron.svg';

const inputBase = css`
  padding: 14px;
  font-size: 20px;
  appearance: none;
  border: 1px solid ${colors.neutral3};

  &:hover {
    border-color: ${colors.neutral2};
  }
`;

export const Input = styled.input`
  ${inputBase}
  ${({ fullwidth }: { fullwidth?: boolean }) => fullwidth && 'width: 100%;'}
`;

export const Textarea = styled.textarea`
  ${inputBase}
`;

export const FieldSection = styled.section`
  background: ${colors.backgroundColor1};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 1rem;

  & & {
    box-shadow: none;
    border-radius: 0;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0 0 0 16px;
  }

  & ${Heading3} {
    text-transform: uppercase;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const PreviewImage = styled.img`
  max-height: 100px;
  border-radius: 4px;
  width: auto;
  display: inline-block;
`;

const StyledSearch = styled.input.attrs((props) => ({
  type: 'search',
  onchange: props.onChange,
  value: props.value,
  name: 'q',
}))`
  ${inputBase};
  border-radius: 9999px;
  width: 100%;
  max-width: 600px;
`;

export const CheckLabel = styled.label`
  border: 1px solid ${colors.neutral3};
  padding: 0.8em 0.4em;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${transparentize(0.8, colors.neutral3)};
  }

  &.checked {
    background-color: ${transparentize(0.6, colors.neutral3)};
  }
`;

export const SelectInput = styled.select`
  ${inputBase}
  ${({ fullwidth }: { fullwidth?: boolean }) => fullwidth && 'width: 100%;'}
  cursor: pointer;
`;

const SelectWrapper = styled.div`
  position: relative;

  &:after {
    color: ${colors.neutral2};
    content: url(${chevronIcon});
    display: flex;
    position: absolute;
    pointer-events: none;
    right: 12px;
    top: 14px;
  }
`;

export const Select = (props: any) => {
  return (
    <SelectWrapper>
      <SelectInput {...props} />
    </SelectWrapper>
  );
};

const StyledLoading = styled(LoadingIndicator)`
  width: 2em;
  height: 2em;
  background-color: #fff;
  position: absolute;
  right: 0.6em;
  top: 50%;
  transform: translateY(-50%);
  margin-top: -0.25em;
  & > svg {
    width: 2em;
    height: 2em;
  }
`;

interface SearchInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  loading: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({ label, value, onChange, placeholder, loading }) => {
  return (
    <Label>
      {label && label}
      <StyledSearch
        value={value && value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={placeholder}
      />
      {loading && <StyledLoading />}
    </Label>
  );
};
