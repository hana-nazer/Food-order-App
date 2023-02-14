import React from 'react'
import Input from './Input'
import classes from './MealItemForm.module.css'

function MealItemForm() {
  return (
  
        <form className={classes.form}>
            <div>
                <Input input={{
                    type:'number',
                    label:'Amount',
                    id:'amount',
                    min:1,
                    max:5,
                    step:1,
                    defaultValue:1
                }}/>
                <button>+ Add</button>
            </div>
        </form>
    
  )
}

export default MealItemForm