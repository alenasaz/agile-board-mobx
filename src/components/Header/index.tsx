import {
  AppBar,
  FormControl,
  Grid,
  Select,
  Toolbar,
  Typography,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import User, { IUser } from "../shared/User";

const Header = () => {
  const { boards, users } = useStore();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box display="flex" alignItems="center">
              <Typography>Dashboard:</Typography>
              <FormControl variant="outlined">
                <Select
                  style={{
                    backgroundColor: "white",
                    marginLeft: 10,
                  }}
                  native
                  value={boards?.active?.id || ""}
                  onChange={(event: SelectChangeEvent) => {
                    const { value } = event.target;
                    boards?.selectBoard(value);
                  }}
                >
                  <option value="-" disabled>
                    -
                  </option>
                  {boards.list.map((item) => {
                    return (
                      <option key={item.id} value={item?.id}>
                        {item?.title}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item>
            <User user={users.active_user as IUser}></User>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default observer(Header);
