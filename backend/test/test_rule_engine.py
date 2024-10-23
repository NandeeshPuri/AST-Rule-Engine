import unittest
from rule_engine import create_rule, combine_rules, evaluate_rule

class TestRuleEngine(unittest.TestCase):

    def test_create_rule(self):
        # Test that create_rule function returns an AST for valid rule strings
        rule = "age > 30 AND salary > 50000"
        ast = create_rule(rule)
        self.assertIsNotNone(ast)  # Ensure AST is not None

    def test_combine_rules(self):
        # Test combining two ASTs into a single AST
        rule1 = "age > 30 AND salary > 50000"
        rule2 = "experience > 5 OR department = 'Sales'"
        ast1 = create_rule(rule1)
        ast2 = create_rule(rule2)
        combined_ast = combine_rules([ast1, ast2])
        self.assertIsNotNone(combined_ast)  # Ensure combined AST is valid

    def test_evaluate_rule_true(self):
        # Test evaluating a rule that should return True
        rule = "age > 30 AND salary > 50000"
        ast = create_rule(rule)
        data = {"age": 35, "salary": 60000}
        result = evaluate_rule(ast, data)
        self.assertTrue(result)

    def test_evaluate_rule_false(self):
        # Test evaluating a rule that should return False
        rule = "age > 30 AND salary > 50000"
        ast = create_rule(rule)
        data = {"age": 25, "salary": 40000}
        result = evaluate_rule(ast, data)
        self.assertFalse(result)

if __name__ == "__main__":
    unittest.main()
