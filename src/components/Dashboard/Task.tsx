import { CardContent, Typography } from "@mui/material";
import User from "../shared/User";
import { ITask } from "./Column";

export const Task: React.FC<{ task: ITask }> = ({ task }) => {
  return (
    <CardContent>
      <Typography color="textPrimary" gutterBottom style={{ fontSize: 18 }}>
        {task?.title}
      </Typography>
      <Typography color="textPrimary" gutterBottom>
        {task?.description}
      </Typography>
      <User user={task.assignee}></User>
    </CardContent>
  );
};
