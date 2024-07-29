import { useContext, useEffect, useState } from 'react'
import './form.css'
import useCreateTransaction from '../../hooks/useCreateTransaction'
import Loader from '../loader/Loader'
import { DrawerContext } from '../../context/DrawerContext'
import useUpdateTransaction from '../../hooks/useUpdateTransaction'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Form = () => {
  const { isLoading, handleCreateTransaction } = useCreateTransaction()
  const { showDrawer, setShowDrawer, drawerData, setDrawerData } = useContext(DrawerContext)
  const { isUpdating, handleUpdateTransaction } = useUpdateTransaction()
  const [initialValues, setInitialValues] = useState({    
      description: '',
      amount: '',
      type: '',
      category: '',
      paymentMethod: '',
  })

  const typeList = ['Credit', 'Debit']
  const categoryList = [{
    title: 'credit',
    list: [
        'Salary',
        'Pocket Money',
        'Donation',
        'Bonus',
        'Sellings',
        'Interest',
        'Gift',
        'Miscellaneous',
    ]
  },
  {
    title: 'debit',
    list: [
        'Grocery',
        'Food',
        'Repair',
        'Clothes',
        'Shoes',
        'Electricity',
        'Vehicle',
        'Electronics',
        'Stationary',
        'Medicine',
        'Household',
        'Cosmetics',
        'Rent',
        'Donation',
        'Furniture',
        'Books',
        'Miscellaneous',
    ]
  }]
  const methodList = ['Cash', 'Card', 'Net Banking', 'Cheque', 'Online']
  
  const handleSubmit = (data, { resetForm }) => {
    if (showDrawer) {
      editTransaction(data)
    } else {
      addTransaction(data, resetForm)
    }
  }

  const addTransaction = (data, resetForm) => {
    const { description, amount, type, category, paymentMethod } = data
    handleCreateTransaction(description, amount, type, category, paymentMethod)
    resetForm()
  }

  const editTransaction = (data) => {
    const { id, createdBy, createdOn } = drawerData
    handleUpdateTransaction({ id, createdBy, createdOn, ...data })
    setTimeout(() => {
      setDrawerData({})
    }, 2000);
  }

  // sets form inputs as transactions values for editing
  useEffect(() => {
    if (drawerData.id) {
      const { id, createdOn, createdBy, ...data } = drawerData
      setInitialValues(data)
    }
  }, [drawerData])

  // waits for 'x(400)'seconds after isUpdating turns false(updation stops) until it closes drawer
  useEffect(() => {
    let timer
    if (!isUpdating) {
      timer = setTimeout(() => {
        setShowDrawer(false)
      }, 400);
    }

    return () => clearTimeout(timer)
  }, [isUpdating])


  // formik values & validation
  const numberRegex = /^[0-9]+$/
  const validationSchema = Yup.object().shape({
    description: Yup.string().max(50, 'description should not exceed 50 characters').required(),
    amount: Yup.string().matches(numberRegex, 'amount you typed is invalid').required(),
    type: Yup.string().required(),
    category: Yup.string().required(),
    paymentMethod: Yup.string().required(),
  })
  
  return (
      <Formik 
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
      >

        {(formik) => (
          <FormikForm className={`form ${showDrawer ? 'edit' : ''}`}>
            <div className={`form__field ${showDrawer ? 'edit' : ''}`}>
                <label htmlFor="" className="form__label">Description</label>

                <Field 
                    placeholder='Enter description' 
                    className="form__input" 
                    autoCorrect='false'
                    name="description"
                    as='textarea'
                />

                <div className="form__error-message">
                  <ErrorMessage name='description' component='span' />
                </div>
            </div>
            
            <div className={`form__field amount ${showDrawer ? 'edit' : ''}`}>
                <label htmlFor="" className="form__label">Amount</label>

                <Field 
                  type="text" 
                  placeholder="Enter amount" 
                  className="form__input" 
                  autoCorrect='false' 
                  name="amount"
                />

                <div className="form__error-message">
                  <ErrorMessage name='amount' component='span' />
                </div>
            </div>
            
            <div className="form__field type">
              <label htmlFor="" className="form__label">Type</label>
                
              <div className="form__field-button-group">
                {typeList.map((t, i) => (
                  <button 
                    key={i} 
                    type='button'
                    className={`form__field-button ${formik.getFieldMeta('type').value === t ? 'active' : ''}`}
                    onClick={() => {
                      formik.setFieldValue('type', t)
                      formik.setFieldValue("category", '')
                    }}
                    >{t}</button>
                ))}
              </div>
              
              <div className="form__error-message">
                <ErrorMessage name='type' component='span' render={() => 'select a transaction type'}  />
              </div>
            </div>
            
            <div className="form__field category">
              <label htmlFor="" className="form__label">Category</label>
              
              <div className="form__field-category-group">
                {categoryList.map(({title, list}, i) => (
                    <div 
                      key={i} 
                      className={`form__field-category ${formik.getFieldMeta('type').value.toLowerCase() === title ? 'active' : ''}`}
                    > 
                      <h3 className='form__field-category-title'>{title}</h3>
                      <ul className='form__field-button-group'>
                        {list.map((c, i) => (
                          <li key={i}>
                              <button 
                                onClick={() => formik.setFieldValue('category', c)}
                                type='button'
                                className={`form__field-button ${(formik.getFieldMeta('category').value === c && formik.getFieldMeta('type').value.toLowerCase() === title) ? 'active' : ''}`}
                              >{c}</button>
                          </li>
                        ))}
                      </ul>
                  </div>
                ))}
              </div>
              
              <div className="form__error-message">
                <ErrorMessage name='category' component='span' render={() => 'select a category'}  />
              </div>
            </div>
            
            <div className="form__field">
              <label htmlFor="" className="form__label">Payment Method</label>
              
              <div className="form__field-button-group">
                {methodList.map((m, i) => (
                  <button 
                    key={i} 
                    type='button'
                    onClick={() => formik.setFieldValue('paymentMethod', m)}
                    className={`form__field-button ${formik.getFieldMeta('paymentMethod').value === m ? 'active' : ''}`}
                  >{m}</button>
                ))}
              </div>
              
              <div className="form__error-message">
                <ErrorMessage name='paymentMethod' component='span' render={() => 'select a payment method'} />
              </div>
            </div> 

            <button type='submit' className={`form__button ${isLoading ? 'active' : isUpdating ? 'edit' : ''}`}>
              {isLoading || isUpdating ? (
                <Loader />
              ) : (
                showDrawer || drawerData.id ? (
                  <>
                    <span>Save</span>
                    <i className="ri-upload-line icon"></i>       
                  </>
                ) : (
                  <>
                    <span>Add Transaction</span>
                    <i className="ri-add-line icon"></i>       
                  </>
                )
              )}
            </button>       
          </FormikForm>
        )}
      </Formik>
  )
}

export default Form