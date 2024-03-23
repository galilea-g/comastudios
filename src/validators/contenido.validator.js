import { z } from "zod";

export const createContenidoValidate = z.object({
    title: z.string({
        required_error: "Title is required",
    }),
    category: z.string({
        required_error: "category is required",
    }),
    tematic: z.string({
        required_error: "tematic is required",
    })
});