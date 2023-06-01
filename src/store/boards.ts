import { types, flow, getParent, onSnapshot } from "mobx-state-tree";
import apiCall from "../api";
import { UserModel } from "./users";
import { v4 as uuid } from "uuid";
import { DraggableLocation } from "react-beautiful-dnd";

const Task = types.model("Task", {
  id: types.identifier,
  title: types.string,
  description: types.maybe(types.string),
  assignee: types.safeReference(UserModel),
});

const BoardSection = types
  .model("BoardSection", {
    id: types.identifier,
    title: types.string,
    tasks: types.array(Task),
  })
  .actions((self) => {
    return {
      save: flow(function* save({ tasks }) {
        // @ts-ignore
        const { id: boardID } = getParent(self, 2);
        const { id: status } = self;
        yield apiCall.put(`boards/${boardID}/tasks/${status}`, { tasks });
      }),
    };
  })
  .actions((self) => {
    return {
      load: flow(function* load() {
        // @ts-ignore
        const { id: boardID } = getParent(self, 2);
        const { id: status } = self;
        const { tasks } = yield apiCall.get(
          `boards/${boardID}/tasks/${status}`
        );
        self.tasks = tasks;
        onSnapshot(self, self.save);
      }),
    };
  })
  .actions((self) => {
    return {
      afterCreate() {
        self.load();
      },
    };
  });

const Board = types
  .model("Board", {
    id: types.identifier,
    title: types.string,
    sections: types.array(BoardSection),
  })
  .actions((self) => {
    return {
      moveTask(
        id: number | string,
        source: DraggableLocation,
        destination: DraggableLocation | null | undefined
      ) {
        const fromSection = self.sections.find(
          (section) => section.id === source.droppableId
        );
        const toSection = self.sections.find(
          (section) => section.id === destination?.droppableId
        );
        const taskToMoveIndex = fromSection?.tasks.findIndex(
          (task) => task.id === id
        );
        const [task]: any = fromSection?.tasks.splice(
          taskToMoveIndex as number,
          1
        );
        toSection?.tasks.splice(destination?.index || 0, 0, task);
      },
      addTask(sectionId: string | null, payload: any) {
        const newSection = self.sections.find(
          (section) => section.id === sectionId
        );
        newSection?.tasks.push({ id: uuid(), ...payload });
      },
    };
  });

const BoardsStore = types
  .model("BoardsStore", {
    boards: types.array(Board),
    active: types.safeReference(Board),
  })
  .actions((self) => {
    return {
      load: flow(function* load() {
        self.boards = yield apiCall.get("boards");
        self.active = self.boards[0];
      }),
    };
  })
  .actions((self) => {
    return {
      afterCreate() {
        self.load();
      },
      selectBoard(id: string) {
        // @ts-ignore
        self.active = id;
      },
    };
  })
  .views((self) => ({
    get list() {
      return self.boards.map(({ id, title }) => ({
        id,
        title,
      }));
    },
  }));

export default BoardsStore;
