const express = require("express");
const router = express.Router();
const Contact = require("../models/Supplier");

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    // console.log("Contacts fetched:", contacts);
    res.json(contacts);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

router.post('/',async(req,res) =>{
    const {name,phone,email,address,type} = req.body;

    try{
        const newContact = new Contact({name,phone,email,address,type});
        await newContact.save();
        res.status(201).json(newContact);
    }catch(err){
        res.status(400).json({error:'Failed to add contact'});
    }
})

router.put('/:id',async(req,res) => {
    const {name,phone,email,address,type} = req.body;

    try{
        const updateContact = await Contact.findByIdAndUpdate(
            req.params.id,
            {name,phone,email,address,type},
            {new:true}
        
        );
        if(!updateContact){
            return res.status(404).json({error:'Contact not found'});
        }
        res.json(updateContact);
    }catch(err){
        res.status(400).json({error:'Failed to update contact'});
    }
})

router.delete('/:id',async(req,res) => {
    try{
        const deleteContact = await Contact.findByIdAndDelete(req.params.id);
        if(!deleteContact){
            return res.status(404).json({error:'Contact not found'});

        }
        res.json({message:'Contact deleted successfully'});
    }catch(err){
        res.status(500).json({error :'Failed to delete contact'})

    }
})

module.exports = router;