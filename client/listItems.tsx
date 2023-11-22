import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { getApi, getJson } from "../fetchHelper";

export default function Chats() {
  const [chats, setChats] = React.useState([]);

  const mainListItems = (
    <React.Fragment>
      {chats.map((chat) => {
        return (
          <ListItemButton key={(chat as any)._id}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={(chat as any).title} />
          </ListItemButton>
        );
      })}
    </React.Fragment>
  );

  React.useEffect(() => {
    getChats();
  }, []);

  async function getChats() {
    const chats = await getApi("chats");
    setChats(chats);
  }
  return mainListItems;
}
