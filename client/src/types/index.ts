export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Campaign {
  id: number;
  userId: number;
  name: string;
  description?: string;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  targetAudience?: string;
  impressions: number;
  clicks: number;
  conversions: number;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignStats {
  total_campaigns: number;
  total_budget: number;
  total_spent: number;
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
}

export interface CreateCampaignDTO {
  name: string;
  description?: string;
  budget: number;
  startDate: string;
  endDate: string;
  status?: 'draft' | 'active' | 'paused' | 'completed';
  targetAudience?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  data: {
    user: User;
    token: string;
  };
}
