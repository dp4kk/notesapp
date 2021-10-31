import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../Context/DataContext";
import axios from "axios";
const EditNote = () => {
  const {
   editNoteTitle,
   setEditNoteTitle,
   editNoteContent,
   setEditNoteContent, 
    creationToggle,
    setCreationToggle,
    openEditNote,
    setOpenEditNote,
    editNoteId
  } = useContext(AppContext);
  const handleClose = () => {
    setOpenEditNote(false);
  };
  const reset = () => {
    setOpenEditNote(false)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("https://reactnotes-app.herokuapp.com/updatenote", {
        id: editNoteId,
        title: editNoteTitle,
        content: editNoteContent,
      })
      .then((res) => {
        console.log(res);
        setEditNoteTitle("");
        setEditNoteContent("");
        setCreationToggle(!creationToggle);
        setOpenEditNote(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Dialog
      open={openEditNote}
      onClose={handleClose}
      scroll="body"
      PaperProps={{
        style: {
          backgroundColor: "#FFFDD0",
        },
      }}
    >
      <DialogTitle>Note</DialogTitle>
      <form>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                sx={{ position: "relative", width: "90%", left: "5%" }}
                variant="filled"
                inputProps={{
                  min: 0,
                  style: { fontSize: 20 },
                }}
                placeholder="Topic"
                value={editNoteTitle}
                onChange={(e) => setEditNoteTitle(e.target.value)}
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                sx={{
                  position: "relative",
                  width: "90%",
                  left: "5%",
                }}
                variant="outlined"
                placeholder="content"
                multiline
                rows={15}
                value={editNoteContent}
                onChange={(e) => setEditNoteContent(e.target.value)}
              />
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

export default EditNote;
