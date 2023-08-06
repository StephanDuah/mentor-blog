import Image from "next/image";
import pic from "../../public/images/21.jpg";
import Hero from "./Components/Hero";
import Backdrop from "./Components/Modal/Backdrop";
import Page from "./Components/Modal/Page";
import { HiArrowUpRight } from "react-icons/hi2";

import Link from "next/link";
import Feed from "./Components/Feed";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Feed />
      </Suspense>
    </>
  );
}
