import { Router } from "express";
import { OperationController } from "src/controllers/operation";

export const router = Router();
router.get('/', OperationController.getAll);
/*router.get('/:id', OperationController.getById)
router.post('/', OperationController.create)
router.delete('/:id', OperationController.delete)
router.patch('/:title', OperationController.update)*/