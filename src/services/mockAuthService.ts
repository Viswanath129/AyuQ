import { AuthService } from '../backend-design/interfaces';
import { User, UserRole } from '../types';
import { MOCK_USERS } from './mockData';

class MockAuthServiceImpl implements AuthService {
  private currentUser: User = MOCK_USERS[0];

  async authenticate(credentials: { email: string; token?: string; ssoProvider?: string }): Promise<User> {
    const found = MOCK_USERS.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());
    if (found) {
      this.currentUser = found;
      return found;
    }
    return this.currentUser;
  }

  async getCurrentUser(): Promise<User> {
    return { ...this.currentUser };
  }

  async getPermissions(role: string): Promise<string[]> {
    switch (role as UserRole) {
      case 'Administrator':
        return ['*'];
      case 'Quantum Researcher':
        return ['circuit:build', 'circuit:transpile', 'circuit:execute', 'datasets:view', 'models:train'];
      case 'ML Engineer':
        return ['models:all', 'datasets:all', 'evaluations:run', 'predictions:test'];
      case 'Clinician':
        return ['cases:view', 'predictions:infer', 'reports:generate', 'explainability:view'];
      case 'Researcher':
        return ['datasets:read', 'evaluations:read', 'reports:read'];
      case 'Patient':
        return ['case:personal:view'];
      default:
        return ['datasets:view'];
    }
  }

  async logout(): Promise<void> {
    // In mock mode, switch to the first user
    this.currentUser = MOCK_USERS[0];
  }

  async switchRole(role: string): Promise<User> {
    const userForRole = MOCK_USERS.find(u => u.role === role);
    if (userForRole) {
      this.currentUser = userForRole;
    } else {
      this.currentUser = {
        ...this.currentUser,
        role: role as UserRole
      };
    }
    return { ...this.currentUser };
  }
}

export const mockAuthService = new MockAuthServiceImpl();
