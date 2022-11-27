import React, { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import PostedList from "./PostedList";

function PostedJobs() {
  return (
    <div>
      <DefaultLayout>
        <PostedList/>
      </DefaultLayout>
    </div>
  );
}

export default PostedJobs;
