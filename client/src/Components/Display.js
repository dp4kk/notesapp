import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../Context/DataContext";
import { FirebaseData } from "../Firebase/FirebaseContext";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const Display = () => {
  const {
    notes,
    setNotes,
    creationToggle,
    setEditNoteTitle,
    setEditNoteContent,
    setOpenEditNote,
    setEditNoteId,
    setEditListTitle,
    setEditListItems,
    setEditListId,
    setOpenEditList,
  } = useContext(AppContext);
  const { currentUser, logout } = useContext(FirebaseData);
  const [deleting, setDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  useEffect(() => {
    const getNotes = async () => {
      await axios
        .get("https://reactnotes-app.herokuapp.com/getnote", {
          params: {
            creator: currentUser.displayName,
          },
        })
        .then((response) => {
          setNotes(response.data);
        })
        .catch((err) => {
          setTimeout(getNotes, 4000);
          console.log(err);
        });
    };

    getNotes();

    return () => {
      setNotes([]);
    };
    //eslint-disable-next-line
  }, [deleting, creationToggle]);

  const deleteItem = async () => {
    await axios
      .post("https://reactnotes-app.herokuapp.com/deletenote", {
        id: deleteItemId,
      })
      .then((res) => {
        console.log(res);
        setDeleting(!deleting);
        setOpenDialog(false);
      })
      .catch((err) => console.log(err));
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleEdit = (data) => {
    setEditNoteTitle(data.title);
    setEditNoteContent(data.content);
    setEditNoteId(data._id);
    setOpenEditNote(true);
  };
  const handleEditList = (data) => {
    setEditListTitle(data.title);
    setEditListItems(data.items);
    setEditListId(data._id);
    setOpenEditList(true);
  };

  const deleteDialog = (itemId) => {
    setOpenDialog(true);
    setDeleteItemId(itemId);
  };

  return (
    <Box
      marginLeft="240px"
      minHeight="100vh"
      sx={{ backgroundColor: "#FFFDD0", border: 0 }}
    >
      <Typography align="center" variant="h5" sx={{ paddingTop: "10px" }}>
        <Box fontFamily="cursive"> Notes</Box>
      </Typography>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          margin: "10px",
        }}
      >
        <Button variant="outlined" onClick={logout}>
          Logout
        </Button>
      </div>
      <Grid container spacing={1} sx={{ marginTop: "20px" }}>
        {notes.map((data) => {
          if (data.type === "Note") {
            return (
              <Grid item xs={2} key={data._id}>
                <Card
                  variant="outlined"
                  sx={{
                    maxWidth: 200,
                    margin: "10px",
                    backgroundColor: "#FFFF8F",
                  }}
                >
                  <CardHeader
                    title={
                      <Typography variant="h6">
                        <Box fontFamily="monospace" fontWeight="bold">
                          {data.title}
                        </Box>
                      </Typography>
                    }
                    subheader={
                      <Typography variant="subtitle2">
                        <Box fontStyle="italic">
                          {data.date.substring(0, 10)}
                        </Box>
                      </Typography>
                    }
                    action={
                      <IconButton onClick={() => deleteDialog(data._id)}>
                        <HighlightOffIcon />
                      </IconButton>
                    }
                  />
                  <CardActionArea onClick={() => handleEdit(data)}>
                    <CardContent>
                      <Typography variant="subtitle2">
                        {data.content}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          } else if (data.type === "Item") {
            return (
              <Grid item xs={2} key={data._id}>
                <Card
                  variant="outlined"
                  sx={{
                    maxWidth: 200,
                    margin: "10px",
                    backgroundColor: "#F3E5AB",
                  }}
                >
                  <CardHeader
                    title={
                      <Typography variant="h6" align="left">
                        <Box fontFamily="monospace" fontWeight="bold">
                          {data.title}
                        </Box>
                      </Typography>
                    }
                    subheader={
                      <Typography variant="subtitle2">
                        <Box fontStyle="italic">
                          {data.date.substring(0, 10)}
                        </Box>
                      </Typography>
                    }
                    action={
                      <IconButton onClick={() => deleteDialog(data._id)}>
                        <HighlightOffIcon />
                      </IconButton>
                    }
                  />
                  <CardActionArea onClick={() => handleEditList(data)}>
                    <CardContent>
                      {data.items.map((list, i) => {
                        return (
                          <List key={i}>
                            <ListItem>
                              <Typography variant="subtitle2">
                                ⦿ {list}
                              </Typography>
                            </ListItem>
                          </List>
                        );
                      })}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          }
          return false;
        })}
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        PaperProps={{
          style: {
            backgroundColor: "#FFFDD0",
          },
        }}
      >
        <DialogTitle>{"Confirm Delete?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={deleteItem}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Display;
