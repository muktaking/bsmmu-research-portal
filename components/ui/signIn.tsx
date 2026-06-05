'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
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

function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn.email({
      email: formData.email,
      password: formData.password,
    });

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
              Sign in to your account.
            </CardTitle>
            <CardDescription className="text-base">
              Enter your email and password to signIn.
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
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 px-8 pb-8 pt-2">
              <Button
                type="submit"
                className="h-11 w-full text-base font-bold shadow-lg shadow-primary/20"
                disabled={loading}
              >
                {loading ? 'Signing into account...' : 'Sign Into Account'}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Having no account?{' '}
                <Link
                  href="/authentication/signUp"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  SignUp here
                </Link>
              </div>
            </CardFooter>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default SignInForm;
