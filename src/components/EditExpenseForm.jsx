import { useState } from 'react';
import styles from '../styles/EditExpenseForm.module.css';

const EditExpenseForm = ({ hideEditForm, dataIndex, expenseList, editBalance, editExpenseList, setTotalExpense }) => {
    const [formData, setFormData] = useState(expenseList[dataIndex]);
    const oldPrice = expenseList[dataIndex].price;
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value, // Update the specific field
        }));
    };
    return (
        <>
        <form className={styles.form} onSubmit={(e) => {
            e.preventDefault();
            editBalance(formData.price);
            hideEditForm(false); // Hide the form on submit
            expenseList[dataIndex] = formData;
            console.log(expenseList, formData);
            localStorage.setItem('expenseList', JSON.stringify(expenseList));
            setTotalExpense(oldPrice);
            editExpenseList([...expenseList]);
        }}>
            <button onClick={e => {
                hideEditForm(false);
            }} type='button'
            className={styles.closeButton}
            >x</button>
            <label>
                Item: <input 
                    type="text" 
                    name="name" // Add name attribute to link with handleInputChange
                    placeholder="e.g. Banana" 
                    value={formData.name} 
                    onChange={handleInputChange}
                    required 
                />
            </label>
            <label>
                Category: 
                <select 
                    name="category" // Add name attribute to link with handleInputChange
                    value={formData.category} 
                    onChange={handleInputChange}>
                    <option value="groceries">Groceries</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="travel">Travel</option>
                    <option value="other">Other</option>
                </select>
            </label>
            <label>
                Price: <input 
                    type="number" 
                    name="price" // Add name attribute to link with handleInputChange
                    value={formData.price} 
                    placeholder="Price" 
                    onChange={handleInputChange} 
                    required
                />
            </label>
            <label>
                Date: <input 
                    type="date" 
                    name="date" // Add name attribute to link with handleInputChange
                    value={formData.date} 
                    onChange={handleInputChange} 
                    required
                />
            </label>
            <button className={styles.addBtn} type='submit'>Add</button>
        </form>
        </>
    );
}

export default EditExpenseForm;
