import { types } from "mobx-state-tree";
import UsersStore from "./users";
import BoardsStore from "./boards";

const RootStore = types.model("RootStore", {
  users: types.optional(UsersStore, {}),
  boards: types.optional(BoardsStore, {}),
});

export default RootStore;
