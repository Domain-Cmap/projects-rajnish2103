export interface FraudClaimInput {
  months_as_customer: number;
  policy_deductable: number;
  umbrella_limit: number;
  capital_gains: number;
  capital_loss: number;
  incident_hour_of_the_day: number;
  number_of_vehicles_involved: number;
  bodily_injuries: number;
  witnesses: number;
  injury_claim: number;
}