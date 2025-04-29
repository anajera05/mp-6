"use client"
import googleSignInLink from "@/lib/google/googleSignInLink";
import Link from "next/link";

export default function Card(){

    return(
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h1 className="text-2xl font-bold mb-2 text-black">Authorization Application</h1>
            <h2 className="text-lg mb-4  text-gray-600">Try Authorizing:</h2>
            <div className="flex justify-center mt-4">
                <Link
                    href={googleSignInLink()}
                    className="text-2xl font-bold mb-2 text-black cursor-pointer text-center p-3 bg-green-100 rounded-xl"
                >
                    Sign In With Google
                </Link>

            </div>
        </div>
    )
}