import React from 'react'
import styles from "../../styles/auth.module.css"
import useReset from '@/customHooks/useReset'

const Login = () => {
    const {
        error,
        loginError,
        passworda,
        password_confirmation,
        onSubmitHandler,
        setpassworda,
        setpassword_confirmation,
    } = useReset()
    return (
        <div className={styles.container}>
            <div className={styles.bgimage}>
                <div className={styles.center}>
                    <div className={styles.container1}>
                        <br />
                        <h1 className={styles.textcenter}>Set New Password</h1>
                        <br />
                     
                       
                        <div>

                            <br />
                            <div className={styles.hcentre}>
                                <div className={styles.inputgroup}>
                                    <label className={styles.label} >Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className={styles.input}
                                        id="Password"
                                        placeholder="Enter your Password"
                                        value={passworda}
                                        onChange={(e) => setpassworda(e.target.value)} />
                                    {!passworda && <p className={styles.redinput}>{error}</p>}
                                    

                                </div>
                            </div>
                            <br />
                            <div className={styles.hcentre}>
                                <div className={styles.inputgroup}>
                                    <label className={styles.label} >Confrim Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className={styles.input}
                                        id="Password"
                                        placeholder="Confrim your Password"
                                        value={password_confirmation}
                                        onChange={(e) => setpassword_confirmation(e.target.value)} />
                                    {!password_confirmation && <p className={styles.redinput}>{error}</p>}
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className={styles.hcentre}>


                                <button className={styles.button} onClick={onSubmitHandler} >Enter</button>

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

export default Login