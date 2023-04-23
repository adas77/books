import { signIn } from "next-auth/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toast";
import 'react-toastify/dist/ReactToastify.css';
import { api } from '~/utils/api';

type RegisterType = {
    email: string,
    name: string,
    password: string,
    confirmPassword: string,
}

const Register = () => {
    const { register, handleSubmit } = useForm<RegisterType>()
    const { mutate: registerMutate, isLoading, isError, isSuccess } = api.user.registerWithCredentials.useMutation()

    const onSubmit: SubmitHandler<RegisterType> = (data) => {
        registerMutate({ ...data })
    }


    return (
        <>
            {isError && toast('Error...')}
            {isSuccess && toast('Success...')}

            <section className="bg-gray-100 dark:bg-gray-800">
                <p className="p-2 text-xl font-light text-center text-gray-500 dark:text-gray-400">
                    <button onClick={() => void signIn()} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</button>
                </p>
            </section>

            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign up
                            </h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input {...register('name')} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='name' ></input>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input {...register('email')} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='email' ></input>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input {...register('password')} type="password" name="password" id="password" placeholder='password' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input>
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input {...register('confirmPassword')} type="password" name="confirmPassword" id="confirmPassword" placeholder='confirm password' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" checked={true} readOnly={true} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" ></input>
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember Me</label>
                                        </div>
                                    </div>
                                    <a href="/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-white">Forgot Password</a>
                                </div>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    <button disabled={isLoading} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign Up</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>




        </>
    )
}

export default Register