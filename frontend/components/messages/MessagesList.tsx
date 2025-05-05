"use client";

import { useState } from "react";
import {
  useGetMessagesQuery,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} from "@features/messages/messagesApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Spinner } from "@components/ui/spinner";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@components/ui/dialog";
import { Textarea } from "@components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema, MessageFormData } from "@lib/validation";
import { useToast } from "@hooks/use-toast";

export default function MessagesList() {
  const {
    data: messages,
    refetch,
    isLoading,
    error,
  } = useGetMessagesQuery(undefined);

  const [deleteMessage] = useDeleteMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: "" },
  });

  const onEdit = async (id: number, data: MessageFormData) => {
    try {
      await updateMessage({ id, content: data.content }).unwrap();
      toast({
        title: "Wiadomość zaktualizowana",
        description: `Wiadomość o ID ${id} została zaktualizowana.`,
      });
      reset();
      setOpenDialogId(null);
      refetch();
    } catch (err) {
      console.error("Edit failed", err);
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować wiadomości.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMessage(id).unwrap();
      toast({
        title: "Wiadomość usunięta",
        description: `Wiadomość o ID ${id} została pomyślnie usunięta.`,
      });
      refetch();
    } catch (err) {
      console.error("Delete failed", err);
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć wiadomości.",
        variant: "destructive",
      });
    }
  };

  const handleOpenDialog = (id: number, currentContent: string) => {
    setValue("content", currentContent);
    setOpenDialogId(id);
  };

  if (isLoading) {
    return (
      <div className="w-full py-10 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error loading messages</p>;

  return (
    <div className="p-4 w-full max-w-4xl mx-auto">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Wiadomość</TableHead>
              <TableHead>Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages && messages.length > 0 ? (
              messages.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell>{msg.id}</TableCell>
                  <TableCell className="break-words w-full">
                    {msg.content}
                  </TableCell>
                  <TableCell className="space-x-2 whitespace-nowrap">
                    <Dialog
                      open={openDialogId === msg.id}
                      onOpenChange={(open) => {
                        if (open) {
                          handleOpenDialog(msg.id, msg.content);
                        } else {
                          setOpenDialogId(null);
                          reset();
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline">Edytuj</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edytuj wiadomość</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={handleSubmit((data) =>
                            onEdit(msg.id, data)
                          )}
                          className="space-y-4"
                        >
                          <Textarea rows={4} {...register("content")} />
                          {errors.content && (
                            <p className="text-sm text-red-500">
                              {errors.content.message}
                            </p>
                          )}
                          <DialogFooter>
                            <Button type="submit">Zapisz</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(msg.id)}
                    >
                      Usuń
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  Brak wiadomości do wyświetlenia.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
