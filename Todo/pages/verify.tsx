import useVerify from '@/customHooks/useVerify'
import React from 'react'
import styles from "../styles/auth.module.css"


const verify = () => {
    const {
        onSubmitHandler,
        input,
        setinput,
        backerror,
    } = useVerify()
    return (
        <>
            <h1>verify</h1>
            <label >Verify</label>
            <button onClick={onSubmitHandler}>click me</button>
            <input
                type="text"
                placeholder="Enter your verify (6 digits)"
                id="verify"
                value={input}
                onChange={(e) => {
                    const userInput = e.target.value;
                    const sanitizedInput = userInput.replace(/[^0-9]/g, '').substring(0, 6);
                    setinput(sanitizedInput);
                }}
                title="Please enter a verification number"
            />

            <div className={styles.hcentre}>
                <p className={styles.redinput}>{backerror}</p>
            </div>
        </>
    )
}

export default verify