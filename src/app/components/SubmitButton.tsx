'use client'

import { Button } from '@nextui-org/react'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton({ children }: { children: string }) {
  const { pending } = useFormStatus()

  return (
    <div className='flex justify-center p-4'>
      <Button className='max-w-40' color='primary' type="submit" isDisabled={pending} fullWidth>
        {children}
      </Button>
    </div>
  )
}