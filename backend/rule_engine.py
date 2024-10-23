import re

# Node class to represent the AST structure
class Node:
    def __init__(self, node_type, left=None, right=None, value=None):
        self.type = node_type
        self.left = left
        self.right = right
        self.value = value

    def __repr__(self):
        if self.type == "operator":
            return f"({self.left} {self.value} {self.right})"
        else:
            return self.value

# Catalog of valid attributes
VALID_ATTRIBUTES = {'age', 'department', 'salary', 'experience'}

def validate_rule_string(rule_string):
    """Basic validation for rule string syntax and structure."""
    # Check for valid operators and attribute names
    pattern = r"([a-zA-Z_]+)\s*([<>]=?|==|=)\s*([0-9]+|'.*')"
    tokens = rule_string.split()
    for token in tokens:
        if not re.match(pattern, token) and token not in {'AND', 'OR'}:
            return False
    return True

def validate_attributes(data):
    """Validate if all attributes in user data are in the catalog."""
    for key in data.keys():
        if key not in VALID_ATTRIBUTES:
            return False, f"Invalid attribute: {key}"
    return True, ""

# Helper function to parse individual conditions
def parse_condition(condition):
    operators = ['>=', '<=', '>', '<', '==', '=']
    for op in operators:
        if op in condition:
            left, right = condition.split(op)
            return Node("operand", value=f"{left.strip()} {op} {right.strip()}")
    return None

# Function to create the AST from a rule string
def create_rule(rule_string):
    """Convert a rule string like 'age > 30 AND salary > 50000' into an AST."""
    # Validate the rule string
    if not validate_rule_string(rule_string):
        raise ValueError("Invalid rule format. Ensure it contains valid operators and operands.")
    
    # Replace AND/OR with safe operator symbols
    rule_string = rule_string.replace("AND", "&").replace("OR", "|")
    
    def recursive_parse(expression):
        if '&' not in expression and '|' not in expression:
            return parse_condition(expression.strip())
        
        if '&' in expression:
            left_expr, right_expr = expression.rsplit('&', 1)
            left_node = recursive_parse(left_expr.strip())
            right_node = recursive_parse(right_expr.strip())
            return Node("operator", left=left_node, right=right_node, value="AND")
        
        if '|' in expression:
            left_expr, right_expr = expression.rsplit('|', 1)
            left_node = recursive_parse(left_expr.strip())
            right_node = recursive_parse(right_expr.strip())
            return Node("operator", left=left_node, right=right_node, value="OR")
    
    return recursive_parse(rule_string)

# Function to combine multiple ASTs into one using 'AND' by default
def combine_rules(ast_list):
    if not ast_list:
        return None
    
    combined_ast = ast_list[0]
    
    for ast in ast_list[1:]:
        combined_ast = Node("operator", left=combined_ast, right=ast, value="AND")
    
    return combined_ast

# Helper function to evaluate individual conditions against user data
def evaluate_condition(condition, data):
    pattern = r"([a-zA-Z_]+)\s*([<>]=?|==|=)\s*([0-9]+|'.*')"
    match = re.match(pattern, condition)
    if not match:
        raise ValueError(f"Invalid condition: {condition}")
    
    field, operator, value = match.groups()
    if field not in data:
        return False
    
    field_value = data[field]

    if value.startswith("'") and value.endswith("'"):
        value = value.strip("'")
    else:
        value = int(value)
    
    if operator == ">":
        return field_value > value
    elif operator == ">=":
        return field_value >= value
    elif operator == "<":
        return field_value < value
    elif operator == "<=":
        return field_value <= value
    elif operator == "==" or operator == "=":
        return field_value == value
    return False

# Recursive function to evaluate the entire AST
def evaluate_rule(node, data):
    if node.type == "operand":
        return evaluate_condition(node.value, data)
    
    elif node.type == "operator":
        left_result = evaluate_rule(node.left, data)
        right_result = evaluate_rule(node.right, data)
        
        if node.value == "AND":
            return left_result and right_result
        elif node.value == "OR":
            return left_result or right_result
    
    return False

# Function to modify an operator in an existing rule
def change_operator(node, old_operator, new_operator):
    if node is None:
        return
    if node.type == "operator" and node.value == old_operator:
        node.value = new_operator
    change_operator(node.left, old_operator, new_operator)
    change_operator(node.right, old_operator, new_operator)

# Function to modify an operand in an existing rule
def modify_operand(node, old_value, new_value):
    if node is None:
        return
    if node.type == "operand" and node.value == old_value:
        node.value = new_value
    modify_operand(node.left, old_value, new_value)
    modify_operand(node.right, old_value, new_value)

# User-defined functions dictionary
USER_DEFINED_FUNCTIONS = {
    'is_adult': lambda age: age >= 18,
}

def evaluate_function(func_name, *args):
    if func_name in USER_DEFINED_FUNCTIONS:
        return USER_DEFINED_FUNCTIONS[func_name](*args)
    raise ValueError(f"Function {func_name} not defined.")
