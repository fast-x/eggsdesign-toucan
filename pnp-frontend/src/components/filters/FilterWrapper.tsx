import styled, { css } from 'styled-components';
import { colors } from '../styles';

const FilterWrapper = styled.label<{ isSearchFilter?: boolean }>`
  display: block;
  margin: 1em 0;
  width: 100%;
  position: relative;
  ${({ isSearchFilter = false }) =>
    isSearchFilter
      ? css`
          &:after {
            content: '';
            height: 3rem;
            width: 2.3rem;
            pointer-events: none;
            position: absolute;
            bottom: 0;
            right: 0;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTguOTE0MjkgMEMxMS4yNzg1IDAgMTMuNTQ1OSAwLjkzOTE4MSAxNS4yMTc2IDIuNjEwOTNDMTYuODg5NCA0LjI4MjY5IDE3LjgyODYgNi41NTAwNyAxNy44Mjg2IDguOTE0MjlDMTcuODI4NiAxMS4xMjIzIDE3LjAxOTQgMTMuMTUyIDE1LjY4OTEgMTQuNzE1NEwxNi4wNTk0IDE1LjA4NTdIMTcuMTQyOUwyNCAyMS45NDI5TDIxLjk0MjkgMjRMMTUuMDg1NyAxNy4xNDI5VjE2LjA1OTRMMTQuNzE1NCAxNS42ODkxQzEzLjA5NzkgMTcuMDY5OSAxMS4wNDEgMTcuODI4NCA4LjkxNDI5IDE3LjgyODZDNi41NTAwNyAxNy44Mjg2IDQuMjgyNjkgMTYuODg5NCAyLjYxMDkzIDE1LjIxNzZDMC45MzkxODEgMTMuNTQ1OSAwIDExLjI3ODUgMCA4LjkxNDI5QzAgNi41NTAwNyAwLjkzOTE4MSA0LjI4MjY5IDIuNjEwOTMgMi42MTA5M0M0LjI4MjY5IDAuOTM5MTgxIDYuNTUwMDcgMCA4LjkxNDI5IDBaTTguOTE0MjkgMi43NDI4NkM1LjQ4NTcxIDIuNzQyODYgMi43NDI4NiA1LjQ4NTcxIDIuNzQyODYgOC45MTQyOUMyLjc0Mjg2IDEyLjM0MjkgNS40ODU3MSAxNS4wODU3IDguOTE0MjkgMTUuMDg1N0MxMi4zNDI5IDE1LjA4NTcgMTUuMDg1NyAxMi4zNDI5IDE1LjA4NTcgOC45MTQyOUMxNS4wODU3IDUuNDg1NzEgMTIuMzQyOSAyLjc0Mjg2IDguOTE0MjkgMi43NDI4NloiIGZpbGw9IiMwMDAwMDAiLz4KPC9zdmc+');
            background-repeat: no-repeat;
            background-size: 1em;
            background-position: 0 center;
          }

          .search-input:hover {
            border-color: hsl(0, 0%, 70%);
          }
        `
      : null}

  .label-text {
    display: block;
    text-transform: uppercase;
    margin-bottom: 4px;
    font-weight: 500;
    font-size: 0.75em;
  }

  .search-input {
    appearance: none;
    border: 1px solid ${colors.primary.white};
    border-radius: 9999px;
    height: 3em;
    text-indent: 14px;
    font-family: 'Haffer', sans-serif;
    font-size: 1em;
    box-sizing: border-box;
    width: 100%;

    &::placeholder {
      color: ${colors.primary.black};
    }
`;

export default FilterWrapper;
