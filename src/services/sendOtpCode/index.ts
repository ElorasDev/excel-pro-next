export const sendOtp = async (phoneNumber: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_number: phoneNumber }),
    });
    
    console.log(process.env.NEXT_PUBLIC_API_URL)
    const data = await res.json();
  
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  };