export interface AuthenticatedRequest extends Request {
  user: { id: number; identification: string };
}
