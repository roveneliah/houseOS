import { BasicProfile, ViewerRecord } from "@self.id/framework";
import { addTags, removeTag, updateName } from "../../../hooks/ceramic/ceramic";
import { User } from "../../../types/User";
import { Maybe } from "../../../types/Maybe";

export const recordToUser = (record: any): User => ({
  name: record?.content?.name,
  address: "0x123",
  tags: record?.content?.tags || [],
  friends: record?.content?.friends || [],
  id: "",
  avatarSrc: "",
  removeTag: (tag: string) => removeTag(record)(tag),
  addTags: (...tags: Array<string>) => addTags(record)(...tags),
  updateName: (name: string) => updateName(record)(name),
});
