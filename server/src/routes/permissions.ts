import { Router } from "express"
import { checkAuthProcess } from "../middlewares/auth"
import { getPerms } from "../controllers/permissions"

const router = Router()

// router.put("/edit", ...checkAuthProcess(true, {
//     requireSpecificPerms: true,
//     include: {},
//     required: {
//         staff: ["RESET_STAFF_PASSWORD"]
//     },
//     requiredSuperuser: false
// }), (req, res) => res.json({
//     success: true
// }))

router.get("/get/list", getPerms)

export = router