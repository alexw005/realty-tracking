'use client'

import { Button } from '@nextui-org/react'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button className='p1' color='primary' type="submit" isDisabled={pending} fullWidth>
      Add
    </Button>
  )
}