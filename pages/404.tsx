import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="h-96 flex flex-col items-center justify-center">
      <h1 className="text-red-700 text-3xl font-bold text-center">
        Page not Found
      </h1>
      <Link href={"/"} className="mt-24 hover:text-green-500">
        Back To Home
      </Link>
    </div>
  );
};

export default PageNotFound;
