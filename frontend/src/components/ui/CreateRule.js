import React, { useState } from 'react';

const CreateRule = ({ onRuleCreated }) => {
  const [ruleName, setRuleName] = useState('');
  const [ruleString, setRuleString] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: ruleName,
          rule_string: ruleString
        })
      });

      if (!response.ok) throw new Error('Failed to create rule');

      setStatus({ type: 'success', message: 'Rule created successfully!' });
      setRuleName('');
      setRuleString('');
      onRuleCreated();
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-3">
        <h2 className="text-2xl font-semibold text-gray-800">Create New Rule</h2>
        <p className="text-gray-600">Define a new rule with conditions and operators</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rule Name
          </label>
          <input
            type="text"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            placeholder="Enter rule name..."
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rule Definition
          </label>
          <textarea
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            placeholder="e.g., (age > 30 AND department = 'Sales') OR (experience > 5)"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Rule
        </button>
      </form>

      {status.message && (
        <div
          className={`p-4 rounded-lg ${
            status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
};

export default CreateRule;
