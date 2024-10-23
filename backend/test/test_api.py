import unittest
from flask_testing import TestCase
from app import app, db
from models import RuleModel

class TestAPI(TestCase):

    def create_app(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:' 
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_create_rule_api(self):
        response = self.client.post('/create_rule', json={
            "rule_string": "age > 30 AND salary > 50000"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("Rule created", response.json['message'])

    def test_combine_rules_api(self):
        rule1 = "age > 30 AND salary > 50000"
        rule2 = "experience > 5 OR department = 'Sales'"
        response = self.client.post('/combine_rules', json={
            "rules": [rule1, rule2]
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("combined_ast", response.json)

    def test_evaluate_rule_api_true(self):
        rule = "age > 30 AND salary > 50000"
        ast = self.client.post('/create_rule', json={"rule_string": rule}).json['ast']
        response = self.client.post('/evaluate_rule', json={
            "ast": ast,
            "data": {"age": 35, "salary": 60000}
        })
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json['result'])

    def test_evaluate_rule_api_false(self):
        rule = "age > 30 AND salary > 50000"
        ast = self.client.post('/create_rule', json={"rule_string": rule}).json['ast']
        response = self.client.post('/evaluate_rule', json={
            "ast": ast,
            "data": {"age": 25, "salary": 40000}
        })
        self.assertEqual(response.status_code, 200)
        self.assertFalse(response.json['result'])

if __name__ == "__main__":
    unittest.main()
