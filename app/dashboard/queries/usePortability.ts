import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPortability = async () => {
  const res = await axios.get("/api/form");
  return res.data;
};

export const usePortability = () => {
  return useQuery({
    queryKey: ["portability"],
    queryFn: fetchPortability,
  });
};
