const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// GET all contacts (optional, if you want to see all submissions)
router.get('/', async(req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

// POST a new contact form submission
router.post('/', async(req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit contact form' });
    }
});

// DELETE contact by ID (optional)
router.delete('/:id', async(req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ error: 'Contact not found' });
        res.json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete contact' });
    }
});

module.exports = router;