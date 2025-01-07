import { User } from '../Models/User.js';

export const getUserInfo = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'No se encontró el usuario.' });
        }

        res.status(200).json({ message: 'User encontrado.', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserLastResendTime = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: 'El email es requerido.' });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { 'times.lastResendCodeEmailV': new Date() } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json({ message: 'Usuario actualizado exitosamente.', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
