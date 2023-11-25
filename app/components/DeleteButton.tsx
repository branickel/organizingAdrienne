"use client"

import { useFormStatus } from 'react-dom'

export default function DeleteButton() {
    const { pending } = useFormStatus()
  return (
    <button type='submit' className="w-[10vw] file:border bg-red-500 text-slate-100 rounded-lg p-2">
       {pending ? "Deleting": "Delete"}
        </button>
  )
}
