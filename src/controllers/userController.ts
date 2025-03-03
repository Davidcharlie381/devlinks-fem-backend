import { Request, Response } from "express";
import { updateDetails } from "../services/userService";

export const updateUser = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, email} = req.body;

        await updateDetails(firstName, lastName, email);

        res.status(200).json({message: "Details updated successfully."})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}