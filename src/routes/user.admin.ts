import { Router } from "express";
import userController from "~/controllers/user.controller.js";
import { UserParamsSchema, UserQuery } from "~/entities/user.entity.js";
import { validate } from "~/middlewares/validate.js";
import AsyncHandler from "~/utils/async-handler.js";

const router = Router();

router.get("/", validate({
    query: UserQuery
}),  AsyncHandler(userController.getAll));

router.get("/:id", validate({
    params: UserParamsSchema
}), AsyncHandler(userController.getById));

export default router;