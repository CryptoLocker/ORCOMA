import type { z } from "zod"
import type { inductionReinductionFormSchema } from "./schema"

export type FormData = z.infer<typeof inductionReinductionFormSchema>

