import { useEffect, useState } from "react";
import OtpInput from "./otp-input";

function PhoneOtpForm() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showOtpInput, setshowOtpInput] = useState(false);

    const [timer, setTimer] = useState(30);

    const handlePhoneNumber = (event) => {
            setPhoneNumber(event.target.value);
    }

    const handlePhoneSubmit = (event) => {
    event.preventDefault();

    const regex = /^[0-9]{10}$/;

    if (!regex.test(phoneNumber)) {
        alert("Invalid Phone Number");
        return;
    }

    // Call the API
    // Show OTP field
    setshowOtpInput(true);
    setTimer(30);
};

    const onOtpSubmit = (otp) => {
    console.log("OTP entered:", otp);
};

  // ✅ Timer logic
    useEffect(() => {
    if (!showOtpInput) return;

    if (timer === 0) return;

    const interval = setInterval(() => {
    setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
}, [timer, showOtpInput]);

  // ✅ Resend OTP
    const handleResendOtp = () => {
    if (timer > 0) return;

    console.log("Resending OTP...");
    // call resend api here

    setTimer(30);
};

    return (
    <div>
    {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
        <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Phone Number"
        />
        <button type="submit">Submit</button>
        </form>
    ) : (
        <div className="otpBox">
        <p className="otpText">
            Enter OTP sent to <b>{phoneNumber}</b>
        </p>

        <OtpInput length={4} onOtpSubmit={onOtpSubmit} />

        <button className="verifyBtn">Verify OTP</button>

        <div className="resendRow">
            {timer > 0 ? (
            <p className="timerText">
                Resend OTP in <span>{timer}s</span>
            </p>
            ) : (
            <p className="timerText">
                Didn’t get OTP?
            </p>
            )}

            <button
            className="resendBtn"
            onClick={handleResendOtp}
            disabled={timer > 0}
            >
            Resend OTP
            </button>
        </div>
        </div>
    )}
    </div>
);
}

export default PhoneOtpForm;
