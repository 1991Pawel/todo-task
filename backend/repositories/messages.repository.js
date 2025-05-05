import Message from "../models/message.model.js";

export const getAll = () => Message.findAll({ order: [["id", "DESC"]] });
export const findById = (id) => Message.findByPk(id);
export const create = (content) => Message.create({ content });
export const update = async (msg, content) => {
  msg.content = content;
  return await msg.save();
};
export const remove = (msg) => msg.destroy();
