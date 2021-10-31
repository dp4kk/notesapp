import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { AppContext } from "../Context/DataContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
const EditList = () => {
  const {
    openEditList,
    setOpenEditList,
    editListTitle,
    setEditListTitle,
    editListItems,
    setEditListItems,
    editListId,
    creationToggle,
    setCreationToggle,
  } = useContext(AppContext);
  const handleClose = () => {
    setOpenEditList(false);
  };
  const [inputItem, setInputItem] = useState("");
  const addToList = () => {
    if (inputItem) {
      setEditListItems((oldList) => [...oldList, inputItem]);
      setInputItem("");
    }
  };
  const removeItem = (index) => {
    const newList = editListItems.filter((i, itemIndex) => index !== itemIndex);
    setEditListItems(newList);
  };

  const reset = () => {
    setOpenEditList(false)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://reactnotes-app.herokuapp.com/updatelist", {
        id: editListId,
        title: editListTitle,
        item: editListItems,
      })
      .then(() => {
        setEditListTitle("");
        setEditListItems([]);
        setOpenEditList(false);
        setCreationToggle(!creationToggle);
      });
  };
  return (
    <Dialog
      open={openEditList}
      onClose={handleClose}
      scroll="body"
      PaperProps={{
        style: {
          backgroundColor: "#FFFDD0",
        },
      }}
    >
      <DialogTitle>List</DialogTitle>
      <form>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item>
              <TextField
                required
                size="small"
                placeholder="Title"
                variant="filled"
                sx={{ position: "relative", width: "400px", left: "7%" }}
                value={editListTitle}
                onChange={(e) => setEditListTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                placeholder="Item"
                variant="filled"
                sx={{ position: "relative", width: "400px", left: "5%" }}
                value={inputItem}
                onChange={(e) => setInputItem(e.target.value)}
              />
              <IconButton sx={{ marginLeft: "30px" }} onClick={addToList}>
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              {editListItems.map((item, index) => {
                return (
                  <List key={index}>
                    <ListItem
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={() => removeItem(index)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" align="center">
                            <Box fontFamily="cursive">{item}</Box>
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                );
              })}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={reset}>Cancel</Button>
          <Button onClick={handleSubmit} type="submit">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditList;
