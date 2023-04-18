import { useState, useEffect } from 'react';

import './List.css';
import './List-contacts.css';

import { Contact } from '../Contact/Contact';

import logo from '../../images/LOGO.png';
import userProfileImage from '../../images/user.png';
import arrows from '../../images/arrows.png';
import logoutIcon from '../../images/logout.svg';
import contactsIcon from '../../images/contacts.svg';
import calendar from '../../images/calendar.svg';
import report from '../../images/report.svg';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { contacts } from '../../constants/constants';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
    width: '522px',
    height: '30px',
    backgroundColor: alpha(theme.palette.common.black, 0.08),
    // [theme.breakpoints.up('sm')]: {
    //   width: '12ch',
    //   '&:focus': {
    //     width: '20ch',
    //   },
    // },
  },
}));

function List() {
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState('');
  const [isToggle, setIsToggle] = useState(false);

  // Значение инпута поиска ----------------------
  const handleChange = (e) => {
    setValue(e.target.value);
    setIsError(e.target.validationMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggle = () => {
    setIsToggle(!isToggle);
  };
  return (
    <div className='list'>
      <img className='list__logo' src={logo} alt='Логотип' />

      <div className='list__header'>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search by Name...'
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <img className='user' src={userProfileImage} alt='Пользователь' />
      </div>

      <div className='list__navigation-container'>
        <ul className='list__links'>
          <li className='list__links-item list__links-item_active'>
            <a href='#' className='list__link'>
              <img
                className='list__link-icon'
                src={contactsIcon}
                alt='иконка'
              />{' '}
              Total Contacts
            </a>
          </li>
          <li className='list__links-item'>
            <a href='#' className='list__link'>
              <img className='list__link-icon' src={calendar} alt='иконка' />
              Calendar
            </a>
          </li>
          <li className='list__links-item'>
            <a href='#' className='list__link'>
              <img className='list__link-icon' src={report} alt='иконка' />
              Project Report
            </a>
          </li>
        </ul>
        <button className='list__logout'>
          <img className='list__logout-icon' src={logoutIcon} alt='иконка' />
          log out
        </button>
      </div>

      <div className='contacts'>
        <div className='contacts__header'>
          <h2 className='contacts__title'>Total Contacts</h2>
          <button className='add'>Add +</button>
        </div>
        <div className='contacts__container'>
          {/* Здесь можно разложить данные с помощью массива, но я не стал заморачиваться  */}
          <ul className='contacts__cap'>
            <li className='contacts__item-square'></li>
            <li className='contacts__cap-item  contact__cell-id'>
              <p className='contact__item-text'> Client ID</p>
              <img
                src={arrows}
                className='contacts__cap-arrows'
                alt='стрелки'
              />
            </li>
            <li className='contacts__cap-item contact__cell-name'>
              <p className='contact__item-text'>Client Name</p>
              <img
                src={arrows}
                className='contacts__cap-arrows'
                alt='стрелки'
              />
            </li>
            <li className='contacts__cap-item contact__cell-trn'>
              <p className='contact__item-text'>TRN/PPSN</p>
              <img
                src={arrows}
                className='contacts__cap-arrows'
                alt='стрелки'
              />
            </li>
            <li className='contacts__cap-item contact__cell-year'>
              <p className='contact__item-text'>Year end</p>
              <img
                src={arrows}
                className='contacts__cap-arrows'
                alt='стрелки'
              />
            </li>
            <li className='contacts__cap-item contact__cell-ard'>
              <p className='contact__item-text'>ARD</p>
              <img
                src={arrows}
                className='contacts__cap-arrows'
                alt='стрелки'
              />
            </li>
            <li className='contacts__cap-item contact__cell-number'>
              <p className='contact__item-text'>Company number</p>
              <img
                src={arrows}
                className='contacts__cap-arrows'
                alt='стрелки'
              />
            </li>
            <li className='contacts__cap-item contact__cell-email'>
              <p className='contact__item-text'>Email</p>
            </li>
            <li className='contacts__cap-item contact__cell-phone'>
              <p className='contact__item-text'>Phone number</p>
            </li>
            <li className='contacts__cap-item contact__cell-address'>
              <p className='contact__item-text'>Company address</p>
            </li>
            <li className='contacts__cap-item contact__cell-action'>Action</li>
          </ul>
          <ul className='contacts__item'>
            {contacts &&
              contacts.map((item, i) => <Contact item={item} key={i} />)}
          </ul>
        </div>

        <ul className='contacts__pages'>
          <li className='contacts__pages-item'>❮</li>
          <li className='contacts__pages-item'>
            <span className='contacts__pages-link contacts__pages-link-active'>
              1
            </span>
          </li>
          <li className='contacts__pages-item'>
            <span className='contacts__pages-link'>2</span>
          </li>
          <li className='contacts__pages-item'>
            <span className='contacts__pages-link'>3</span>
          </li>
          <li className='contacts__pages-item'>
            <span className='contacts__pages-link'>4</span>
          </li>
          <li className='contacts__pages-item'>❯</li>
        </ul>
      </div>
    </div>
  );
}

export default List;
