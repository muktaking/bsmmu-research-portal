'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

export default function CreateResearchersByUploadingCSV() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a CSV file first.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/researchers/upload/csv`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to upload CSV file.');
      }

      setMessage({
        type: 'success',
        text: 'Researchers uploaded successfully!',
      });
      setFile(null);
      // Reset the file input
      const input = document.getElementById('csv-upload') as HTMLInputElement;
      if (input) input.value = '';
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.message || 'An unexpected error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-xl rounded-xl bg-white p-8 shadow-lg dark:bg-slate-900">
      <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
        Bulk Upload Researchers
      </h1>
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        Upload a CSV file containing researcher details. Ensure the headers
        match the required format.
      </p>

      {message && (
        <div
          className={`mb-6 rounded-lg p-4 text-sm font-medium ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
              : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="csv-upload"
            className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Select CSV File
          </label>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full cursor-pointer rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500 file:mr-4 file:border-0 file:bg-blue-600 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
          />
          <p className="text-xs text-slate-400">Supported format: .csv</p>
        </div>

        <button
          type="submit"
          disabled={loading || !file}
          className={`flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-bold text-white transition-all ${
            loading || !file
              ? 'cursor-not-allowed bg-slate-300 dark:bg-slate-700'
              : 'bg-blue-600 shadow-md shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98]'
          }`}
        >
          {loading ? 'Uploading...' : 'Upload Researchers'}
        </button>
      </form>
    </div>
  );
}
