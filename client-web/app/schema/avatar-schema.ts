import { z } from "zod"

export const avatarSchema = z.object({
  request: z.object({
    httpMethod: z.string(),
    url: z.string(),
    headers: z.object({
      size: z.number()
    }),
    body: z.object({
      scanAvailable: z.boolean(),
      prefetch: z.number()
    }),
    bodyAsBinaryData: z.object({
      length: z.number().nullable(),
      replayable: z.boolean()
    })
  }),
  statusCode: z.number(),
  headers: z.object({
    size: z.number()
  }),
  value: z.object({
    lastModified: z.string(),
    contentMd5: z.string(),
    encryptionKeySha256: z.string().nullable(),
    encryptionScope: z.string().nullable(),
    versionId: z.string().nullable(),
    serverEncrypted: z.boolean(),
    etag: z.string()
  })
})

export const avatarUrl = z.string()
