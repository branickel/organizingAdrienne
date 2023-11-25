import { revalidatePath } from "next/cache";
import prisma from "../db";

async function getData() {
    const data = await prisma.todo.findMany({
        select: {
            input: true,
            id: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return data
}

export default async function Dashboard() {

    const data = await getData()

    async function create(formData: FormData) {
        "use server"

        const input = formData.get('input') as string;

        await prisma.todo.create({
            data: {
                input: input
            }
        })
        revalidatePath('/dashboard')
    }

    async function edit(formData: FormData) {
        "use server"

        const input = formData.get('input') as string
        const inputId = formData.get('inputId') as string

        await prisma.todo.update({
            where: {
                id: inputId,
            },
            data: {
                input: input,
            }
         })
         revalidatePath('/dashboard')
    }

    async function deleteItem(formData: FormData) {
        "use server"

        const inputId = formData.get('inputId') as string

        await prisma.todo.delete({
            where: {
                id: inputId,
            }
        })
        revalidatePath('/dashboard')
    }
    
    return (
        <div className="flex justify-center mt-20">
            <div className="border rounded-lg shadow-xl p-10">
                <form className='flex min-w-[70vw]  max-w-[100vw] flex-col' action={create}>
                    <input
                        type='text'
                        name='input'
                        placeholder="Whats on your mind?"
                        className='border border-slate-500 p-2 text-center'
                    />
                    <button className="mt-5 rounded-lg bg-blue-400 text-slate-100 p-2" type='submit'>Submit</button>
                </form>
                <div className="mt-5 flex flex-col gap-y-2 ">
                    {data.map((todo: any) => (

                        <form key={todo.id} className="flex" action={edit}>
                            <input type='hidden' name="inputId" value={todo.id}/>
                            <input
                                type="text"
                                name="input"
                                defaultValue={todo.input}
                                className="w-[50vw] border p-1"
                            />
                            <button type="submit" className="w-[10vw] border bg-green-500 text-slate-100 gap-2 rounded-lg p-2">Save</button>
                            <button formAction={deleteItem} className="w-[10vw] file:border bg-red-500 text-slate-100 rounded-lg p-2">Delete</button>
                        </form>
                    ))}
                </div>
            </div>
        </div>
    )
}