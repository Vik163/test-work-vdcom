import './Contact.css';
import '../List/List-contacts.css';

import basket from '../../images/basket.png';
import edit from '../../images/edit.png';

export const Contact = (props) => {
  const { item, elementActive } = props;
  return (
    <li className={`contact ${item === elementActive && 'contact_active'}`}>
      <div className='contacts__item-square contact__item'></div>
      <p className='contact__item contact__cell-id'>{item.id}</p>
      <p className='contact__item contact__item-text contact__cell-name'>
        {item.name}
      </p>
      <p className='contact__item contact__cell-trn'>{item.trn}</p>
      <p className='contact__item contact__cell-year'>{item.year}</p>
      <p className='contact__item contact__cell-ard'>{item.ard}</p>
      <p className='contact__item contact__cell-number'>{item.number}</p>
      <p className='contact__item contact__item-text contact__cell-email'>
        {item.email}
      </p>
      <p className='contact__item contact__cell-phone'>{item.phone}</p>
      <p className='contact__item contact__cell-address'>{item.address}</p>
      <div className=' contact__cell-action'>
        <img className='contact__item-edit' src={edit} alt='Редактирование' />
        <img className='contact__item-basket' src={basket} alt='Корзина' />
      </div>
    </li>
  );
};
