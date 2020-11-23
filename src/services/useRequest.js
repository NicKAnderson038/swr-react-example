import React from "react";
import { isUndefined } from 'lodash'
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
  console.log(data)
  const res = isUndefined(data) ? [] : data 
  return { data };
};
