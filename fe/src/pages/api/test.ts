import Admin from "@/models/Admin"
import Role from "@/models/Role"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const admin = await Admin.findByPk('123456789012', {include: Role})
    res.status(200).json(admin)
}