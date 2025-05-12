import { User } from '../Models/User.js';
import bcrypt from 'bcryptjs';

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


//PUT CONTROLLERS
export const changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado.' });
    }

    try {
        const username = req.user;

        const userDB = await User.findOne( {username} );
        
        if (!userDB) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        try {
            const isMatch = await bcrypt.compare(currentPassword, userDB.password);
            
        } catch (err) {
            console.error('Error comparando contraseñas:', err.message);
            return res.status(500).json({ message: 'Error al comparar contraseñas.' });
        }

        if (newPassword.toLowerCase() === currentPassword.toLowerCase()) {
            return res.status(400).json({ message: 'La nueva contraseña no puede ser igual a la actual.' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Las nuevas contraseñas no coinciden.' });
        }

        userDB.password = await bcrypt.hash(newPassword, 10);
        await userDB.save();

        res.status(200).json({ message: 'Contraseña cambiada exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
