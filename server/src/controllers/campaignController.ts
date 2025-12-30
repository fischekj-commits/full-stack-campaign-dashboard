import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { campaignModel } from '../models/campaignModel';
import { CampaignSchema, UpdateCampaignSchema } from '../types/campaign';
import { AppError, asyncHandler } from '../middleware/errorHandler';

export const campaignController = {
  getAll: asyncHandler(async (req: AuthRequest, res: Response) => {
    const campaigns = await campaignModel.findAll(req.user!.id);
    res.json({ data: campaigns });
  }),

  getById: asyncHandler(async (req: AuthRequest, res: Response) => {
    const campaign = await campaignModel.findById(
      parseInt(req.params.id),
      req.user!.id
    );

    if (!campaign) {
      throw new AppError('Campaign not found', 404);
    }

    res.json({ data: campaign });
  }),

  create: asyncHandler(async (req: AuthRequest, res: Response) => {
    const validatedData = CampaignSchema.parse(req.body);
    const campaign = await campaignModel.create(req.user!.id, validatedData);

    res.status(201).json({ data: campaign });
  }),

  update: asyncHandler(async (req: AuthRequest, res: Response) => {
    const validatedData = UpdateCampaignSchema.parse(req.body);
    const campaign = await campaignModel.update(
      parseInt(req.params.id),
      req.user!.id,
      validatedData
    );

    if (!campaign) {
      throw new AppError('Campaign not found', 404);
    }

    res.json({ data: campaign });
  }),

  delete: asyncHandler(async (req: AuthRequest, res: Response) => {
    const deleted = await campaignModel.delete(
      parseInt(req.params.id),
      req.user!.id
    );

    if (!deleted) {
      throw new AppError('Campaign not found', 404);
    }

    res.status(204).send();
  }),

  getStats: asyncHandler(async (req: AuthRequest, res: Response) => {
    const stats = await campaignModel.getStats(req.user!.id);
    res.json({ data: stats });
  }),
};
