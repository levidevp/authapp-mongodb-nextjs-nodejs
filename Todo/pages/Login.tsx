import React from 'react'
import styles from "../styles/auth.module.css"
import useLogin from '@/customHooks/useLogin'

const Login = () => {
    const {
        signpage,
        onSubmitHandler,
        setemail,
        setpassword,
        email,
        password,
        error,
        Forgotpage,
        loginError
    } = useLogin()
    return (
        <div className={styles.container}>
            <div className={styles.bgimage}>
                <div className={styles.center}>
                    <div className={styles.container1}>
                        <br />
                        <h1 className={styles.textcenter}>Login</h1>
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
                            <div className={styles.hcentre}>
                                <div className={styles.inputgroup}>
                                    <label className={styles.label} >Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className={styles.input}
                                        id="Password"
                                        placeholder="Enter your Password"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)} />
                                    {!password && <p className={styles.redinput}>{error}</p> }
                                    <span >
                                
                                <span className={styles.link2} onClick={Forgotpage}><b>Forgot password</b></span>
                            </span> 
                                    
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className={styles.hcentre}>


                                <button className={styles.button} onClick={onSubmitHandler} >Login</button>

                            </div>
                            <br />
                            <div className={styles.hcentre}>
                                {loginError && <p className={styles.redinput}>{loginError}</p>}
                            </div>
                            <br />
                            <span className={styles.hcentre} >
                                <p>Create an account?</p>
                                <p className={styles.link} onClick={signpage}><b>Signup</b></p>
                            </span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login