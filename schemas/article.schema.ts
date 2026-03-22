// schemas/article.schema.ts
import { z } from 'zod';

export const articleSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title cannot exceed 255 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(255, 'Description cannot exceed 255 characters'),

  // We manage authors as an array of objects in the UI for better UX,
  // then transform them into the parallel arrays your backend expects upon submission.
  authors: z
    .array(
      z.object({
        // RENAMED to authorId to prevent RHF collision
        authorId: z.coerce.number().min(1, 'Author ID is required'),
        name: z.string().min(1, 'Author name is required'),
      }),
    )
    .min(1, 'At least one author is required'),

  publication_link: z.string().max(1024).optional().or(z.literal('')),
  server_link: z.string().max(255).optional().or(z.literal('')),

  // HTML date inputs return strings (YYYY-MM-DD). NestJS handles the Date conversion.
  published_year: z.string().optional().or(z.literal('')),

  publisher: z
    .string()
    .max(15, 'Publisher cannot exceed 15 characters')
    .optional()
    .or(z.literal('')),

  // We'll capture tags as a comma-separated string in the UI, then split it on submit
  tagsString: z.string().optional(),

  doi: z.string().max(100).optional().or(z.literal('')),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;
