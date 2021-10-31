import React, { createContext, useState} from "react";
export const AppContext = createContext();
const DataContext = ({ children }) => {
    const[openNote,setOpenNote]=useState(false)
    const[noteTopic,setNoteTopic]=useState('')
    const[noteContent,setNoteContent]=useState('')
    const[openList,setOpenList]=useState(false)
    const[listTitle,setListTitle]=useState('')
    const[listData,setListData]=useState([])
    const[notes,setNotes]=useState([])
    const[creationToggle,setCreationToggle]=useState(false)
    const[editNoteTitle,setEditNoteTitle]=useState('')
    const[editNoteContent,setEditNoteContent]=useState('')
    const[editNoteId,setEditNoteId]=useState('')
    const[openEditNote,setOpenEditNote]=useState(false)
    const [editListTitle,setEditListTitle]=useState('')
    const [editListItems,setEditListItems]=useState([])
    const [editListId,setEditListId]=useState('')
    const [openEditList,setOpenEditList]=useState(false)

    const contexts = {
      openNote,
      setOpenNote,
      noteTopic,
      setNoteTopic,
      noteContent,
      setNoteContent,
      listTitle,
      setListTitle,
      listData,
      setListData,
      openList,
      setOpenList,
      notes,
      setNotes,
      creationToggle,
      setCreationToggle,
      editNoteTitle,
      setEditNoteTitle,
      editNoteContent,
      setEditNoteContent,
      openEditNote,
      setOpenEditNote,
      editNoteId,
      setEditNoteId,
      editListTitle,
      setEditListTitle,
      editListItems,
      setEditListItems,
      editListId,
      setEditListId,
      openEditList,
      setOpenEditList,
    };
  return <AppContext.Provider value={contexts}>
             {children}
  </AppContext.Provider>;
};

export default DataContext;
