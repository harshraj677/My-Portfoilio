const express = require("express");
const mongoose = require("mongoose");
const path=require('path')
const bodyParser =require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));

const PORT = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB (must include a database name, e.g., 'test')
mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Define a schema and model for contact messages
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// Route to handle contact form submissions
app.post("/contact",async(req,res)=>{
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: "Contact saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save contact" });
    }
});

// Add this route before app.listen
app.use(express.static(path.join(__dirname,'public')));
app.get("/", (req, res) => {
    res.sendFile(__dirname +'/public/index.html');
});
console.log(__dirname + '/public/index.html');

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
