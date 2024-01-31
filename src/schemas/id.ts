import { z } from 'zod'

const paramsId = z.object({
  id: z.string({
    required_error: 'id format incorrect'
  })
})

export function validateIdParamas(id: string): { id: string } {
  return paramsId.parse(id)
}
