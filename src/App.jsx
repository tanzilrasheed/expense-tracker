import { useState } from 'react';
import AddExpenseForm from './components/AddExpenseForm.jsx';
import './styles/App.css';
import styles from './styles/App.module.css';
import ExpenseList from './components/ExpenseList.jsx';
import EditExpenseForm from './components/EditExpenseForm.jsx';


const App = () => {
    const [expenseList, setExpenseList] = useState(Array.isArray(JSON.parse(localStorage.getItem('expenseList'))) ? JSON.parse(localStorage.getItem('expenseList')): []);
    const [isFormVisible, setFormVisible] = useState(false);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [editDataIndex, setEditDataIndex] = useState(null);     // data to pass to EditExpenseData to change the data
    const [totalExpense, setTotalExpense] = useState(localStorage.getItem('totalExpense') ? localStorage.getItem('totalExpense'): 0);
    const [balance, setBalance] = useState((localStorage.getItem('balance')) || localStorage.getItem === 'NaN' ? localStorage.getItem('balance'): 0);
    return (
        <>
        {isEditFormVisible && 
        <div className={styles.formContainer}> 
            <div className={styles.form}> 




                {/* edit form expense */}




                <EditExpenseForm
                setTotalExpense={oldPrice => {
                    let newTotal = Number(totalExpense) - Number(oldPrice) + Number(expenseList[editDataIndex].price);
                    localStorage.setItem('totalExpense', newTotal);
                    console.log(newTotal, 'newTotal');
                    setTotalExpense(newTotal);
                }}
                editExpenseList={newExpenseList => {
                    setExpenseList(newExpenseList)
                }}
                editBalance={newPrice => {
                    let newBalance = Number(balance) + Number(expenseList[editDataIndex].price) - newPrice;
                    localStorage.setItem('balance', newBalance)
                    setBalance(newBalance);
                }}
                dataIndex={editDataIndex}
                hideEditForm={(v) => {
                    setEditFormVisible(v);
                }}
                expenseList={expenseList}
                setExpenseList={(newExpenseList) => {
                    setExpenseList(newExpenseList);
                }}
                />
            </div>
        </div>
        }
        {isFormVisible && 
        <div className={styles.formContainer}> 
            <div className={styles.form}>


                {/* AddExpenseForm */}



                <AddExpenseForm addExpense={(data) => {
                    let newList = [...expenseList, data];
                    console.log(newList, 'list');
                    localStorage.setItem('expenseList', JSON.stringify(newList));
                    setExpenseList(newList);
                }} 
                expenseList={expenseList}
                setBalance={price => {
                    localStorage.setItem('balance', balance - price);
                    setBalance(balance - price);
                }}
                setTotalExpense={price => {
                    let newTotal = Number(totalExpense) + Number(price);
                    localStorage.setItem('totalExpense', Number(totalExpense) + Number(price))
                    setTotalExpense(Number(totalExpense) + Number(price));
                }}
                formVisibility={v => {
                    setFormVisible(v);
                }}/>
            </div>
        </div>}
        <div className={styles.mainContent}>
            <h1 className={styles.heading}>Expense Tracker</h1>
            <div className={styles.balanceContainer}>
                <div>
                    Balance
                    <button onClick={() => {
                        let addedBalance = Number(prompt('Enter amount to add'))
                        if (isNaN(Number(addedBalance))) {
                            alert('Enter a valid number, please.');
                        }
                        else {
                            localStorage.setItem('balance', addedBalance + Number(balance));
                            setBalance(addedBalance + Number(balance));
                        }
                    }}>add</button>
                </div>
                <p id='balanceAmt'>₹{balance}</p>
            </div>
        <div id='listContainer'>
            <ExpenseList 
                setEditDataIndex={(inx) => {
                    setEditDataIndex(inx);
                }} // sending to item
                returnBalance={price => {          // sending to item
                    let newBalance = Number(balance) + Number(price);
                    localStorage.setItem('balance', newBalance)
                    setBalance(newBalance);
                    localStorage.setItem('totalExpense', totalExpense - price);
                    setTotalExpense(totalExpense - price);
                }}
                expenseList={JSON.parse(localStorage.getItem('expenseList')) ? JSON.parse(localStorage.getItem('expenseList')) : []}
                setExpenseList={(data) => {       // passing to ExpenseListItem
                    localStorage.setItem('expenseList', JSON.stringify(data));
                    setExpenseList(data);
                }}
                showEditForm={(show) => {       // sending to ExpenseItem
                    setEditFormVisible(show);
                }}
            />
                <div className={styles.expenseDiv}>
                    <div>
                        Total Expenses 
                        <button onClick={() => {
                            setFormVisible(true);
                        }}>Add Expense</button>
                        <span className={styles.expenseValue}>₹{totalExpense}</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


export default App;