from django.db import models

class OctoUser(models.Model):
    username = models.CharField(max_length=100)
    email = models.CharField(max_length=200)
    team = models.IntegerField(default=0)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.username

class Team(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return self.name

class Activity(models.Model):
    user = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    duration = models.IntegerField()

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f"{self.user} - {self.type}"

class Leaderboard(models.Model):
    user = models.CharField(max_length=100)
    points = models.IntegerField()

    class Meta:
        db_table = 'leaderboard'

    def __str__(self):
        return f"{self.user} - {self.points}"

class Workout(models.Model):
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=50)

    class Meta:
        db_table = 'workouts'

    def __str__(self):
        return self.name
