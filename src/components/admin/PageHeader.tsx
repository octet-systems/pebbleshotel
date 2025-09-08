import React from 'react';

export const PageHeader = ({ title }: { title: string }) => {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        </div>
      </div>
    </div>
  );
};