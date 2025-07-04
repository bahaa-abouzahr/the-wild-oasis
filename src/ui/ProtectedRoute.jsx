import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // 1. Load the authenticated user
  const {isLoading, isAuthenticated} = useUser();
  const navigate = useNavigate();

  // 2. if there is NO authenticated user, redirect to the login page
  
  useEffect(function(){
    if(!isAuthenticated && !isLoading) navigate("/login")

    }, [isAuthenticated, isLoading, navigate]);

  // 3. While Loading, show a spinner
  if(isLoading) return (
    <FullPage>
      <Spinner />;
    </FullPage>
  )

  // 4. If there IS a user, render the app
  if(isAuthenticated) return children;
}

export default ProtectedRoute
