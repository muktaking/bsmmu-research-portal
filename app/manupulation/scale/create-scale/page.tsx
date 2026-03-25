'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateScalePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    short_title: '',
    description: '',
    publisher: '',
    publication_link: '', // Keep publication_link as it's distinct from the uploaded PDF
    published_year: '', // We will treat this as a date input
    validation_year: '', // We will treat this as a date input
    tags: '', // Comma separated string
    validator_ids: '', // Comma separated string of numbers
    validator_names: '',
    pdfFile: null as File | null, // New field for the PDF file
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    // Set the selected file (first file if multiple are selected)
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Prepare data for the API
    const payload = {
      ...formData,
      validator_id: formData.validator_ids
        .split(',')
        .map((id) => parseInt(id.trim()))
        .filter((id) => !isNaN(id)),
      validator_name: formData.validator_names
        .split(',')
        .map((name) => name.trim())
        .filter((name) => name !== ''),
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ''),
      published_year: formData.published_year
        ? new Date(formData.published_year).toISOString()
        : null,
      validation_year: formData.validation_year
        ? new Date(formData.validation_year).toISOString()
        : null,
    };

    // Define the structure for the final payload to be sent via FormData
    interface FinalPayload {
      title: string;
      short_title: string;
      description: string;
      publisher: string;
      publication_link: string;
      published_year: string | null;
      validation_year: string | null;
      tags: string[];
      validator_id: number[];
      validator_name: string[];
    }

    const finalPayload: FinalPayload = {
      title: payload.title,
      short_title: payload.short_title,
      description: payload.description,
      publisher: payload.publisher,
      publication_link: payload.publication_link,
      published_year: payload.published_year,
      validation_year: payload.validation_year,
      tags: payload.tags,
      validator_id: payload.validator_id,
      validator_name: payload.validator_name,
    };

    const {
      pdfFile, // Extract pdfFile from formData
    } = formData;

    const formDataToSend = new FormData();

    // Append all fields from finalPayload to FormData
    for (const key in finalPayload) {
      const value = finalPayload[key as keyof FinalPayload];
      if (Array.isArray(value)) {
        // For array fields, append each item separately
        value.forEach((item) => formDataToSend.append(key, item.toString()));
      } else if (value !== null) {
        // Append non-null, non-array values
        formDataToSend.append(key, value.toString());
      }
    }

    // Append the PDF file if it exists
    if (pdfFile) {
      formDataToSend.append('pdf_file', pdfFile); // 'pdf_file' is the expected field name on the server
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/scales`,
        {
          method: 'POST',
          // IMPORTANT: Do NOT set 'Content-Type' header when sending FormData.
          // The browser will automatically set the correct 'Content-Type'
          // with the appropriate boundary for multipart/form-data.
          credentials: 'include',
          body: formDataToSend, // Send FormData object
        },
      );

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to create scale');
        } else {
          throw new Error(
            `Server Error: ${response.status} ${response.statusText}`,
          );
        }
      }

      alert('Scale created successfully!');
      // Redirect to list or detail page on success
      // router.push('/scales');
      // router.refresh();

      // Reset form
      setFormData({
        title: '',
        short_title: '',
        description: '',
        publisher: '',
        publication_link: '',
        published_year: '',
        validation_year: '',
        tags: '',
        validator_ids: '',
        validator_names: '',
        pdfFile: null, // Reset the file input
      });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto mt-10 max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Create New Scale
        </h1>

        {error && (
          <div className="mb-4 rounded border border-red-200 bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Titles */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Short Title *
              </label>
              <input
                type="text"
                name="short_title"
                required
                value={formData.short_title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Publisher */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Publisher
            </label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Publication Link
              </label>
              <input
                type="url"
                name="publication_link"
                value={formData.publication_link}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Published Date
              </label>
              <input
                type="date"
                name="published_year"
                value={formData.published_year}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Validation Date
              </label>
              <input
                type="date"
                name="validation_year"
                value={formData.validation_year}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Validators */}
          <div className="rounded-md bg-gray-50 p-4">
            <h3 className="text-md mb-2 font-semibold text-gray-700">
              Validators
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Validator IDs (comma separated) *
                </label>
                <input
                  type="text"
                  name="validator_ids"
                  required
                  placeholder="4, 5"
                  value={formData.validator_ids}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Validator Names (comma separated) *
                </label>
                <input
                  type="text"
                  name="validator_names"
                  required
                  placeholder="Alice, Bob"
                  value={formData.validator_names}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              placeholder="Psychology, Measurement"
              value={formData.tags}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* PDF File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload PDF
            </label>
            <input
              type="file"
              name="pdfFile"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {loading ? 'Creating...' : 'Create Scale'}
          </button>
        </form>
      </div>
    </>
  );
}
