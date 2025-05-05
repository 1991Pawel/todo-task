"use client";

import { useState } from "react";
import {
  useGetMessagesQuery,
  useDeleteMessageMutation,
} from "@features/messages/messagesApi";
import { Spinner } from "@components/ui/spinner";
import { useToast } from "@hooks/use-toast";
import { MessagesTable } from "@components/messages/MessageTable";
import { EmptyList } from "@components/messages/EmptyList";

export default function MessagesList() {
  const {
    data: messages,
    refetch,
    isLoading,
    error,
  } = useGetMessagesQuery(undefined);

  const [deleteMessage] = useDeleteMessageMutation();
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteMessage(id).unwrap();
      toast({
        title: "Wiadomość usunięta",
        description: `Wiadomość o ID ${id} została usunięta.`,
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

  if (isLoading) {
    return (
      <div className="w-full py-10 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error loading messages</p>;

  if (!messages?.length) {
    return (
      <div className="p-4 w-full max-w-4xl mx-auto">
        <EmptyList />
      </div>
    );
  }

  return (
    <div className="p-4 w-full max-w-4xl mx-auto">
      <div className="w-full max-w-4xl mx-auto overflow-x-auto bg-white border border-muted rounded-xl shadow-md p-4">
        <MessagesTable
          messages={messages}
          openDialogId={openDialogId}
          setOpenDialogId={setOpenDialogId}
          onDelete={handleDelete}
          onSuccessEdit={() => {
            refetch();
            setOpenDialogId(null);
          }}
        />
      </div>
    </div>
  );
}
