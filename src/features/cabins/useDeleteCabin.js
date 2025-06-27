import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient(); // to get access to queryClient

  const {mutate: deleteCabin, isLoading: isDeleting} = useMutation({
    // mutationFn: (id) => deleteCabinApi(id),
    mutationFn: deleteCabinApi, // since we are inputing the same value that we are calling
    onSuccess: () => { /*  telling react-query what to do as soon as mutation is successfull */ 
      toast.success('Cabin successfully deleted');
      queryClient.invalidateQueries({ // invalidating cache,
        queryKey: ['cabins'],
      })
    },
    onError: err => toast.error(err.message),
  });

  return {deleteCabin, isDeleting};

}

