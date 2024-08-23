import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInputField from 'components/form/FormInputField';
import FormButton from 'components/form/FormButton';
import { useDispatchAuth, useAuth } from 'providers/auth/AuthProvider';
import { useDispatchAbsolute } from 'providers/absolute/AbsoluteProvider';
import { ROUTES } from 'utils/constants';
import logo from 'assets/images/logo.png';

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const dispatchAuth = useDispatchAuth();
    const {user: authenticatedUser, error: authenticatedError, isAuthenticated} = useAuth();
    const dispatchAbsolute = useDispatchAbsolute();

    useEffect(() => {
        if (isAuthenticated && authenticatedUser?.id) {
            dispatchAbsolute({ type: 'notificationalert/show', notificationAlertOptions: {
                type: 'success',
                message: 'Logged in successfully'
            }});
            setTimeout(() => {
                navigate(ROUTES.CHAT_ROUTE);
            }, 2000);
        }
        if (authenticatedError?.message) {
            dispatchAbsolute({ type: 'notificationalert/show', notificationAlertOptions: {
                type: 'error',
                message: authenticatedError.message
            }});
        }
    }, [authenticatedError, isAuthenticated]);

    const inputHandler = (e) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });
    };

    const submitForm = (e) => {
        e.preventDefault();

        const { email, password } = form;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        dispatchAuth({
            type: 'http/auth/login',
            data: formData
        });
    };

    return (
        <section className="flex justify-center items-center h-full">
            <div className="
                flex flex-col justify-center items-center container w-11/12 lg:w-10/12 xl:w-8/12
                shadow border rounded-md py-12 px-6 md:px-12
                bg-zinc-50 dark:bg-gray-800 dark:border-slate-700 dark:shadow-slate-800
                "
            >
                <div className="flex flex-row justify-between items-center w-full md:justify-center">
                    <h3 className="text-sky-800 dark:text-zinc-100">Log in</h3>
                    <img className="w-12 md:hidden" 
                        src={logo} alt="" />
                </div>
                <form className="w-full space-y-4 py-4">
                    <div className="space-y-2">
                        <FormInputField 
                            id="email" 
                            label="Email" 
                            placeholder="Enter your email" 
                            type="text"
                            value={form.email}
                            onChangeHandler={inputHandler}
                        />
                    </div>

                    <div className="space-y-2">
                        <FormInputField 
                            id="password" 
                            label="Password" 
                            placeholder="Enter your password" 
                            type="password"
                            value={form.password}
                            onChangeHandler={inputHandler}
                        />
                    </div>

                    <div className="pb-6">
                        <Link
                            className="text-sm text-sky-800 dark:text-zinc-100 
                            hover:underline underline-offset-2 decoration-dotted
                            "
                            to={ROUTES.REGISTER_ROUTE}
                        >
                            Don't have any account? Sign up here
                        </Link>
                    </div>

                    <FormButton
                        text="Log in"
                        type="submit"
                        onSubmit={submitForm}
                    />
                </form>
            </div>
        </section>
    );
};

export default Login;