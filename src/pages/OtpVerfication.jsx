import { useEffect, useRef, useState } from "react";
import OtpPageImg from "../assets/images/OtpPageImg.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const OtpVerification = () => {
    const length = 5;
    const [otp, setOtp] = useState(Array(length).fill(''));
    const inputsRef = useRef([]);
    const navigate = useNavigate();
    const [userEmail,setUserEmail] = useState(null);

    useEffect(() => {
        // Fetch the user data from localStorage and store only the email
        const userSignUpData = JSON.parse(localStorage.getItem('userSignUpData'));
        if (userSignUpData && userSignUpData.email) {
            setUserEmail(userSignUpData.email);
        }
    }, []);

    const handleChange = (value, index) => {
        if (/^[0-9]$/.test(value)) {
            let newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
        if (index < length - 1) {
            inputsRef.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            let newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);

            if (index > 0) {
                console.log(index)
                inputsRef.current[index - 1].focus();
            }
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const otpCode = otp.join("");

        try {
            const userSignUpData = JSON.parse(localStorage.getItem('userSignUpData'));

            const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userSignUpData.email,
                    otp: otpCode,
                    userData: userSignUpData // Send the user data for registration if OTP is valid
                })
            });

            const { message } = await res.json();
            if (!res.ok) {
                throw new Error(message);
            }

            toast.success("OTP Verified, Registration Complete!");
            localStorage.removeItem('userSignUpData');
            navigate("/login");

        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <section>
            <div className="max-w-[800px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 justify-between gap-5 sm:gap-20 ">
                    <div className="sm:col-span-1 flex items-center justify-center">
                        <figure className="rounded-l-lg">
                            <img
                                className="w-48  sm:w-full   object-cover"
                                src={OtpPageImg}
                                alt="Otp Pages Image"
                            />
                        </figure>
                    </div>

                    <div className="sm:col-span-2">
                        <form onSubmit={submitHandler}>
                            {/* OTP fields */}
                            <div className="h-full p-4">
                                <h1 className="leading-6 lg:leading-9 text-xl font-semibold mb-5 flex ">
                                    {" "}
                                    OTP VERIFICATION
                                </h1>
                                <p
                                    className="block text-gray-700 text-sm font-medium mb-5"
                                    htmlFor="otp"
                                >
                                    Enter the OTP sent to <b>{userEmail}</b>
                                </p>

                                <div className="flex gap-2 sm:gap-5">
                                    {otp.map((value, index) => (
                                        <input
                                            key={index}
                                            className="w-full px-2 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer rounded-md text-center"
                                            type="text"
                                            name={`otp-${index}`}
                                            maxLength={1}
                                            value={value}
                                            onChange={(e) => handleChange(e.target.value, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            ref={(el) => (inputsRef.current[index] = el)}

                                            required
                                        />
                                    ))}
                                </div>

                                <button  type="submit" className="btn">Verify OTP</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OtpVerification;
