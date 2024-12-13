"use client"

import { Button } from "@/components/ui/Button";
import { useUser } from "@/hooks/useUser";
import { SERVER_API_URL } from "@/lib/config";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

axios.defaults.baseURL = SERVER_API_URL;

const schema = z.object({
    username: z.string().min(4, { message: 'Username must be longer than 4 characters' }),
    password: z.string().min(8, { message: 'Password must be longer than 8 characters' }),
    confirmPassword: z.string(),
    agreement: z.boolean().refine(data => data === true, {
        message: 'You must agree to the terms.',
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export default function SignUpForm() {

    const { signIn } = useUser() ?? {};

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const [error, setError] = useState<string | null>(null)

    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
        await axios.post('/user/register', formData, { withCredentials: true })
        .then( async (res) => {
            const user = await axios.get('/user/me', { withCredentials: true })
            if (signIn) signIn(user.data)
        }).catch(err => setError(err.response.data.message))
    }

    return (
        <form className='flex flex-col text-custom-gray-400 my-8 [&>input]:rounded' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username" title="must be longer than 3">
                Vartotojo vardas
            </label>
            <input {...register("username")} className={`h-10 outline-none bg-custom-gray-700 my-1 mb-4 ${errors.username?.message && 'mb-1'} px-4`} id="username"  />
            {errors.username?.message && <p className="text-xs text-custom-red-500 pb-3">{errors.username?.message.toString()}</p>}

         
            <label htmlFor="password" title="must be longer than 8">
                Slaptažodis
            </label>

            <input {...register("password")} className='h-10 outline-none bg-custom-gray-700 my-1 mb-2 px-4' id="password" type="password" />
            {errors.password?.message && <p className="text-xs text-custom-red-500 pb-3">{errors.password?.message.toString()}</p>}


            <label htmlFor="confirmPassword" title="must match password">
                Pakartotinas slaptažodis
            </label>

            <input {...register("confirmPassword")} className='h-10 outline-none bg-custom-gray-700 my-1 mb-2 px-4' 
            id="confirmPassword" type="password" />
            {errors.confirmPassword?.message && <p className="text-xs text-custom-red-500 pb-2">{errors.confirmPassword?.message.toString()}</p>}
                

            {error && <p className="text-custom-red-500 text-xs mb-2">{error}</p>}
                
                

            <label className={`mb-6 ${errors.agreement?.message && 'mb-1'} flex items-center `}>
                <input type="checkbox" {...register('agreement')} />
                {/* <p className='ml-2 text-xs'>I attest that I am at least 18 years old and have read and agree with the Terms of Service.</p> */}
                <p className='ml-2 text-xs'>Aš užtikrinu, kad man yra virš 18 metų, kad perskaičiau ir sutinku su platformos taisyklėmis </p>
            </label>
            {errors.agreement?.message && <p className="text-xs text-custom-red-500 pb-4">{errors.agreement?.message.toString()}</p>}



            

            {/* <button className='text-xs text-custom-orange  mb-4 text-right underline'>Forgot password?</button> */}
            
            {/* {errors.password?.message && <p>{errors.password?.message.toString()}</p>} */}
            <Button className='mb-6' type="submit" >Registruotis </Button>

            <div className='h-px bg-custom-gray-600'></div>

            {/* <Button className='mt-6 flex items-center justify-center gap-2 bg-[#334155] hover:bg-[#334155] hover:opacity-90' ><IoLogoSteam />  Sign In with Steam</Button>
            <Button className='mt-4 flex items-center justify-center gap-2 bg-[#ef4444] hover:bg-[#ef4444] hover:opacity-90'><IoLogoGoogle /> Sign In with Google</Button> */}
        </form>
    )
}