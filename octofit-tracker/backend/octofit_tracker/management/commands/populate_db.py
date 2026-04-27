
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from octofit_tracker.models import Team, Activity, Leaderboard, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Delete all data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        Team.objects.all().delete()
        User.objects.exclude(is_superuser=True).delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        users = [
            {'username': 'ironman', 'email': 'ironman@marvel.com', 'team': marvel},
            {'username': 'spiderman', 'email': 'spiderman@marvel.com', 'team': marvel},
            {'username': 'batman', 'email': 'batman@dc.com', 'team': dc},
            {'username': 'superman', 'email': 'superman@dc.com', 'team': dc},
        ]
        user_objs = {}
        for u in users:
            user = User.objects.create_user(username=u['username'], email=u['email'], password='password')
            user_objs[u['username']] = user

        # Activities
        Activity.objects.create(user=user_objs['ironman'], type='run', duration=30)
        Activity.objects.create(user=user_objs['spiderman'], type='cycle', duration=45)
        Activity.objects.create(user=user_objs['batman'], type='swim', duration=60)
        Activity.objects.create(user=user_objs['superman'], type='run', duration=50)

        # Leaderboard
        Leaderboard.objects.create(user=user_objs['ironman'], points=100)
        Leaderboard.objects.create(user=user_objs['spiderman'], points=80)
        Leaderboard.objects.create(user=user_objs['batman'], points=90)
        Leaderboard.objects.create(user=user_objs['superman'], points=110)

        # Workouts
        Workout.objects.create(name='Pushups', difficulty='Easy')
        Workout.objects.create(name='Pullups', difficulty='Medium')
        Workout.objects.create(name='Squats', difficulty='Hard')

        self.stdout.write(self.style.SUCCESS('Database populated with test data.'))
