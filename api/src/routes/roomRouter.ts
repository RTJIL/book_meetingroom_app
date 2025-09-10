import { Router } from 'express'
import roomController from '../controllers/roomController'

import { jwtAuth } from '../middlewares/jwtAuth'

const router = Router()

router.get('/', roomController.getRooms)

router.post('/', jwtAuth, roomController.createRoom)

router.delete('/:roomId', jwtAuth, roomController.deleteRoom)

export default router
