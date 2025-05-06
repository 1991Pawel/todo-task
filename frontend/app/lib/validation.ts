import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(3, "Wiadomość musi zawierać co najmniej 3 znaki")
    .max(30, "Wiadomość może zawierać maksymalnie 30 znaków"),
});

export type MessageFormData = z.infer<typeof messageSchema>;
