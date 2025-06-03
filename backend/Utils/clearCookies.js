export const clearCookies = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      });
      res.status(200).json({ message: "Logout exitoso" });
}