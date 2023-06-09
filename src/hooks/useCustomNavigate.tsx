import { useNavigate } from "react-router-dom";

const useNavigateHook = () => {
  const navigation = useNavigate();
  const goTo = (to: string) => navigation(to);
  return { goTo };
};

export default useNavigateHook;
