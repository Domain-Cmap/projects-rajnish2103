import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {
  ClipboardList,
  Loader2,
  Shield,
  Clock,
  Users,
  Car,
  Coins,
  Umbrella,
} from 'lucide-react';

interface FraudClaimInput {
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

const inputFields = [
  { name: 'months_as_customer', label: 'Months as Customer', min: 0, max: 600, placeholder: '0-600', icon: Clock },
  { name: 'policy_deductable', label: 'Policy Deductible', min: 0, placeholder: 'Enter policy deductible', icon: Shield },
  { name: 'umbrella_limit', label: 'Umbrella Limit', min: 0, placeholder: 'Enter umbrella limit', icon: Umbrella },
  { name: 'capital_gains', label: 'Capital Gains', min: 0, placeholder: 'Enter capital gains', icon: Coins },
  { name: 'capital_loss', label: 'Capital Loss', min: 0, placeholder: 'Enter capital loss', icon: Coins },
  { name: 'incident_hour_of_the_day', label: 'Incident Hour', min: 0, max: 23, placeholder: '0-23', icon: Clock },
  { name: 'number_of_vehicles_involved', label: 'Vehicles Involved', min: 1, max: 10, placeholder: '1-10', icon: Car },
  { name: 'bodily_injuries', label: 'Bodily Injuries', min: 0, max: 10, placeholder: '0-10', icon: Users },
  { name: 'witnesses', label: 'Witnesses', min: 0, max: 10, placeholder: '0-10', icon: Users },
  { name: 'injury_claim', label: 'Injury Claim', min: 0, placeholder: 'Enter injury claim amount', icon: Coins },
];

const InputForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FraudClaimInput>({
    months_as_customer: 0,
    policy_deductable: 0,
    umbrella_limit: 0,
    capital_gains: 0,
    capital_loss: 0,
    incident_hour_of_the_day: 0,
    number_of_vehicles_involved: 1,
    bodily_injuries: 0,
    witnesses: 0,
    injury_claim: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const input = inputFields.find(field => field.name === name);
    if (input) {
      const newValue = Math.min(Math.max(Number(value) || 0, input.min), input.max || Infinity);
      setFormData(prev => ({ ...prev, [name]: newValue }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));


    // Original API call code (commented)
    try {
      const response = await axios.post('http://localhost:3000/predict', formData);
      navigate('/result', { state: { result: response.data, formData } });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <div className="bg-white p-4 rounded-full inline-block shadow-lg">
            <ClipboardList className="h-16 w-16 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Fraud Claim Detection</h2>
          <p className="mt-2 text-sm text-gray-600">Please fill in the claim details below</p>
        </div>

        <div className="mt-8 bg-white shadow-xl rounded-lg p-6">
          {isLoading ? (
            <div className="text-center">
              <Loader2 className="mx-auto h-16 w-16 animate-spin text-blue-600" />
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">Analyzing Claim...</h2>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {inputFields.map(({ name, label, placeholder, icon: Icon }) => (
                <div key={name} className="relative">
                  <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-gray-400" />
                      {label}
                    </div>
                  </label>
                  <input
                    type="number"
                    name={name}
                    id={name}
                    value={formData[name as keyof FraudClaimInput]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              ))}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Analyze Claim
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputForm;
