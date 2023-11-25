"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
    const { pending } = useFormStatus()
    
  return (
    <button className="mt-5 rounded-lg bg-blue-400 text-slate-100 p-2" type='submit'>
    {pending ? "Submitting..." : "Submit"}
</button>
  )
}
