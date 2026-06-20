    export const updateUserLastResend = async (email) => {

        try{
            const response = await fetch('http://localhost:3000/user/updateUserLRT',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:"include",
                body: JSON.stringify(email),           
            });

            return ({status: true});
        }catch(error){
            return ( { status: false } );
        }
    }