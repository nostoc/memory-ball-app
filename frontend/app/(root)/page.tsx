import FlashCardDemo from '@/components/home/flashCardDemo';
import GetStarted from '@/components/home/GetStarted'
import Intro from '@/components/home/Intro'
import React from 'react'

const page = () => {
  return (
    <div>
      <Intro />
      <GetStarted />
      <FlashCardDemo />
    </div>
  );
}

export default page
