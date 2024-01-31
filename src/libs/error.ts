import { Response } from 'express'

export const errorHandler = (error: unknown, res: Response): Response<Error> | string => {
  return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
}
