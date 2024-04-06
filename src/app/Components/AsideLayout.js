import React from "react";

import PopularPost from "./PopularPost";
import Searchbar from "./Searchbar";

import Categories from "./Categories";

import AsidebarLoader from "./LoadingSkeletons/AsidebarLoader";
import { Suspense } from "react";

const AsideLayout = ({ children }) => {
  return (
    <main className="mt-[10rem] min-h-screen px-8 py-3 mx-auto max-w-[1248px]">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {children}

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
};

export default AsideLayout;
