import { describe, it, expect, vi } from 'vitest';
import { fetchUsers } from './data';
import { User } from './models';

vi.mock('./utils', () => ({
  connectToDb: vi.fn(),
}));
vi.mock('./models', () => ({
  User: {
    find: vi.fn().mockReturnThis(),
    count: vi.fn().mockResolvedValue(1),
    limit: vi.fn().mockReturnThis(),
    skip: vi.fn().mockResolvedValue([{ username: 'testuser' }]),
  }
}));

describe('fetchUsers', () => {
  it('should fetch users based on query and pagination', async () => {
    const result = await fetchUsers('test', 1);
    expect(result).toEqual({ count: 1, users: [{ username: 'testuser' }] });
    expect(User.find).toHaveBeenCalledWith({ username: { $regex: new RegExp('test', 'i') } });
  });

  it('should handle errors', async () => {
    User.find.mockRejectedValue(new Error('Database error'));
    await expect(fetchUsers('test', 1)).rejects.toThrow('Failed to fetch users!');
  });
});

