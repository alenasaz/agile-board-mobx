import { Card } from "@mui/material";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { Task } from "./Task";
import { observer } from "mobx-react-lite";

export interface ITask {
  id: string;
  title: string;
  description?: string;
  assignee: any;
}

const getItemStyle = (
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => {
  return {
    padding: 8,
    marginBottom: 8,
    ...draggableStyle,
  };
};

const Column = ({ section }: any) => {
  return (
    <div>
      {section?.tasks?.map((task: ITask, index: number) => {
        return (
          <Draggable draggableId={task.id} key={task.id} index={index}>
            {(provided) => (
              <Card
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(provided.draggableProps.style)}
              >
                <Task task={task}></Task>
              </Card>
            )}
          </Draggable>
        );
      })}
    </div>
  );
};

export default observer(Column);
