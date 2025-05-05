"use client";

import { useState } from "react";
import {
  useGetMessagesQuery,
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
import { useToast } from "@hooks/use-toast";

import dynamic from "next/dynamic";

const EditMessageDialog = dynamic(
  async () => {
    const mod = await import("@components/messages/EditMessageDialog");
    return mod.EditMessageDialog;
  },
  { ssr: false }
);

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
  const hasMessages = messages && messages.length > 0;
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
            {hasMessages ? (
              messages.map((msg) => (
                <TableRow
                  key={msg.id}
                  className="flex flex-col sm:table-row w-full"
                >
                  <TableCell className="font-semibold text-sm sm:table-cell">
                    {msg.id}
                  </TableCell>
                  <TableCell className="break-words text-pretty text-sm sm:table-cell">
                    {msg.content}
                  </TableCell>
                  <TableCell className="mt-2 sm:mt-0 sm:table-cell sm:whitespace-nowrap">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setOpenDialogId(msg.id)}
                      >
                        Edytuj
                      </Button>
                      {openDialogId === msg.id && (
                        <EditMessageDialog
                          id={msg.id}
                          initialContent={msg.content}
                          onCloseAction={() => setOpenDialogId(null)}
                          onSuccessAction={() => {
                            refetch();
                            setOpenDialogId(null);
                          }}
                        />
                      )}
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(msg.id)}
                      >
                        Usuń
                      </Button>
                    </div>
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
