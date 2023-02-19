import React, { useRef, useState } from "react";
import Input from '../../UI/Input';
import classes from "./MealItemForm.module.css";

function MealItemForm(props) {
  const amountInputRef = useRef();
  const [amountIsValid,setAmountIsValid] = useState(true)

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    // converting the entered amoiunt to a number..it is a string
    // in the enteredamount eventhough we gave type is number

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
        setAmountIsValid(false)
      return;
    }
    props.onAddToCart(enteredAmountNumber)
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div>
        <Input
         label="Amount"
         ref= {amountInputRef}
          input={{
           
            type: "number",
           
            id: "amount",
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1',
          }}
        />
        <button>+ Add</button>
        {!amountIsValid && <p>Enter valid inputs</p>}
      </div>
    </form>
  );
}

export default MealItemForm;
