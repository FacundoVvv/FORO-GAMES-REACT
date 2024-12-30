const User = require('../Models/User');

exports.getUserInfo = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne( { username });

        if(!user){
            return res.status(404).json( { message: 'No se encontró el usuario.' } )
        }

        res.status(200).json( { message: 'User encontrado.', user } );
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try{

    }
    catch(error){
        res.status(500).json( { message: error.message } );
    }
}