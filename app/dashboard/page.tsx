import React from 'react'
import prisma from '../db'
import {deleteItem, edit } from '../action'
import SaveButton from '../components/SaveButton'
import DeleteButton from '../components/DeleteButton'
import FormElements from '../components/Form'
import { currentUser } from "@clerk/nextjs";

async function getData() {
    const user = await currentUser();
    const data = await prisma.todo.findMany({
        select: {
            input: true,
            id: true
        },
        where: {
            userId: user?.id as string
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return data
}

export default async function page() {
    const data = await getData()

    return (
        <>
        <h1 className='text-4xl flex justify-center mt-20'>Your Reminders</h1>
        <div className="flex justify-center mt-20">

            <div className="border rounded-lg shadow-xl p-10">
                <FormElements />

                <div className="mt-5 flex flex-col gap-y-2 ">
                    {data.map((todo: any) => (
                        <div key={todo.id} className='w-full h-full flex items-center'>
                            <form className="flex" action={edit}>
                                <input type='hidden' name="inputId" value={todo.id} />
                                <input
                                    type="text"
                                    name="input"
                                    defaultValue={todo.input}
                                    className="w-[50vw] border p-1"
                                />
                                <SaveButton />

                            </form>
                            <form action={deleteItem}>
                                <input type='hidden' name="inputId" value={todo.id} />
                                <DeleteButton />
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}