"use server";

import { redirect } from "next/navigation";

export const searchAction = async (formData: FormData) => {
    const searchQuery = formData.get('search')?.toString() || '';
    if(typeof searchQuery !== "string" || searchQuery.trim() === "")
    {
        redirect("/articles");
    }
    redirect(`/articles?search=${searchQuery}&page=1`);
};
