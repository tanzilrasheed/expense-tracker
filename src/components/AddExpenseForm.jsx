import styles from '../styles/AddExpenseForm.module.css';
// import { useState } from 'react';
// {name: 'banana', category: 'groceries', amount: 12, price: '120', date: '13-12-2004'}
const AddExpenseForm = ({ addExpense, formVisibility, setBalance, setTotalExpense}) => {
    let data =  {name: '', category: 'groceries', price: 0, date: ''};
    return (
        <>
        <form className={styles.form} onSubmit={(e) => {
            e.preventDefault();
            addExpense(data);
            formVisibility(false);
            setBalance(data.price);   // substracts price from total balance
            setTotalExpense(data.price);
        }}>
            <button onClick={e => {
                formVisibility(false);
            }} type='button'
            className={styles.closeButton}
            >x</button>
            <label>
                Item: <input type="text" placeholder="e.g. Banana" onChange={(e) => {
                    data.name = e.target.value;
                }}
                required />
            </label>
            <label>
                category: 
                <select onChange={e => {
                    data.category = e.target.value;
                }}>
                    <option value="groceries">Groceries</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="travel">Travel</option>
                    <option value="other">Other</option>
                </select>
            </label>
            <label>
                Price: <input type="number" placeholder="Price" required
                onChange={(e) => {
                    data.price = e.target.value;
                }}
                />
            </label>
            <label>
                Date: <input type="date" onChange={e => {
                    data.date = e.target.value;                    
                }} required/>
            </label>
            <button className={styles.addBtn} type='submit'>Add</button>
        </form>
        </>
    )
}


export default AddExpenseForm;




