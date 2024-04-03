import Feed from "./Components/Feed";
import { Suspense } from "react";
import Categories from "./Components/Categories";

export default function Home() {
  return (
    <div className="mt-[10rem] min-h-screen px-8 py-3 mx-auto max-w-[1248px]">
      <Categories />
      <Suspense fallback={<div>Loading...</div>}>
        <Feed />
      </Suspense>
    </div>
  );
}
