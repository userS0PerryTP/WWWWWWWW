'use client'

import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';

interface ProductUploadFormProps {
  user: User;
}

export default function ProductUploadForm({ user }: ProductUploadFormProps) {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description) {
      setMessage('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setMessage('');

    const res = await fetch('/api/upload-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: name,
        productDescription: description,
        images, // handle actual file uploads separately
        sellerId: user.id,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || 'Upload failed.');
    } else {
      setMessage('Product uploaded and awaiting admin approval!');
      setName('');
      setDescription('');
      setImages([]);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Upload Product</h2>

      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      {/* Add your image upload inputs here */}

      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Product'}
      </button>

      {message && <p style={{ marginTop: 15 }}>{message}</p>}
    </form>
  );
}
