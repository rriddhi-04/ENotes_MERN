import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../utils';
import { API_BASE_URL } from '../config';

export default function Notes() {
    const [notes, setNotes] = useState([]); // ✅ Corrected destructuring
    const [form, setForm] = useState({
        title: '',
        content: ''
    });

    const [editingId, setEditingId] = useState(null); // Track which note is being edited

    const fetchNotes = async () => {
            const res = await axios.get($`{API_BASE_URL}/api/notes`, getAuthHeaders());
            setNotes(res.data);
    };

    const addNote = async () => {
        if (!form.title || !form.content) return alert("Enter title and content");
            await axios.post($`{API_BASE_URL}/api/notes`, form, getAuthHeaders());
            setForm({ title: '', content: '' });
            fetchNotes();
    };

    const deleteNote = async (id) => {
            await axios.delete($`{API_BASE_URL}/api/notes/${id}`, getAuthHeaders());
            fetchNotes();
    };

    const startEditing = (note) => {
        setForm({ title: note.title, content: note.content });
        setEditingId(note._id);
    };

    const updateNote = async (id) => {
        if (!form.title || !form.content) return alert("Enter title and content");
        await axios.put($`{API_BASE_URL}/api/notes/${id}`, form, getAuthHeaders());
        setForm({ title: '', content: '' });
        setEditingId(null);
        fetchNotes();
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>My Notes</h2>
            <input
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
            /><br />
            <textarea
                placeholder="Content"
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
            /><br />
            {/* <button onClick={addNote}>Add Note</button> */}
            {editingId ? (
                <button onClick={() => updateNote(editingId)}>Update Note</button>
            ) : (
                <button onClick={addNote}>Add Note</button>
            )}

            {notes.map(note => (
                <div key={note._id} style={{ marginTop: 20, border: "1px solid #ccc", padding: 10 }}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <button onClick={() => deleteNote(note._id)}>Delete</button>
                    <button onClick={() => startEditing(note)}>Edit</button>
                </div>
            ))}
        </div>
    );
}