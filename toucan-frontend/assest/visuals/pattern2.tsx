import React from 'react';

const Pattern = ({ width = 134, height = 313, style = {} }) => (
    <svg width="720" height="360" viewBox="0 0 720 360" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M180 180V180C279.411 180 360 260.589 360 360V360H180V180Z" fill="#FE5F55"/>
        <path d="M720 -7.89402e-06C620.589 -3.53427e-06 540 80.5887 540 180V180L720 180L720 -7.89402e-06V-7.89402e-06Z" fill="#C9E7F8"/>
        <path d="M540 180V180C540 279.411 459.411 360 360 360V360L360 180L540 180Z" fill="#798BCC"/>
        <path d="M540 180V180C540 279.411 620.589 360 720 360V360L720 180L540 180Z" fill="#3DBEB3"/>
        <path d="M206 90C206 54.6538 234.654 26 270 26V26C305.346 26 334 54.6538 334 90V90C334 125.346 305.346 154 270 154V154C234.654 154 206 125.346 206 90V90Z" fill="#C9E7F8"/>
        <path d="M0 0H180V180H0V0Z" fill="#FFBF01"/>
    </svg>
);

export default Pattern;