import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import Axios from 'axios';



const UserForm = ({touched, errors, status, values}) => {
  const [users, setUsers] = useState([]);

  useEffect (() => {
    status && setUsers(users => [...users, status]);
    }, [status])
  console.log(status)

    return (
    <div>   
     <Form>
        <label htmlFor='name'>Name</label>
        <Field name='name' placeholder='Write Your Name' />

        <label htmlFor='email'>Email</label>
        <Field name='email' placeholder='Write Your Email' />
          {touched.email && errors.email ? (
          <span className="error">{errors.email}</span>
           ) : null}

        <label htmlFor='password'>PassWord</label>
        <Field name='password' type='password' placeholder='Write Your PassWord' />
          {touched.password && errors.password ? (
          <span className="error">{errors.password}</span>
           ) : null}

        <label htmlFor='tos'>Read the Term Of Service</label>
        <Field className='tos' name='tos' type='checkbox' /> 

        <button type='submit'>Submit</button>
     </Form>
      {users.map(user => {
        return(
            <ul key={user.id}>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <li>{user.password}</li>
              <li>{user.tos}</li>
            </ul>
      )})} 
    </div>
    )
}

export default withFormik({
    mapPropsToValues: props => {
      return {
        name: props.name || "",
        email: props.email || "",
        password: props.password || "",
        tos: props.tos || false
      };
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email("Email must be valid.").required("Must include email."),
      password: Yup.string().required("PassWord is a required field!"),
      tos: Yup.boolean().oneOf([true], "Please check box.")
    }),
    handleSubmit: (values, formikBag) => {
        console.log('submitting', values);
      Axios.post('https://reqres.in/api/users', values)
      .then(res => {
        console.log('success', res);
        formikBag.setStatus(res.data);
         formikBag.resetForm();
      })
      .catch(err => console.log('Get request failed', err))
    }
  })(UserForm);