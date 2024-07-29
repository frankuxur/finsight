import useSignInWithGoogle from '../../hooks/useSignInWithGoogle'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'
import { useRef, useState } from 'react'
import * as Yup from 'yup'
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword'
import Loader from '../../components/loader/Loader'

const SignUp = ({ setAccesstype, accessType }) => {
  const { signInWithGoogle } = useSignInWithGoogle()
  const { signup, loading } = useSignUpWithEmailAndPassword()
  const [previewImage, setPreviewImage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const fileRef = useRef(null)
  const initialValues = {
    image: '',
    name: '',
    email: '',
    password: '',
  }
  const validationSchema = Yup.object().shape({
    image: Yup.string().trim().required('attach an image'),
    name: Yup.string().trim().required(),
    email: Yup.string().trim().email('enter a valid email').required('email is a required field'),
    password: Yup.string().min(6).trim().required(),
  })


  const setPreview = (e, formik) => {  
      if (!e.target.files.length) {
          formik.setFieldValue("image", '')
          setPreviewImage('')
          return
      }  
      formik.setFieldValue("image", e.target.files[0])
      setPreviewImage(URL.createObjectURL(e.target.files[0]))
  }


  return (
    <Formik
        onSubmit={(data) => signup(data)}
        initialValues={initialValues}
        validationSchema={validationSchema}
    >        
        {(formik) => (
            <FormikForm
                className={`home__form ${accessType === 'signup' ? 'active' : ''}`}
            >
                <header className="home__form-header">
                    <h2 className="home__form-title">
                        <i className="ri-user-add-line icon"></i>
                        <span>Create an account</span>
                    </h2>

                    <button className="home__form-close-button" type="button" onClick={() => setAccesstype('')}>
                        <i className="ri-close-line icon"></i>
                    </button>
                </header>

                <div className='home-form__field'>
                    <label htmlFor="" className="form__label">Upload Image</label>

                    <label htmlFor="image" className='upload-button'>
                        <i className="ri-upload-cloud-2-line icon"></i>
                        <span>Click or drop image</span>
                        <input 
                            ref={fileRef}
                            type="file" 
                            name="image" 
                            id="image" 
                            onChange={(e) => {
                                setPreview(e, formik)
                            }}
                            accept="image/*"
                        />

                        {previewImage ? (
                            <>
                                <img
                                    src={previewImage}
                                    alt="preview" 
                                    className='preview'
                                />
                                <button className="remove" type='button' onClick={(e) => {
                                    e.preventDefault()
                                    setPreviewImage('')
                                    formik.setFieldValue('image', '')
                                    fileRef.current.value = ''
                                }}>
                                    <i className="ri-close-circle-fill icon"></i>
                                </button>
                            </>
                        ) : null}
                    </label>

                    <div className="home-form__error-message">
                        <ErrorMessage name='image' component='span' />
                    </div>
                </div>
                

                <div className='home-form__field'>
                    <label className="home-form__label" htmlFor="">Name</label>
                    
                    <Field 
                        type="text"
                        className="home-form__input" 
                        name='name'
                    />

                    <div className="home-form__error-message">
                        <ErrorMessage name='name' component='span' />
                    </div>
                </div>
                
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
                            <span>Create Account</span>
                        )}
                    </button>    

                    <button type='button' className='home-form__button' onClick={signInWithGoogle}>
                        <i className="ri-google-fill icon"></i>
                        <span>Sign Up with Google</span>
                    </button>    
                </div>

                <p className="home__form-bottom-text">Already have an account? <span onClick={() => setAccesstype('login')}>Log in</span></p>
            </FormikForm>
        )}
    </Formik>
  )
}

export default SignUp