// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#872341] via-[#BE3144] to-[#09122C] text-white">
      <div className="max-w-2xl p-8 text-center">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          AI Content Generator
        </h1>
        <p className="text-lg mb-8 text-gray-200">
          Effortlessly create high-quality content with the power of AI. Start
          generating amazing content today!
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-white text-[#09122C] font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
