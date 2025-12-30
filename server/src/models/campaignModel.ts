import pool from '../config/database';
import { Campaign, CreateCampaignDTO, UpdateCampaignDTO } from '../types/campaign';

export const campaignModel = {
  async findAll(userId: number): Promise<Campaign[]> {
    const result = await pool.query(
      'SELECT * FROM campaigns WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  },

  async findById(id: number, userId: number): Promise<Campaign | null> {
    const result = await pool.query(
      'SELECT * FROM campaigns WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0] || null;
  },

  async create(userId: number, data: CreateCampaignDTO): Promise<Campaign> {
    const result = await pool.query(
      `INSERT INTO campaigns (
        user_id, name, description, budget, start_date, end_date,
        status, target_audience
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        userId,
        data.name,
        data.description,
        data.budget,
        data.startDate,
        data.endDate,
        data.status,
        data.targetAudience,
      ]
    );
    return result.rows[0];
  },

  async update(
    id: number,
    userId: number,
    data: UpdateCampaignDTO
  ): Promise<Campaign | null> {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (fields.length === 0) return null;

    values.push(id, userId);
    const result = await pool.query(
      `UPDATE campaigns SET ${fields.join(', ')}, updated_at = NOW()
       WHERE id = $${paramCount} AND user_id = $${paramCount + 1}
       RETURNING *`,
      values
    );

    return result.rows[0] || null;
  },

  async delete(id: number, userId: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM campaigns WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return (result.rowCount || 0) > 0;
  },

  async getStats(userId: number) {
    const result = await pool.query(
      `SELECT
        COUNT(*) as total_campaigns,
        SUM(budget) as total_budget,
        SUM(spent) as total_spent,
        SUM(impressions) as total_impressions,
        SUM(clicks) as total_clicks,
        SUM(conversions) as total_conversions
      FROM campaigns WHERE user_id = $1`,
      [userId]
    );
    return result.rows[0];
  },
};
