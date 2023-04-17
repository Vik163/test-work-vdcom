import { useState, useEffect } from 'react';

import './List.css';
import './ListContacts.css';

import logo from '../../images/LOGO.png';
import userProfileImage from '../../images/user.png';
import arrows from '../../images/arrows.png';
import logoutIcon from '../../images/logout.svg';
import contacts from '../../images/contacts.svg';
import calendar from '../../images/calendar.svg';
import report from '../../images/report.svg';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

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

      <div className='list__table'>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search by Name...'
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <img className='list__user' src={userProfileImage} alt='Пользователь' />
      </div>

      <div className='list_navigation-container'>
        <ul className='list__links'>
          <li className='list__links-item list__links-item_active'>
            <a href='#' className='list__link'>
              <img className='list__link-icon' src={contacts} alt='иконка' />{' '}
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
      <div className='list__contacts'>
        <div className='list__contacts-header'>
          <h2 className='list__contacts-title'>Total Contacts</h2>
          <button className='list__add'>Add +</button>
        </div>
        <div className='list__contacts-container'>
          <ul className='list__contacts-table'>
            <li className='list__contacts-table-item'>
              <span className='list__contacts-item-square'></span> Client ID
              <img
                src={arrows}
                className='list__contacts-table-arrows'
                alt='стрелки'
              />
            </li>
            <li className='list__contacts-table-item'>
              Client Name{' '}
              <img
                src={arrows}
                className='list__contacts-table-arrows'
                alt='стрелки'
              />
            </li>
            <li className='list__contacts-table-item'>
              TRN/PPSN{' '}
              <img
                src={arrows}
                className='list__contacts-table-arrows'
                alt='стрелки'
              />
            </li>
            <li className='list__contacts-table-item'>
              Year end{' '}
              <img
                src={arrows}
                className='list__contacts-table-arrows'
                alt='стрелки'
              />
            </li>
            <li className='list__contacts-table-item'>
              ARD{' '}
              <img
                src={arrows}
                className='list__contacts-table-arrows'
                alt='стрелки'
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </li>
            <li className='list__contacts-table-item'>
              Company nu...{' '}
              <img
                src={arrows}
                className='list__contacts-table-arrows'
                alt='стрелки'
              />
            </li>
            <li className='list__contacts-table-item'>
              Email
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </li>
            <li className='list__contacts-table-item'>Phone number</li>
            <li className='list__contacts-table-item'>Company address</li>
            <li className='list__contacts-table-item'>Action</li>
          </ul>
        </div>
        <ul className='list__contacts-pages'>
          <li className='list__contacts-pages-item'>❮</li>
          <li className='list__contacts-pages-item'>
            <span className='list__contacts-pages-link list__contacts-pages-link-active'>
              1
            </span>
          </li>
          <li className='list__contacts-pages-item'>
            <span className='list__contacts-pages-link'>2</span>
          </li>
          <li className='list__contacts-pages-item'>
            <span className='list__contacts-pages-link'>3</span>
          </li>
          <li className='list__contacts-pages-item'>
            <span className='list__contacts-pages-link'>4</span>
          </li>
          <li className='list__contacts-pages-item'>❯</li>
        </ul>
      </div>
    </div>
  );
}

export default List;
