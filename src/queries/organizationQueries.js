import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOrganizations,
  createOrganization,
} from "../services/organization.service";
import { queryKeys } from "./queryKeys";

export function useOrganizations() {
  return useQuery({
    queryKey: queryKeys.organizations,
    queryFn: getOrganizations,
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrganization,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKeys.organizations,
      });
    },
  });
}
