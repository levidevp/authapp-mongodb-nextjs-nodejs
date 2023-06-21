import React from 'react'
import styles from "../styles/auth.module.css"
import useForgot from '@/customHooks/useForgot'

const Forgotpassword = () => {
    const {
        onSubmitHandler,
        email,
        setemail,
        loginError,
        error,
    } = useForgot()
    return (
        <div className={styles.container}>
            <div className={styles.bgimage}>
                <div className={styles.center}>
                    <div className={styles.container1}>
                        <br />
                        <h1 className={styles.textcenter}>Forgot password</h1>
                        <br />
                        <br />
                        <br />
                        <div>
                            <br />
                            <div className={styles.hcentre}>
                                <div className={styles.inputgroup}>
                                    <label className={styles.label}>Email address</label>
                                    <input
                                        type="email"
                                        id="Email"
                                        className={styles.input}
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)} />
                                    {!email && <p className={styles.redinput}>{error}</p>}
                                </div>
                            </div>                            
                            <br />
                            <br />
                            <div className={styles.hcentre}>
                                <button className={styles.button} onClick={onSubmitHandler} >Sent link</button>
                            </div>
                            <br />
                            <div className={styles.hcentre}>
                                {loginError && <p className={styles.redinput}>{loginError}</p>}
                            </div>
                            <br />
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgotpassword