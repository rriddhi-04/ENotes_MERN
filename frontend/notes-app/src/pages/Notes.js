import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeaders, API_ENDPOINTS } from '../utils';

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [form, setForm] = useState({
        title: '',
        content: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchNotes = async () => {
        try {
            const res = await axios.get(API_ENDPOINTS.NOTES, getAuthHeaders());
            setNotes(res.data);
        } catch (err) {
            setError('Failed to load notes');
        }
    };

    const addNote = async (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.content.trim()) {
            setError('Please fill in both title and content');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await axios.post(API_ENDPOINTS.NOTES, form, getAuthHeaders());
            setForm({ title: '', content: '' });
            fetchNotes();
        } catch (err) {
            setError('Failed to add note');
        } finally {
            setLoading(false);
        }
    };

    const deleteNote = async (id) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;

        try {
            await axios.delete(`${API_ENDPOINTS.NOTES}/${id}`, getAuthHeaders());
            fetchNotes();
        } catch (err) {
            setError('Failed to delete note');
        }
    };

    const startEditing = (note) => {
        setForm({ title: note.title, content: note.content });
        setEditingId(note._id);
        // Scroll to form
        document.querySelector('.notes-form-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const updateNote = async (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.content.trim()) {
            setError('Please fill in both title and content');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await axios.put(`${API_ENDPOINTS.NOTES}/${editingId}`, form, getAuthHeaders());
            setForm({ title: '', content: '' });
            setEditingId(null);
            fetchNotes();
        } catch (err) {
            setError('Failed to update note');
        } finally {
            setLoading(false);
        }
    };

    const cancelEditing = () => {
        setForm({ title: '', content: '' });
        setEditingId(null);
        setError('');
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <>
            <div className="notes-container">
                {/* Add/Edit Note Form */}
                <div className="notes-form-section">
                    <div className="notes-form-header">
                        <h3>
                            {editingId ? (
                                <>
                                    <span>✏️</span> Edit Note
                                </>
                            ) : (
                                <>
                                    <span>➕</span> Add New Note
                                </>
                            )}
                        </h3>
                        {editingId && (
                            <button
                                onClick={cancelEditing}
                                className="btn btn-secondary"
                                type="button"
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                    {error && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={editingId ? updateNote : addNote}
                        className="notes-form"
                    >
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                placeholder="Enter note title..."
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Content</label>
                            <textarea
                                placeholder="Write your note content here..."
                                value={form.content}
                                onChange={e => setForm({ ...form, content: e.target.value })}
                                rows={6}
                                required
                            />
                        </div>

                        <div className="form-actions">
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={cancelEditing}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                className={`btn ${editingId ? 'btn-success' : 'btn-primary'}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="spinner"></div>
                                        {editingId ? 'Updating...' : 'Adding...'}
                                    </>
                                ) : (
                                    editingId ? (
                                        <>
                                            <span>💾</span> Update Note
                                        </>
                                    ) : (
                                        <>
                                            <span>➕</span> Add Note
                                        </>
                                    )
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Notes Grid */}
                {notes.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📝</div>
                        <h3>No notes yet</h3>
                        <p>Create your first note using the form above</p>
                    </div>
                ) : (
                    <div className="notes-grid">
                        {notes.map(note => (
                            <div key={note._id} className="note-card">
                                <div className="note-header">
                                    <h3 className="note-title">{note.title}</h3>
                                </div>

                                <div className="note-content">
                                    {note.content}
                                </div>

                                <div className="note-actions">
                                    <button
                                        onClick={() => startEditing(note)}
                                        className="btn-icon btn-edit"
                                        title="Edit note"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => deleteNote(note._id)}
                                        className="btn-icon btn-delete"
                                        title="Delete note"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
