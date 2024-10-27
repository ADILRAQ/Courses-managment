'use client';
import Button from '@/components/Button';
import FieldError from '@/components/FieldError';
import _axios from '@/lib/_axios';
import { Role } from '@prisma/client';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
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

  const [role, setRole] = useState<Role>('STUDENT');
  const router = useRouter();

  const formik = useFormik<SignupForm>({
    initialValues: { username: '', password: '', repassword: '' },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      console.log('Form Submitted:', values);
      const res = await _axios.post('/signup', {...values, role});

      res.status === 201 ?
        router.push('/')
      :
        toast.error(res.data.message);
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

      <div className='flex flex-col items-center gap-1 w-[80%]'>
        <h1>Choose your role</h1>
        <div className='flex justify-center gap-7'>
          <div className={`px-4 py-2 text-sm border-2 cursor-pointer ${
            role !== 'STUDENT' ? 'border-blue-500' : 'border-orange-600'
            }`}
            onClick={() => setRole('STUDENT')}
          >
            STUDENT
          </div>
          <div className={`px-4 py-2 text-sm border-2 cursor-pointer ${
            role !== 'INSTRUCTOR' ? 'border-blue-500' : 'border-orange-600'
            }`}
            onClick={() => setRole('INSTRUCTOR')}
          >
            INSTRUCTOR
          </div>
        </div>
      </div>

      {/* <Button type="submit" disabled={formik.isSubmitting}> */}
      <div className='self-center'>
        <Button type="submit">
          Login
        </Button>
      </div>
      <Toaster />
    </form>
  );
}
export default SignupPage;