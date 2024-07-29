import useSignInWithGoogle from '../../hooks/useSignInWithGoogle'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Loader from '../../components/loader/Loader'
import useLoginWithEmailAndPassword from '../../hooks/useLoginWithEmailAndPassword'
import { useState } from 'react'

const Login = ({ setAccesstype, accessType }) => {
  const { signInWithGoogle } = useSignInWithGoogle()
  const { login, loading } = useLoginWithEmailAndPassword()
  const [showPassword, setShowPassword] = useState(false)
  const initialValues = {
    image: '',
    name: '',
    email: '',
    password: '',
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().email('enter a valid email').required('email is a required field'),
    password: Yup.string().min(6).trim().required(),
  })

  return (
    <Formik
        onSubmit={(data) => login(data)}
        initialValues={initialValues}
        validationSchema={validationSchema}
    >        
        {() => (
            <FormikForm
                className={`home__form ${accessType === 'login' ? 'active' : ''}`}
            >
                <header className="home__form-header">
                    <h2 className="home__form-title">
                        <i className="ri-login-circle-line icon"></i>
                        <span>Login</span>
                    </h2>

                    <button className="home__form-close-button" type="button" onClick={() => setAccesstype('')}>
                        <i className="ri-close-line icon"></i>
                    </button>
                </header>
                
                <div className='home-form__field'>
                    <label className="home-form__label" htmlFor="">Email</label>
                    
                    <Field 
                        type="email"
                        className="home-form__input" 
                        name='email'
                    />

                    <div className="home-form__error-message">
                        <ErrorMessage name='email' component='span' />
                    </div>
                </div>

                <div className='home-form__field'>
                    <label className="home-form__label" htmlFor="">Password</label>
                    
                    <div className="password">
                        <Field 
                            type={showPassword ? 'text' : 'password'}
                            className="home-form__input" 
                            name='password'
                        />
                        
                        <button onClick={() => setShowPassword(!showPassword)} type="button" className='toggle'>
                            <i className={`ri-eye${showPassword ? '' : '-off'}-line icon`}></i>
                        </button>
                    </div>

                    <div className="home-form__error-message">
                        <ErrorMessage name='password' component='span' />
                    </div>
                </div>

                <div className="home-form__buttons">
                    <button type='submit' className={`home-form__button ${loading ? 'active' : ''}`}>
                        {loading ? (
                            <Loader />
                        ) : (
                            <span>Login</span>
                        )}
                    </button>    

                    <button type='button' className='home-form__button' onClick={signInWithGoogle}>
                        <i className="ri-google-fill icon"></i>
                        <span>Continue with Google</span>
                    </button>    
                </div>

                <p className="home__form-bottom-text">Don't have an account? <span onClick={() => setAccesstype('signup')}>Sign up</span></p>

            </FormikForm>
        )}
    </Formik>
  )
}

export default Login