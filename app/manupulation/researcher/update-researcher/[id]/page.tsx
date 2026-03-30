'use client';

import { useState, FormEvent, ChangeEvent, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ResearcherType } from '@/types/researcher'; // Assuming ResearcherType is defined here

type Params = Promise<{ id: string }>;

export default function UpdateResearcherPage({ params }: { params: Params }) {
  const router = useRouter();
  const { id } = use(params);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    avatar: 'neutral', // This will store the current avatar URL/filename
    phone: '',
    degree: '',
    designation: '',
    institute: '1', // Stored as string for select input
    publication: '',
    awards: '',
    int_affiliation: '',
    editor_in_Journal: '',
  });

  useEffect(() => {
    const fetchResearcher = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/researchers/${id}`,
          {
            credentials: 'include',
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch researcher data');
        }
        const data: ResearcherType = await response.json();
        console.log(data);
        setFormData({
          firstname: data.firstname || '',
          lastname: data.lastname || '',
          email: data.email || '',
          avatar: data.avatar || 'neutral',
          phone: data.phone || '',
          degree: data.degree || '',
          designation: data.designation || '',
          institute: String(data.institute) || '1',
          publication: data.publication || '',
          awards: data.awards || '',
          int_affiliation: data.int_affiliation || '',
          editor_in_Journal: data.editor_in_Journal || '',
        });
        if (data.avatar && data.avatar !== 'neutral') {
          setPreviewUrl(`${process.env.NEXT_PUBLIC_API_URL}/${data.avatar}`);
        }
        setInitialDataLoaded(true);
      } catch (err: any) {
        setError(err.message || 'Error fetching researcher data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResearcher();
    }
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      // Revert to existing avatar if file is cleared
      if (formData.avatar && formData.avatar !== 'neutral') {
        setPreviewUrl(`${process.env.NEXT_PUBLIC_API_URL}/${formData.avatar}`);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // Only append if not the avatar field, as avatar is handled separately
      if (key !== 'avatar') {
        data.append(key, value);
      }
    });

    if (selectedFile) {
      data.append('avatar', selectedFile);
    } else {
      // If no new file is selected, but there was an existing avatar, send its path
      // Or send 'neutral' if no avatar was ever set
      data.append('avatar', formData.avatar);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/researchers/${id}`,
        {
          method: 'PATCH', // Use PUT for updates
          credentials: 'include',
          body: data,
        },
      );

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update researcher');
        } else {
          throw new Error(
            `Server Error: ${response.status} ${response.statusText}`,
          );
        }
      }

      alert('Researcher updated successfully!');
      router.push(`/researcher/${id}`); // Redirect to researcher profile
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialDataLoaded) {
    return <div className="p-5 text-center">Loading researcher data...</div>;
  }

  if (error && !initialDataLoaded) {
    return <div className="p-5 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Update Researcher: {formData.firstname} {formData.lastname}
      </h1>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- PERSONAL INFORMATION --- */}
        <div className="rounded-md bg-gray-50 p-4">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                name="firstname"
                required
                value={formData.firstname}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                name="lastname"
                required
                value={formData.lastname}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <div className="mt-1 flex items-center gap-4">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-12 w-12 rounded-full border border-gray-300 object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400">
                    No Img
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
            </div>
          </div>
        </div>
        {/* --- END PERSONAL INFORMATION --- */}

        {/* --- PROFESSIONAL INFORMATION --- */}
        <div className="rounded-md bg-gray-50 p-4">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Professional Information
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Degree
              </label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Institute
              </label>
              <select
                name="institute"
                value={formData.institute}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="1">BMU</option>
                <option value="2">NIMH</option>
                <option value="3">SOMCH</option>
                <option value="4">AFMC</option>
                <option value="6">Foreign</option>
                <option value="7">Local</option>
              </select>
            </div>
          </div>
        </div>
        {/* --- END PROFESSIONAL INFORMATION --- */}

        {/* --- RESEARCHER DETAILS --- */}
        <div className="rounded-md bg-gray-50 p-4">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Researcher Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Publications
              </label>
              <textarea
                name="publication"
                rows={3}
                value={formData.publication}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Awards
              </label>
              <textarea
                name="awards"
                rows={3}
                value={formData.awards}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                International Affiliation
              </label>
              <textarea
                name="int_affiliation"
                rows={3}
                value={formData.int_affiliation}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Editor in Journal
              </label>
              <textarea
                name="editor_in_Journal"
                rows={3}
                value={formData.editor_in_Journal}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
        {/* --- END RESEARCHER DETAILS --- */}

        <button
          type="submit"
          disabled={loading}
          className={`flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {loading ? 'Updating...' : 'Update Researcher'}
        </button>
      </form>
    </div>
  );
}
