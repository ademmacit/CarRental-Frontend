export interface CreditCard {
  id: number;
  userId: number;
  cardNumber: string;
  nameOnCard: string;
  lastUseMonth: number;
  lastUseYear: number;
  cvv: number;
}
