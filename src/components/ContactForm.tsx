'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    // Placeholder: will connect to API route or mock submit
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Contact form submission:', formData);
    setStatus('sent');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">Name</label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">Email</label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">Message</label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all resize-none"
          placeholder="Tell us what's on your mind..."
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto px-8 py-3 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      >
        {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Sent!' : 'Send Message'}
      </button>
      {status === 'sent' && (
        <p className="text-emerald-600 text-sm animate-fade-in">Thank you! We'll get back to you soon.</p>
      )}
    </form>
  );
}
