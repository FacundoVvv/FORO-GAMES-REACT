const User = require('../Models/User');
//GET FUNCS
exports.getUserInfo = async (req, res) => { //get all user info, just in case that u are logged in
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'No se encontró el usuario.' })
        }

        res.status(200).json({ message: 'User encontrado.', user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//POST FUNCS
exports.updateUserLastResendTime = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: 'El email es requerido.' });
        }

        // search and update
        const updatedUser = await User.findOneAndUpdate(
            { email }, //search by email
            { $set: { 'times.lastResendCodeEmailV': new Date() } }, // update
            { new: true }
        );


        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // ok
        res.status(200).json({ message: 'Usuario actualizado exitosamente.', user: updatedUser });
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};