"use client";

import { useState } from "react";
import {
  useGetMessagesQuery,
  useAddMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} from "../features/messages/messagesApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

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
  const [editedContent, setEditedContent] = useState("");

  const handleDelete = async (id: number) => {
    await deleteMessage(id);
    refetch();
  };

  const handleEdit = async (id: number) => {
    if (!editedContent.trim()) return;
    await updateMessage({ id, content: editedContent });
    setOpenDialogId(null);
    refetch();
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading messages</p>;

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Wiadomość</TableHead>
            <TableHead>Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages?.map((msg: any) => (
            <TableRow key={msg.id}>
              <TableCell>{msg.id}</TableCell>
              <TableCell>{msg.content}</TableCell>
              <TableCell className="space-x-2">
                <Dialog
                  open={openDialogId === msg.id}
                  onOpenChange={(open) => {
                    setOpenDialogId(open ? msg.id : null);
                    setEditedContent(msg.content);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">Edytuj</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edytuj wiadomość</DialogTitle>
                    </DialogHeader>
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      rows={4}
                    />
                    <DialogFooter>
                      <Button onClick={() => handleEdit(msg.id)}>Zapisz</Button>
                    </DialogFooter>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
