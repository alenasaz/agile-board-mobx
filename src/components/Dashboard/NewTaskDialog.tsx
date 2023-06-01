import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { FormEvent, useCallback, useState } from "react";
import useStore from "../../hooks/useStore";

const NewTaskDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  sectionId: string | null;
}> = ({ open, onClose, sectionId }) => {
  const [formState, setFormState] = useState<any>({});
  const { users, boards } = useStore();

  const addNewTask = useCallback(
    (event: any) => {
      event.preventDefault();
      boards?.active?.addTask(sectionId, formState);
      onClose();
    },
    [formState, boards, onClose, sectionId]
  );

  const handleChangeFormState = useCallback(
    (event: any) => {
      const { name, value } = event.target.value;
      setFormState((prevState: any) => ({
        ...prevState,
        [name]: value ? value.trim() : "",
      }));
    },
    [setFormState]
  );

  //   if (!formState) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Creating a new task:</DialogTitle>
      <form onSubmit={addNewTask}>
        <DialogContent style={{ minWidth: 500 }}>
          <Box p={1}>
            <TextField
              fullWidth
              required
              type="text"
              name="title"
              label="Title"
              onChange={handleChangeFormState}
              value={formState?.title || ""}
            />
          </Box>
          <Box p={1}>
            <TextField
              fullWidth
              required
              type="text"
              name="description"
              label="Description"
              onChange={handleChangeFormState}
              value={formState?.description || ""}
            />
          </Box>
          <Box p={1}>
            <FormControl fullWidth>
              <InputLabel shrink>Assignee</InputLabel>
              <Select
                required
                style={{
                  width: "100%",
                }}
                native
                name="assignee"
                value={formState?.assignee || ""}
                onChange={handleChangeFormState}
              >
                <option value={""} disabled>
                  –
                </option>
                {users?.list?.map((user) => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Close
          </Button>
          <Button type="submit" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default observer(NewTaskDialog);
