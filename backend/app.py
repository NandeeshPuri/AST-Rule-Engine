from flask import Flask, request, jsonify
from rule_engine import create_rule, combine_rules, evaluate_rule
import json

app = Flask(__name__)

# Endpoint to create a rule and return the AST as a JSON object
@app.route('/create_rule', methods=['POST'])
def create_rule_api():
    data = request.get_json()
    rule_string = data.get("rule_string")
    
    try:
        ast = create_rule(rule_string)
        return jsonify({"message": "Rule created successfully", "ast": repr(ast)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Endpoint to combine multiple rules and return the combined AST
@app.route('/combine_rules', methods=['POST'])
def combine_rules_api():
    data = request.get_json()
    rules = data.get("rules")
    
    try:
        ast_list = [create_rule(rule) for rule in rules]
        combined_ast = combine_rules(ast_list)
        return jsonify({"message": "Rules combined successfully", "combined_ast": repr(combined_ast)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Endpoint to evaluate a rule against user data
@app.route('/evaluate_rule', methods=['POST'])
def evaluate_rule_api():
    data = request.get_json()
    ast = data.get("ast")
    user_data = data.get("data")
    
    # Reconstruct AST from the string
    # Assuming the AST is sent as a string representation (for demo purposes)
    ast = eval(ast)
    
    try:
        result = evaluate_rule(ast, user_data)
        return jsonify({"result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
