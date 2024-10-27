'use client';
import Button from '@/components/Button';
import FieldError from '@/components/FieldError';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface SignupForm {
  username    :string
  password    :string
  repassword  :string
}

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Required').trim(),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  repassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});


const SignupPage = () => {

  const formik = useFormik<SignupForm>({
    initialValues: { username: '', password: '', repassword: '' },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log('Form Submitted:', values);
      // Handle your form submission here, such as calling an API
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}
      className='w-[600px] mx-auto mt-10 flex flex-col gap-4 bg-blue-50 px-10 py-12 rounded shadow-card items-center'
    >
      <div className='flex flex-col gap-1 w-[80%]'>
        <label htmlFor="username"> Username </label>
        <input
          type="text"
          id="username"
          {...formik.getFieldProps('username')}
          className='w-[100%] h-[40px] rounded px-2'
        />
        {formik.touched.username && formik.errors.username ? (
          <FieldError>{formik.errors.username}</FieldError>
        ) : null}
      </div>

      <div className='flex flex-col gap-1 w-[80%]'>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...formik.getFieldProps('password')}
          className='w-[100%] h-[40px] rounded px-2'
        />
        {formik.touched.password && formik.errors.password ? (
          <FieldError>{formik.errors.password}</FieldError>
        ) : null}
      </div>

      <div className='flex flex-col gap-1 w-[80%]'>
        <label htmlFor="password">Retype password</label>
        <input
          type="password"
          id="repassword"
          {...formik.getFieldProps('repassword')}
          className='w-[100%] h-[40px] rounded px-2'
        />
        {formik.touched.repassword && formik.errors.repassword ? (
          <FieldError>{formik.errors.repassword}</FieldError>
        ) : null}
      </div>

      {/* <Button type="submit" disabled={formik.isSubmitting}> */}
      <div className='self-center'>
        <Button type="submit">
          Login
        </Button>
      </div>
    </form>
  );
}
export default SignupPage;