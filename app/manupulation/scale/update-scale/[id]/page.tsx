'use client';

import { useState, useEffect, FormEvent, ChangeEvent, use } from 'react';
import { useRouter } from 'next/navigation';

type Params = Promise<{ id: string }>;

export default function UpdateScalePage({ params }: { params: Params }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [serverLink, setServerLink] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
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
    pdfFile: null as File | null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/scales/${id}`,
        );
        if (!response.ok) throw new Error('Failed to fetch scale data');
        const data = await response.json();

        setServerLink(data.server_link);

        setFormData({
          title: data.title || '',
          short_title: data.short_title || '',
          description: data.description || '',
          publisher: data.publisher || '',
          publication_link: data.publication_link || '',
          // Format ISO dates to YYYY-MM-DD for HTML date inputs
          published_year: data.published_year
            ? data.published_year.split('T')[0]
            : '',
          validation_year: data.validation_year
            ? data.validation_year.split('T')[0]
            : '',
          tags: data.tags ? data.tags.join(', ') : '',
          validator_ids: data.validator_id ? data.validator_id.join(', ') : '',
          validator_names: data.validator_name
            ? data.validator_name.join(', ')
            : '',
          pdfFile: null,
        });
      } catch (err: any) {
        setError(err.message || 'An error occurred while loading data');
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title: formData.title,
      short_title: formData.short_title,
      description: formData.description,
      publisher: formData.publisher,
      publication_link: formData.publication_link,
      published_year: formData.published_year
        ? new Date(formData.published_year).toISOString()
        : null,
      validation_year: formData.validation_year
        ? new Date(formData.validation_year).toISOString()
        : null,
      tags: formData.tags
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      validator_id: formData.validator_ids
        .split(',')
        .map((s) => parseInt(s.trim()))
        .filter((n) => !isNaN(n)),
      validator_name: formData.validator_names
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const formDataToSend = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formDataToSend.append(key, item.toString()));
      } else if (value !== null) {
        formDataToSend.append(key, value.toString());
      }
    });

    if (formData.pdfFile) {
      formDataToSend.append('pdf_file', formData.pdfFile);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/scales/${id}`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: formDataToSend,
        },
      );

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to update scale');
        } else {
          throw new Error(
            `Server Error: ${response.status} ${response.statusText}`,
          );
        }
      }

      alert('Scale updated successfully!');
      router.push(`/scale/${id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return <div className="p-10 text-center">Loading scale data...</div>;

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Update Scale</h1>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
                value={formData.validator_names}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          {serverLink && serverLink !== '' && (
            <>
              <p className="mb-2 font-bold">Document Preview</p>
              <div className="overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm">
                <iframe
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${serverLink}`}
                  className="h-[250px] w-full"
                  title="Scale PDF Document"
                />
              </div>
            </>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Update PDF (Optional)
          </label>
          <input
            type="file"
            name="pdfFile"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Leave blank if you don't want to change the document.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {loading ? 'Updating...' : 'Update Scale'}
        </button>
      </form>
    </div>
  );
}
