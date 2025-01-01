    export const updateUserLastResend = async (email) => {

        try{
            const response = await fetch('http://localhost:3000/user/updateUserLRT',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(email),           
            });
        }catch(error){
            return ( { status: false } );
        }
    }