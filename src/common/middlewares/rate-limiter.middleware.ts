import { Request, Response } from 'express'
import { rateLimit } from 'express-rate-limit'

// Rate limiter middleware for the application
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs,
  standardHeaders: true,
  legacyHeaders: false,
  message: async (req: Request, res: Response) => {
    res.status(429).json({
      message: 'Too many requests, please try again later'
    })
  }
})
