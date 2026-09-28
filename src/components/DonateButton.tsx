'use client';

import React from 'react';
import Link from 'next/link';

interface DonateButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function DonateButton({ className, children }: DonateButtonProps) {
  return (
    <Link 
      href="/donate"
      className={className || "btn btn-primary px-5 py-3 rounded-pill fw-bold shadow"}
    >
      {children || 'Donate Now'}
    </Link>
  );
}
