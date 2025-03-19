from django.shortcuts import render
from django.http import JsonResponse
from django.db import connections
from django.db.utils import OperationalError
from redis import Redis
from redis.exceptions import ConnectionError

# Create your views here.

def index(request):
    return render(request, 'common/index.html')

def health_check(request):
    # Check database connection
    try:
        connections['default'].cursor()
        db_status = True
    except OperationalError:
        db_status = False

    # Check Redis connection
    try:
        redis_client = Redis(host='redis', port=6379)
        redis_status = redis_client.ping()
    except ConnectionError:
        redis_status = False

    status = {
        'database': 'up' if db_status else 'down',
        'redis': 'up' if redis_status else 'down',
    }

    http_status = 200 if all([db_status, redis_status]) else 503

    return JsonResponse(status, status=http_status)
