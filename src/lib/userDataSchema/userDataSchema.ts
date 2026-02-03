import * as zod from "zod"

export const updateUserDataSchema = zod.object({
    name: zod.string().nonempty("Name is required").min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters").trim(),
    email: zod.email({error:"Please enter a valid email address"}),
    phone:zod.string().nonempty("Phone is required").regex(/^01[1250][0-9]{8}$/ , "Phone number must be 11 digits")

})

export type updateUserDataSchemaType = zod.infer<typeof updateUserDataSchema>


export const updateUserDataPasswordSchema = zod.object({
    currentPassword:zod.string().nonempty("Password is required").min(3, "password must be at least 3 characters").max(20, "password must be at most 20 characters"),
    password: zod.string().nonempty("password is required").min(3, "password must be at least 3 characters").max(20, "password must be at most 20 characters"),
    rePassword:zod.string().nonempty("rePassword is required"),

}).refine( (data) => data.rePassword === data.password , { path: ["rePassword"] , error : "Password confirmation does not match"})

export type updateUserDataPasswordSchemaType = zod.infer<typeof updateUserDataPasswordSchema>