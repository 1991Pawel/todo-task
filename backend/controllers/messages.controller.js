import * as service from "../services/message.services.js";

export const getMessages = async (req, res, next) => {
  try {
    const messages = await service.listMessages();
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const msg = await service.addMessage(req.body.content);
    res.status(201).json(msg);
  } catch (err) {
    next(err);
  }
};

export const updateMessage = async (req, res, next) => {
  try {
    const msg = await service.editMessage(req.params.id, req.body.content);
    res.json(msg);
  } catch (err) {
    if (err.message === "Message not found")
      return res.status(404).json({ error: err.message });
    next(err);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    await service.deleteMessage(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    if (err.message === "Message not found")
      return res.status(404).json({ error: err.message });
    next(err);
  }
};
