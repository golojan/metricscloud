import React from "react";
import PostFeed from "./PostFeed";
import { useAtom } from "jotai";
import { profileAtom } from "../store";

function AllPostFeeds() {
  const [profile] = useAtom(profileAtom);
  return (
    <>
      <PostFeed />
    </>
  );
}

export default AllPostFeeds;
