import { Request, Response, NextFunction } from 'express'
import roomService from '../services/roomService'

import { CreateRoomInput } from '../types/roomSchemas'
import { RoomParams } from '../types/roomTypes'

export default {
  createRoom: async (
    req: Request<object, object, CreateRoomInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      if (req.user.role !== 'Admin') {
        return res.status(400).json({ message: 'Admin role only' })
      }

      const createdById = req.user.id

      const room = await roomService.createRoom({
        ...req.body,
        createdById,
      })

      res.status(200).json(room)
    } catch (err) {
      return next(err)
    }
  },

  getRooms: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const rooms = await roomService.listRooms()

      res.json(rooms)
    } catch (err) {
      return next(err)
    }
  },

  editRoom: async (
    req: Request<RoomParams, object, CreateRoomInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { roomId } = req.params

    if (!req.params.roomId)
      return res.status(400).json({ message: 'Missing roomId' })

    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      if (req.user.role !== 'Admin') {
        return res.status(400).json({ message: 'Admin role only' })
      }

      const editedRoom = await roomService.editRoom(Number(roomId), req.body)

      res.json(editedRoom)
    } catch (err) {
      return next(err)
    }
  },

  deleteRoom: async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params

    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      if (req.user.role !== 'Admin') {
        return res.status(400).json({ message: 'Admin role only' })
      }

      const deletedRoom = await roomService.deleteRoom(Number(roomId))

      res.status(200).json({ deletedRoom })
    } catch (err) {
      return next(err)
    }
  },
}
