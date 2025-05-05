import Message from "../models/message.model.js";

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.findAll({ order: [["id", "DESC"]] });
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    const newMsg = await Message.create({ content });
    res.status(201).json(newMsg);
  } catch (err) {
    next(err);
  }
};

export const updateMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    const msg = await Message.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ error: "Message not found" });

    msg.content = content;
    await msg.save();
    res.json(msg);
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const msg = await Message.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ error: "Message not found" });

    await msg.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
