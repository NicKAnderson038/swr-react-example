import React from "react";
import useSWR from "swr";

baseUrl = 'https://data.police.uk/api/crimes-street/all-crime'

export const useRequest = query => {
  if (!query) {
    throw new Error("Path is required");
  }
  const { data, error } = useSWR(`${baseUrl}${query}`);

  if (error) {
    return <div> Error... </div>;
  }
  if (!data) {
    return <div> Loading... </div>;
  }

  return { data };
};
