'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import SignUpImg from '@/assets/images/signup.png';
import Image from 'next/image';

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: '',
    degree: '',
    institute: '1',
    gender: 'male',
    address: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  //const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result as string;
  //       setPreview(base64String);
  //       setFormData((prev) => ({ ...prev, image: base64String }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name, // This is usually the display name in better-auth
        //image: formData.image, // Standard image field for Better Auth
        // Additional fields must be defined in your server-side auth config & database schema
        firstname: formData.firstname,
        lastname: formData.lastname,
        phone: formData.phone,
        degree: formData.degree,
        institute: parseInt(formData.institute), // Convert to number if your schema expects an Int
        gender: formData.gender,
        address: formData.address,
      } as any,
      {
        // Optional: Add fetch options or hooks here
      },
    );

    if (error) {
      setError(error.message ?? 'Sign up failed');
      setLoading(false);
      return;
    }
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center p-4">
      <Card className="mx-auto flex w-full max-w-4xl overflow-hidden border-none shadow-2xl">
        {/* Left Side: Illustration Section */}
        <div className="relative hidden w-1/2 bg-muted lg:block">
          <Image
            src={SignUpImg}
            alt="Medical Research"
            className="h-full object-cover"
          />

          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-br from-custom-primary/90 to-black/60 p-10 text-white">
            <h2 className="text-4xl font-bold leading-tight">
              Join the PRABD Network
            </h2>
            <p className="mt-4 text-lg text-gray-200">
              Psychiatry Research Association of Bangladesh. Advance your
              research and collaborate with experts in the field.
            </p>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="flex w-full flex-col justify-center lg:w-1/2">
          <CardHeader className="space-y-1 px-8 pb-4 pt-8">
            <CardTitle className="text-3xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription className="text-base">
              Enter your details to register
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid grid-cols-1 gap-4 px-8 sm:grid-cols-2">
              {error && (
                <div className="col-span-1 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm font-medium text-destructive sm:col-span-2">
                  {error}
                </div>
              )}
              <div className="space-y-1">
                <label className="ml-1 text-sm font-semibold text-muted-foreground">
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="freud"
                  required
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                />
              </div>
              <div className="space-y-1">
                <label className="ml-1 text-sm font-semibold text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                />
              </div>
              <div className="space-y-1">
                <label className="ml-1 text-sm font-semibold text-muted-foreground">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                />
              </div>
              <div>
                <label className="ml-1 text-sm font-semibold text-muted-foreground">
                  First Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                  required
                />
              </div>

              <div>
                <label className="ml-1 text-sm font-semibold text-muted-foreground">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="ml-1 text-sm font-semibold text-muted-foreground">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="ml-1 text-sm font-semibold text-muted-foreground">
                  Degree / Qualifications
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                />
              </div>
              <div>
                <label className="ml-1 text-sm font-semibold text-muted-foreground">
                  Institute
                </label>
                <select
                  name="institute"
                  value={formData.institute}
                  onChange={handleChange}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                >
                  <option value="1">BMU</option>
                  <option value="2">NIMH</option>
                  <option value="3">SOMCH</option>
                  <option value="4">AFMC</option>
                  <option value="6">Foreign</option>
                  <option value="7">Local</option>
                </select>
              </div>

              <div>
                <label className="ml-1 text-sm font-semibold text-muted-foreground">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* Full Width Fields */}
              <div className="col-span-1 sm:col-span-2">
                <label className="ml-1 text-sm font-semibold text-muted-foreground">
                  Location / Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                />
              </div>

              {/* Profile Image Uploader */}
              {/* <div className="col-span-1 space-y-2 sm:col-span-2">
                <label className="ml-1 text-sm font-semibold text-muted-foreground">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-12 w-12 rounded-full border-2 border-primary/20 object-cover"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="flex h-11 w-full cursor-pointer rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90 focus:outline-none disabled:opacity-50"
                  />
                </div>
                <p className="ml-1 text-[10px] italic text-muted-foreground">
                  JPG, PNG or WebP. Max size 2MB recommended.
                </p>
              </div> */}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 px-8 pb-8 pt-2">
              <Button
                type="submit"
                className="h-11 w-full text-base font-bold shadow-lg shadow-primary/20"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  href="/authentication/signIn"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Log in here
                </Link>
              </div>
            </CardFooter>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default SignUpForm;
