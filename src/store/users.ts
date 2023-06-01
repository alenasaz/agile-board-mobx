import { types, flow } from "mobx-state-tree";
import apiCall from "../api";

export const UserModel = types.model("User", {
  id: types.identifier,
  createdAt: types.string,
  name: types.string,
  avatar: types.string,
});

const ActiveUser = UserModel.named("ActiveUser");

const UsersStore = types
  .model("UsersStore", {
    users: types.maybe(types.array(UserModel)),
    active_user: types.maybe(ActiveUser),
  })
  .actions((self) => {
    return {
      load: flow(function* () {
        self.users = yield apiCall.get("users");
        self.active_user = yield apiCall.get("me");
      }),
    };
  })
  .actions((self) => {
    return {
      afterCreate() {
        self.load();
      },
    };
  })
  .views((self) => ({
    get list() {
      return self.users?.map(({ id, name }) => ({
        id,
        name,
      }));
    },
  }));

export default UsersStore;
