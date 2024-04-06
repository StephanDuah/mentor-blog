import Feed from "./Components/Feed";
import { Suspense } from "react";
import Categories from "./Components/Categories";
import PopularPost from "./Components/PopularPost";
import Searchbar from "./Components/Searchbar";
import AllPosts from "./Components/LoadingSkeletons/AllPosts";
import AsidebarLoader from "./Components/LoadingSkeletons/AsidebarLoader";
import AsideLayout from "./Components/AsideLayout";
import PaginationButtons from "./Components/PaginationButtons";

export default function Home({ searchParams }) {
  const currentPage = searchParams.page;
  return (
    <AsideLayout>
      <div className="w-full col-span-2">
        <h1 className="text-xl my-4 font-bold">Lastest Post</h1>
        <Suspense fallback={<AllPosts />}>
          <Feed currentPageNumber={currentPage} />
        </Suspense>
      </div>
    </AsideLayout>
  );
}
