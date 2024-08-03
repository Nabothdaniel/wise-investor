import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../auth/firebase';
import { setUser } from '../../redux/store/slice/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async data => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        phonenumber: data.phonenumber,
      });

      dispatch(setUser({
        uid: user.uid,
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        phonenumber: data.phonenumber,
      }));

      toast.success('Registration successful');
      navigate('/dashboard');
    } catch (error) {
      console.log(error,"something happened")
      toast.error('Registration failed');
    }
  };

  return (
    <form className="mt-20" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label htmlFor="fullname" className="text-[1.1rem] mb-2 font-semibold block">
          Full name 
          <span className="text-[#840695] ml-2">*</span>
        </label>
        <input
          type="text"
          className="w-full border-solid border border-black/40 rounded-md bg-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-500 text-[1.2rem]"
          placeholder="Daniel naboth"
          {...register('fullname', { required: true })}
        />
        {errors.fullname && <span className="text-red-500">This field is required</span>}
      </div>
      <div className="mb-5">
        <label htmlFor="username" className="text-[1.1rem] mb-2 font-semibold block">
          Username
          <span className="text-[#95066E] ml-2">*</span>
        </label>
        <input
          type="text"
          className="w-full border-solid border border-black/40 rounded-md bg-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-500 text-[1.2rem]"
          placeholder="@danny"
          {...register('username', { required: true })}
        />
        {errors.username && <span className="text-red-500">This field is required</span>}
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="text-[1.1rem] mb-2 font-semibold block">
          Email address
          <span className="text-[#95066E] ml-2">*</span>
        </label>
        <input
          type="email"
          className="w-full border-solid border border-black/40 rounded-md bg-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-500 text-[1.2rem]"
          placeholder="name@example.com"
          {...register('email', { required: true })}
        />
        {errors.email && <span className="text-red-500">This field is required</span>}
      </div>
      <div className="mb-5">
        <label htmlFor="phonenumber" className="text-[1.1rem] mb-2 font-semibold block">
          Phone number
          <span className="text-[#95066E] ml-2">*</span>
        </label>
        <input
          type="text"
          className="w-full border-solid border border-black/40 rounded-md bg-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-500 text-[1.2rem]"
          placeholder="+234 0000 0000"
          {...register('phonenumber', { required: true })}
        />
        {errors.phonenumber && <span className="text-red-500">This field is required</span>}
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="text-[1.1rem] mb-2 font-semibold block">
          Password
          <span className="text-[#95066E] ml-2">*</span>
        </label>
        <input
          type="password"
          className="w-full border-solid border border-black/40 rounded-md bg-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-500 text-[1.2rem]"
          placeholder="az123@/."
          {...register('password', { required: true })}
        />
        {errors.password && <span className="text-red-500">This field is required</span>}
      </div>
      <div className="my-4">
        <button type="submit" className='w-full block md:px-64 font-semibold text-center text-[1.2rem] p-3 my-6 bg-orange-700 rounded-md text-white mt4'>Create</button>
      </div>
      <ToastContainer />
    </form>
  );
}

export default RegisterForm;
