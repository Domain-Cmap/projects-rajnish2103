import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {
    result: {
      success: true,
      prediction: {
        fraudulent: false,
        probability: "0.00%",
        confidence: "0.00%",
        risk_level: "Low"
      }
    }
  };

  const probability = parseFloat(result.prediction.probability) || 0;

  const getColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Fraud Analysis Result
          </h2>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <div className="space-y-6">
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Fraud Probability
              </p>
              <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getColor(result.prediction.risk_level)} transition-all duration-500`}
                  style={{ width: `${probability}%` }}
                />
              </div>
              <p className="mt-2 text-2xl font-bold text-center">
                {result.prediction.probability}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-900 mb-2">
                Risk Level: <span className="font-bold">{result.prediction.risk_level}</span>
              </p>
              <p className="text-sm font-medium text-gray-900">
                Confidence: <span className="font-bold">{result.prediction.confidence}</span>
              </p>
              <p className="mt-4 text-sm text-gray-600">
                {result.prediction.risk_level === "High"
                  ? "This claim has a high probability of being fraudulent and should be thoroughly investigated."
                  : result.prediction.risk_level === "Medium"
                    ? "This claim shows some suspicious patterns and requires further investigation."
                    : "This claim appears to be legitimate with a low risk of fraud."}
              </p>
            </div>

            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Submit Another Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
