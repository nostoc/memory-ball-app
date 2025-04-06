
import PrivacyPolicy from '@/components/privacyPolicy'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata ={
  title: 'Privacy Policy',
}

const page = () => {
  return (
      <div>
          <PrivacyPolicy/>
      
    </div>
  )
}

export default page
