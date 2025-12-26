import api from './api';
import { Campaign, CampaignStats, CreateCampaignDTO } from '../types';

export const campaignService = {
  async getAll(): Promise<Campaign[]> {
    const response = await api.get<{ data: Campaign[] }>('/campaigns');
    return response.data.data;
  },

  async getById(id: number): Promise<Campaign> {
    const response = await api.get<{ data: Campaign }>(`/campaigns/${id}`);
    return response.data.data;
  },

  async create(data: CreateCampaignDTO): Promise<Campaign> {
    const response = await api.post<{ data: Campaign }>('/campaigns', data);
    return response.data.data;
  },

  async update(id: number, data: Partial<CreateCampaignDTO>): Promise<Campaign> {
    const response = await api.put<{ data: Campaign }>(`/campaigns/${id}`, data);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/campaigns/${id}`);
  },

  async getStats(): Promise<CampaignStats> {
    const response = await api.get<{ data: CampaignStats }>('/campaigns/stats');
    return response.data.data;
  },
};
