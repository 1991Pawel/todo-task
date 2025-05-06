import * as repo from "../repositories/messages.repository.js";

export const listMessages = () => repo.getAll();
export const addMessage = (content) => repo.create(content);

export const editMessage = async (id, content) => {
  const msg = await repo.findById(id);
  if (!msg) throw new Error("Message not found");
  return repo.update(msg, content);
};

export const deleteMessage = async (id) => {
  const msg = await repo.findById(id);
  if (!msg) throw new Error("Message not found");
  return repo.remove(msg);
};
