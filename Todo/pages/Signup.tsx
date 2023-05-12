import React from 'react'
import styles from "../styles/auth.module.css"
import useSignup from '@/customHooks/useSignup'


const Signup = () => {

const {
    onSubmitHandler,
    loginpage,
    setemail,
    setpassword,
    setfirstname,
    setlastname,
    lastname,
    email,
    password,
    firstname,
    error,
    backerror,
}=useSignup()

  return (
<div className={styles.container}>
      <div className={styles.bgimage}>
          <div className={styles.center}>
              <div className={styles.container1}>
                  <br />
                  <h1 className={styles.textcenter}>Sign up</h1>
                  <br />
                  <br />
                  <div>
                      <div className={styles.hcentre}>
                          <div className={styles.inputgroup}>
                              <label className={styles.label}>Firstname</label>
                              <input
                                  type="text"
                                  placeholder="Enter your firstname"
                                  className={styles.input}
                                  id="firstname"
                                  value={firstname}
                                  onChange={(e) => setfirstname(e.target.value)}
                              />
                              {!firstname && <p className={styles.redinput}>{error}</p>}
                          </div>
                      </div>
                      <br />
                      <div className={styles.hcentre}>
                          <div className={styles.inputgroup}>
                              <label className={styles.label}>lastname</label>
                              <input
                                  type="text"
                                  placeholder="Enter your lastname"
                                  className={styles.input}
                                  id="lastname"
                                  value={lastname}
                                  onChange={(e) => setlastname(e.target.value)}
                              />
                              {!lastname && <p className={styles.redinput}>{error}</p>}
                          </div>
                      </div>
                      <br/>
                      <div className={styles.hcentre}>
                          <div className={styles.inputgroup}>
                              <label className={styles.label}>Email address</label>
                              <input
                                  type="email"
                                  id="Email"
                                  className={styles.input}
                                  placeholder="Enter your email"
                                  value={email}
                                  onChange={(e) => setemail(e.target.value)}
                              />
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
                                  onChange={(e) => setpassword(e.target.value)}
                              />
                              {!password && <p className={styles.redinput}>{error}</p>}
                          </div>
                      </div>
                      <br />
                      <br />
                      <div className={styles.hcentre}>            
                              <button className={styles.button} onClick={onSubmitHandler} >Sign up</button> :      
                      </div>
                      <div className={styles.hcentre}>            
                              <p className={styles.redinput}>{backerror}</p>     
                      </div>
                      <br />
                      <span className={styles.hcentre} >
                          <p>Already have an account?</p>
                          <p className={styles.link} onClick={loginpage}><b>Login</b></p>
                      </span>

                  </div>
              </div>
          </div>

      </div>
  </div>


  )
}

export default Signup