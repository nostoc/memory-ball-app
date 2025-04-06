
import GuidePage from '@/components/guide/guidePage'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata ={
  title: 'Guide',
  description: 'Memoryball Guide'
}

const page = () => {
  return (
      <div>
          <GuidePage/>
      
    </div>
  )
}

export default page
