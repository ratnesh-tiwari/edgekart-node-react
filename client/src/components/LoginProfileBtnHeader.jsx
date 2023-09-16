import { HiOutlineUser } from 'react-icons/hi';
import ButtonIcon from '../ui/ButtonIcon';
import { useAuth } from '../context/AuthenticationContext';
import { useNavigate } from 'react-router-dom';

function LoginProfileBtnHeader() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    if (isAuthenticated) {
      navigate('/user');
    } else {
      navigate('/login');
    }
  }

  return (
    <ButtonIcon onClick={handleClick}>
      <HiOutlineUser />
    </ButtonIcon>
  );
}

export default LoginProfileBtnHeader;
