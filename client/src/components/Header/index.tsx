import React from 'react';

export default function Index({ title }: { title: string }) {
  return (
    <h2 className='header'>
      {title}
    </h2>
  );
}
