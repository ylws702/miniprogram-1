const db = wx.cloud.database();

export default db;

export const _ = db.command;
