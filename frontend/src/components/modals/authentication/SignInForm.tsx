"use client"

import { Button } from "@/components/ui/Button";
import useAxios from "@/hooks/useAxios";
import { useUser } from "@/hooks/useUser";
import { SERVER_API_URL } from "@/lib/config";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

axios.defaults.baseURL = SERVER_API_URL;

const schema = z.object({
    username: z.string().min(4, { message: "Please enter username" }),
    password: z.string().min(8, "Password needs to be atleast 8 charakters long")
});

type ValidationSchemaType = z.infer<typeof schema>

export default function SignInForm() {

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
        await axios.post('/user/login', formData as ValidationSchemaType, { withCredentials: true })
        .then(async () => {
            const user = await axios.get('/user/me', { withCredentials: true })
            if (signIn) signIn(user.data)
        }).catch(err => setError(err.response.data.message))
    }

    return (
        <form className='flex flex-col text-custom-gray-400 my-8 [&>input]:rounded' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username" title="must be longer than 3">
                Username
            </label>
            <input onClick={(e) => e.stopPropagation()} {...register("username")} className={`h-10 outline-none bg-custom-gray-700 my-1 mb-4 ${errors.username?.message && 'mb-1'} px-4`} id="username"  />
            {errors.username?.message && <p className="text-custom-red-500 text-xs mb-2">{errors.username?.message.toString()}</p>}

         
            <label htmlFor="password" title="must be longer than 8">
                Password
            </label>


            <input {...register("password")} className='h-10 outline-none bg-custom-gray-700 my-1 mb-2 px-4' id="password" type="password" />

            {error && <p className="text-custom-red-500 text-xs mb-2">{error}</p>}

            <button className='text-xs text-orange-400  mb-4 text-right underline'>Forgot password?</button>
            {/* {errors.password?.message && <p>{errors.password?.message.toString()}</p>} */}
            <Button className='mb-6' type="submit" >Sign In </Button>

            <div className='h-px bg-custom-gray-600'></div>

            {/* <Button className='mt-6 flex items-center justify-center gap-2 bg-[#334155] hover:bg-[#334155] hover:opacity-90' ><IoLogoSteam />  Sign In with Steam</Button>
            <Button className='mt-4 flex items-center justify-center gap-2 bg-[#ef4444] hover:bg-[#ef4444] hover:opacity-90'><IoLogoGoogle /> Sign In with Google</Button> */}
        </form>
    )
}