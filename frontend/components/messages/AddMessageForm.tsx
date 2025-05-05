"use client";

import {
  useAddMessageMutation,
  useGetMessagesQuery,
} from "@features/messages/messagesApi";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema, MessageFormData } from "@lib/validation";
import { useToast } from "@hooks/use-toast";
export default function AddMessageForm() {
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const { refetch } = useGetMessagesQuery(undefined);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: "" },
  });

  const onSubmit = async (data: MessageFormData) => {
    try {
      await addMessage(data.content).unwrap();
      reset();
      refetch();

      toast({
        title: "Wiadomość dodana",
        description: "Twoja wiadomość została pomyślnie zapisana.",
      });
    } catch (err) {
      console.error("Failed to send message", err);
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Nie udało się dodać wiadomości.",
      });
    }
  };

  return (
    <section className="flex justify-center  w-full">
      <Card className="w-full max-w-prose shadow-xl border border-muted bg-background">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Dodaj wiadomość
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Wpisz treść wiadomości i kliknij „Wyślij”.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Textarea
              rows={5}
              placeholder="Wpisz wiadomość..."
              className="resize-none"
              {...register("content")}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Wysyłanie..." : "Wyślij"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
