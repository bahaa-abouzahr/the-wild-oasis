import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {

  const {mutate: signup, isLoading} = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => { // gets data as user from signup function in apiAuth.js
      toast.success('Account successfully created! Please verify the new account from the user\'s email address');
  
    }
  })

  return {signup, isLoading};
}