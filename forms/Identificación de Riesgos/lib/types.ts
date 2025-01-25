import type { z } from "zod"
import type { riskIdentificationFormSchema } from "./schema"

export type FormData = z.infer<typeof riskIdentificationFormSchema>

