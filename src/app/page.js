import Feed from "./Components/Feed";
import { Suspense } from "react";
import Categories from "./Components/Categories";
import PopularPost from "./Components/PopularPost";
import Searchbar from "./Components/Searchbar";
import AllPosts from "./Components/LoadingSkeletons/AllPosts";
import AsidebarLoader from "./Components/LoadingSkeletons/AsidebarLoader";

export default function Home() {
  return (
    <main className="mt-[10rem] min-h-screen px-8 py-3 mx-auto max-w-[1248px]">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {" "}
        <div className="w-full col-span-2">
          <h1 className="text-xl my-4 font-bold">Lastest Post</h1>
          <Suspense fallback={<AllPosts />}>
            <Feed />
          </Suspense>
        </div>
        <aside className="flex flex-col gap-8 ">
          <Searchbar />
          <Suspense fallback={<AsidebarLoader />}>
            <Categories />
          </Suspense>
          <Suspense fallback={<AsidebarLoader />}>
            <PopularPost />
          </Suspense>
        </aside>
      </section>
    </main>
  );
}
