import { MdOutlineDarkMode } from 'react-icons/md';
import ButtonIcon from './ButtonIcon';
import { useDarkMode } from '../context/DarkModeContext';
import { HiOutlineSun } from 'react-icons/hi';

function ToggleDarkMode() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={() => toggleDarkMode()}>
      {isDark ? <HiOutlineSun /> : <MdOutlineDarkMode />}
    </ButtonIcon>
  );
}

export default ToggleDarkMode;
