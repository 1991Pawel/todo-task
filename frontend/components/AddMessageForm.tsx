"use client";

import { useState } from "react";
import {
  useAddMessageMutation,
  useGetMessagesQuery,
} from "../features/messages/messagesApi";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddMessageForm() {
  const [content, setContent] = useState("");
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const { refetch } = useGetMessagesQuery(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addMessage(content).unwrap();
      setContent("");
      refetch();
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Add a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Write your message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
