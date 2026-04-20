import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchContacts = async () => {
  const res = await axios.get("/api/contact");
  return res.data;
};

export const useContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });
};
