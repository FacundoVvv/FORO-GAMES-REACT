
export const resendEmailVerify = async (email) => {
    try{
        const  sendedEmailResponse = await fetch ('http://localhost:3000/auth/email-resend', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({email}),
        });
        return ({status: sendedEmailResponse.status});

    }catch (error){
        throw new Error(error);
    }
}
