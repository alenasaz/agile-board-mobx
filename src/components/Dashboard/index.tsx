import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import useStore from "../../hooks/useStore";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import NewTaskDialog from "./NewTaskDialog";

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 8,
  minHeight: 500,
});

const Dashboard = () => {
  const { boards } = useStore();
  const [newTaskTo, setNewTaskTo] = useState(null);

  const closeDialog = useCallback(() => {
    setNewTaskTo(null);
  }, [setNewTaskTo]);

  const handleDragEnd = useCallback(
    (event: DropResult) => {
      const { source, destination, draggableId: taskId } = event;
      boards?.active?.moveTask(taskId, source, destination);
    },
    [boards]
  );

  // if (!newTaskTo) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Box p={2}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={3}>
          {boards?.active?.sections?.map((section: any) => {
            return (
              <Grid item key={section.id} xs>
                <Paper>
                  <Box
                    p={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h5">{section?.title}</Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setNewTaskTo(section.id);
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                  <Droppable droppableId={section.id} key={section.id}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        <Column section={section} />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
      <NewTaskDialog
        open={!!newTaskTo}
        onClose={() => closeDialog()}
        sectionId={newTaskTo}
      ></NewTaskDialog>
    </Box>
  );
};

export default observer(Dashboard);
