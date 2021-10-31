import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../Context/DataContext'
import { FirebaseData } from '../Firebase/FirebaseContext'
import axios from 'axios'
const CreateNote = () => {
    const {openNote,setOpenNote,noteTopic,setNoteTopic,noteContent,setNoteContent,creationToggle,setCreationToggle} =useContext(AppContext)
    const {currentUser}=useContext(FirebaseData)
    const handleClose=()=>{
        setOpenNote(false)
    }
    const reset=()=>{
        setNoteContent('')
        setNoteTopic('')
    }

    const handleSubmit=async(e)=>{
       e.preventDefault()
        await axios
          .post("https://reactnotes-app.herokuapp.com/savenote", {
            creator: currentUser.displayName,
            title: noteTopic,
            content: noteContent,
            type: "Note",
          })
          .then((res) => {
            console.log(res);
            setNoteContent("");
            setNoteTopic("");
            setCreationToggle(!creationToggle);
          })
          .catch((err) => {
            console.log(err.response);
          });
        setOpenNote(false)
    }
    return (
      <Dialog
        open={openNote}
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
                  value={noteTopic}
                  onChange={(e) => setNoteTopic(e.target.value)}
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
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={reset}>Reset</Button>
            <Button onClick={handleSubmit} type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
}

export default CreateNote
