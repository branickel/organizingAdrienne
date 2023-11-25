"use client"
import { useRef } from 'react'
import { create } from '../action'
import SubmitButton from './SubmitButton'
import { useFormState } from 'react-dom'

export default function FormElements() {
    const formRef = useRef<HTMLFormElement>(null)
    const [ state, formAction] = useFormState(create, null)

    return (
        <form className='flex min-w-[70vw]  max-w-[100vw] flex-col' action={async (formData: FormData) => {
            formAction(formData)
            formRef.current?.reset()
        }} ref={formRef}>
            <input
                type='text'
                name='input'
                placeholder="Whats on your mind?"
                className='border border-slate-500 p-2 text-center'
            />
            <SubmitButton />
            <p className='text-red-500 text-bold'>{state as string}</p>
        </form>
    )
}
