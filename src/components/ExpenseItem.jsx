import styles from '../styles/ExpenseItem.module.css'; 
import { useEffect, useRef } from 'react';

const ExpenseItem = ({expenseDetail, setWidth, setExpenseList, expenseList, index, showEditForm, setEditDataIndex, returnBalance}) => {
    const {name, category, price, date} = expenseDetail;
    
    const itemTextRef = useRef(null);

    const updateWidth = () => {
        if (itemTextRef.current) {
            const width = itemTextRef.current.getBoundingClientRect().width + 'px';
            setWidth(width);
        }
    };

    useEffect(() => {
        updateWidth();
    
        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    return (
        <div className={styles.item}>
            <div className={styles.itemContainer}>
                <div ref={itemTextRef} className={styles.itemText}>
                    <div>{name}</div>
                    <div>{category}</div>
                    <div>{price}</div>
                    <div>{date}</div>
                </div>
                <div className={styles.itemButtonContainer}>
                    <button onClick={() => {
                        setEditDataIndex(index);
                        showEditForm(true);
                    }}
                    >Edit</button>
                    <button 
                        onClick={() => {
                            const updatedList = expenseList.filter((_, idx) => idx !== index); // Use filter to create a new array
                            setExpenseList(updatedList); // Update the list with new array
                            returnBalance(price);
                        }}
                    >❌</button>
                </div>
            </div>
        </div>
    );
}

export default ExpenseItem;
