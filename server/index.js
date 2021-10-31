require("dotenv/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const noteSchema = new mongoose.Schema(
  {
    creator: String,
    title: String,
    content: String,
    items: Array,
    type: String,
    date: Date,
  },
  {
    collection: "notesapp",
  }
);

const Note = mongoose.model("note", noteSchema);

app.post("/savenote", async (req, res) => {
  const { creator, title, content, items, type } = req.body;

  try {
    const newNote = new Note({
      creator,
      title,
      content,
      items,
      type,
      date: new Date(),
    });
    await newNote
      .save()
      .then(() => {
        res.status(200).send({ message: "Note saved" });
      })
      .catch((err) => {
        res.status(400).send({ message: err });
      });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

app.get("/getnote", async (req, res) => {
  let name = req.query.creator;
  const notes = await Note.find({ creator: name }).exec();
  res.send(notes);
});

app.post("/deletenote", async (req, res) => {
  const { id } = req.body;
  await Note.findByIdAndDelete({ _id: id })
    .then(() => res.send({ message: "Note Deleted" }))
    .catch((err) => res.send(err));
});

app.post('/updatenote',async(req,res)=>{
  const {id,title,content}=req.body;
   Note.findByIdAndUpdate({"_id":id},{"$set":{"title":title,"content":content}}).exec((err)=>{
    if(err){
      res.send(err)
    }
    else{
      res.send({message:'Updated'})
    }
  })
})

app.post('/updatelist',async(req,res)=>{
  const {id,title,item}=req.body;
  Note.findByIdAndUpdate({"_id":id},{"$set":{"title":title,"items":item}}).exec((err)=>{
    if(err){
      res.send(err)
    }
    else{
      res.send({message:'Updated'})
    }
  })
})


app.get("/", (req, res) => res.send("Check"));

app.listen(process.env.PORT || 4400, () => {
  console.log("listening to port 4400");
});
