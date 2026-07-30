'use client';

import React from 'react';
import { AquaProvider } from '@/context/AquaContext';
import { DeviceFrame } from '@/components/ui/DeviceFrame';
import { AquaRouter } from '@/components/AquaRouter';

export default function Home() {
  return (
    <AquaProvider>
      <DeviceFrame>
        <AquaRouter />
      </DeviceFrame>
    </AquaProvider>
  );
}
