import { useState, useEffect } from 'react';

export function useDetectDevice() {
    const [isMobile, setDevice] = useState(false);

    useEffect(() => {
        const { userAgent } = navigator;
        setDevice(userAgent.includes('Mobi'));
    });

    return isMobile;
}
