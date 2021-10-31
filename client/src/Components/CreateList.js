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
import { FirebaseData } from "../Firebase/FirebaseContext";
import axios from 'axios'
const CreateList = () => {
  const {
    openList,
    setOpenList,
    listTitle,
    setListTitle,
    listData,
    setListData,
    creationToggle,
    setCreationToggle
  } = useContext(AppContext);
  const {currentUser}=useContext(FirebaseData)
  const handleClose = () => {
    setOpenList(false);
  };
  const [inputItem, setInputItem] = useState("");
  const addToList = () => {
    if (inputItem) {
      setListData((oldList) => [...oldList, inputItem]);
      setInputItem("");
    }
  };
  const removeItem = ( index ) => {
      
      const newList =  listData.filter((i,itemIndex)=>index !==itemIndex)
      setListData(newList)
      
  };

  const reset=()=>{
      setListData([])
      setListTitle('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://reactnotes-app.herokuapp.com/savenote", {
        creator: currentUser.displayName,
        title: listTitle,
        items: listData,
        type: "Item",
      })
      .then((res) => {
        console.log(res);
        setListData([]);
        setListTitle("");
        setCreationToggle(!creationToggle);
        setOpenList(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <Dialog
      open={openList}
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
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
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
              {listData.map((item, index) => {
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
          <Button onClick={reset}>Reset</Button>
          <Button onClick={handleSubmit} type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateList;
