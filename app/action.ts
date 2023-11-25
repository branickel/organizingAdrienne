"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { currentUser } from "@clerk/nextjs";

export async function create(prevState: any, formData: FormData) {
  "use server";

  try {
    const input = formData.get("input") as string;
    const user = await currentUser();
    
    await prisma.todo.create({
      data: {
        input: input,
        userId: user?.id as string

      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    return "Failed to create the task,"
  }
}

export async function edit(formData: FormData) {
  "use server";

  const input = formData.get("input") as string;
  const inputId = formData.get("inputId") as string;
  const user = await currentUser();

  await prisma.todo.update({
    where: {
      id: inputId,
      userId: user?.id as string
    },
    data: {
      input: input,
    },
  });
  revalidatePath("/dashboard");
}

export async function deleteItem(formData: FormData) {
  "use server";

  const inputId = formData.get("inputId") as string;
  const user = await currentUser();

  await prisma.todo.delete({
    where: {
      id: inputId,
      userId: user?.id as string
    },
  });
  revalidatePath("/dashboard");
}
