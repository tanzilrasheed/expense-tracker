import ExpenseItem from './ExpenseItem.jsx';
import styles from '../styles/ExpenseList.module.css';
import { useState, useRef, useEffect } from 'react';

const ExpenseList = ({ expenseList, setExpenseList, showEditForm, setEditDataIndex, returnBalance }) => {
    
    const [width, setWidth] = useState(null);
    const headingDiv = useRef(null);
    useEffect(() => {
        if (headingDiv.current) {
            headingDiv.current.style.width = width;
        }
    }, [width]);
    return (
        <>
        <div className={styles.listContainer}>
            <div className={styles.headingDivContainer}>
                <div ref={headingDiv} className={styles.heading} id='headingDiv'>
                    <div>Item</div>
                    <div>Category</div>
                    <div>Price</div>
                    <div>Date</div>
                </div>
            </div>
            {expenseList.map((v, i) => {
                return (
                    <ExpenseItem
                    returnBalance={returnBalance}
                    setEditDataIndex={setEditDataIndex}
                    key={i} 
                    index={i}
                    expenseDetail={v} 
                    setWidth={(width) => setWidth(width)} 
                    setExpenseList={setExpenseList}
                    expenseList={expenseList}
                    showEditForm={showEditForm}
                    />
                )})
            }
        </div>
        </>
    );
};
export default ExpenseList;