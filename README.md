# AST-Based Rule Engine Application

This is a simple 3-tier rule engine application that determines user eligibility based on attributes like age, department, income, spend, etc. The system uses an Abstract Syntax Tree (AST) to represent conditional rules, which allows for dynamic creation, combination, and modification of rules.

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
- [Testing](#testing)
- [Bonus Features](#bonus-features)

## Overview
The rule engine allows users to define and evaluate complex rules based on a user's attributes. For instance, a rule can specify: 

Rules are parsed into an AST, making them flexible and dynamic, with support for combining multiple rules.

## Tech Stack

### Backend:
- **Flask**: For building the API.
- **SQLAlchemy**: ORM for managing the database.
- **SQLite**: Lightweight database for rule storage.
- **Python**: Core backend logic for AST rule processing.

### Frontend:
- **React**: Frontend framework for the UI.

### Other Tools:
- **Docker**: For containerizing the application.
- **Git**: For version control.

## Features

- **Dynamic Rule Creation**: Define conditional rules based on user attributes.
- **Rule Combination**: Combine multiple rules using logical operators (`AND`, `OR`).
- **AST Representation**: The rules are represented as ASTs, which allow for flexibility in evaluating conditions.
- **User Data Validation**: Validate user attributes against defined rules.
- **API Endpoints**: Expose functionality via REST API.
- **Frontend UI**: User-friendly interface to manage rules.

## Setup and Installation

### Backend Setup:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NandeeshPuri/AST-Rule-Engine.git
   cd AST-Rule-Engine/backend
   ```

2. **Install Dependencies**:
   You can either use `requirements.txt` or `Docker`.

   #### Using `requirements.txt`:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # Linux/Mac
   .venv\Scripts\activate     # Windows

   pip install -r requirements.txt
   ```

   #### Using Docker:
   ```bash
   docker-compose up --build
   ```

3. **Run the Flask Backend**:
   ```bash
   flask run
   ```

4. **Database Setup**:
   The app uses SQLite by default. You can modify this in `config.py` if needed.

### Frontend Setup:

1. **Navigate to the `frontend/` folder**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the React Frontend**:
   ```bash
   npm start
   ```

   The frontend should now be running at `http://localhost:3000`.

## API Endpoints

- **`POST /api/rules`**: Create a new rule.
- **`POST /api/combine_rules`**: Combine multiple rules.
- **`POST /api/evaluate`**: Evaluate a rule against a user's data.

## Frontend
The frontend is built using React and provides a simple interface for creating and evaluating rules. You can add new rules, combine them, and see results based on user input.

## Testing

### Backend:
Run tests using:
```bash
pytest
```

### Frontend:
React testing is enabled through `Jest`. You can run tests with:
```bash
npm test
```

## Bonus Features

- **Error Handling**: The system handles invalid rule strings and provides clear error messages.
- **Attribute Validation**: Ensures that only valid attributes are used within rules.
- **Dynamic Rule Modifications**: Allows users to modify existing rules, add or remove sub-expressions, and adjust operators or operand values.
- **User-Defined Functions**: Support for advanced conditions within the rule language (e.g., complex logic based on external data).

