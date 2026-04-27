from pymongo import MongoClient, ASCENDING

client = MongoClient('mongodb://localhost:27017')
db = client['octofit_db']

# Drop collections if exist
for col in ['users', 'teams', 'activities', 'leaderboard', 'workouts']:
    db[col].drop()

# Teams
db.teams.insert_many([
    {'_id': 1, 'name': 'Marvel'},
    {'_id': 2, 'name': 'DC'}
])

# Users
users = [
    {'username': 'ironman', 'email': 'ironman@marvel.com', 'team': 1},
    {'username': 'spiderman', 'email': 'spiderman@marvel.com', 'team': 1},
    {'username': 'batman', 'email': 'batman@dc.com', 'team': 2},
    {'username': 'superman', 'email': 'superman@dc.com', 'team': 2},
]
db.users.insert_many(users)
db.users.create_index([('email', ASCENDING)], unique=True)

# Activities
db.activities.insert_many([
    {'user': 'ironman', 'type': 'run', 'duration': 30},
    {'user': 'spiderman', 'type': 'cycle', 'duration': 45},
    {'user': 'batman', 'type': 'swim', 'duration': 60},
    {'user': 'superman', 'type': 'run', 'duration': 50},
])

# Leaderboard
db.leaderboard.insert_many([
    {'user': 'ironman', 'points': 100},
    {'user': 'spiderman', 'points': 80},
    {'user': 'batman', 'points': 90},
    {'user': 'superman', 'points': 110},
])

# Workouts
db.workouts.insert_many([
    {'name': 'Pushups', 'difficulty': 'Easy'},
    {'name': 'Pullups', 'difficulty': 'Medium'},
    {'name': 'Squats', 'difficulty': 'Hard'},
])

print('Database octofit_db popolato con dati di esempio.')
