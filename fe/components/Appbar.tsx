import { signIn, signOut, useSession } from "next-auth/react";

export default function Appbar() {
  const session = useSession();

  return (
    <header className=" bg-neutral-100 h-[70px] flex justify-between items-center px-8 py-4 rounded-t-lg">
      <h1 className="font-title text-2xl text-primary">Stack-Muzic</h1>

      <nav className="space-x-6">
        <a
          href="#"
          className="text-neutral-600 hover:text-red-500 hover:border-b border-orange-200 duration-500 "
        >
          Home
        </a>
        <a
          href="#"
          className="text-neutral-600 hover:text-primary hover:text-red-500 hover:border-b border-orange-200 duration-500"
        >
          Features
        </a>
        <a
          href="dashboard"
          className="text-neutral-600 hover:text-primary hover:text-red-500 hover:border-b border-orange-200 duration-500"
        >
          Room
        </a>
        <a
          href="#"
          className="text-neutral-600 hover:text-primary hover:text-red-500 hover:border-b border-orange-200 duration-500"
        >
          Contact
        </a>
      </nav>
      {!session.data?.user ? (
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => signIn()}
            className="border border-primary text-primary rounded-md px-4 py-2"
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => signOut()}
            className=" border px-5 py-2 rounded-[15px] hover:border-red-500 hover:text-red-500 "
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
