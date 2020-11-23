import React from "react";
import useSWR from "swr";

export const useRequest = url => {
  if (!url) {
    throw new Error("Path is required");
  }
  const { data, error } = useSWR(url);

  if (error) {
    return <div> Error... </div>;
  }
  if (!data) {
    return <div> Loading... </div>;
  }

  return { data };
};
