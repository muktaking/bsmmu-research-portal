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
    publication_link: '',
    server_link: '',
    published_year: '', // We will treat this as a date input
    validation_year: '', // We will treat this as a date input
    tags: '', // Comma separated string
    author_ids: '', // Comma separated string of numbers
    author_names: '', // Comma separated string
    validator_ids: '', // Comma separated string of numbers
    validator_names: '', // Comma separated string
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Prepare data for the API
    const payload = {
      ...formData,
      author_id: formData.author_ids
        .split(',')
        .map((id) => parseInt(id.trim()))
        .filter((id) => !isNaN(id)),
      author_name: formData.author_names
        .split(',')
        .map((name) => name.trim())
        .filter((name) => name !== ''),
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

    // Remove temporary string fields used for input
    const {
      author_ids,
      author_names,
      validator_ids,
      validator_names,
      ...finalPayload
    } = payload as any;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/scales`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(finalPayload),
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
        server_link: '',
        published_year: '',
        validation_year: '',
        tags: '',
        author_ids: '',
        author_names: '',
        validator_ids: '',
        validator_names: '',
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Server Link (PDF)
              </label>
              <input
                type="url"
                name="server_link"
                value={formData.server_link}
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

          {/* Authors */}
          <div className="rounded-md bg-gray-50 p-4">
            <h3 className="text-md mb-2 font-semibold text-gray-700">
              Authors
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Author IDs (comma separated) *
                </label>
                <input
                  type="text"
                  name="author_ids"
                  required
                  placeholder="1, 2, 3"
                  value={formData.author_ids}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Author Names (comma separated) *
                </label>
                <input
                  type="text"
                  name="author_names"
                  required
                  placeholder="John Doe, Jane Smith"
                  value={formData.author_names}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
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
