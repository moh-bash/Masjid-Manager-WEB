import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          <div>
            <Link
              href="/"
              className="text-2xl font-bold"
            >
              مسجدي
            </Link>

            <p className="mt-3 max-w-md text-sm leading-7 text-neutral-400">
              منظومة تجمع المساجد وحلقات القرآن والعلوم الشرعية، وتبقي
              صلة ولي الأمر برحلة أبنائه التعليمية حاضرة.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-neutral-400">
            <Link
              href="/"
              className="transition-colors hover:text-white"
            >
              الرئيسية
            </Link>

            <Link
              href="/mosques"
              className="transition-colors hover:text-white"
            >
              المساجد
            </Link>

            <Link
              href="/posts"
              className="transition-colors hover:text-white"
            >
              المنشورات
            </Link>

            <Link
              href="/login"
              className="transition-colors hover:text-white"
            >
              تسجيل الدخول
            </Link>
          </nav>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} مسجدي — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}