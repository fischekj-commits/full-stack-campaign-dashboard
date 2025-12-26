import { z } from 'zod';

export const CampaignSchema = z.object({
  name: z.string().min(1, 'Campaign name is required'),
  description: z.string().optional(),
  budget: z.number().positive('Budget must be positive'),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  status: z.enum(['draft', 'active', 'paused', 'completed']).default('draft'),
  targetAudience: z.string().optional(),
});

export const UpdateCampaignSchema = CampaignSchema.partial();

export type Campaign = z.infer<typeof CampaignSchema> & {
  id: number;
  userId: number;
  impressions: number;
  clicks: number;
  conversions: number;
  spent: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCampaignDTO = z.infer<typeof CampaignSchema>;
export type UpdateCampaignDTO = z.infer<typeof UpdateCampaignSchema>;
