import { HiOutlineLogout } from 'react-icons/hi';
import ButtonIcon from '../ui/ButtonIcon';
import { useAuth } from '../context/AuthenticationContext';

function LogoutBtnHeader() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return;
  return (
    <ButtonIcon>
      <HiOutlineLogout />
    </ButtonIcon>
  );
}

export default LogoutBtnHeader;
