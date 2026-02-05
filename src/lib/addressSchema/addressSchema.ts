import * as zod from "zod"

export const egyptCities = [
  "Cairo",
  "Giza",
  "Alexandria",
  "Dakahlia",
  "Sharqia",
  "Gharbia",
  "Monufia",
  "Qalyubia",
  "Beheira",
  "Kafr El Sheikh",
  "Damietta",
  "Port Said",
  "Ismailia",
  "Suez",
  "Fayoum",
  "Beni Suef",
  "Minya",
  "Asyut",
  "Sohag",
  "Qena",
  "Luxor",
  "Aswan",
  "Red Sea",
  "New Valley",
  "Matrouh",
  "North Sinai",
  "South Sinai",
];

export const addressSchema = zod.object({
    name: zod.string().nonempty("Name is required").min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters").trim(),
    details: zod.string().min(5, "Details must be at least 5 characters").trim(),
    phone:zod.string().nonempty("Phone is required").regex(/^01[1250][0-9]{8}$/ , "Phone number must be 11 digits"),
    city:zod.enum(egyptCities as [string, ...string[]])

})

export type addressSchemaType = zod.infer<typeof addressSchema>