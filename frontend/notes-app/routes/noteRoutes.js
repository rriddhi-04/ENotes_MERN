const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const Note = require('../models/Note'); 

// Create  
router.post('/', protect, async(req, res)=>{
    const {title, content} = req.body;
    const note = await Note.create({user:req.user._id, title, content});
    res.json(note);
});

//GET
router.get('/', protect, async(req, res)=>{
    const notes = await Note.find({user:req.user._id});
    res.json(notes);
});

// UPDATE
router.put('/:id', protect, async(req, res)=>{
    const note = await Note.findById(req.params.id);
    if(note.user.toString() !== req.user._id.toString()) return res.status(403).send();
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(updated);
});

// DELETE
router.delete('/:id', protect, async(req, res)=>{
    const note = await Note.findById(req.params.id);
    if(note.user.toString() !== req.user._id.toString()) return res.status(403).send();
    await Note.findByIdAndDelete(req.params.id);
    res.json({message : 'deleted'});
});

module.exports = router;


