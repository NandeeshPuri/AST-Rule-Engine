import React, { useState } from 'react';

const CombineRules = ({ rules }) => {
  const [selectedRules, setSelectedRules] = useState([]);
  const [combinedRule, setCombinedRule] = useState(null);

  const handleCombine = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/rules/combine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rule_ids: selectedRules
        })
      });

      const data = await response.json();
      setCombinedRule(data.combined_rule);
    } catch (error) {
      console.error('Error combining rules:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-3">
        <h2 className="text-2xl font-semibold text-gray-800">Combine Rules</h2>
        <p className="text-gray-600">Select multiple rules to combine them</p>
      </div>

      <div className="border rounded-md p-4 max-h-64 overflow-y-auto">
        <div className="space-y-2">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedRules.includes(rule.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRules([...selectedRules, rule.id]);
                  } else {
                    setSelectedRules(selectedRules.filter(id => id !== rule.id));
                  }
                }}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <div>
                <p className="font-medium">{rule.name}</p>
                <p className="text-sm text-gray-600">{rule.rule_string}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleCombine}
        disabled={selectedRules.length < 2}
        className={`w-full py-2 px-4 rounded-md ${
          selectedRules.length < 2
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        Combine Selected Rules
      </button>

      {combinedRule && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Combined Rule:</h3>
          <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
            {combinedRule}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CombineRules;