import { useState } from 'react';

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

// Использовал библиотеку компонентов, раньше с ней не сталкивался, поэтому так все неухожено. Решил так сэкономить на верстке сложных элементов
import SearchIcon from '@mui/icons-material/Search';

import { Search, SearchIconWrapper, StyledInputBase } from './ui';

function List(props) {
  const { contacts, signOut } = props;
  const [value, setValue] = useState('');
  const [index, setIndex] = useState(0); // индекс подмассива контактов
  const [indexSearchElement, setIndexSearchElement] = useState(null); // индекс подмассива контактов

  // Разбиваем массив контактов на подмассивы с установленным лимитом, и отображаем нужный подмассив ==
  function createArrContacts(contacts, size) {
    const arr = [];
    for (let i = 0; i < contacts.length; i += size) {
      const page = contacts.slice(i, i + size);
      arr.push(page);
    }
    return arr;
  }
  const arrContacts = createArrContacts(contacts, 9);

  const handlePage = (e) => {
    const target = e.target;
    setIndex(target.textContent - 1);
  };
  //==============================================================================

  // Значение  поиска =========================================
  const searchName = (e) => {
    setValue(e.target.value); // Получаю значение инпута
  };
  /* Нахожу по нему либо сам элемент, либо его индекс в массиве, а дальше необходимые действия. Пока выделяю найденный элемент. Захаркоженное имя    'Example' */
  const handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < arrContacts.length; i++) {
      arrContacts[i].find(
        (item, index) =>
          item.name.includes(value) &&
          setIndexSearchElement(arrContacts[i][index])
      );
      setIndex(i);
    }
  };

  return (
    <div className='list'>
      <img className='list__logo' src={logo} alt='Логотип' />

      <div className='list__header'>
        <form className='list__form' onSubmit={handleSubmit}>
          <Search>
            <SearchIconWrapper onClick={searchName}>
              <SearchIcon onClick={searchName} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search by Name...'
              inputProps={{ 'aria-label': 'search' }}
              onChange={searchName}
            />
          </Search>
        </form>

        <img className='user' src={userProfileImage} alt='Пользователь' />
      </div>

      {/* Выделение ссылки навигации можно реализовать с помощью path из useLocation */}
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
        <button className='list__logout' onClick={signOut}>
          <img className='list__logout-icon' src={logoutIcon} alt='иконка' />
          log out
        </button>
      </div>

      {/* Добавление контакта: по клику появляется попап с валидацией полей, заполняются данные и отправляется 'post' запрос, после подтверждения добавляется в массив. Также устроено редактирование полей элемента массива, только запрос 'put'. Удаляем из массива методом filter() по id после подтверждения запроса 'remove'  */}
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
              arrContacts[index].map((item, i) => (
                <Contact
                  item={item}
                  key={i}
                  index={i}
                  elementActive={indexSearchElement}
                />
              ))}
          </ul>
        </div>

        <ul className='contacts__pages'>
          {/* По индексу устанавил активную страницу. Со стрелками не связывался */}
          <li className='contacts__pages-item'>❮</li>
          {contacts &&
            arrContacts.map((item, i) => (
              <li
                className={`contacts__pages-link ${
                  index === i && 'contacts__pages-link-active'
                }`}
                key={i}
                onClick={handlePage}
              >
                {i + 1}
              </li>
            ))}

          <li className='contacts__pages-item'>❯</li>
        </ul>
      </div>
    </div>
  );
}

export default List;
