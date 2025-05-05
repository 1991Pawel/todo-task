"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema, MessageFormData } from "@lib/validation";
import { useToast } from "@hooks/use-toast";
import { useUpdateMessageMutation } from "@features/messages/messagesApi";

interface EditMessageDialogProps {
  id: number;
  initialContent: string;
  onCloseAction: () => void;
  onSuccessAction: () => void;
}

export function EditMessageDialog({
  id,
  initialContent,
  onCloseAction,
  onSuccessAction,
}: EditMessageDialogProps) {
  const { toast } = useToast();
  const [updateMessage] = useUpdateMessageMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: initialContent },
  });

  useEffect(() => {
    setValue("content", initialContent);
  }, [initialContent, setValue]);

  const handleEdit = async (data: MessageFormData) => {
    try {
      await updateMessage({ id, content: data.content }).unwrap();
      toast({
        title: "Wiadomość zaktualizowana",
        description: `Wiadomość o ID ${id} została zaktualizowana.`,
      });
      reset();
      onSuccessAction();
    } catch (err) {
      console.error("Update failed", err);
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować wiadomości.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open onOpenChange={onCloseAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj wiadomość</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">
          <Textarea rows={4} {...register("content")} />
          {errors.content && (
            <p className="text-sm text-red-500">{errors.content.message}</p>
          )}
          <DialogFooter>
            <Button type="submit">Zapisz</Button>
            <Button type="button" variant="ghost" onClick={onCloseAction}>
              Anuluj
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
