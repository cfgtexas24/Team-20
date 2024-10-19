// src/app/login/page.tsx
"use client";

import { SignIn } from '@clerk/clerk-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="login-container">
        <h1 className="text-2xl mb-4">Sign In</h1>
        <SignIn path="/login" routing="path" signUpUrl="/signup" />
      </div>
    </div>
  );
};

export default LoginPage;
