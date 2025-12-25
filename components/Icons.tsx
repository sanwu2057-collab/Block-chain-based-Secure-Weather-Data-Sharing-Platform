
import React from 'react';

export const ThermometerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-3 0V3.375c0-.621-.504-1.125-1.125-1.125H10.5m0-2.25h.008v.008h-.008v-.008zM10.5 18.75v-5.25m0 0h3m-3 0h-3m3 5.25v3.375c0 .621.504 1.125 1.125 1.125h.75c.621 0 1.125-.504 1.125-1.125V18.75m-3-5.25h.008v.008h-.008v-.008z" />
  </svg>
);

export const WindIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
  </svg>
);

export const HumidityIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.422 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.056.133.11.264.164.395.16.352.32.701.48.1046.16.345.32.686.48.1022.16.337.32.67.48.997.16.327.32.65.48.966.16.317.32.63.48.935.16.305.32.606.48.902.16.296.32.587.48.872.16.284.32.564.48.84.16.276.32.549.48.818.16.269.32.533.48.792.16.26.32.514.48.762.16.248.32.49.48.728.16.237.32.47.48.697.16.228.32.45.48.668.16.217.32.43.48.638.16.208.32.412.48.612.16.2.32.396.48.584.16.188.32.372.48.55.16.179.32.353.48.52.16.168.32.332.48.492.16.16.32.317.48.468.16.15.32.297.48.44.16.144.32.284.48.42.16.137.32.27.48.4.16.13.32.255.48.375.16.12.32.234.48.345.16.11.32.216.48.315.16.1.32.193.48.283.16.09.32.175.48.255.16.08.32.155.48.225.16.07.32.135.48.195.16.06.32.115.48.165.16.05.32.095.48.135.16.04.32.075.48.105.16.03.32.055.48.075.16.02.32.035.48.045.16.01.32.015.48.015h.225a.75.75 0 00.75-.75v-1.125c0-.621-.504-1.125-1.125-1.125h-9.75l-1.556-3.113c-.351-.702-.643-1.428-.89-2.182-.251-.758-.398-1.548-.398-2.356 0-1.84.729-3.534 2.022-4.758a5.152 5.152 0 014.288-1.733 4.974 4.974 0 013.313 1.332l.786.842a.75.75 0 001.06 0l.786-.842a4.974 4.974 0 013.313-1.332 5.152 5.152 0 014.288 1.733c1.293 1.224 2.022 2.918 2.022 4.758 0 .808-.147 1.598-.398 2.356-.246.754-.538 1.48-.89 2.182l-1.556 3.113h-9.75a1.125 1.125 0 01-1.125 1.125Z" />
    </svg>
);

export const PressureIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
);

export const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-5.05-2.268 3.75 3.75 0 0 0-6.816-1.032A4.5 4.5 0 0 0 2.25 15Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3h-6" />
    </svg>
);

export const VerifiedIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);
