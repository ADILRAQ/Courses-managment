'use client'
import Button from "@/components/Button";
import Card from "@/components/Card";
import FieldError from "@/components/FieldError";
import { UserContext } from "@/context/UserContext";
import _axios from "@/lib/_axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from 'yup';

export interface CourseForm {
  title       :string
  description :string
}

export interface CourseData {
  id        :number
  title       :string
  description :string
}

const LoginSchema = Yup.object().shape({
  title: Yup.string().required('Required').trim(),
  description: Yup.string().min(6, 'Explain little more !').max(50, 'That is it !').required('Required'),
});

const Dashboard = () => {

  // const userContext = useContext(UserContext);
  const [open, setOpen] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseData[]>([])

  useEffect(() => {

    const getCourses = async () => {
      const res = await _axios.get('/course');
      setCourses(res.data.courses);
    }

    getCourses();

  }, [open])

  const formik = useFormik<CourseForm>({
    initialValues: { title: '', description: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      console.log('Form Submitted:', values);

      const res = await _axios.post('/course', values);

      if (res.status === 201) {
        toast.success("Course created !");
        setTimeout(() => setOpen(false), 800);
      }
      else
        toast.error("Course doesn't created !");
    },
  });

  return (
    <div className="relative flex-1 w-[70%] max-w-[1000px] mb-12 mx-auto flex flex-col gap-6">
      {
        !open &&
          <>
            <div className="self-end">
              <Button type="button" onClick={() => setOpen(true)}>Add</Button>
            </div>
            <div className="flex-1 w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {
                courses.length && courses?.map(course => <Card key={course.id} id={course.id} title={course.title} description={course.description} />)
              }
            </div>
          </>
        }
        {
          open &&
          <div className="relative w-[100%] h-[100%] flex justify-center items-center">
            <form onSubmit={formik.handleSubmit}
              className='w-[600px] mx-auto mt-10 flex flex-col gap-4 bg-blue-50 px-10 py-12 rounded shadow-card items-center'
            >
              <div className='flex flex-col gap-1 w-[80%]'>
                <label htmlFor="title"> Title </label>
                <input
                  type="text"
                  id="title"
                  {...formik.getFieldProps('title')}
                  className='w-[100%] h-[40px] rounded px-2'
                />
                {formik.touched.title && formik.errors.title ? (
                  <FieldError>{formik.errors.title}</FieldError>
                ) : null}
              </div>

              <div className='flex flex-col gap-1 w-[80%]'>
                <label htmlFor="description">Description</label>
                <textarea
                  // type="text"
                  id="description"
                  {...formik.getFieldProps('description')}
                  className='w-[100%] h-[80px] rounded px-2 py-2'
                />
                {formik.touched.description && formik.errors.description ? (
                  <FieldError>{formik.errors.description}</FieldError>
                ) : null}
              </div>

              {/* <Button type="submit" disabled={formik.isSubmitting}> */}
              <div className='self-center flex gap-3'>
                <Button type="submit">
                  Create
                </Button>
                <Button type="button" onClick={()=>setOpen(false)}>
                  Close
                </Button>
              </div>
              <Toaster />
            </form>
          </div>
        }
    </div>
  )
}

export default Dashboard;
