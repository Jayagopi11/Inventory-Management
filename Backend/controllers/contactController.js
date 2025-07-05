const Contact = require('../models/Supplier');

exports.getContacts = async (req,res) => {
    try{
        const contacts = await Contact.find().sort({createdAt: -1});
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error});
    }
};

exports.addContact = async(req,res) => {
    try{
        const{name,type,phone,email} = req.body;

        if(!name || !type || !phone || !email){
            return res.status(400).json({message:'All fields are required'});

        }
        const newContact = new Contact({name,type,phone,email});
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    }catch(error){
        res.status(500).json({message:'Error adding contact',error});

    }

}

exports.updateContact = async(req,res) => {
    try{
        const {id} = req.params;
        const{name,type,phone,email} = req.body;

        const updated = await Contact.findByIdAndUpdate(
            id,
            {name,type,phone,email},
            {new:true}
        );
        if(!updated){
            return res.status(404).json({message:'Contact not found'});

        }
        res.json(updated);
    }catch(error){
        res.status(500).json({message:'Error updating contact',error});

    }
}

exports.deleteContact = async(req,res) => {
    try{
        const {id} = req.params;
        const deleted = await Contact.findByIdAndDelete(id);

        if(!deleted){
            return res.status(404).json({message:'Contact not found'});

        }
        res.json({message:'Contact deleted',id});
    }catch(error){
        res.status(500).json({message:'Error deleting contact',error});
        
    }
}