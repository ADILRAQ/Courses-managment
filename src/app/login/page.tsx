'use client';
import Button from '@/components/Button';
import FieldError from '@/components/FieldError';
import _axios from '@/lib/_axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';

interface LoginForm {
  username  :string
  password  :string
}

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required').trim(),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const LoginPage = () => {

  const router = useRouter();

  const formik = useFormik<LoginForm>({
    initialValues: { username: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      // console.log('Form Submitted:', values);

      const res = await _axios.post('/login', {...values});

      if(res.status === 201) {
        router.push('/');
      }
      else
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

      {/* <Button type="submit" disabled={formik.isSubmitting}> */}
      <div className='self-center flex gap-3'>
        <Button type="submit">
          Login
        </Button>
        <Button type="button" onClick={()=>router.push('/signup')}>
          Signup
        </Button>
      </div>
      <Toaster />
    </form>
  );
}
export default LoginPage;