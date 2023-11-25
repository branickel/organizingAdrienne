"use client"

import { useFormStatus } from 'react-dom'

export default function SaveButton() {
    const { pending } = useFormStatus()

  return (
    <button type="submit" className="w-[10vw] border bg-green-500 text-slate-100 gap-2 rounded-lg p-2">
        {pending ? "Saving" : "Save"}
        </button>
  )
}
