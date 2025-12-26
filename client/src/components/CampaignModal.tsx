import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { campaignService } from '../services/campaignService';
import { Campaign, CreateCampaignDTO } from '../types';
import { X } from 'lucide-react';

const campaignSchema = z.object({
  name: z.string().min(1, 'Campaign name is required'),
  description: z.string().optional(),
  budget: z.number().positive('Budget must be positive'),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(['draft', 'active', 'paused', 'completed']),
  targetAudience: z.string().optional(),
});

interface CampaignModalProps {
  campaign?: Campaign | null;
  onClose: () => void;
}

export default function CampaignModal({ campaign, onClose }: CampaignModalProps) {
  const queryClient = useQueryClient();
  const isEditing = !!campaign;

  const { register, handleSubmit, formState: { errors } } = useForm<CreateCampaignDTO>({
    resolver: zodResolver(campaignSchema),
    defaultValues: campaign
      ? {
          name: campaign.name,
          description: campaign.description,
          budget: campaign.budget,
          startDate: campaign.startDate.split('T')[0],
          endDate: campaign.endDate.split('T')[0],
          status: campaign.status,
          targetAudience: campaign.targetAudience,
        }
      : {
          status: 'draft',
        },
  });

  const createMutation = useMutation({
    mutationFn: campaignService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaign-stats'] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: CreateCampaignDTO) => campaignService.update(campaign!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaign-stats'] });
      onClose();
    },
  });

  const onSubmit = (data: CreateCampaignDTO) => {
    const payload = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    };

    if (isEditing) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Campaign' : 'Create New Campaign'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="label">Campaign Name</label>
            <input type="text" {...register('name')} className="input" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="label">Description</label>
            <textarea {...register('description')} className="input" rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Budget</label>
              <input
                type="number"
                step="0.01"
                {...register('budget', { valueAsNumber: true })}
                className="input"
              />
              {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
            </div>

            <div>
              <label className="label">Status</label>
              <select {...register('status')} className="input">
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Start Date</label>
              <input type="date" {...register('startDate')} className="input" />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
            </div>

            <div>
              <label className="label">End Date</label>
              <input type="date" {...register('endDate')} className="input" />
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
            </div>
          </div>

          <div>
            <label className="label">Target Audience</label>
            <input type="text" {...register('targetAudience')} className="input" />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="btn btn-primary"
            >
              {isEditing ? 'Update Campaign' : 'Create Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
