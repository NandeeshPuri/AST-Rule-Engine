import React, { useState } from 'react';

const RuleEngineDashboard = () => {
  const [rules, setRules] = useState([]);
  const [ruleName, setRuleName] = useState('');
  const [ruleDefinition, setRuleDefinition] = useState('');
  const [selectedRules, setSelectedRules] = useState([]);
  const [evaluationData, setEvaluationData] = useState({
    age: '',
    department: '',
    salary: '',
    experience: ''
  });
  const [selectedRuleForEval, setSelectedRuleForEval] = useState('');
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleCreateRule = () => {
    if (ruleName && ruleDefinition) {
      setRules([...rules, { name: ruleName, definition: ruleDefinition }]);
      setRuleName('');
      setRuleDefinition('');
    }
  };

  const handleCombineRules = () => {
    if (selectedRules.length < 2) return;
    
    const combinedRuleName = `Combined Rule ${rules.length + 1}`;
    const combinedDefinition = selectedRules
      .map(index => `(${rules[index].definition})`)
      .join(' AND ');
    
    setRules([...rules, { name: combinedRuleName, definition: combinedDefinition }]);
    setSelectedRules([]);
  };

  const handleEvaluate = () => {
    // This is a placeholder for actual rule evaluation logic
    setEvaluationResult({
      success: true,
      message: 'Rule evaluation successful',
      result: true
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Rule Engine Dashboard</h1>
        
        {/* Create New Rule Section */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Create New Rule</h2>
            <p className="text-gray-500 text-sm">Define a new rule with conditions and operators</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rule Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter rule name..."
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rule Definition
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="e.g., (age > 30 AND department = 'Sales')"
                value={ruleDefinition}
                onChange={(e) => setRuleDefinition(e.target.value)}
              />
            </div>
            
            <button
              onClick={handleCreateRule}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Rule
            </button>
          </div>
        </div>

        {/* Combine Rules Section */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Combine Rules</h2>
            <p className="text-gray-500 text-sm">Select multiple rules to combine them</p>
          </div>
          
          <div className="space-y-4">
            {rules.map((rule, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={`rule-${index}`}
                  checked={selectedRules.includes(index)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRules([...selectedRules, index]);
                    } else {
                      setSelectedRules(selectedRules.filter(i => i !== index));
                    }
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`rule-${index}`} className="text-gray-700">
                  {rule.name}
                </label>
                <span className="text-gray-500 text-sm">{rule.definition}</span>
              </div>
            ))}
            
            <button
              onClick={handleCombineRules}
              disabled={selectedRules.length < 2}
              className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Combine Selected Rules
            </button>
          </div>
        </div>

        {/* Evaluate Rule Section */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Evaluate Rule</h2>
            <p className="text-gray-500 text-sm">Test rules against user data</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Rule
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedRuleForEval}
                onChange={(e) => setSelectedRuleForEval(e.target.value)}
              >
                <option value="">Select a rule to evaluate</option>
                {rules.map((rule, index) => (
                  <option key={index} value={rule.name}>
                    {rule.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={evaluationData.age}
                  onChange={(e) => setEvaluationData({...evaluationData, age: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={evaluationData.department}
                  onChange={(e) => setEvaluationData({...evaluationData, department: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={evaluationData.salary}
                  onChange={(e) => setEvaluationData({...evaluationData, salary: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience (years)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={evaluationData.experience}
                  onChange={(e) => setEvaluationData({...evaluationData, experience: e.target.value})}
                />
              </div>
            </div>
            
            <button
              onClick={handleEvaluate}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Evaluate
            </button>

            {evaluationResult && (
              <div className={`mt-4 p-4 rounded-md ${evaluationResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p className="text-sm">{evaluationResult.message}</p>
                {evaluationResult.result !== undefined && (
                  <p className="font-medium mt-1">
                    Result: {evaluationResult.result ? 'True' : 'False'}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleEngineDashboard;