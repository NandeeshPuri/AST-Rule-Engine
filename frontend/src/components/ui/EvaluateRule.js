import React, { useState } from 'react';

const EvaluateRule = ({ rules }) => {
  const [selectedRule, setSelectedRule] = useState('');
  const [userData, setUserData] = useState({
    age: '',
    department: '',
    salary: '',
    experience: ''
  });
  const [result, setResult] = useState(null);

  const handleEvaluate = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rule_id: selectedRule,
          user_data: userData
        })
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error evaluating rule:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-3">
        <h2 className="text-2xl font-semibold text-gray-800">Evaluate Rule</h2>
        <p className="text-gray-600">Test rules against user data</p>
      </div>

      <div className="space-y-4">
        <select
          value={selectedRule}
          onChange={(e) => setSelectedRule(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a rule to evaluate</option>
          {rules.map((rule) => (
            <option key={rule.id} value={rule.id}>
              {rule.name}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Age"
            value={userData.age}
            onChange={(e) => setUserData({ ...userData, age: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Department"
            value={userData.department}
            onChange={(e) => setUserData({ ...userData, department: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Salary"
            value={userData.salary}
            onChange={(e) => setUserData({ ...userData, salary: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Experience (years)"
            value={userData.experience}
            onChange={(e) => setUserData({ ...userData, experience: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleEvaluate}
          disabled={!selectedRule}
          className={`w-full py-2 px-4 rounded-md ${
            !selectedRule
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Evaluate
        </button>

        {result !== null && (
          <div
            className={`flex items-center justify-center p-4 rounded-lg ${
              result ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            <span>
              {result ? 'Rule conditions satisfied' : 'Rule conditions not satisfied'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluateRule;